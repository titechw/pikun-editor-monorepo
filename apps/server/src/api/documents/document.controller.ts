import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { injectable, inject } from 'tsyringe';
import { DocumentService } from '@/services/document.service';
import { AuthService } from '@/services/auth.service';
import { WorkspaceDAO } from '@/dao/workspace.dao';

/**
 * 文档控制器
 */
@injectable()
export class DocumentController {
  constructor(
    @inject(DocumentService) private documentService: DocumentService,
    @inject(AuthService) private authService: AuthService,
    @inject('WorkspaceDAO') private workspaceDAO: WorkspaceDAO
  ) {}

  /**
   * 获取当前用户（从 token）
   */
  private async getCurrentUser(req: NextRequest): Promise<{ uid: number; uuid: string }> {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Unauthorized');
    }

    const token = authHeader.substring(7);
    return await this.authService.verifyToken(token);
  }

  /**
   * 创建文档
   */
  async createDocument(
    req: NextRequest,
    context: { params: { workspace_id: string } }
  ): Promise<NextResponse> {
    try {
      const user = await this.getCurrentUser(req);
      const body = await req.json();

      // 验证 workspace 是否存在且用户有权限访问
      const workspace = await this.workspaceDAO.findById(context.params.workspace_id);
      if (!workspace) {
        return NextResponse.json(
          {
            success: false,
            message: 'Workspace not found',
          },
          { status: 404 }
        );
      }

      // 验证用户是否有权限访问该 workspace（检查 owner_uid）
      if (workspace.owner_uid !== user.uid) {
        return NextResponse.json(
          {
            success: false,
            message: 'You do not have permission to access this workspace',
          },
          { status: 403 }
        );
      }

      const createSchema = z.object({
        title: z.string().min(1),
        content: z.string().optional().nullable(), // Base64 编码的内容，可选
        metadata: z.record(z.any()).optional().nullable(),
      });

      const validatedData = createSchema.parse(body);
      // 如果没有提供 content，创建一个空的 Buffer（空 Yjs 文档）
      const contentBuffer = validatedData.content
        ? Buffer.from(validatedData.content, 'base64')
        : Buffer.alloc(0);

      const document = await this.documentService.createDocument({
        workspace_id: context.params.workspace_id,
        title: validatedData.title,
        content: contentBuffer,
        owner_uid: user.uid,
        metadata: validatedData.metadata || {},
      });

      return NextResponse.json({
        success: true,
        data: {
          object_id: document.object_id,
          workspace_id: document.workspace_id,
          created_at:
            document.created_at instanceof Date
              ? document.created_at.toISOString()
              : document.created_at,
        },
      });
    } catch (error: any) {
      // 处理 Zod 验证错误
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            message: 'Validation error',
            errors: error.errors,
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to create document',
        },
        { status: error.message === 'Unauthorized' ? 401 : 400 }
      );
    }
  }

  /**
   * 获取文档
   */
  async getDocument(
    req: NextRequest,
    context: { params: { workspace_id: string; object_id: string } }
  ): Promise<NextResponse> {
    try {
      await this.getCurrentUser(req);

      const includeContent = req.nextUrl.searchParams.get('include_content') === 'true';
      const document = await this.documentService.getDocument(
        context.params.object_id,
        includeContent
      );

      if (!document) {
        return NextResponse.json(
          {
            success: false,
            message: 'Document not found',
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: {
          object_id: document.object_id,
          workspace_id: document.workspace_id,
          title: document.title,
          content: includeContent ? document.content.toString('base64') : undefined,
          content_length: document.content_length,
          owner_uid: document.owner_uid,
          metadata: document.metadata,
          created_at:
            document.created_at instanceof Date
              ? document.created_at.toISOString()
              : document.created_at,
          updated_at:
            document.updated_at instanceof Date
              ? document.updated_at.toISOString()
              : document.updated_at,
        },
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get document',
        },
        { status: error.message === 'Unauthorized' ? 401 : 500 }
      );
    }
  }

  /**
   * 更新文档
   */
  async updateDocument(
    req: NextRequest,
    context: { params: { workspace_id: string; object_id: string } }
  ): Promise<NextResponse> {
    try {
      const user = await this.getCurrentUser(req);
      const body = await req.json();

      const updateSchema = z.object({
        title: z.string().optional().nullable(),
        content: z.string().optional().nullable(), // Base64 编码的内容（Doc State）
        change_data: z.string().optional().nullable(), // Base64 编码的增量更新（Yjs Update）
        snapshot: z.string().optional().nullable(), // Base64 编码的 Snapshot（状态向量）
        metadata: z.record(z.any()).optional().nullable(),
        forceSnapshot: z.boolean().optional().default(false), // 是否强制创建快照
      });

      const validatedData = updateSchema.parse(body);
      const updates: any = {};

      if (validatedData.title) updates.title = validatedData.title;
      if (validatedData.content) {
        updates.content = Buffer.from(validatedData.content, 'base64');
      }
      if (validatedData.change_data) {
        updates.change_data = Buffer.from(validatedData.change_data, 'base64');
      }
      if (validatedData.snapshot) {
        updates.snapshot = Buffer.from(validatedData.snapshot, 'base64');
      }
      if (validatedData.metadata) updates.metadata = validatedData.metadata;
      if (validatedData.forceSnapshot !== undefined) {
        updates.forceSnapshot = validatedData.forceSnapshot;
      }

      const document = await this.documentService.updateDocument(context.params.object_id, updates);

      return NextResponse.json({
        success: true,
        data: {
          object_id: document.object_id,
          updated_at:
            document.updated_at instanceof Date
              ? document.updated_at.toISOString()
              : document.updated_at,
        },
      });
    } catch (error: any) {
      // 处理 Zod 验证错误
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            message: 'Validation error',
            errors: error.errors,
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to update document',
        },
        { status: error.message === 'Unauthorized' ? 401 : 400 }
      );
    }
  }

  /**
   * 获取文档列表
   */
  async getDocuments(
    req: NextRequest,
    context: { params: { workspace_id: string } }
  ): Promise<NextResponse> {
    try {
      await this.getCurrentUser(req);

      const page = parseInt(req.nextUrl.searchParams.get('page') || '1', 10);
      const page_size = parseInt(req.nextUrl.searchParams.get('page_size') || '20', 10);
      const sort_by =
        (req.nextUrl.searchParams.get('sort_by') as 'created_at' | 'updated_at' | 'title') ||
        'updated_at';
      const order = (req.nextUrl.searchParams.get('order') as 'asc' | 'desc') || 'desc';

      const result = await this.documentService.getDocuments(context.params.workspace_id, {
        page,
        page_size,
        sort_by,
        order,
      });

      return NextResponse.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get documents',
        },
        { status: error.message === 'Unauthorized' ? 401 : 500 }
      );
    }
  }

  /**
   * 删除文档
   */
  async deleteDocument(
    req: NextRequest,
    context: { params: { workspace_id: string; object_id: string } }
  ): Promise<NextResponse> {
    try {
      await this.getCurrentUser(req);

      await this.documentService.deleteDocument(context.params.object_id);

      return NextResponse.json({
        success: true,
        message: 'Document deleted successfully',
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to delete document',
        },
        { status: error.message === 'Unauthorized' ? 401 : 500 }
      );
    }
  }

  /**
   * 获取文档快照列表
   */
  async getSnapshots(
    req: NextRequest,
    context: { params: { workspace_id: string; object_id: string } }
  ): Promise<NextResponse> {
    try {
      await this.getCurrentUser(req);

      const limit = parseInt(req.nextUrl.searchParams.get('limit') || '20', 10);
      const offset = parseInt(req.nextUrl.searchParams.get('offset') || '0', 10);

      const result = await this.documentService.getSnapshots(context.params.object_id, {
        limit,
        offset,
      });

      return NextResponse.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get snapshots',
        },
        { status: error.message === 'Unauthorized' ? 401 : 500 }
      );
    }
  }

  /**
   * 获取最新快照
   */
  async getLatestSnapshot(
    req: NextRequest,
    context: { params: { workspace_id: string; object_id: string } }
  ): Promise<NextResponse> {
    try {
      await this.getCurrentUser(req);

      const snapshot = await this.documentService.getLatestSnapshot(context.params.object_id);

      if (!snapshot) {
        return NextResponse.json(
          {
            success: false,
            message: 'Snapshot not found',
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: {
          snapshot_id: snapshot.snapshot_id,
          doc_state: snapshot.doc_state?.toString('base64'),
          snapshot: snapshot.snapshot_data.toString('base64'),
          created_at: snapshot.created_at,
        },
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get latest snapshot',
        },
        { status: error.message === 'Unauthorized' ? 401 : 500 }
      );
    }
  }

  /**
   * 根据 snapshot_id 获取快照内容
   */
  async getSnapshotById(
    req: NextRequest,
    context: { params: { workspace_id: string; object_id: string; snapshot_id: string } }
  ): Promise<NextResponse> {
    try {
      await this.getCurrentUser(req);

      const snapshot = await this.documentService.getSnapshotById(context.params.snapshot_id);

      if (!snapshot) {
        return NextResponse.json(
          {
            success: false,
            message: 'Snapshot not found',
          },
          { status: 404 }
        );
      }

      // 从数据库获取快照内容
      let docStateBase64: string | null = null;
      if (snapshot.doc_state) {
        docStateBase64 = snapshot.doc_state.toString('base64');
      }

      return NextResponse.json({
        success: true,
        data: {
          snapshot_id: snapshot.snapshot_id,
          doc_state: docStateBase64,
          snapshot: snapshot.snapshot_data?.toString('base64') || null,
          created_at: snapshot.created_at,
        },
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get snapshot',
        },
        { status: error.message === 'Unauthorized' ? 401 : 500 }
      );
    }
  }

  /**
   * 搜索文档
   */
  async searchDocuments(
    req: NextRequest,
    context: { params: { workspace_id: string } }
  ): Promise<NextResponse> {
    try {
      await this.getCurrentUser(req);

      const query = req.nextUrl.searchParams.get('query');
      if (!query) {
        return NextResponse.json(
          {
            success: false,
            message: 'Query parameter is required',
          },
          { status: 400 }
        );
      }

      const limit = parseInt(req.nextUrl.searchParams.get('limit') || '10', 10);
      const offset = parseInt(req.nextUrl.searchParams.get('offset') || '0', 10);
      const threshold = parseFloat(req.nextUrl.searchParams.get('threshold') || '0.5');

      const results = await this.documentService.searchDocuments(
        context.params.workspace_id,
        query,
        {
          limit,
          offset,
          threshold,
        }
      );

      return NextResponse.json({
        success: true,
        data: results,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to search documents',
        },
        { status: error.message === 'Unauthorized' ? 401 : 500 }
      );
    }
  }
}

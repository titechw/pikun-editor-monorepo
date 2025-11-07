import { NextRequest, NextResponse } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { DocumentService } from '@/services/document.service';
import { AuthService } from '@/services/auth.service';

/**
 * 获取文档变更列表
 * GET /api/workspace/{workspace_id}/documents/{object_id}/changes
 */
export async function GET(
  req: NextRequest,
  context: { params: { workspace_id: string; object_id: string } }
): Promise<NextResponse> {
  try {
    const authService = Container.resolve<AuthService>(AuthService);
    const documentService = Container.resolve<DocumentService>(DocumentService);

    // 验证用户身份
    await authService.getCurrentUser(req);

    const { object_id } = context.params;
    const searchParams = req.nextUrl.searchParams;
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : 100;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!, 10) : 0;
    const after_snapshot_id = searchParams.get('after_snapshot_id') || null;

    const result = await documentService.getDocumentChanges(object_id, {
      limit,
      offset,
      after_snapshot_id,
    });

    return NextResponse.json({
      success: true,
      data: {
        changes: result.changes.map((change) => ({
          ...change,
          change_data: change.change_data.toString('base64'),
          before_state_vector: change.before_state_vector?.toString('base64') || null,
          after_state_vector: change.after_state_vector?.toString('base64') || null,
          created_at:
            typeof change.created_at === 'string'
              ? parseInt(change.created_at, 10)
              : change.created_at,
        })),
        total: result.total,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to get document changes',
      },
      { status: 500 }
    );
  }
}

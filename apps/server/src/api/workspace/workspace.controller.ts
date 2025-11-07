import { NextRequest, NextResponse } from 'next/server';
import { injectable, inject } from 'tsyringe';
import { WorkspaceDAO } from '@/dao/workspace.dao';
import { AuthService } from '@/services/auth.service';

/**
 * 工作空间控制器
 */
@injectable()
export class WorkspaceController {
  constructor(
    @inject('WorkspaceDAO') private workspaceDAO: WorkspaceDAO,
    @inject(AuthService) private authService: AuthService
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
   * 获取用户的默认工作空间
   */
  async getDefaultWorkspace(req: NextRequest): Promise<NextResponse> {
    try {
      const user = await this.getCurrentUser(req);
      const workspace = await this.workspaceDAO.getOrCreateDefault(user.uid);

      return NextResponse.json({
        success: true,
        data: {
          workspace_id: workspace.workspace_id,
          name: workspace.name,
          owner_uid: workspace.owner_uid,
          icon: workspace.icon,
          metadata: workspace.metadata,
          created_at: workspace.created_at instanceof Date ? workspace.created_at.toISOString() : workspace.created_at,
          updated_at: workspace.updated_at instanceof Date ? workspace.updated_at.toISOString() : workspace.updated_at,
        },
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get default workspace',
        },
        { status: error.message === 'Unauthorized' ? 401 : 500 }
      );
    }
  }

  /**
   * 获取用户的所有工作空间
   */
  async getWorkspaces(req: NextRequest): Promise<NextResponse> {
    try {
      const user = await this.getCurrentUser(req);
      const workspaces = await this.workspaceDAO.findByOwnerUid(user.uid);

      return NextResponse.json({
        success: true,
        data: workspaces.map((w) => ({
          workspace_id: w.workspace_id,
          name: w.name,
          owner_uid: w.owner_uid,
          icon: w.icon,
          metadata: w.metadata,
          created_at: w.created_at instanceof Date ? w.created_at.toISOString() : w.created_at,
          updated_at: w.updated_at instanceof Date ? w.updated_at.toISOString() : w.updated_at,
        })),
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get workspaces',
        },
        { status: error.message === 'Unauthorized' ? 401 : 500 }
      );
    }
  }
}


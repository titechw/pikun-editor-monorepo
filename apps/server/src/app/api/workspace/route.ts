import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { WorkspaceController } from '@/api/workspace/workspace.controller';

/**
 * GET /api/workspace - 获取用户的所有工作空间
 */
export async function GET(req: NextRequest) {
  const controller = Container.resolve<WorkspaceController>(WorkspaceController);
  return controller.getWorkspaces(req);
}


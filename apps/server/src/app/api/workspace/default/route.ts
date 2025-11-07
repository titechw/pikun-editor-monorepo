import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { WorkspaceController } from '@/api/workspace/workspace.controller';

/**
 * GET /api/workspace/default - 获取默认工作空间
 */
export async function GET(req: NextRequest) {
  const controller = Container.resolve<WorkspaceController>(WorkspaceController);
  return controller.getDefaultWorkspace(req);
}


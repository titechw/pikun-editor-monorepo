import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { DocumentController } from '@/api/documents/document.controller';

/**
 * GET /api/workspace/[workspace_id]/documents/[object_id]/snapshots - 获取文档快照列表
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { workspace_id: string; object_id: string } }
) {
  const controller = Container.resolve<DocumentController>(DocumentController);
  return controller.getSnapshots(req, { params });
}


import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { DocumentController } from '@/api/documents/document.controller';

/**
 * GET /api/workspace/[workspace_id]/documents/[object_id]/snapshots/[snapshot_id] - 获取特定快照内容
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { workspace_id: string; object_id: string; snapshot_id: string } }
) {
  const controller = Container.resolve<DocumentController>(DocumentController);
  return controller.getSnapshotById(req, { params });
}



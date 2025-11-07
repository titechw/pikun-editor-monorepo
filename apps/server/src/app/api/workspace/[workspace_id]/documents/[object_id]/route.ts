import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { DocumentController } from '@/api/documents/document.controller';

/**
 * GET /api/workspace/[workspace_id]/documents/[object_id] - 获取文档
 * PUT /api/workspace/[workspace_id]/documents/[object_id] - 更新文档
 * DELETE /api/workspace/[workspace_id]/documents/[object_id] - 删除文档
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { workspace_id: string; object_id: string } }
) {
  const controller = Container.resolve<DocumentController>(DocumentController);
  return controller.getDocument(req, { params });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { workspace_id: string; object_id: string } }
) {
  const controller = Container.resolve<DocumentController>(DocumentController);
  return controller.updateDocument(req, { params });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { workspace_id: string; object_id: string } }
) {
  const controller = Container.resolve<DocumentController>(DocumentController);
  return controller.deleteDocument(req, { params });
}


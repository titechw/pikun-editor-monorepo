import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { DocumentController } from '@/api/documents/document.controller';

/**
 * GET /api/workspace/[workspace_id]/documents - 获取文档列表
 * POST /api/workspace/[workspace_id]/documents - 创建文档
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { workspace_id: string } }
) {
  const controller = Container.resolve<DocumentController>(DocumentController);
  return controller.getDocuments(req, { params });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { workspace_id: string } }
) {
  const controller = Container.resolve<DocumentController>(DocumentController);
  return controller.createDocument(req, { params });
}


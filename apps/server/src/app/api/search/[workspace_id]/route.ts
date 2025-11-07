import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { DocumentController } from '@/api/documents/document.controller';

/**
 * GET /api/search/[workspace_id] - 搜索文档
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { workspace_id: string } }
) {
  const controller = Container.resolve<DocumentController>(DocumentController);
  return controller.searchDocuments(req, { params });
}


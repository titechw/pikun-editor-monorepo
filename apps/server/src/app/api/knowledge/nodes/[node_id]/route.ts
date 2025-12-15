import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { KnowledgeController } from '@/api/knowledge/knowledge.controller';

/**
 * GET /api/knowledge/nodes/[node_id] - 获取节点详情
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { node_id: string } }
) {
  const controller = Container.resolve<KnowledgeController>(KnowledgeController);
  return controller.getNodeById(req, params.node_id);
}




import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { KnowledgeController } from '@/api/knowledge/knowledge.controller';

/**
 * GET /api/knowledge/nodes/[node_id]/children - 获取节点的子节点（用于层级展示）
 * Query params:
 *   - node_type: 节点类型过滤（可选）
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { node_id: string } }
) {
  const controller = Container.resolve<KnowledgeController>(KnowledgeController);
  return controller.getNodeChildren(req, params.node_id);
}


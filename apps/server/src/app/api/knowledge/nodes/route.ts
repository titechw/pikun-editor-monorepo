import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { KnowledgeController } from '@/api/knowledge/knowledge.controller';

/**
 * GET /api/knowledge/nodes - 获取知识节点列表
 * Query params:
 *   - parent_id: 父节点ID（可选，null表示查询顶级节点）
 *   - node_type: 节点类型过滤（可选）
 */
export async function GET(req: NextRequest) {
  const controller = Container.resolve<KnowledgeController>(KnowledgeController);
  return controller.getNodes(req);
}




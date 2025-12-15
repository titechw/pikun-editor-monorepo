import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { KnowledgeController } from '@/api/knowledge/knowledge.controller';

/**
 * GET /api/knowledge/dependencies - 获取依赖关系
 * Query params:
 *   - source_node_id: 前置节点ID（可选）
 *   - target_node_id: 目标节点ID（可选）
 */
export async function GET(req: NextRequest) {
  const controller = Container.resolve<KnowledgeController>(KnowledgeController);
  return controller.getDependencies(req);
}




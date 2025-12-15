import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { KnowledgeController } from '@/api/knowledge/knowledge.controller';

/**
 * GET /api/knowledge/learning-path - 获取学习路径
 * Query params:
 *   - node_id: 目标节点ID（必需）
 */
export async function GET(req: NextRequest) {
  const controller = Container.resolve<KnowledgeController>(KnowledgeController);
  return controller.getLearningPath(req);
}




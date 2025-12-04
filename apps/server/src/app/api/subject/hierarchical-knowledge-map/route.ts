import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { SubjectController } from '@/api/subject/subject.controller';

/**
 * GET /api/subject/hierarchical-knowledge-map - 获取分层知识地图数据（C端）
 * 支持按分类层级返回数据
 * 
 * Query参数：
 * - category_id: 分类ID（可选，用于获取特定分类下的数据）
 * - parent_id: 父节点ID（可选，用于钻取）
 */
export async function GET(req: NextRequest) {
  const controller = Container.resolve<SubjectController>(SubjectController);
  return controller.getHierarchicalKnowledgeMap(req);
}



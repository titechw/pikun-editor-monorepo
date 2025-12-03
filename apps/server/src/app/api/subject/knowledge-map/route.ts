import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { SubjectController } from '@/api/subject/subject.controller';

/**
 * GET /api/subject/knowledge-map - 获取知识地图数据（C端）
 */
export async function GET(req: NextRequest) {
  const controller = Container.resolve<SubjectController>(SubjectController);
  return controller.getKnowledgeMap(req);
}


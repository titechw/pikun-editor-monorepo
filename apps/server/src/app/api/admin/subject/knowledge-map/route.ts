import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { SubjectController } from '@/api/subject/subject.controller';
import { withAdminAuth } from '@/utils/admin-auth';

/**
 * GET /api/admin/subject/knowledge-map - 获取知识地图数据（管理员）
 */
export const GET = withAdminAuth(async (req: NextRequest) => {
  const controller = Container.resolve<SubjectController>(SubjectController);
  return controller.getKnowledgeMap(req);
});



import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { SubjectController } from '@/api/subject/subject.controller';
import { withAdminAuth } from '@/utils/admin-auth';

/**
 * POST /api/admin/subject/dependencies - 创建学科依赖关系（管理员）
 */
export const POST = withAdminAuth(async (req: NextRequest) => {
  const controller = Container.resolve<SubjectController>(SubjectController);
  return controller.createDependency(req);
});




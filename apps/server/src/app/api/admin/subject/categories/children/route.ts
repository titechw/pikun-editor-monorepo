import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { SubjectController } from '@/api/subject/subject.controller';
import { withAdminAuth } from '@/utils/admin-auth';

/**
 * GET /api/admin/subject/categories/children - 获取分类的直接子分类（用于树懒加载）
 */
export const GET = withAdminAuth(async (req: NextRequest) => {
  const controller = Container.resolve<SubjectController>(SubjectController);
  return controller.getCategoryChildren(req);
});


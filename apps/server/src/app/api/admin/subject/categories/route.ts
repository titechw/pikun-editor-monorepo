import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { SubjectController } from '@/api/subject/subject.controller';
import { withAdminAuth } from '@/utils/admin-auth';

/**
 * GET /api/admin/subject/categories - 获取学科分类列表（管理员）
 * POST /api/admin/subject/categories - 创建学科分类（管理员）
 */
export const GET = withAdminAuth(async (req: NextRequest) => {
  const controller = Container.resolve<SubjectController>(SubjectController);
  return controller.getCategories(req);
});

export const POST = withAdminAuth(async (req: NextRequest) => {
  const controller = Container.resolve<SubjectController>(SubjectController);
  return controller.createCategory(req);
});


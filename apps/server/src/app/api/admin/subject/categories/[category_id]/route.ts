import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { SubjectController } from '@/api/subject/subject.controller';
import { withAdminAuth } from '@/utils/admin-auth';

/**
 * GET /api/admin/subject/categories/[category_id] - 获取学科分类详情（管理员）
 * PUT /api/admin/subject/categories/[category_id] - 更新学科分类（管理员）
 * DELETE /api/admin/subject/categories/[category_id] - 删除学科分类（管理员）
 */
export const GET = withAdminAuth(async (req: NextRequest, { params }: { params: { category_id: string } }) => {
  const controller = Container.resolve<SubjectController>(SubjectController);
  return controller.getCategoryById(req, params.category_id);
});

export const PUT = withAdminAuth(async (req: NextRequest, { params }: { params: { category_id: string } }) => {
  const controller = Container.resolve<SubjectController>(SubjectController);
  return controller.updateCategory(req, params.category_id);
});

export const DELETE = withAdminAuth(async (req: NextRequest, { params }: { params: { category_id: string } }) => {
  const controller = Container.resolve<SubjectController>(SubjectController);
  return controller.deleteCategory(req, params.category_id);
});


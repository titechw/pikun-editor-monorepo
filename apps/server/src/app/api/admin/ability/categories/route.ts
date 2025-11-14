import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { AbilityModelController } from '@/api/ability/ability-model.controller';
import { withAdminAuth } from '@/utils/admin-auth';

/**
 * GET /api/admin/ability/categories - 获取能力类别列表（管理员）
 * POST /api/admin/ability/categories - 创建能力类别（管理员）
 */
export const GET = withAdminAuth(async (req: NextRequest) => {
  const controller = Container.resolve<AbilityModelController>(AbilityModelController);
  return controller.getCategories(req);
});

export const POST = withAdminAuth(async (req: NextRequest) => {
  const controller = Container.resolve<AbilityModelController>(AbilityModelController);
  return controller.createCategory(req);
});


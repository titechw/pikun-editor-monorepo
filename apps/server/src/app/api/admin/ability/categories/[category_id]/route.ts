import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { AbilityModelController } from '@/api/ability/ability-model.controller';

/**
 * GET /api/admin/ability/categories/:category_id - 获取能力类别详情（管理员）
 * PUT /api/admin/ability/categories/:category_id - 更新能力类别（管理员）
 * DELETE /api/admin/ability/categories/:category_id - 删除能力类别（管理员）
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { category_id: string } }
) {
  const controller = Container.resolve<AbilityModelController>(AbilityModelController);
  return controller.getCategoryById(req, params.category_id);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { category_id: string } }
) {
  const controller = Container.resolve<AbilityModelController>(AbilityModelController);
  return controller.updateCategory(req, params.category_id);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { category_id: string } }
) {
  const controller = Container.resolve<AbilityModelController>(AbilityModelController);
  return controller.deleteCategory(req, params.category_id);
}




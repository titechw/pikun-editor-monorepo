import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { AbilityModelController } from '@/api/ability/ability-model.controller';

/**
 * GET /api/admin/ability/items/:item_id - 获取能力项详情（管理员）
 * PUT /api/admin/ability/items/:item_id - 更新能力项（管理员）
 * DELETE /api/admin/ability/items/:item_id - 删除能力项（管理员）
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { item_id: string } }
) {
  const controller = Container.resolve<AbilityModelController>(AbilityModelController);
  return controller.getItemById(req, params.item_id);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { item_id: string } }
) {
  const controller = Container.resolve<AbilityModelController>(AbilityModelController);
  return controller.updateItem(req, params.item_id);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { item_id: string } }
) {
  const controller = Container.resolve<AbilityModelController>(AbilityModelController);
  return controller.deleteItem(req, params.item_id);
}




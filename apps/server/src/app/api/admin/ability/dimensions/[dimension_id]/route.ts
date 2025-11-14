import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { AbilityModelController } from '@/api/ability/ability-model.controller';

/**
 * GET /api/admin/ability/dimensions/:dimension_id - 获取能力维度详情（管理员）
 * PUT /api/admin/ability/dimensions/:dimension_id - 更新能力维度（管理员）
 * DELETE /api/admin/ability/dimensions/:dimension_id - 删除能力维度（管理员）
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { dimension_id: string } }
) {
  const controller = Container.resolve<AbilityModelController>(AbilityModelController);
  return controller.getDimensionById(req, params.dimension_id);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { dimension_id: string } }
) {
  const controller = Container.resolve<AbilityModelController>(AbilityModelController);
  return controller.updateDimension(req, params.dimension_id);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { dimension_id: string } }
) {
  const controller = Container.resolve<AbilityModelController>(AbilityModelController);
  return controller.deleteDimension(req, params.dimension_id);
}


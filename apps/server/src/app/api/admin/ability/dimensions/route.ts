import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { AbilityModelController } from '@/api/ability/ability-model.controller';

/**
 * GET /api/admin/ability/dimensions - 获取能力维度列表（管理员）
 * POST /api/admin/ability/dimensions - 创建能力维度（管理员）
 */
export async function GET(req: NextRequest) {
  const controller = Container.resolve<AbilityModelController>(AbilityModelController);
  return controller.getDimensions(req);
}

export async function POST(req: NextRequest) {
  const controller = Container.resolve<AbilityModelController>(AbilityModelController);
  return controller.createDimension(req);
}



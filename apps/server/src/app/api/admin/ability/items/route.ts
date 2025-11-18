import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { AbilityModelController } from '@/api/ability/ability-model.controller';

/**
 * GET /api/admin/ability/items - 获取能力项列表（管理员）
 * POST /api/admin/ability/items - 创建能力项（管理员）
 */
export async function GET(req: NextRequest) {
  const controller = Container.resolve<AbilityModelController>(AbilityModelController);
  return controller.getItems(req);
}

export async function POST(req: NextRequest) {
  const controller = Container.resolve<AbilityModelController>(AbilityModelController);
  return controller.createItem(req);
}





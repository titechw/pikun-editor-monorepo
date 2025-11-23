import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { AbilityModelController } from '@/api/ability/ability-model.controller';

/**
 * GET /api/ability/categories - 获取能力类别列表
 */
export async function GET(req: NextRequest) {
  const controller = Container.resolve<AbilityModelController>(AbilityModelController);
  return controller.getCategories(req);
}










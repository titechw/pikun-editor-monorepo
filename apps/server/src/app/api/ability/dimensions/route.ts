import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { AbilityModelController } from '@/api/ability/ability-model.controller';

/**
 * GET /api/ability/dimensions - 获取能力维度列表（用户端）
 */
export async function GET(req: NextRequest) {
  const controller = Container.resolve<AbilityModelController>(AbilityModelController);
  return controller.getDimensions(req);
}



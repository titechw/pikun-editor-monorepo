import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { MemoryTrainingController } from '@/api/memory-training/memory-training.controller';

/**
 * GET /api/memory-training/games - 获取游戏列表
 */
export async function GET(req: NextRequest) {
  const controller = Container.resolve<MemoryTrainingController>(MemoryTrainingController);
  return controller.getGames(req);
}






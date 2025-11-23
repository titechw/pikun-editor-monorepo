import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { MemoryTrainingController } from '@/api/memory-training/memory-training.controller';

/**
 * GET /api/memory-training/games/:game_id/progress - 获取用户在指定游戏的进度
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { game_id: string } }
) {
  const controller = Container.resolve<MemoryTrainingController>(MemoryTrainingController);
  return controller.getGameProgress(req, { gameId: params.game_id });
}






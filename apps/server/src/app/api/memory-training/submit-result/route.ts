import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { MemoryTrainingController } from '@/api/memory-training/memory-training.controller';

/**
 * POST /api/memory-training/submit-result - 提交游戏结果
 */
export async function POST(req: NextRequest) {
  const controller = Container.resolve<MemoryTrainingController>(MemoryTrainingController);
  return controller.submitResult(req);
}






import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { MemoryTrainingController } from '@/api/memory-training/memory-training.controller';

/**
 * GET /api/memory-training/progress - 获取用户所有关卡进度
 */
export async function GET(req: NextRequest) {
  const controller = Container.resolve<MemoryTrainingController>(MemoryTrainingController);
  return controller.getProgress(req);
}






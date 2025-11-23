import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { MemoryTrainingController } from '@/api/memory-training/memory-training.controller';

/**
 * GET /api/memory-training/levels/:level_id - 获取关卡详情
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { level_id: string } }
) {
  const controller = Container.resolve<MemoryTrainingController>(MemoryTrainingController);
  return controller.getLevel(req, { levelId: params.level_id });
}






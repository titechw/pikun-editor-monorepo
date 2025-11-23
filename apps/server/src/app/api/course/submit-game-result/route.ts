import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { CourseController } from '@/api/course/course.controller';

/**
 * POST /api/course/submit-game-result - 提交游戏结果（游戏端调用）
 */
export async function POST(req: NextRequest) {
  const controller = Container.resolve<CourseController>(CourseController);
  return controller.submitGameResult(req);
}






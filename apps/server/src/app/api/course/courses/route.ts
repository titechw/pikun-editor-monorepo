import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { CourseController } from '@/api/course/course.controller';

/**
 * GET /api/course/courses - 获取已发布的课程列表（C端）
 */
export async function GET(req: NextRequest) {
  const controller = Container.resolve<CourseController>(CourseController);
  return controller.getCoursesPublic(req);
}


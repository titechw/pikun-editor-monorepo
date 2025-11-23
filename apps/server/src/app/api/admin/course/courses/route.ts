import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { CourseController } from '@/api/course/course.controller';

/**
 * GET /api/admin/course/courses - 获取课程列表
 * POST /api/admin/course/courses - 创建课程
 */
export async function GET(req: NextRequest) {
  const controller = Container.resolve<CourseController>(CourseController);
  return controller.getCourses(req);
}

export async function POST(req: NextRequest) {
  const controller = Container.resolve<CourseController>(CourseController);
  return controller.createCourse(req);
}






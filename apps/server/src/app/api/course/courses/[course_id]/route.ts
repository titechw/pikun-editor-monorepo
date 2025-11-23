import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { CourseController } from '@/api/course/course.controller';

/**
 * GET /api/course/courses/:course_id - 获取课程详情（C端）
 */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ course_id: string }> | { course_id: string } }
) {
  const params = await Promise.resolve(context.params);
  const controller = Container.resolve<CourseController>(CourseController);
  return controller.getCoursePublic(req, { courseId: params.course_id });
}


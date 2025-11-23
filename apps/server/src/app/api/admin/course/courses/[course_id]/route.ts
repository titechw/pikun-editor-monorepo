import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { CourseController } from '@/api/course/course.controller';

/**
 * GET /api/admin/course/courses/:course_id - 获取课程详情
 * PUT /api/admin/course/courses/:course_id - 更新课程
 * DELETE /api/admin/course/courses/:course_id - 删除课程
 */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ course_id: string }> | { course_id: string } }
) {
  const params = await Promise.resolve(context.params);
  const controller = Container.resolve<CourseController>(CourseController);
  return controller.getCourse(req, { courseId: params.course_id });
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ course_id: string }> | { course_id: string } }
) {
  const params = await Promise.resolve(context.params);
  const controller = Container.resolve<CourseController>(CourseController);
  return controller.updateCourse(req, { courseId: params.course_id });
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ course_id: string }> | { course_id: string } }
) {
  const params = await Promise.resolve(context.params);
  const controller = Container.resolve<CourseController>(CourseController);
  return controller.deleteCourse(req, { courseId: params.course_id });
}


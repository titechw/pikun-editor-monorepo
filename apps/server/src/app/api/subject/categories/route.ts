import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { SubjectController } from '@/api/subject/subject.controller';

/**
 * GET /api/subject/categories - 获取学科分类列表（C端）
 */
export async function GET(req: NextRequest) {
  const controller = Container.resolve<SubjectController>(SubjectController);
  return controller.getCategories(req);
}


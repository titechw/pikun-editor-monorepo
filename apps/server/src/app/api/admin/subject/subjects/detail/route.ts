import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { SubjectController } from '@/api/subject/subject.controller';
import { withAdminAuth } from '@/utils/admin-auth';

/**
 * POST /api/admin/subject/subjects/detail - 创建或更新学科详情信息（管理员）
 */
export const POST = withAdminAuth(async (req: NextRequest) => {
  const controller = Container.resolve<SubjectController>(SubjectController);
  return controller.upsertSubjectDetail(req);
});


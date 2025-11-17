import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { SubjectController } from '@/api/subject/subject.controller';
import { withAdminAuth } from '@/utils/admin-auth';

/**
 * GET /api/admin/subject/subjects/[subject_id]/detail - 获取学科详情信息（管理员）
 */
export const GET = withAdminAuth(async (req: NextRequest, { params }: { params: { subject_id: string } }) => {
  const controller = Container.resolve<SubjectController>(SubjectController);
  return controller.getSubjectDetail(req, params.subject_id);
});


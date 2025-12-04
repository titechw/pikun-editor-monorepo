import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { SubjectController } from '@/api/subject/subject.controller';
import { withAdminAuthAndParams } from '@/utils/admin-auth';

/**
 * GET /api/admin/subject/subjects/[subject_id]/dependencies - 获取学科的依赖关系（管理员）
 */
export const GET = withAdminAuthAndParams<{ subject_id: string }>(
  async (req, _user, params) => {
    const controller = Container.resolve<SubjectController>(SubjectController);
    return controller.getSubjectDependencies(req, params.subject_id);
  }
);



import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { SubjectController } from '@/api/subject/subject.controller';
import { withAdminAuthAndParams } from '@/utils/admin-auth';

/**
 * DELETE /api/admin/subject/dependencies/[dependency_id] - 删除学科依赖关系（管理员）
 */
export const DELETE = withAdminAuthAndParams<{ dependency_id: string }>(
  async (req, _user, params) => {
    const controller = Container.resolve<SubjectController>(SubjectController);
    return controller.deleteDependency(req, params.dependency_id);
  }
);



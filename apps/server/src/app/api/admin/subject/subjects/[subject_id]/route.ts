import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { SubjectController } from '@/api/subject/subject.controller';
import { withAdminAuthAndParams } from '@/utils/admin-auth';

/**
 * GET /api/admin/subject/subjects/[subject_id] - 获取学科详情（管理员）
 * PUT /api/admin/subject/subjects/[subject_id] - 更新学科（管理员）
 * DELETE /api/admin/subject/subjects/[subject_id] - 删除学科（管理员）
 */
export const GET = withAdminAuthAndParams<{ subject_id: string }>(async (req, _user, params) => {
  const controller = Container.resolve<SubjectController>(SubjectController);
  return controller.getSubjectById(req, params.subject_id);
});

export const PUT = withAdminAuthAndParams<{ subject_id: string }>(async (req, _user, params) => {
  const controller = Container.resolve<SubjectController>(SubjectController);
  return controller.updateSubject(req, params.subject_id);
});

export const DELETE = withAdminAuthAndParams<{ subject_id: string }>(async (req, _user, params) => {
  const controller = Container.resolve<SubjectController>(SubjectController);
  return controller.deleteSubject(req, params.subject_id);
});


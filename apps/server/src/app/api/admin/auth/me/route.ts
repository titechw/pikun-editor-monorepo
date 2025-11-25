import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { AuthController } from '@/api/auth/auth.controller';
import { withAdminAuth } from '@/utils/admin-auth';

/**
 * GET /api/admin/auth/me - 获取当前管理员信息
 */
export const GET = withAdminAuth(async (req: NextRequest) => {
  const controller = Container.resolve<AuthController>(AuthController);
  return controller.getMe(req);
});


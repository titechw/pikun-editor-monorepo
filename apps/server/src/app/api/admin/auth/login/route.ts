import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { AuthController } from '@/api/auth/auth.controller';

/**
 * POST /api/admin/auth/login - 管理员登录
 */
export async function POST(req: NextRequest) {
  const controller = Container.resolve<AuthController>(AuthController);
  return controller.adminLogin(req);
}










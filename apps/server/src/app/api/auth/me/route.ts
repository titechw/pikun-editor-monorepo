import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { AuthController } from '@/api/auth/auth.controller';

/**
 * GET /api/auth/me - 获取当前用户信息
 */
export async function GET(req: NextRequest) {
  const controller = Container.resolve<AuthController>(AuthController);
  return controller.getMe(req);
}


import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { AuthController } from '@/api/auth/auth.controller';

/**
 * POST /api/auth/refresh - 刷新 token
 */
export async function POST(req: NextRequest) {
  const controller = Container.resolve<AuthController>(AuthController);
  return controller.refreshToken(req);
}


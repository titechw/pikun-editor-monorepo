import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { AuthController } from '@/api/auth/auth.controller';

/**
 * GET /api/auth/verify - 验证 token
 */
export async function GET(req: NextRequest) {
  const controller = Container.resolve<AuthController>(AuthController);
  return controller.verifyToken(req);
}


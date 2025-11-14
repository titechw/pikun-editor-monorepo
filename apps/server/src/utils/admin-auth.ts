import { NextRequest, NextResponse } from 'next/server';
import { Container } from '@/core/container';
import { AuthService } from '@/services/auth.service';

/**
 * 管理端权限检查中间件
 * 包装 API 路由处理函数，自动检查管理员权限
 */
export function withAdminAuth(
  handler: (req: NextRequest, user: { uid: number; uuid: string; type: 'admin' }) => Promise<NextResponse>
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    try {
      const authService = Container.resolve<AuthService>(AuthService);
      const user = await authService.checkAdminRole(req);
      
      return handler(req, {
        uid: user.uid,
        uuid: user.uuid,
        type: user.type,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Unauthorized',
        },
        { status: 401 }
      );
    }
  };
}


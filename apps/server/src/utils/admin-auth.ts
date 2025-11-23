import { NextRequest, NextResponse } from 'next/server';
import { Container } from '@/core/container';
import { AuthService } from '@/services/auth.service';

/**
 * 从请求中获取当前管理员ID（验证管理员权限）
 */
export async function getCurrentAdminId(req: NextRequest): Promise<number> {
  try {
    const authService = Container.resolve<AuthService>(AuthService);
    const user = await authService.checkAdminRole(req);
    return user.uid;
  } catch (error: any) {
    throw new Error(error.message || 'Unauthorized: Admin access required');
  }
}

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
      
      if (user.type !== 'admin') {
        return NextResponse.json(
          {
            success: false,
            message: 'Unauthorized: Admin access required',
          },
          { status: 403 }
        );
      }
      
      return handler(req, {
        uid: user.uid,
        uuid: user.uuid,
        type: 'admin' as const,
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

/**
 * 管理端权限检查中间件（支持动态路由参数）
 * 包装 API 路由处理函数，自动检查管理员权限，并传递路由参数
 */
export function withAdminAuthAndParams<T extends Record<string, string>>(
  handler: (
    req: NextRequest,
    user: { uid: number; uuid: string; type: 'admin' },
    params: T
  ) => Promise<NextResponse>
) {
  return async (
    req: NextRequest,
    context: { params: Promise<T> | T }
  ): Promise<NextResponse> => {
    try {
      const authService = Container.resolve<AuthService>(AuthService);
      const user = await authService.checkAdminRole(req);
      const params = await Promise.resolve(context.params);
      
      if (user.type !== 'admin') {
        return NextResponse.json(
          {
            success: false,
            message: 'Unauthorized: Admin access required',
          },
          { status: 403 }
        );
      }
      
      return handler(req, {
        uid: user.uid,
        uuid: user.uuid,
        type: 'admin' as const,
      }, params);
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


import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { injectable, inject } from 'tsyringe';
import { AuthService } from '@/services/auth.service';

/**
 * 认证控制器
 */
@injectable()
export class AuthController {
  constructor(@inject(AuthService) private authService: AuthService) {}

  /**
   * 用户注册
   */
  async register(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json();
      const registerSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string().min(1),
      });

      const validatedData = registerSchema.parse(body);
      const result = await this.authService.register(validatedData);

      return NextResponse.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      // 处理 Zod 验证错误
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            message: 'Validation error',
            errors: error.errors,
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Registration failed',
        },
        { status: 400 }
      );
    }
  }

  /**
   * 用户登录
   */
  async login(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json();
      const loginSchema = z.object({
        email: z.string().email(),
        password: z.string().min(1),
      });

      const validatedData = loginSchema.parse(body);
      const result = await this.authService.login(validatedData.email, validatedData.password);

      return NextResponse.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      // 处理 Zod 验证错误
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            message: 'Validation error',
            errors: error.errors,
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Login failed',
        },
        { status: 401 }
      );
    }
  }

  /**
   * 管理员登录（仅允许 role 为 'admin' 的用户登录）
   */
  async adminLogin(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json();
      const loginSchema = z.object({
        email: z.string().email(),
        password: z.string().min(1),
      });

      const validatedData = loginSchema.parse(body);
      const result = await this.authService.adminLogin(validatedData.email, validatedData.password);

      return NextResponse.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      // 处理 Zod 验证错误
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            message: 'Validation error',
            errors: error.errors,
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Admin login failed',
        },
        { status: 401 }
      );
    }
  }

  /**
   * 刷新 token
   */
  async refreshToken(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json();
      const refreshSchema = z.object({
        refreshToken: z.string(),
      });

      const validatedData = refreshSchema.parse(body);
      const result = await this.authService.refreshToken(validatedData.refreshToken);

      return NextResponse.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      // 处理 Zod 验证错误
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            message: 'Validation error',
            errors: error.errors,
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Token refresh failed',
        },
        { status: 401 }
      );
    }
  }

  /**
   * 验证 token
   */
  async verifyToken(req: NextRequest): Promise<NextResponse> {
    try {
      const authHeader = req.headers.get('authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          {
            success: false,
            message: 'No token provided',
          },
          { status: 401 }
        );
      }

      const token = authHeader.substring(7);
      const decoded = await this.authService.verifyToken(token);

      return NextResponse.json({
        success: true,
        data: {
          is_new: false, // 可以根据需要实现
          uid: decoded.uid,
          uuid: decoded.uuid,
        },
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Token verification failed',
        },
        { status: 401 }
      );
    }
  }

  /**
   * 获取当前用户信息
   */
  async getMe(req: NextRequest): Promise<NextResponse> {
    try {
      const user = await this.authService.getCurrentUserWithType(req);
      // 移除敏感信息
      const { password, ...userWithoutPassword } = user;
      return NextResponse.json({
        success: true,
        data: userWithoutPassword,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get user info',
        },
        { status: 401 }
      );
    }
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { injectable, inject } from 'tsyringe';
import { CourseService } from '@/services/course.service';
import { getCurrentUserId } from '@/utils/auth';
import { getCurrentAdminId } from '@/utils/admin-auth';

/**
 * 课程控制器
 */
@injectable()
export class CourseController {
  constructor(@inject(CourseService) private courseService: CourseService) {}

  /**
   * 获取已发布的课程列表（C端）
   */
  async getCoursesPublic(req: NextRequest): Promise<NextResponse> {
    try {
      const { searchParams } = new URL(req.url);
      const current = parseInt(searchParams.get('current') || '1', 10);
      const pageSize = parseInt(searchParams.get('pageSize') || '20', 10);
      const keyword = searchParams.get('keyword') || undefined;
      const courseType = searchParams.get('courseType') || undefined;

      const result = await this.courseService.getCourses({
        current,
        pageSize,
        keyword,
        courseType,
        courseSource: undefined, // C端不筛选来源
      });

      // 只返回已发布的课程
      const publishedCourses = result.courses.filter((course) => course.is_published);

      return NextResponse.json({
        success: true,
        data: {
          courses: publishedCourses,
          total: publishedCourses.length,
        },
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || '获取课程列表失败',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 获取课程列表（管理端）
   */
  async getCourses(req: NextRequest): Promise<NextResponse> {
    try {
      await getCurrentAdminId(req); // 验证管理员权限

      const { searchParams } = new URL(req.url);
      const current = parseInt(searchParams.get('current') || '1', 10);
      const pageSize = parseInt(searchParams.get('pageSize') || '20', 10);
      const keyword = searchParams.get('keyword') || undefined;
      const courseType = searchParams.get('courseType') || undefined;
      const courseSource = searchParams.get('courseSource') || undefined;

      const result = await this.courseService.getCourses({
        current,
        pageSize,
        keyword,
        courseType,
        courseSource,
      });

      return NextResponse.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || '获取课程列表失败',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 获取课程详情（C端，只返回已发布的）
   */
  async getCoursePublic(
    req: NextRequest,
    { courseId }: { courseId: string }
  ): Promise<NextResponse> {
    try {
      const course = await this.courseService.getCourse(courseId);
      if (!course || !course.is_published) {
        return NextResponse.json(
          {
            success: false,
            message: '课程不存在或未发布',
          },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: course,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || '获取课程详情失败',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 获取课程详情（管理端）
   */
  async getCourse(req: NextRequest, { courseId }: { courseId: string }): Promise<NextResponse> {
    try {
      await getCurrentAdminId(req); // 验证管理员权限

      const course = await this.courseService.getCourse(courseId);
      if (!course) {
        return NextResponse.json(
          {
            success: false,
            message: '课程不存在',
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: course,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || '获取课程详情失败',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 创建课程（管理端）
   */
  async createCourse(req: NextRequest): Promise<NextResponse> {
    try {
      await getCurrentAdminId(req); // 验证管理员权限

      const body = await req.json();
      const schema = z.object({
        code: z.string().min(1),
        name: z.string().min(1),
        description: z.string().optional().nullable(),
        cover_image_url: z.string().url().optional().nullable(),
        course_type: z.enum(['ability_training', 'skill_knowledge', 'learning', 'training', 'mixed']),
        difficulty_level: z.number().min(1).max(10).optional(),
        estimated_duration: z.number().optional().nullable(),
        sort_order: z.number().optional(),
        is_published: z.boolean().optional(),
        course_url: z.string().url().optional().nullable(),
        course_source: z.enum(['official', 'third_party']).optional(),
        author_name: z.string().optional().nullable(),
        secret_id: z.string().min(1).optional().nullable(), // 允许手动设置 secretId（私钥），如果没有则自动生成
        primary_item_id: z.string().uuid().optional().nullable(),
        metadata: z.record(z.any()).optional(),
      });

      const validatedData = schema.parse(body);
      const course = await this.courseService.createCourse(validatedData);

      return NextResponse.json({
        success: true,
        data: course,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            message: '参数验证失败',
            errors: error.errors,
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          message: error.message || '创建课程失败',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 更新课程（管理端）
   */
  async updateCourse(
    req: NextRequest,
    { courseId }: { courseId: string }
  ): Promise<NextResponse> {
    try {
      await getCurrentAdminId(req); // 验证管理员权限

      const body = await req.json();
      const schema = z.object({
        name: z.string().min(1).optional(),
        description: z.string().optional().nullable(),
        cover_image_url: z.string().url().optional().nullable(),
        course_type: z.enum(['ability_training', 'skill_knowledge', 'learning', 'training', 'mixed']).optional(),
        difficulty_level: z.number().min(1).max(10).optional(),
        estimated_duration: z.number().optional().nullable(),
        sort_order: z.number().optional(),
        is_published: z.boolean().optional(),
        course_url: z.string().url().optional().nullable(),
        course_source: z.enum(['official', 'third_party']).optional(),
        author_name: z.string().optional().nullable(),
        secret_id: z.string().min(1).optional().nullable(), // 允许更新 secretId（私钥）
        primary_item_id: z.string().uuid().optional().nullable(),
        metadata: z.record(z.any()).optional(),
      });

      const validatedData = schema.parse(body);
      const course = await this.courseService.updateCourse(courseId, validatedData);

      return NextResponse.json({
        success: true,
        data: course,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            message: '参数验证失败',
            errors: error.errors,
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          message: error.message || '更新课程失败',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 删除课程（管理端）
   */
  async deleteCourse(req: NextRequest, { courseId }: { courseId: string }): Promise<NextResponse> {
    try {
      await getCurrentAdminId(req); // 验证管理员权限

      await this.courseService.deleteCourse(courseId);

      return NextResponse.json({
        success: true,
        message: '删除成功',
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || '删除课程失败',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 提交游戏结果（游戏端调用，通过 secretId 验证）
   */
  async submitGameResult(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json();
      const schema = z.object({
        secretId: z.string().min(1),
        courseId: z.string().uuid(),
        resultData: z.object({
          correct: z.boolean(),
          correctRate: z.number().min(0).max(1),
          score: z.number().min(0),
          timeSpent: z.number().min(0),
          userAnswer: z.any(),
        }),
      });

      const validatedData = schema.parse(body);

      // 从请求头获取用户 token
      // 游戏在 iframe 中时，会通过 Authorization header 传递 token
      let uid: number;
      try {
        uid = await getCurrentUserId(req);
      } catch (error) {
        // 如果无法获取用户 ID，尝试从请求体或其他方式获取
        // 这里可以根据实际需求调整
        throw new Error('无法获取用户信息，请先登录');
      }

      const result = await this.courseService.submitGameResult(
        validatedData.secretId,
        validatedData.courseId,
        uid,
        validatedData.resultData
      );

      return NextResponse.json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            message: '参数验证失败',
            errors: error.errors,
          },
          { status: 400 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          message: error.message || '提交结果失败',
        },
        { status: 500 }
      );
    }
  }
}


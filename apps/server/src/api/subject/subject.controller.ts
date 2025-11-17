import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { injectable, inject } from 'tsyringe';
import { SubjectService } from '@/services/subject.service';

/**
 * 学科控制器
 */
@injectable()
export class SubjectController {
  constructor(@inject(SubjectService) private subjectService: SubjectService) {}

  /**
   * 获取学科分类树形结构
   */
  async getCategoryTree(req: NextRequest): Promise<NextResponse> {
    try {
      const tree = await this.subjectService.getCategoryTree();
      return NextResponse.json({
        success: true,
        data: tree,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get category tree',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 获取学科分类列表
   */
  async getCategories(req: NextRequest): Promise<NextResponse> {
    try {
      const { searchParams } = new URL(req.url);
      const parentId = searchParams.get('parent_id');
      const current = parseInt(searchParams.get('current') || '1', 10);
      const pageSize = parseInt(searchParams.get('pageSize') || '20', 10);
      const keyword = searchParams.get('keyword') || undefined;

      let result;
      // 如果 parentId 是 'null' 字符串或 null，查询顶级分类（支持分页和搜索）
      if (parentId === 'null' || parentId === null) {
        result = await this.subjectService.getCategoriesByParentId(null, { current, pageSize, keyword });
      } else if (parentId) {
        // 如果 parentId 有值，查询指定父分类的子分类（支持分页和搜索）
        result = await this.subjectService.getCategoriesByParentId(parentId, { current, pageSize, keyword });
      } else {
        // 如果没有传递 parentId，查询所有分类（不分页，用于下拉选择等场景）
        const categories = await this.subjectService.getCategories();
        return NextResponse.json({
          success: true,
          data: categories,
          pagination: {
            current: 1,
            pageSize: categories.length,
            total: categories.length,
          },
        });
      }

      return NextResponse.json({
        success: true,
        data: result.categories,
        pagination: {
          current,
          pageSize,
          total: result.total,
        },
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get categories',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 获取分类的直接子分类（用于树懒加载）
   */
  async getCategoryChildren(req: NextRequest): Promise<NextResponse> {
    try {
      const { searchParams } = new URL(req.url);
      const parentId = searchParams.get('parent_id');
      const children = await this.subjectService.getCategoryChildren(parentId === 'null' ? null : parentId);
      return NextResponse.json({
        success: true,
        data: children,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get category children',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 获取学科分类详情
   */
  async getCategoryById(req: NextRequest, categoryId: string): Promise<NextResponse> {
    try {
      const category = await this.subjectService.getCategoryById(categoryId);
      if (!category) {
        return NextResponse.json(
          {
            success: false,
            message: 'Category not found',
          },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: category,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get category',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 创建学科分类
   */
  async createCategory(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json();
      const schema = z.object({
        parent_id: z.string().nullable().optional(),
        code: z.string().min(1),
        name: z.string().min(1),
        description: z.string().optional(),
        icon_url: z.string().optional(),
        sort_order: z.number().optional(),
        metadata: z.record(z.any()).optional(),
      });

      const validatedData = schema.parse(body);
      const category = await this.subjectService.createCategory(validatedData);

      return NextResponse.json({
        success: true,
        data: category,
      });
    } catch (error: any) {
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
          message: error.message || 'Failed to create category',
        },
        { status: 400 }
      );
    }
  }

  /**
   * 更新学科分类
   */
  async updateCategory(req: NextRequest, categoryId: string): Promise<NextResponse> {
    try {
      const body = await req.json();
      const schema = z.object({
        parent_id: z.string().nullable().optional(),
        code: z.string().optional(),
        name: z.string().optional(),
        description: z.string().optional(),
        icon_url: z.string().optional(),
        sort_order: z.number().optional(),
        metadata: z.record(z.any()).optional(),
      });

      const validatedData = schema.parse(body);
      const category = await this.subjectService.updateCategory(categoryId, validatedData);

      return NextResponse.json({
        success: true,
        data: category,
      });
    } catch (error: any) {
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
          message: error.message || 'Failed to update category',
        },
        { status: 400 }
      );
    }
  }

  /**
   * 删除学科分类
   */
  async deleteCategory(req: NextRequest, categoryId: string): Promise<NextResponse> {
    try {
      await this.subjectService.deleteCategory(categoryId);
      return NextResponse.json({
        success: true,
        message: 'Category deleted successfully',
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to delete category',
        },
        { status: 400 }
      );
    }
  }

  /**
   * 获取学科列表
   */
  async getSubjects(req: NextRequest): Promise<NextResponse> {
    try {
      const { searchParams } = new URL(req.url);
      const categoryId = searchParams.get('category_id');
      const current = parseInt(searchParams.get('current') || '1', 10);
      const pageSize = parseInt(searchParams.get('pageSize') || '20', 10);
      const keyword = searchParams.get('keyword') || undefined;

      let result;
      if (categoryId) {
        result = await this.subjectService.getSubjectsByCategoryId(categoryId, { current, pageSize, keyword });
      } else {
        // 如果没有 categoryId，查询所有学科（支持分页和搜索）
        result = await this.subjectService.getSubjectsByCategoryId(null, { current, pageSize, keyword });
      }

      return NextResponse.json({
        success: true,
        data: result.subjects,
        pagination: {
          current,
          pageSize,
          total: result.total,
        },
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get subjects',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 获取学科详情
   */
  async getSubjectById(req: NextRequest, subjectId: string): Promise<NextResponse> {
    try {
      const subject = await this.subjectService.getSubjectById(subjectId);
      if (!subject) {
        return NextResponse.json(
          {
            success: false,
            message: 'Subject not found',
          },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: subject,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get subject',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 创建学科
   */
  async createSubject(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json();
      const schema = z.object({
        category_id: z.string().min(1),
        code: z.string().min(1),
        name: z.string().min(1),
        short_name: z.string().optional(),
        icon_url: z.string().optional(),
        cover_image_url: z.string().optional(),
        sort_order: z.number().optional(),
        is_published: z.boolean().optional(),
        metadata: z.record(z.any()).optional(),
      });

      const validatedData = schema.parse(body);
      const subject = await this.subjectService.createSubject(validatedData);

      return NextResponse.json({
        success: true,
        data: subject,
      });
    } catch (error: any) {
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
          message: error.message || 'Failed to create subject',
        },
        { status: 400 }
      );
    }
  }

  /**
   * 更新学科
   */
  async updateSubject(req: NextRequest, subjectId: string): Promise<NextResponse> {
    try {
      const body = await req.json();
      const schema = z.object({
        category_id: z.string().optional(),
        code: z.string().optional(),
        name: z.string().optional(),
        short_name: z.string().optional(),
        icon_url: z.string().optional(),
        cover_image_url: z.string().optional(),
        sort_order: z.number().optional(),
        is_published: z.boolean().optional(),
        metadata: z.record(z.any()).optional(),
      });

      const validatedData = schema.parse(body);
      const subject = await this.subjectService.updateSubject(subjectId, validatedData);

      return NextResponse.json({
        success: true,
        data: subject,
      });
    } catch (error: any) {
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
          message: error.message || 'Failed to update subject',
        },
        { status: 400 }
      );
    }
  }

  /**
   * 删除学科
   */
  async deleteSubject(req: NextRequest, subjectId: string): Promise<NextResponse> {
    try {
      await this.subjectService.deleteSubject(subjectId);
      return NextResponse.json({
        success: true,
        message: 'Subject deleted successfully',
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to delete subject',
        },
        { status: 400 }
      );
    }
  }

  /**
   * 获取学科详情信息
   */
  async getSubjectDetail(req: NextRequest, subjectId: string): Promise<NextResponse> {
    try {
      const detail = await this.subjectService.getSubjectDetail(subjectId);
      return NextResponse.json({
        success: true,
        data: detail,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get subject detail',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 创建或更新学科详情
   */
  async upsertSubjectDetail(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json();
      const schema = z.object({
        subject_id: z.string().min(1),
        definition: z.string().optional(),
        description: z.string().optional(),
        purpose: z.string().optional(),
        value: z.string().optional(),
        application_scenarios: z.string().optional(),
        learning_objectives: z.string().optional(),
        prerequisites: z.string().optional(),
        related_subjects: z.array(z.string()).optional(),
        metadata: z.record(z.any()).optional(),
      });

      const validatedData = schema.parse(body);
      const detail = await this.subjectService.upsertSubjectDetail(validatedData);

      return NextResponse.json({
        success: true,
        data: detail,
      });
    } catch (error: any) {
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
          message: error.message || 'Failed to upsert subject detail',
        },
        { status: 400 }
      );
    }
  }
}


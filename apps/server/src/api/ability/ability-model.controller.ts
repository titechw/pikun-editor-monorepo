import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { injectable, inject } from 'tsyringe';
import { AbilityModelService } from '@/services/ability-model.service';

/**
 * 能力模型控制器
 */
@injectable()
export class AbilityModelController {
  constructor(@inject(AbilityModelService) private abilityModelService: AbilityModelService) {}

  /**
   * 获取能力模型树形结构
   */
  async getModelTree(req: NextRequest): Promise<NextResponse> {
    try {
      const tree = await this.abilityModelService.getModelTree();
      return NextResponse.json({
        success: true,
        data: tree,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get model tree',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 获取能力类别列表
   */
  async getCategories(req: NextRequest): Promise<NextResponse> {
    try {
      const categories = await this.abilityModelService.getCategories();
      return NextResponse.json({
        success: true,
        data: categories,
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
   * 获取能力类别详情
   */
  async getCategoryById(req: NextRequest, categoryId: string): Promise<NextResponse> {
    try {
      const category = await this.abilityModelService.getCategoryById(categoryId);
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
   * 创建能力类别
   */
  async createCategory(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json();
      const schema = z.object({
        code: z.string().min(1),
        name: z.string().min(1),
        description: z.string().optional(),
        sort_order: z.number().optional(),
        metadata: z.record(z.any()).optional(),
      });

      const validatedData = schema.parse(body);
      const category = await this.abilityModelService.createCategory(validatedData);

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
   * 更新能力类别
   */
  async updateCategory(req: NextRequest, categoryId: string): Promise<NextResponse> {
    try {
      const body = await req.json();
      const schema = z.object({
        code: z.string().min(1).optional(),
        name: z.string().min(1).optional(),
        description: z.string().optional(),
        sort_order: z.number().optional(),
        metadata: z.record(z.any()).optional(),
      });

      const validatedData = schema.parse(body);
      const category = await this.abilityModelService.updateCategory(categoryId, validatedData);

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
   * 删除能力类别
   */
  async deleteCategory(req: NextRequest, categoryId: string): Promise<NextResponse> {
    try {
      await this.abilityModelService.deleteCategory(categoryId);
      return NextResponse.json({
        success: true,
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
   * 获取能力维度列表
   */
  async getDimensions(req: NextRequest): Promise<NextResponse> {
    try {
      const categoryId = req.nextUrl.searchParams.get('categoryId') || undefined;
      const dimensions = await this.abilityModelService.getDimensions(categoryId);
      return NextResponse.json({
        success: true,
        data: dimensions,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get dimensions',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 获取能力维度详情
   */
  async getDimensionById(req: NextRequest, dimensionId: string): Promise<NextResponse> {
    try {
      const dimension = await this.abilityModelService.getDimensionById(dimensionId);
      if (!dimension) {
        return NextResponse.json(
          {
            success: false,
            message: 'Dimension not found',
          },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: dimension,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get dimension',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 创建能力维度
   */
  async createDimension(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json();
      const schema = z.object({
        category_id: z.string().uuid(),
        code: z.string().min(1),
        name: z.string().min(1),
        description: z.string().optional(),
        sort_order: z.number().optional(),
        metadata: z.record(z.any()).optional(),
      });

      const validatedData = schema.parse(body);
      const dimension = await this.abilityModelService.createDimension(validatedData);

      return NextResponse.json({
        success: true,
        data: dimension,
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
          message: error.message || 'Failed to create dimension',
        },
        { status: 400 }
      );
    }
  }

  /**
   * 更新能力维度
   */
  async updateDimension(req: NextRequest, dimensionId: string): Promise<NextResponse> {
    try {
      const body = await req.json();
      const schema = z.object({
        code: z.string().min(1).optional(),
        name: z.string().min(1).optional(),
        description: z.string().optional(),
        sort_order: z.number().optional(),
        metadata: z.record(z.any()).optional(),
      });

      const validatedData = schema.parse(body);
      const dimension = await this.abilityModelService.updateDimension(dimensionId, validatedData);

      return NextResponse.json({
        success: true,
        data: dimension,
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
          message: error.message || 'Failed to update dimension',
        },
        { status: 400 }
      );
    }
  }

  /**
   * 删除能力维度
   */
  async deleteDimension(req: NextRequest, dimensionId: string): Promise<NextResponse> {
    try {
      await this.abilityModelService.deleteDimension(dimensionId);
      return NextResponse.json({
        success: true,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to delete dimension',
        },
        { status: 400 }
      );
    }
  }

  /**
   * 获取能力项列表
   */
  async getItems(req: NextRequest): Promise<NextResponse> {
    try {
      const dimensionId = req.nextUrl.searchParams.get('dimensionId') || undefined;
      const items = await this.abilityModelService.getItems(dimensionId);
      return NextResponse.json({
        success: true,
        data: items,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get items',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 获取能力项详情
   */
  async getItemById(req: NextRequest, itemId: string): Promise<NextResponse> {
    try {
      const item = await this.abilityModelService.getItemById(itemId);
      if (!item) {
        return NextResponse.json(
          {
            success: false,
            message: 'Item not found',
          },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: item,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get item',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 创建能力项
   */
  async createItem(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json();
      const schema = z.object({
        dimension_id: z.string().uuid(),
        code: z.string().min(1),
        name: z.string().min(1),
        description: z.string().optional(),
        definition: z.string().optional(),
        performance_description: z.string().optional(),
        evaluation_points: z.string().optional(),
        training_strategies: z.string().optional(),
        theoretical_basis: z.string().optional(),
        talent_ratio: z.number().min(0).max(100).optional(),
        acquired_training_ratio: z.number().min(0).max(100).optional(),
        sort_order: z.number().optional(),
        metadata: z.record(z.any()).optional(),
      });

      const validatedData = schema.parse(body);
      const item = await this.abilityModelService.createItem(validatedData);

      return NextResponse.json({
        success: true,
        data: item,
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
          message: error.message || 'Failed to create item',
        },
        { status: 400 }
      );
    }
  }

  /**
   * 更新能力项
   */
  async updateItem(req: NextRequest, itemId: string): Promise<NextResponse> {
    try {
      const body = await req.json();
      const schema = z.object({
        code: z.string().min(1).optional(),
        name: z.string().min(1).optional(),
        description: z.string().optional(),
        definition: z.string().optional(),
        performance_description: z.string().optional(),
        evaluation_points: z.string().optional(),
        training_strategies: z.string().optional(),
        theoretical_basis: z.string().optional(),
        talent_ratio: z.number().min(0).max(100).optional(),
        acquired_training_ratio: z.number().min(0).max(100).optional(),
        sort_order: z.number().optional(),
        metadata: z.record(z.any()).optional(),
      });

      const validatedData = schema.parse(body);
      const item = await this.abilityModelService.updateItem(itemId, validatedData);

      return NextResponse.json({
        success: true,
        data: item,
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
          message: error.message || 'Failed to update item',
        },
        { status: 400 }
      );
    }
  }

  /**
   * 删除能力项
   */
  async deleteItem(req: NextRequest, itemId: string): Promise<NextResponse> {
    try {
      await this.abilityModelService.deleteItem(itemId);
      return NextResponse.json({
        success: true,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to delete item',
        },
        { status: 400 }
      );
    }
  }
}


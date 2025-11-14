import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { injectable, inject } from 'tsyringe';
import { AbilityLevelConfigService } from '@/services/ability-level-config.service';

/**
 * 能力项等级配置控制器
 */
@injectable()
export class AbilityLevelConfigController {
  constructor(
    @inject(AbilityLevelConfigService) private levelConfigService: AbilityLevelConfigService
  ) {}

  /**
   * 获取等级配置列表
   */
  async getConfigs(req: NextRequest): Promise<NextResponse> {
    try {
      const itemId = req.nextUrl.searchParams.get('itemId') || undefined;
      const configs = await this.levelConfigService.getConfigs(itemId);
      return NextResponse.json({
        success: true,
        data: configs,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get configs',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 获取等级配置详情
   */
  async getConfigById(req: NextRequest, configId: string): Promise<NextResponse> {
    try {
      const config = await this.levelConfigService.getConfigById(configId);
      if (!config) {
        return NextResponse.json(
          {
            success: false,
            message: 'Config not found',
          },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: config,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get config',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 获取全局模板配置
   */
  async getTemplate(req: NextRequest): Promise<NextResponse> {
    try {
      const template = await this.levelConfigService.getTemplate();
      return NextResponse.json({
        success: true,
        data: template,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get template',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 创建等级配置
   */
  async createConfig(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json();
      const schema = z.object({
        item_id: z.string().uuid().nullable().optional(),
        level: z.number().int().min(1),
        required_exp: z.number().int().min(0),
        requires_assessment: z.boolean().optional(),
        level_name: z.string().optional(),
        level_description: z.string().optional(),
        is_template: z.boolean().optional(),
        sort_order: z.number().optional(),
        metadata: z.record(z.any()).optional(),
      });

      const validatedData = schema.parse(body);
      const config = await this.levelConfigService.createConfig(validatedData);

      return NextResponse.json({
        success: true,
        data: config,
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
          message: error.message || 'Failed to create config',
        },
        { status: 400 }
      );
    }
  }

  /**
   * 更新等级配置
   */
  async updateConfig(req: NextRequest, configId: string): Promise<NextResponse> {
    try {
      const body = await req.json();
      const schema = z.object({
        level: z.number().int().min(1).optional(),
        required_exp: z.number().int().min(0).optional(),
        requires_assessment: z.boolean().optional(),
        level_name: z.string().optional(),
        level_description: z.string().optional(),
        sort_order: z.number().optional(),
        metadata: z.record(z.any()).optional(),
      });

      const validatedData = schema.parse(body);
      const config = await this.levelConfigService.updateConfig(configId, validatedData);

      return NextResponse.json({
        success: true,
        data: config,
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
          message: error.message || 'Failed to update config',
        },
        { status: 400 }
      );
    }
  }

  /**
   * 删除等级配置
   */
  async deleteConfig(req: NextRequest, configId: string): Promise<NextResponse> {
    try {
      await this.levelConfigService.deleteConfig(configId);
      return NextResponse.json({
        success: true,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to delete config',
        },
        { status: 400 }
      );
    }
  }
}


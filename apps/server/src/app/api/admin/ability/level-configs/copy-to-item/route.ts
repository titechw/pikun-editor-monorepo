import { NextRequest } from 'next/server';
import { z } from 'zod';
import '@/core/init';
import { Container } from '@/core/container';
import { AbilityLevelConfigService } from '@/services/ability-level-config.service';

/**
 * POST /api/admin/ability/level-configs/copy-to-item - 将全局模板复制到指定能力项（管理员）
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const schema = z.object({
      item_id: z.string().uuid(),
    });

    const validatedData = schema.parse(body);

    const levelConfigService = Container.resolve<AbilityLevelConfigService>(
      AbilityLevelConfigService
    );
    const configs = await levelConfigService.copyTemplateToItem(validatedData.item_id);

    return Response.json({
      success: true,
      data: configs,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return Response.json(
        {
          success: false,
          message: 'Validation error',
          errors: error.errors,
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        success: false,
        message: error.message || 'Failed to copy template',
      },
      { status: 400 }
    );
  }
}










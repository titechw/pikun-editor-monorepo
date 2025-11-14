import { NextRequest } from 'next/server';
import { z } from 'zod';
import '@/core/init';
import { Container } from '@/core/container';
import { ExperienceService } from '@/services/experience.service';
import { UserAbilityService } from '@/services/user-ability.service';
import { getCurrentUserId } from '@/utils/auth';

/**
 * POST /api/ability/experience/level-up-by - 升级指定等级数（自动完成考试）
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const schema = z.object({
      item_id: z.string().uuid(),
      levels: z.number().int().min(1).max(100),
    });

    const validatedData = schema.parse(body);
    
    const uid = await getCurrentUserId(req);

    const experienceService = Container.resolve<ExperienceService>(ExperienceService);
    const result = await experienceService.levelUpBy(
      uid,
      validatedData.item_id,
      validatedData.levels
    );

    // 获取包含下一级信息的 userLevel
    const userAbilityService = Container.resolve<UserAbilityService>(UserAbilityService);
    const userLevelWithNextInfo = await userAbilityService.getUserLevelWithNextInfo(uid, validatedData.item_id);

    return Response.json({
      success: true,
      data: {
        ...result,
        userLevel: userLevelWithNextInfo || result.userLevel, // 如果获取失败，使用原始数据
      },
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
        message: error.message || 'Failed to level up',
      },
      { status: 400 }
    );
  }
}


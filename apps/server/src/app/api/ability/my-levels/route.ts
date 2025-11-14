import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { UserAbilityService } from '@/services/user-ability.service';
import { getCurrentUserId } from '@/utils/auth';

/**
 * GET /api/ability/my-levels - 获取我的能力等级列表
 */
export async function GET(req: NextRequest) {
  try {
    const uid = await getCurrentUserId(req);

    const userAbilityService = Container.resolve<UserAbilityService>(UserAbilityService);
    const levels = await userAbilityService.getUserLevels(uid);

    return Response.json({
      success: true,
      data: levels,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message || 'Failed to get user levels',
      },
      { status: 500 }
    );
  }
}


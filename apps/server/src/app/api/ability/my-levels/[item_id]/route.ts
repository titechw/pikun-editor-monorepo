import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { UserAbilityService } from '@/services/user-ability.service';
import { getCurrentUserId } from '@/utils/auth';

/**
 * GET /api/ability/my-levels/:item_id - 获取指定能力项的等级详情
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { item_id: string } }
) {
  try {
    const uid = await getCurrentUserId(req);

    const userAbilityService = Container.resolve<UserAbilityService>(UserAbilityService);
    const level = await userAbilityService.getUserLevel(uid, params.item_id);

    if (!level) {
      return Response.json(
        {
          success: false,
          message: 'Level not found',
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: level,
    });
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message || 'Failed to get user level',
      },
      { status: 500 }
    );
  }
}


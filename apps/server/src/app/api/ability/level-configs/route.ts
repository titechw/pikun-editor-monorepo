import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { AbilityLevelConfigController } from '@/api/ability/ability-level-config.controller';

/**
 * GET /api/ability/level-configs - 获取等级配置列表（用户端）
 */
export async function GET(req: NextRequest) {
  const controller = Container.resolve<AbilityLevelConfigController>(AbilityLevelConfigController);
  return controller.getConfigs(req);
}










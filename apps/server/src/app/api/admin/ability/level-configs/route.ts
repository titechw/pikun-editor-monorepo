import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { AbilityLevelConfigController } from '@/api/ability/ability-level-config.controller';

/**
 * GET /api/admin/ability/level-configs - 获取等级配置列表（管理员）
 * POST /api/admin/ability/level-configs - 创建等级配置（管理员）
 */
export async function GET(req: NextRequest) {
  const controller = Container.resolve<AbilityLevelConfigController>(AbilityLevelConfigController);
  return controller.getConfigs(req);
}

export async function POST(req: NextRequest) {
  const controller = Container.resolve<AbilityLevelConfigController>(AbilityLevelConfigController);
  return controller.createConfig(req);
}



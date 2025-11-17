import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { AbilityLevelConfigController } from '@/api/ability/ability-level-config.controller';

/**
 * GET /api/admin/ability/level-configs/template - 获取全局模板配置（管理员）
 */
export async function GET(req: NextRequest) {
  const controller = Container.resolve<AbilityLevelConfigController>(AbilityLevelConfigController);
  return controller.getTemplate(req);
}




import { NextRequest } from 'next/server';
import '@/core/init';
import { Container } from '@/core/container';
import { AbilityLevelConfigController } from '@/api/ability/ability-level-config.controller';

/**
 * GET /api/admin/ability/level-configs/:config_id - 获取等级配置详情（管理员）
 * PUT /api/admin/ability/level-configs/:config_id - 更新等级配置（管理员）
 * DELETE /api/admin/ability/level-configs/:config_id - 删除等级配置（管理员）
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { config_id: string } }
) {
  const controller = Container.resolve<AbilityLevelConfigController>(AbilityLevelConfigController);
  return controller.getConfigById(req, params.config_id);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { config_id: string } }
) {
  const controller = Container.resolve<AbilityLevelConfigController>(AbilityLevelConfigController);
  return controller.updateConfig(req, params.config_id);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { config_id: string } }
) {
  const controller = Container.resolve<AbilityLevelConfigController>(AbilityLevelConfigController);
  return controller.deleteConfig(req, params.config_id);
}


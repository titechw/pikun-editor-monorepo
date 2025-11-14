import { injectable, inject } from 'tsyringe';
import { UserAbilityLevelDAO } from '@/dao/user-ability-level.dao';
import { UserAbilityExperienceLogDAO } from '@/dao/user-ability-experience-log.dao';
import { AbilityItemLevelConfigDAO } from '@/dao/ability-item-level-config.dao';
import type { UserAbilityLevel, UserAbilityExperienceLog } from '@/entities';

/**
 * 扩展的用户能力等级信息（包含下一级信息）
 */
export interface UserAbilityLevelWithNextInfo extends UserAbilityLevel {
  // 下一级信息
  next_level?: number; // 下一级等级
  next_level_required_exp?: number; // 下一级所需经验
  exp_needed?: number; // 还需多少经验
  requires_assessment?: boolean; // 是否需要考试
  next_level_name?: string | null; // 下一级名称
  is_max_level?: boolean; // 是否已满级
}

/**
 * 用户能力服务
 */
@injectable()
export class UserAbilityService {
  constructor(
    @inject('UserAbilityLevelDAO') private userLevelDAO: UserAbilityLevelDAO,
    @inject('UserAbilityExperienceLogDAO') private experienceLogDAO: UserAbilityExperienceLogDAO,
    @inject('AbilityItemLevelConfigDAO') private levelConfigDAO: AbilityItemLevelConfigDAO
  ) {}

  /**
   * 为单个用户能力等级添加下一级信息（辅助方法）
   */
  private async enrichUserLevelWithNextInfo(level: UserAbilityLevel): Promise<UserAbilityLevelWithNextInfo> {
    const currentLevel = Number(level.current_level);
    const currentExp = Number(level.current_exp);
    const nextLevel = currentLevel + 1;

    // 获取下一级配置（优先独立配置，没有则用模板）
    const nextConfig = await this.levelConfigDAO.getConfigForItem(level.item_id, nextLevel);

    if (!nextConfig) {
      // 没有下一级配置，说明已满级
      return {
        ...level,
        is_max_level: true,
      };
    }

    const requiredExp = Number(nextConfig.required_exp);
    const expNeeded = Math.max(0, requiredExp - currentExp);

    return {
      ...level,
      next_level: nextLevel,
      next_level_required_exp: requiredExp,
      exp_needed: expNeeded,
      requires_assessment: nextConfig.requires_assessment,
      next_level_name: nextConfig.level_name,
      is_max_level: false,
    };
  }

  /**
   * 获取用户的能力等级列表（包含下一级信息）
   */
  async getUserLevels(uid: number): Promise<UserAbilityLevelWithNextInfo[]> {
    const levels = await this.userLevelDAO.findByUserId(uid);
    
    // 为每个能力项计算下一级信息
    const levelsWithNextInfo: UserAbilityLevelWithNextInfo[] = await Promise.all(
      levels.map((level) => this.enrichUserLevelWithNextInfo(level))
    );

    return levelsWithNextInfo;
  }

  /**
   * 获取用户指定能力项的等级（包含下一级信息）
   */
  async getUserLevelWithNextInfo(uid: number, itemId: string): Promise<UserAbilityLevelWithNextInfo | null> {
    const level = await this.userLevelDAO.findByUserAndItem(uid, itemId);
    if (!level) {
      return null;
    }
    return this.enrichUserLevelWithNextInfo(level);
  }

  /**
   * 获取用户指定能力项的等级
   */
  async getUserLevel(uid: number, itemId: string): Promise<UserAbilityLevel | null> {
    return this.userLevelDAO.findByUserAndItem(uid, itemId);
  }

  /**
   * 获取用户经验记录
   */
  async getExperienceLogs(
    uid: number,
    options?: {
      itemId?: string;
      expType?: string;
      limit?: number;
      offset?: number;
    }
  ): Promise<UserAbilityExperienceLog[]> {
    return this.experienceLogDAO.findByUserId(uid, options);
  }
}


import { injectable, inject } from 'tsyringe';
import { UserAbilityLevelDAO } from '@/dao/user-ability-level.dao';
import { UserAbilityExperienceLogDAO } from '@/dao/user-ability-experience-log.dao';
import type { UserAbilityLevel, UserAbilityExperienceLog } from '@/entities';

/**
 * 用户能力服务
 */
@injectable()
export class UserAbilityService {
  constructor(
    @inject('UserAbilityLevelDAO') private userLevelDAO: UserAbilityLevelDAO,
    @inject('UserAbilityExperienceLogDAO') private experienceLogDAO: UserAbilityExperienceLogDAO
  ) {}

  /**
   * 获取用户的能力等级列表
   */
  async getUserLevels(uid: number): Promise<UserAbilityLevel[]> {
    return this.userLevelDAO.findByUserId(uid);
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


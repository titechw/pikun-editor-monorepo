import { injectable, inject } from 'tsyringe';
import { UserAbilityLevelDAO } from '@/dao/user-ability-level.dao';
import { UserAbilityExperienceLogDAO } from '@/dao/user-ability-experience-log.dao';
import { AbilityItemLevelConfigDAO } from '@/dao/ability-item-level-config.dao';
import type { UserAbilityLevel, UserAbilityExperienceLog } from '@/entities';

/**
 * 经验值服务
 * 负责经验值计算、升级逻辑
 */
@injectable()
export class ExperienceService {
  constructor(
    @inject('UserAbilityLevelDAO') private userLevelDAO: UserAbilityLevelDAO,
    @inject('UserAbilityExperienceLogDAO') private experienceLogDAO: UserAbilityExperienceLogDAO,
    @inject('AbilityItemLevelConfigDAO') private levelConfigDAO: AbilityItemLevelConfigDAO
  ) {}

  /**
   * 增加经验值
   */
  async addExperience(
    uid: number,
    itemId: string,
    expAmount: number,
    options?: {
      expType?: string;
      sourceId?: string;
      sourceType?: string;
      notes?: string;
      metadata?: Record<string, any>;
    }
  ): Promise<{
    userLevel: UserAbilityLevel;
    levelUp: boolean;
    newLevel?: number;
    logs: UserAbilityExperienceLog[];
  }> {
    // 获取当前用户能力等级
    let userLevel = await this.userLevelDAO.findByUserAndItem(uid, itemId);
    const beforeLevel = userLevel?.current_level || 1;
    const beforeExp = userLevel?.current_exp || 0;

    // 增加经验值
    if (!userLevel) {
      userLevel = await this.userLevelDAO.create({
        uid,
        item_id: itemId,
        current_level: 1,
        current_exp: expAmount,
        total_exp: expAmount,
      });
    } else {
      userLevel = await this.userLevelDAO.update(uid, itemId, {
        current_exp: userLevel.current_exp + expAmount,
        total_exp: userLevel.total_exp + expAmount,
      });
    }

    let afterExp = userLevel.current_exp; // 使用 let，因为升级后需要更新为 0
    let afterLevel = userLevel.current_level;
    let levelUp = false;
    const logs: UserAbilityExperienceLog[] = [];

    // 检查是否需要升级
    while (true) {
      const nextLevel = afterLevel + 1;
      const levelConfig = await this.levelConfigDAO.getConfigForItem(itemId, nextLevel);

      if (!levelConfig) {
        // 没有下一级配置，停止升级
        break;
      }

      // 检查经验值是否达到下一级要求
      if (afterExp >= levelConfig.required_exp) {
        // 检查是否需要考核
        if (levelConfig.requires_assessment) {
          // 需要考核，停止自动升级
          // 这里可以检查用户是否已通过考核（从metadata中获取）
          const assessmentPassed = userLevel.metadata?.assessments?.[nextLevel]?.passed === true;
          if (!assessmentPassed) {
            break;
          }
        }

        // 升级
        const beforeLevelExp = afterExp;
        afterLevel = nextLevel;
        levelUp = true;

        // 升级后，当前等级的经验值重置为 0（根据规则：每一级别的经验值在升级后，对应等级的初始经验值应该是 0）
        const afterLevelExp = 0;

        // 更新用户等级
        userLevel = await this.userLevelDAO.update(uid, itemId, {
          current_level: afterLevel,
          current_exp: afterLevelExp, // 升级后经验值重置为 0
          level_up_count: userLevel.level_up_count + 1,
          last_level_up_at: new Date(),
        });

        // 更新 afterExp 为升级后的经验值（0），用于后续可能的跨级升级判断
        afterExp = afterLevelExp;

        // 记录升级日志
        const levelUpLog = await this.experienceLogDAO.create({
          uid,
          item_id: itemId,
          exp_amount: 0,
          exp_type: 'level_up',
          before_level: afterLevel - 1,
          after_level: afterLevel,
          before_exp: beforeLevelExp,
          after_exp: afterLevelExp, // 升级后经验值为 0
          is_level_up: true,
          notes: `升级到 ${afterLevel} 级`,
          metadata: options?.metadata || {},
        });
        logs.push(levelUpLog);
      } else {
        break;
      }
    }

    // 记录经验获得日志
    // 注意：如果发生了升级，afterExp 已经是升级后的经验值（0）
    const finalExp = levelUp ? userLevel.current_exp : afterExp;
    const expLog = await this.experienceLogDAO.create({
      uid,
      item_id: itemId,
      exp_amount: expAmount,
      exp_type: options?.expType || 'unknown',
      source_id: options?.sourceId || null,
      source_type: options?.sourceType || null,
      before_level: beforeLevel,
      after_level: afterLevel,
      before_exp: beforeExp,
      after_exp: finalExp, // 如果升级了，这里是升级后的经验值（0）
      is_level_up: levelUp,
      notes: options?.notes || null,
      metadata: options?.metadata || {},
    });
    logs.push(expLog);

    return {
      userLevel,
      levelUp,
      newLevel: levelUp ? afterLevel : undefined,
      logs,
    };
  }
}


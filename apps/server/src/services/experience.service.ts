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
    const beforeLevel = userLevel ? Number(userLevel.current_level) : 1;
    const beforeExp = userLevel ? Number(userLevel.current_exp) : 0;

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
      // 确保数字字段是数字类型（防止字符串拼接）
      const currentExp = Number(userLevel.current_exp);
      const totalExp = Number(userLevel.total_exp);
      const updates: {
        current_exp: number;
        total_exp?: number;
      } = {
        current_exp: currentExp + expAmount,
      };
      // 只有当 expAmount > 0 时才增加 total_exp（完成考试时 expAmount 为 0）
      if (expAmount > 0) {
        updates.total_exp = totalExp + expAmount;
      }
      userLevel = await this.userLevelDAO.update(uid, itemId, updates);
    }

    // 确保数字字段是数字类型
    let afterExp = Number(userLevel.current_exp); // 使用 let，因为升级后需要更新为 0
    let afterLevel = Number(userLevel.current_level);
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

      // 检查经验值是否达到下一级要求（确保 required_exp 是数字类型）
      const requiredExp = Number(levelConfig.required_exp);
      if (afterExp >= requiredExp) {
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

  /**
   * 完成考试（标记考试通过并升级）
   */
  async completeAssessment(
    uid: number,
    itemId: string,
    targetLevel: number
  ): Promise<{
    userLevel: UserAbilityLevel;
    levelUp: boolean;
    newLevel?: number;
    logs: UserAbilityExperienceLog[];
  }> {
    // 获取当前用户能力等级
    let userLevel = await this.userLevelDAO.findByUserAndItem(uid, itemId);
    if (!userLevel) {
      throw new Error('未找到该能力项的等级信息');
    }

    const currentLevel = Number(userLevel.current_level);
    const currentExp = Number(userLevel.current_exp);

    // 检查目标等级是否合理
    if (targetLevel !== currentLevel + 1) {
      throw new Error(`目标等级 ${targetLevel} 不是当前等级 ${currentLevel} 的下一级`);
    }

    // 获取目标等级的配置
    const levelConfig = await this.levelConfigDAO.getConfigForItem(itemId, targetLevel);
    if (!levelConfig) {
      throw new Error('已达到最高等级或目标等级配置不存在');
    }

    // 检查是否需要考试
    if (!levelConfig.requires_assessment) {
      throw new Error('该等级不需要考试，请直接升级');
    }

    // 检查经验是否足够
    const requiredExp = Number(levelConfig.required_exp);
    if (currentExp < requiredExp) {
      throw new Error(`经验不足，当前经验：${currentExp}，需要：${requiredExp}`);
    }

    // 标记考试通过（更新 metadata）
    const metadata = userLevel.metadata || {};
    if (!metadata.assessments) {
      metadata.assessments = {};
    }
    metadata.assessments[targetLevel] = {
      passed: true,
      passed_at: new Date().toISOString(),
    };

    // 更新用户等级 metadata（先标记考试通过）
    userLevel = await this.userLevelDAO.update(uid, itemId, {
      metadata,
    });

    // 添加 0 经验值来触发升级检查（因为经验已经够了，只需要标记考试通过）
    // 注意：addExperience 会重新获取 userLevel，所以 metadata 中的考试通过标记会被保留
    const result = await this.addExperience(uid, itemId, 0, {
      expType: 'assessment',
      notes: `完成 ${targetLevel} 级考试`,
      metadata: {
        assessment_level: targetLevel,
        assessment_passed: true,
      },
    });

    return result;
  }

  /**
   * 升级指定等级数（自动完成过程中需要的考试）
   * 注意：如果用户还没有该能力项的等级记录，会自动创建（等级1，经验0）
   */
  async levelUpBy(
    uid: number,
    itemId: string,
    levels: number
  ): Promise<{
    userLevel: UserAbilityLevel;
    levelUp: boolean;
    newLevel?: number;
    logs: UserAbilityExperienceLog[];
  }> {
    // 获取当前用户能力等级，如果不存在则自动创建
    let userLevel = await this.userLevelDAO.findByUserAndItem(uid, itemId);
    if (!userLevel) {
      // 自动创建用户等级记录（等级1，经验0）
      userLevel = await this.userLevelDAO.create({
        uid,
        item_id: itemId,
        current_level: 1,
        current_exp: 0,
        total_exp: 0,
        level_up_count: 0,
      });
    }

    const startLevel = Number(userLevel.current_level);
    const allLogs: UserAbilityExperienceLog[] = [];

    // 逐级升级，每级都检查是否需要考试并自动完成
    for (let i = 0; i < levels; i++) {
      // 重新获取最新的用户等级
      userLevel = await this.userLevelDAO.findByUserAndItem(uid, itemId);
      if (!userLevel) {
        // 如果还是不存在（理论上不应该发生），再次创建
        userLevel = await this.userLevelDAO.create({
          uid,
          item_id: itemId,
          current_level: 1,
          current_exp: 0,
          total_exp: 0,
          level_up_count: 0,
        });
      }

      const currentLevel = Number(userLevel.current_level);
      const currentExp = Number(userLevel.current_exp);
      const nextLevel = currentLevel + 1;

      // 获取下一级配置
      const levelConfig = await this.levelConfigDAO.getConfigForItem(itemId, nextLevel);
      if (!levelConfig) {
        // 没有下一级配置，停止升级
        break;
      }

      const requiredExp = Number(levelConfig.required_exp);
      const expNeeded = Math.max(0, requiredExp - currentExp);

      // 如果经验不够，先添加经验
      if (expNeeded > 0) {
        const expResult = await this.addExperience(uid, itemId, expNeeded, {
          expType: 'level_up',
          notes: `升级到 ${nextLevel} 级（添加经验）`,
        });
        userLevel = expResult.userLevel;
        allLogs.push(...expResult.logs);

        // 重新获取最新的用户等级（addExperience 可能已经自动升级了）
        userLevel = await this.userLevelDAO.findByUserAndItem(uid, itemId);
        if (!userLevel) {
          throw new Error('未找到该能力项的等级信息');
        }

        const newCurrentLevel = Number(userLevel.current_level);
        // 如果已经升级了，继续下一级
        if (newCurrentLevel >= nextLevel) {
          continue;
        }
      }

      // 重新获取最新的用户等级和经验
      userLevel = await this.userLevelDAO.findByUserAndItem(uid, itemId);
      if (!userLevel) {
        throw new Error('未找到该能力项的等级信息');
      }

      const finalCurrentLevel = Number(userLevel.current_level);
      const finalCurrentExp = Number(userLevel.current_exp);

      // 如果已经升级到这个等级或更高，继续下一级
      if (finalCurrentLevel >= nextLevel) {
        continue;
      }

      // 检查经验是否足够
      if (finalCurrentExp < requiredExp) {
        throw new Error(`经验不足，无法升级到 ${nextLevel} 级`);
      }

      // 如果需要考试，自动完成考试
      if (levelConfig.requires_assessment) {
        // 检查是否已经通过考试
        const metadata = userLevel.metadata || {};
        const assessmentPassed = metadata.assessments?.[nextLevel]?.passed === true;

        if (!assessmentPassed) {
          // 标记考试通过
          if (!metadata.assessments) {
            metadata.assessments = {};
          }
          metadata.assessments[nextLevel] = {
            passed: true,
            passed_at: new Date().toISOString(),
          };

          // 更新用户等级 metadata
          userLevel = await this.userLevelDAO.update(uid, itemId, {
            metadata,
          });
        }
      }

      // 添加 0 经验值来触发升级检查
      const result = await this.addExperience(uid, itemId, 0, {
        expType: 'level_up',
        notes: `升级到 ${nextLevel} 级`,
      });

      userLevel = result.userLevel;
      allLogs.push(...result.logs);
    }

    // 获取最终的用户等级
    userLevel = await this.userLevelDAO.findByUserAndItem(uid, itemId);
    if (!userLevel) {
      throw new Error('未找到该能力项的等级信息');
    }

    const finalLevel = Number(userLevel.current_level);
    const levelUp = finalLevel > startLevel;

    return {
      userLevel,
      levelUp,
      newLevel: levelUp ? finalLevel : undefined,
      logs: allLogs,
    };
  }
}


import { injectable, inject } from 'tsyringe';
import type {
  MemoryTrainingGame,
  MemoryTrainingLevel,
  UserMemoryLevelProgress,
} from '@/entities';
import { MemoryTrainingGameDAO } from '@/dao/memory-training-game.dao';
import { MemoryTrainingLevelDAO } from '@/dao/memory-training-level.dao';
import { UserMemoryLevelProgressDAO } from '@/dao/user-memory-level-progress.dao';
import { ExperienceService } from './experience.service';
import { UserAbilityService } from './user-ability.service';

/**
 * 记忆训练服务
 */
@injectable()
export class MemoryTrainingService {
  constructor(
    @inject('MemoryTrainingGameDAO') private gameDAO: MemoryTrainingGameDAO,
    @inject('MemoryTrainingLevelDAO') private levelDAO: MemoryTrainingLevelDAO,
    @inject('UserMemoryLevelProgressDAO') private progressDAO: UserMemoryLevelProgressDAO,
    @inject(ExperienceService) private experienceService: ExperienceService,
    @inject(UserAbilityService) private userAbilityService: UserAbilityService
  ) {}

  /**
   * 获取已发布的游戏列表
   */
  async getPublishedGames(): Promise<MemoryTrainingGame[]> {
    return await this.gameDAO.findAllPublished();
  }

  /**
   * 获取游戏详情
   */
  async getGame(gameId: string): Promise<MemoryTrainingGame | null> {
    return await this.gameDAO.findById(gameId);
  }

  /**
   * 获取游戏关卡列表（包含用户进度）
   */
  async getLevelsWithProgress(
    gameId: string,
    uid: number
  ): Promise<Array<MemoryTrainingLevel & { userProgress?: UserMemoryLevelProgress }>> {
    const levels = await this.levelDAO.findByGameId(gameId);
    const userProgress = await this.progressDAO.findByUserAndGame(uid, gameId);
    const progressMap = new Map(userProgress.map((p) => [p.level_id, p]));

    return levels.map((level) => ({
      ...level,
      userProgress: progressMap.get(level.level_id),
    }));
  }

  /**
   * 获取关卡详情
   */
  async getLevel(levelId: string): Promise<MemoryTrainingLevel | null> {
    return await this.levelDAO.findById(levelId);
  }

  /**
   * 提交游戏结果
   */
  async submitResult(
    uid: number,
    levelId: string,
    resultData: {
      correct: boolean;
      correctRate: number;
      score: number;
      timeSpent: number;
      userAnswer: any;
    }
  ): Promise<{
    expEarned: number;
    levelUp: boolean;
    newLevel?: number;
    unlockedNextLevel: boolean;
    nextLevelId?: string;
    message?: string;
  }> {
    // 获取关卡信息
    const level = await this.levelDAO.findById(levelId);
    if (!level) {
      throw new Error('关卡不存在');
    }

    // 获取游戏信息
    const game = await this.gameDAO.findById(level.game_id);
    if (!game || !game.ability_item_id) {
      throw new Error('游戏配置错误');
    }

    // 计算经验值
    const baseExp = level.base_exp_reward;
    const expEarned = this.calculateExp(baseExp, resultData);

    // 添加经验值到能力项
    const expResult = await this.experienceService.addExperience(
      uid,
      game.ability_item_id,
      expEarned,
      {
        expType: 'memory_training',
        sourceType: 'game',
        sourceId: levelId,
        notes: `记忆训练 - ${game.name} - ${level.name || `关卡${level.level_number}`}`,
        metadata: {
          gameId: game.game_id,
          gameCode: game.code,
          levelId: level.level_id,
          levelNumber: level.level_number,
          resultData,
        },
      }
    );

    // 更新用户关卡进度
    const progress = await this.progressDAO.findByUserAndLevel(uid, levelId);
    const now = new Date();

    const updates: Parameters<typeof this.progressDAO.upsert>[2] = {
      is_unlocked: true,
      is_completed: true,
      last_played_at: now,
      completion_count: (progress?.completion_count || 0) + 1,
      total_exp_earned: (progress?.total_exp_earned || 0) + expEarned,
    };

    // 更新最佳成绩
    if (!progress || resultData.score > progress.best_score) {
      updates.best_score = resultData.score;
    }
    if (!progress || resultData.correctRate > progress.best_correct_rate) {
      updates.best_correct_rate = resultData.correctRate;
    }
    if (!progress || !progress.best_time_spent || resultData.timeSpent < progress.best_time_spent) {
      updates.best_time_spent = resultData.timeSpent;
    }
    if (!progress || !progress.first_completed_at) {
      updates.first_completed_at = now;
    }

    await this.progressDAO.upsert(uid, levelId, updates);

    // 检查是否解锁下一关卡
    let unlockedNextLevel = false;
    let nextLevelId: string | undefined;

    if (resultData.correct) {
      // 完成当前关卡，尝试解锁下一关卡
      const nextLevel = await this.levelDAO.findByGameId(level.game_id).then((levels) =>
        levels.find((l) => l.level_number === level.level_number + 1)
      );

      if (nextLevel) {
        // 检查用户能力等级是否满足要求
        const userLevel = await this.userAbilityService.getUserLevel(uid, game.ability_item_id);
        const userAbilityLevel = userLevel?.current_level || 1;

        if (userAbilityLevel >= nextLevel.required_ability_level) {
          // 解锁下一关卡
          const nextProgress = await this.progressDAO.findByUserAndLevel(uid, nextLevel.level_id);
          if (!nextProgress || !nextProgress.is_unlocked) {
            await this.progressDAO.upsert(uid, nextLevel.level_id, {
              is_unlocked: true,
            });
            unlockedNextLevel = true;
            nextLevelId = nextLevel.level_id;
          }
        }
      }
    }

    return {
      expEarned,
      levelUp: expResult.levelUp,
      newLevel: expResult.newLevel,
      unlockedNextLevel,
      nextLevelId,
      message: expResult.levelUp
        ? `恭喜升级到 ${expResult.newLevel} 级！`
        : undefined,
    };
  }

  /**
   * 计算经验值
   */
  private calculateExp(
    baseExp: number,
    resultData: {
      correctRate: number;
      timeSpent: number;
    }
  ): number {
    // 正确率加成
    const correctRateBonus = resultData.correctRate;

    // 速度加成（假设平均时间，这里简化处理）
    let speedBonus = 1.0;
    // TODO: 根据关卡配置的平均时间计算速度加成

    const finalExp = Math.round(baseExp * correctRateBonus * speedBonus);
    return Math.max(1, finalExp); // 至少1点经验
  }

  /**
   * 获取用户所有关卡进度
   */
  async getUserProgress(uid: number): Promise<UserMemoryLevelProgress[]> {
    return await this.progressDAO.findByUserId(uid);
  }

  /**
   * 获取用户在指定游戏的进度
   */
  async getUserGameProgress(uid: number, gameId: string): Promise<UserMemoryLevelProgress[]> {
    return await this.progressDAO.findByUserAndGame(uid, gameId);
  }
}






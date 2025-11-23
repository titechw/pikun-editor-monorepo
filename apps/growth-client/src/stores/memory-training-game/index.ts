import { makeAutoObservable, runInAction } from 'mobx';
import { message } from 'antd';
import {
  memoryTrainingApi,
  type MemoryTrainingGame,
  type MemoryTrainingLevel,
  type UserMemoryLevelProgress,
} from '@/api/memory-training.api';

/**
 * 记忆训练游戏 Store
 */
export class MemoryTrainingGameStore {
  // 游戏列表
  games: MemoryTrainingGame[] = [];
  currentGame: MemoryTrainingGame | null = null;

  // 关卡列表
  levels: MemoryTrainingLevel[] = [];
  currentLevel: MemoryTrainingLevel | null = null;

  // 用户进度
  userProgress: Map<string, UserMemoryLevelProgress> = new Map();

  // 加载状态
  loading = false;
  gamesLoading = false;
  levelsLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * 加载游戏列表
   */
  async loadGames(): Promise<void> {
    this.gamesLoading = true;
    try {
      const games = await memoryTrainingApi.getGames();
      runInAction(() => {
        this.games = games;
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '加载游戏列表失败';
      message.error(errorMessage);
    } finally {
      runInAction(() => {
        this.gamesLoading = false;
      });
    }
  }

  /**
   * 加载游戏关卡列表
   */
  async loadLevels(gameId: string): Promise<void> {
    this.levelsLoading = true;
    try {
      const levels = await memoryTrainingApi.getLevels(gameId);
      runInAction(() => {
        this.levels = levels;
        // 更新用户进度映射
        levels.forEach((level) => {
          if (level.userProgress) {
            this.userProgress.set(level.level_id, level.userProgress);
          }
        });
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '加载关卡列表失败';
      message.error(errorMessage);
    } finally {
      runInAction(() => {
        this.levelsLoading = false;
      });
    }
  }

  /**
   * 设置当前游戏
   */
  setCurrentGame(game: MemoryTrainingGame | null): void {
    this.currentGame = game;
    if (game) {
      this.loadLevels(game.game_id);
    } else {
      this.levels = [];
    }
  }

  /**
   * 设置当前关卡
   */
  setCurrentLevel(level: MemoryTrainingLevel | null): void {
    this.currentLevel = level;
  }

  /**
   * 获取关卡的用户进度
   */
  getLevelProgress(levelId: string): UserMemoryLevelProgress | null {
    return this.userProgress.get(levelId) || null;
  }

  /**
   * 检查关卡是否已解锁
   */
  isLevelUnlocked(level: MemoryTrainingLevel, userAbilityLevel: number): boolean {
    // 第一个关卡默认解锁
    if (level.level_number === 1) {
      return true;
    }

    // 检查能力等级要求
    if (userAbilityLevel < level.required_ability_level) {
      return false;
    }

    // 检查用户进度
    const progress = this.getLevelProgress(level.level_id);
    if (progress) {
      return progress.is_unlocked;
    }

    // 检查前置关卡是否完成
    if (level.level_number > 1) {
      const previousLevel = this.levels.find(
        (l) => l.game_id === level.game_id && l.level_number === level.level_number - 1
      );
      if (previousLevel) {
        const previousProgress = this.getLevelProgress(previousLevel.level_id);
        return previousProgress?.is_completed || false;
      }
    }

    return false;
  }

  /**
   * 提交游戏结果
   */
  async submitResult(
    levelId: string,
    resultData: {
      correct: boolean;
      correctRate: number;
      score: number;
      timeSpent: number;
      userAnswer: any;
    }
  ): Promise<void> {
    this.loading = true;
    try {
      const response = await memoryTrainingApi.submitResult({
        levelId,
        resultData,
      });

      // 更新用户进度
      const progress = this.getLevelProgress(levelId);
      if (progress) {
        runInAction(() => {
          const updatedProgress: UserMemoryLevelProgress = {
            ...progress,
            is_completed: true,
            completion_count: progress.completion_count + 1,
            total_exp_earned: progress.total_exp_earned + response.expEarned,
            last_played_at: new Date().toISOString(),
          };

          // 更新最佳成绩
          if (resultData.score > progress.best_score) {
            updatedProgress.best_score = resultData.score;
          }
          if (resultData.correctRate > progress.best_correct_rate) {
            updatedProgress.best_correct_rate = resultData.correctRate;
          }
          if (
            !progress.best_time_spent ||
            resultData.timeSpent < progress.best_time_spent
          ) {
            updatedProgress.best_time_spent = resultData.timeSpent;
          }
          if (!progress.first_completed_at) {
            updatedProgress.first_completed_at = new Date().toISOString();
          }

          this.userProgress.set(levelId, updatedProgress);
        });
      }

      // 如果解锁了下一关卡，更新进度
      if (response.unlockedNextLevel && response.nextLevelId) {
        const nextLevelProgress: UserMemoryLevelProgress = {
          progress_id: '',
          uid: 0,
          level_id: response.nextLevelId,
          is_unlocked: true,
          is_completed: false,
          best_score: 0,
          best_correct_rate: 0,
          best_time_spent: null,
          completion_count: 0,
          total_exp_earned: 0,
          first_completed_at: null,
          last_played_at: null,
          metadata: {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        runInAction(() => {
          this.userProgress.set(response.nextLevelId!, nextLevelProgress);
        });
      }

      if (response.levelUp) {
        message.success(
          response.message || `恭喜升级到 ${response.newLevel} 级！获得 ${response.expEarned} 经验值`
        );
      } else {
        message.success(`训练完成！获得 ${response.expEarned} 经验值`);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '提交结果失败';
      message.error(errorMessage);
      throw error;
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export const memoryTrainingGameStore = new MemoryTrainingGameStore();






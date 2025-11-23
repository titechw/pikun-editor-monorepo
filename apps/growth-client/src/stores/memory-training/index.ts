import { makeAutoObservable, runInAction } from 'mobx';
import { message } from 'antd';
import { abilityApi, type UserAbilityLevel } from '@/api/ability.api';
import { growthStore } from '@/stores/growth';

/**
 * 游戏状态
 */
export enum GameState {
  Idle = 'idle', // 空闲
  Ready = 'ready', // 准备中
  Memorizing = 'memorizing', // 记忆阶段
  Recalling = 'recalling', // 回忆阶段
  Result = 'result', // 结果显示
}

/**
 * 游戏类型
 */
export enum MemoryGameType {
  NumberSequence = 'number_sequence', // 数字序列记忆
  ColorMemory = 'color_memory', // 颜色记忆
  ShapePosition = 'shape_position', // 图形位置记忆
  Space3D = 'space_3d', // 3D空间记忆
  Comprehensive = 'comprehensive', // 综合记忆
  DynamicTrajectory = 'dynamic_trajectory', // 动态轨迹记忆
  Scene3D = 'scene_3d', // 3D场景记忆
  Ultimate = 'ultimate', // 终极挑战
}

/**
 * 游戏难度配置
 */
export interface GameDifficulty {
  level: number;
  gameType: MemoryGameType;
  sequenceLength?: number; // 序列长度（数字/颜色）
  gridSize?: number; // 网格大小
  shapeCount?: number; // 图形数量
  positionCount?: number; // 位置数量
  displayTime: number; // 显示时间（秒）
  colorCount?: number; // 颜色数量
  trajectoryPoints?: number; // 轨迹点数
  objectCount?: number; // 物体数量
}

/**
 * 游戏结果
 */
export interface GameResult {
  correct: boolean;
  correctRate: number; // 正确率（0-1）
  timeSpent: number; // 用时（毫秒）
  score: number; // 得分
  expEarned: number; // 获得的经验值
}

/**
 * 记忆训练 Store
 */
export class MemoryTrainingStore {
  // 当前用户等级
  userLevel: UserAbilityLevel | null = null;
  memoryItemId: string | null = null;

  // 游戏状态
  gameState: GameState = GameState.Idle;
  currentLevel: number = 1;
  currentGameType: MemoryGameType | null = null;
  currentDifficulty: GameDifficulty | null = null;

  // 游戏数据
  gameData: any = null; // 当前游戏的数据（数字序列、图形位置等）
  userAnswer: any = null; // 用户答案
  gameResult: GameResult | null = null;

  // 统计
  totalRounds: number = 0;
  correctRounds: number = 0;
  consecutiveCorrect: number = 0; // 连续正确次数
  totalExpEarned: number = 0;

  // 加载状态
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * 初始化记忆能力项
   */
  private initMemoryItem(): void {
    // 确保 growthStore 已加载数据
    if (growthStore.items.length === 0) {
      return;
    }

    const memoryItem = growthStore.items.find((item) => item.code === 'memory');
    if (memoryItem) {
      this.memoryItemId = memoryItem.item_id;
      const userLevel = growthStore.getUserLevel(memoryItem.item_id);
      if (userLevel) {
        this.userLevel = userLevel;
        this.currentLevel = userLevel.current_level;
      }
    }
  }

  /**
   * 加载用户等级数据
   */
  async loadUserLevel(): Promise<void> {
    // 确保 growthStore 已加载数据
    if (growthStore.items.length === 0) {
      await growthStore.loadData();
    }

    // 初始化记忆能力项
    this.initMemoryItem();

    if (this.memoryItemId) {
      try {
        const level = await abilityApi.getMyLevel(this.memoryItemId);
        runInAction(() => {
          this.userLevel = level;
          if (level) {
            this.currentLevel = level.current_level;
          }
        });
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : '加载等级失败';
        message.error(errorMessage);
      }
    }
  }

  /**
   * 根据等级获取游戏难度配置
   */
  getDifficultyForLevel(level: number): GameDifficulty {
    const configs: Record<number, GameDifficulty> = {
      1: {
        level: 1,
        gameType: MemoryGameType.NumberSequence,
        sequenceLength: 3,
        displayTime: 3,
      },
      2: {
        level: 2,
        gameType: MemoryGameType.NumberSequence,
        sequenceLength: 5,
        displayTime: 2.5,
      },
      3: {
        level: 3,
        gameType: MemoryGameType.ShapePosition,
        gridSize: 3,
        shapeCount: 3,
        displayTime: 3,
      },
      4: {
        level: 4,
        gameType: MemoryGameType.ShapePosition,
        gridSize: 4,
        shapeCount: 5,
        displayTime: 2.5,
      },
      5: {
        level: 5,
        gameType: MemoryGameType.Space3D,
        positionCount: 5,
        displayTime: 4,
      },
      6: {
        level: 6,
        gameType: MemoryGameType.Space3D,
        positionCount: 7,
        displayTime: 3.5,
      },
      7: {
        level: 7,
        gameType: MemoryGameType.Comprehensive,
        sequenceLength: 9,
        colorCount: 5,
        positionCount: 5,
        displayTime: 4,
      },
      8: {
        level: 8,
        gameType: MemoryGameType.DynamicTrajectory,
        trajectoryPoints: 8,
        displayTime: 5,
      },
      9: {
        level: 9,
        gameType: MemoryGameType.Scene3D,
        objectCount: 10,
        displayTime: 3,
      },
      10: {
        level: 10,
        gameType: MemoryGameType.Ultimate,
        sequenceLength: 10,
        gridSize: 5,
        positionCount: 8,
        displayTime: 3,
      },
    };

    return configs[level] || configs[1];
  }

  /**
   * 开始游戏
   */
  startGame(level?: number): void {
    const targetLevel = level || this.currentLevel;
    const difficulty = this.getDifficultyForLevel(targetLevel);

    runInAction(() => {
      this.currentLevel = targetLevel;
      this.currentGameType = difficulty.gameType;
      this.currentDifficulty = difficulty;
      this.gameState = GameState.Ready;
      this.gameData = null;
      this.userAnswer = null;
      this.gameResult = null;
    });

    // 生成游戏数据
    this.generateGameData();
  }

  /**
   * 生成游戏数据
   */
  private generateGameData(): void {
    if (!this.currentDifficulty) return;

    const { gameType, sequenceLength, gridSize, shapeCount, positionCount, colorCount } =
      this.currentDifficulty;

    let data: any = {};

    switch (gameType) {
      case MemoryGameType.NumberSequence:
        // 生成数字序列
        data.sequence = Array.from({ length: sequenceLength || 3 }, () =>
          Math.floor(Math.random() * 10)
        );
        break;

      case MemoryGameType.ColorMemory:
        // 生成颜色序列
        const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
        data.sequence = Array.from({ length: sequenceLength || 4 }, () => {
          const index = Math.floor(Math.random() * (colorCount || 4));
          return colors[index];
        });
        break;

      case MemoryGameType.ShapePosition:
        // 生成图形位置
        const positions: number[] = [];
        const totalCells = (gridSize || 3) * (gridSize || 3);
        const count = shapeCount || 3;

        while (positions.length < count) {
          const pos = Math.floor(Math.random() * totalCells);
          if (!positions.includes(pos)) {
            positions.push(pos);
          }
        }
        data.positions = positions.sort((a, b) => a - b);
        data.gridSize = gridSize;
        break;

      case MemoryGameType.Space3D:
        // 生成3D位置（将在Three.js组件中实现）
        data.positionCount = positionCount || 5;
        break;

      case MemoryGameType.Comprehensive:
        // 综合记忆：数字+颜色+位置
        data.numberSequence = Array.from({ length: sequenceLength || 5 }, () =>
          Math.floor(Math.random() * 10)
        );
        const colors2 = ['red', 'blue', 'green', 'yellow', 'purple'];
        data.colorSequence = Array.from({ length: colorCount || 4 }, () => {
          const index = Math.floor(Math.random() * colors2.length);
          return colors2[index];
        });
        data.positions = Array.from({ length: positionCount || 3 }, () =>
          Math.floor(Math.random() * 9)
        );
        break;

      default:
        break;
    }

    runInAction(() => {
      this.gameData = data;
    });
  }

  /**
   * 开始记忆阶段
   */
  startMemorizing(): void {
    runInAction(() => {
      this.gameState = GameState.Memorizing;
    });
  }

  /**
   * 开始回忆阶段
   */
  startRecalling(): void {
    runInAction(() => {
      this.gameState = GameState.Recalling;
    });
  }

  /**
   * 提交答案
   */
  submitAnswer(answer: any, timeSpent: number): void {
    if (!this.currentDifficulty || !this.gameData) return;

    const result = this.checkAnswer(answer);
    const expEarned = this.calculateExp(result, timeSpent);

    runInAction(() => {
      this.userAnswer = answer;
      this.gameResult = {
        ...result,
        timeSpent,
        expEarned,
      };
      this.gameState = GameState.Result;
      this.totalRounds++;
      if (result.correct) {
        this.correctRounds++;
        this.consecutiveCorrect++;
      } else {
        this.consecutiveCorrect = 0;
      }
      this.totalExpEarned += expEarned;
    });
  }

  /**
   * 检查答案
   */
  private checkAnswer(answer: any): { correct: boolean; correctRate: number; score: number } {
    if (!this.gameData || !this.currentGameType) {
      return { correct: false, correctRate: 0, score: 0 };
    }

    let correct = false;
    let correctRate = 0;
    let score = 0;

    switch (this.currentGameType) {
      case MemoryGameType.NumberSequence:
      case MemoryGameType.ColorMemory:
        // 检查序列是否完全正确
        const expected = this.gameData.sequence;
        const actual = answer.sequence || [];
        correct = JSON.stringify(expected) === JSON.stringify(actual);
        correctRate = correct ? 1 : 0;
        score = correct ? 100 : 0;
        break;

      case MemoryGameType.ShapePosition:
        // 检查位置是否正确
        const expectedPositions = this.gameData.positions.sort((a: number, b: number) => a - b);
        const actualPositions = (answer.positions || []).sort((a: number, b: number) => a - b);
        const correctCount = expectedPositions.filter((pos: number) =>
          actualPositions.includes(pos)
        ).length;
        correctRate = correctCount / expectedPositions.length;
        correct = correctRate === 1;
        score = Math.round(correctRate * 100);
        break;

      default:
        break;
    }

    return { correct, correctRate, score };
  }

  /**
   * 计算经验值
   */
  private calculateExp(result: { correct: boolean; correctRate: number; score: number }, timeSpent: number): number {
    if (!this.currentDifficulty) return 0;

    // 基础经验值（根据等级）
    const baseExpMap: Record<number, number> = {
      1: 10,
      2: 20,
      3: 50,
      4: 100,
      5: 150,
      6: 200,
      7: 300,
      8: 400,
      9: 500,
      10: 1000,
    };

    const baseExp = baseExpMap[this.currentLevel] || 10;

    // 正确率加成
    const correctRateBonus = result.correctRate;

    // 速度加成（假设平均时间）
    const avgTime = this.currentDifficulty.displayTime * 1000;
    let speedBonus = 1.0;
    if (timeSpent < avgTime * 0.5) {
      speedBonus = 1.3;
    } else if (timeSpent > avgTime * 1.5) {
      speedBonus = 0.8;
    }

    // 连续正确加成
    let consecutiveBonus = 1.0;
    if (this.consecutiveCorrect >= 20) {
      consecutiveBonus = 1.5;
    } else if (this.consecutiveCorrect >= 10) {
      consecutiveBonus = 1.2;
    } else if (this.consecutiveCorrect >= 5) {
      consecutiveBonus = 1.1;
    }

    const finalExp = Math.round(baseExp * correctRateBonus * speedBonus * consecutiveBonus);

    return Math.max(1, finalExp); // 至少1点经验
  }

  /**
   * 提交结果到后端
   */
  async submitResult(): Promise<void> {
    if (!this.memoryItemId || !this.gameResult) return;

    this.loading = true;
    try {
      const result = await abilityApi.addExperience(
        this.memoryItemId,
        this.gameResult.expEarned,
        {
          expType: 'memory_training',
          sourceType: 'game',
          notes: `记忆训练 - ${MemoryGameType[this.currentGameType || MemoryGameType.NumberSequence]} - 等级${this.currentLevel}`,
          metadata: {
            gameType: this.currentGameType,
            level: this.currentLevel,
            correctRate: this.gameResult.correctRate,
            score: this.gameResult.score,
            timeSpent: this.gameResult.timeSpent,
          },
        }
      );

      // 更新用户等级
      await this.loadUserLevel();

      if (result.levelUp) {
        message.success(`恭喜升级到 ${result.newLevel} 级！获得 ${this.gameResult.expEarned} 经验值`);
      } else {
        message.success(`训练完成！获得 ${this.gameResult.expEarned} 经验值`);
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

  /**
   * 重置游戏
   */
  resetGame(): void {
    runInAction(() => {
      this.gameState = GameState.Idle;
      this.gameData = null;
      this.userAnswer = null;
      this.gameResult = null;
      this.totalRounds = 0;
      this.correctRounds = 0;
      this.consecutiveCorrect = 0;
      this.totalExpEarned = 0;
    });
  }

  /**
   * 下一轮
   */
  nextRound(): void {
    this.generateGameData();
    runInAction(() => {
      this.gameState = GameState.Ready;
      this.userAnswer = null;
      this.gameResult = null;
    });
  }
}

export const memoryTrainingStore = new MemoryTrainingStore();


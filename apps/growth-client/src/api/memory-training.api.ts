import { apiClient } from '@/utils/apiClient';

/**
 * 记忆训练游戏
 */
export interface MemoryTrainingGame {
  game_id: string;
  code: string;
  name: string;
  description: string | null;
  icon: string | null;
  game_type: string;
  ability_item_id: string | null;
  min_ability_level: number;
  max_ability_level: number;
  sort_order: number;
  is_published: boolean;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

/**
 * 记忆训练关卡
 */
export interface MemoryTrainingLevel {
  level_id: string;
  game_id: string;
  level_number: number;
  name: string | null;
  description: string | null;
  difficulty_config: Record<string, any>;
  required_ability_level: number;
  base_exp_reward: number;
  unlock_condition: Record<string, any>;
  sort_order: number;
  is_published: boolean;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  // 前端扩展字段
  userProgress?: UserMemoryLevelProgress;
}

/**
 * 用户关卡进度
 */
export interface UserMemoryLevelProgress {
  progress_id: string;
  uid: number;
  level_id: string;
  is_unlocked: boolean;
  is_completed: boolean;
  best_score: number;
  best_correct_rate: number;
  best_time_spent: number | null;
  completion_count: number;
  total_exp_earned: number;
  first_completed_at: string | null;
  last_played_at: string | null;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

/**
 * 游戏结果提交数据
 */
export interface GameResultSubmitData {
  levelId: string;
  resultData: {
    correct: boolean;
    correctRate: number;
    score: number;
    timeSpent: number;
    userAnswer: any;
  };
}

/**
 * 游戏结果提交响应
 */
export interface GameResultSubmitResponse {
  expEarned: number;
  levelUp: boolean;
  newLevel?: number;
  unlockedNextLevel: boolean;
  nextLevelId?: string;
  message?: string;
}

/**
 * 记忆训练 API
 */
export const memoryTrainingApi = {
  /**
   * 获取游戏列表
   */
  async getGames(): Promise<MemoryTrainingGame[]> {
    const response = await apiClient.get<MemoryTrainingGame[]>('/memory-training/games');
    return response.data || [];
  },

  /**
   * 获取游戏详情
   */
  async getGame(gameId: string): Promise<MemoryTrainingGame | null> {
    const response = await apiClient.get<MemoryTrainingGame>(`/memory-training/games/${gameId}`);
    return response.data || null;
  },

  /**
   * 获取游戏关卡列表（包含用户进度）
   */
  async getLevels(gameId: string): Promise<MemoryTrainingLevel[]> {
    const response = await apiClient.get<MemoryTrainingLevel[]>(
      `/memory-training/games/${gameId}/levels`
    );
    return response.data || [];
  },

  /**
   * 获取关卡详情
   */
  async getLevel(levelId: string): Promise<MemoryTrainingLevel | null> {
    const response = await apiClient.get<MemoryTrainingLevel>(`/memory-training/levels/${levelId}`);
    return response.data || null;
  },

  /**
   * 提交游戏结果
   */
  async submitResult(data: GameResultSubmitData): Promise<GameResultSubmitResponse> {
    const response = await apiClient.post<GameResultSubmitResponse>(
      '/memory-training/submit-result',
      data
    );
    if (!response.data) {
      throw new Error('提交结果失败');
    }
    return response.data;
  },

  /**
   * 获取用户所有关卡进度
   */
  async getProgress(): Promise<UserMemoryLevelProgress[]> {
    const response = await apiClient.get<UserMemoryLevelProgress[]>('/memory-training/progress');
    return response.data || [];
  },

  /**
   * 获取指定游戏的用户进度
   */
  async getGameProgress(gameId: string): Promise<UserMemoryLevelProgress[]> {
    const response = await apiClient.get<UserMemoryLevelProgress[]>(
      `/memory-training/games/${gameId}/progress`
    );
    return response.data || [];
  },
};






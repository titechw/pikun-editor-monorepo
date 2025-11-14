import { apiClient } from '@/utils/apiClient';

/**
 * 能力类别
 */
export interface AbilityCategory {
  category_id: string;
  code: string;
  name: string;
  description: string | null;
  sort_order: number;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

/**
 * 能力维度
 */
export interface AbilityDimension {
  dimension_id: string;
  category_id: string;
  code: string;
  name: string;
  description: string | null;
  sort_order: number;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

/**
 * 能力项
 */
export interface AbilityItem {
  item_id: string;
  dimension_id: string;
  code: string;
  name: string;
  description: string | null;
  definition: string | null;
  performance_description: string | null;
  evaluation_points: string | null;
  training_strategies: string | null;
  theoretical_basis: string | null;
  sort_order: number;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

/**
 * 能力项等级配置
 */
export interface AbilityItemLevelConfig {
  config_id: string;
  item_id: string | null;
  level: number;
  required_exp: number;
  requires_assessment: boolean;
  level_name: string | null;
  level_description: string | null;
  is_template: boolean;
  sort_order: number;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

/**
 * 用户能力等级
 */
export interface UserAbilityLevel {
  user_level_id: string;
  uid: number;
  item_id: string;
  current_level: number;
  current_exp: number;
  total_exp: number;
  level_up_count: number;
  last_level_up_at: string | null;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

/**
 * 能力模型 API
 */
export const abilityApi = {
  /**
   * 获取能力类别列表
   */
  async getCategories(): Promise<AbilityCategory[]> {
    const response = await apiClient.get<AbilityCategory[]>('/ability/categories');
    return response.data || [];
  },

  /**
   * 创建能力类别（管理员）
   */
  async createCategory(data: {
    code: string;
    name: string;
    description?: string;
    sort_order?: number;
    metadata?: Record<string, any>;
  }): Promise<AbilityCategory> {
    const response = await apiClient.post<AbilityCategory>('/admin/ability/categories', data);
    if (!response.data) {
      throw new Error('创建失败');
    }
    return response.data;
  },

  /**
   * 更新能力类别（管理员）
   */
  async updateCategory(
    categoryId: string,
    data: {
      code?: string;
      name?: string;
      description?: string;
      sort_order?: number;
      metadata?: Record<string, any>;
    }
  ): Promise<AbilityCategory> {
    const response = await apiClient.put<AbilityCategory>(
      `/admin/ability/categories/${categoryId}`,
      data
    );
    if (!response.data) {
      throw new Error('更新失败');
    }
    return response.data;
  },

  /**
   * 删除能力类别（管理员）
   */
  async deleteCategory(categoryId: string): Promise<void> {
    await apiClient.delete(`/admin/ability/categories/${categoryId}`);
  },

  /**
   * 获取能力维度列表（用户端）
   */
  async getDimensions(categoryId?: string): Promise<AbilityDimension[]> {
    const params = categoryId ? { categoryId } : undefined;
    const response = await apiClient.get<AbilityDimension[]>('/ability/dimensions', params);
    return response.data || [];
  },

  /**
   * 创建能力维度（管理员）
   */
  async createDimension(data: {
    category_id: string;
    code: string;
    name: string;
    description?: string;
    sort_order?: number;
    metadata?: Record<string, any>;
  }): Promise<AbilityDimension> {
    const response = await apiClient.post<AbilityDimension>('/admin/ability/dimensions', data);
    if (!response.data) {
      throw new Error('创建失败');
    }
    return response.data;
  },

  /**
   * 更新能力维度（管理员）
   */
  async updateDimension(
    dimensionId: string,
    data: {
      code?: string;
      name?: string;
      description?: string;
      sort_order?: number;
      metadata?: Record<string, any>;
    }
  ): Promise<AbilityDimension> {
    const response = await apiClient.put<AbilityDimension>(
      `/admin/ability/dimensions/${dimensionId}`,
      data
    );
    if (!response.data) {
      throw new Error('更新失败');
    }
    return response.data;
  },

  /**
   * 删除能力维度（管理员）
   */
  async deleteDimension(dimensionId: string): Promise<void> {
    await apiClient.delete(`/admin/ability/dimensions/${dimensionId}`);
  },

  /**
   * 获取能力项列表
   */
  async getItems(dimensionId?: string): Promise<AbilityItem[]> {
    const params = dimensionId ? { dimensionId } : undefined;
    const response = await apiClient.get<AbilityItem[]>('/ability/items', params);
    return response.data || [];
  },

  /**
   * 创建能力项（管理员）
   */
  async createItem(data: {
    dimension_id: string;
    code: string;
    name: string;
    description?: string;
    definition?: string;
    performance_description?: string;
    evaluation_points?: string;
    training_strategies?: string;
    theoretical_basis?: string;
    sort_order?: number;
    metadata?: Record<string, any>;
  }): Promise<AbilityItem> {
    const response = await apiClient.post<AbilityItem>('/admin/ability/items', data);
    if (!response.data) {
      throw new Error('创建失败');
    }
    return response.data;
  },

  /**
   * 更新能力项（管理员）
   */
  async updateItem(
    itemId: string,
    data: {
      code?: string;
      name?: string;
      description?: string;
      definition?: string;
      performance_description?: string;
      evaluation_points?: string;
      training_strategies?: string;
      theoretical_basis?: string;
      sort_order?: number;
      metadata?: Record<string, any>;
    }
  ): Promise<AbilityItem> {
    const response = await apiClient.put<AbilityItem>(`/admin/ability/items/${itemId}`, data);
    if (!response.data) {
      throw new Error('更新失败');
    }
    return response.data;
  },

  /**
   * 删除能力项（管理员）
   */
  async deleteItem(itemId: string): Promise<void> {
    await apiClient.delete(`/admin/ability/items/${itemId}`);
  },

  /**
   * 获取等级配置列表
   */
  async getLevelConfigs(itemId?: string): Promise<AbilityItemLevelConfig[]> {
    const params = itemId ? { itemId } : undefined;
    const response = await apiClient.get<AbilityItemLevelConfig[]>(
      '/ability/level-configs',
      params
    );
    return response.data || [];
  },

  /**
   * 获取全局模板配置
   */
  async getTemplateConfigs(): Promise<AbilityItemLevelConfig[]> {
    const response = await apiClient.get<AbilityItemLevelConfig[]>(
      '/admin/ability/level-configs/template'
    );
    return response.data || [];
  },

  /**
   * 创建等级配置（管理员）
   */
  async createLevelConfig(data: {
    item_id?: string | null;
    level: number;
    required_exp: number;
    requires_assessment?: boolean;
    level_name?: string;
    level_description?: string;
    is_template?: boolean;
    sort_order?: number;
    metadata?: Record<string, any>;
  }): Promise<AbilityItemLevelConfig> {
    const response = await apiClient.post<AbilityItemLevelConfig>(
      '/admin/ability/level-configs',
      data
    );
    if (!response.data) {
      throw new Error('创建失败');
    }
    return response.data;
  },

  /**
   * 更新等级配置（管理员）
   */
  async updateLevelConfig(
    configId: string,
    data: {
      level?: number;
      required_exp?: number;
      requires_assessment?: boolean;
      level_name?: string;
      level_description?: string;
      sort_order?: number;
      metadata?: Record<string, any>;
    }
  ): Promise<AbilityItemLevelConfig> {
    const response = await apiClient.put<AbilityItemLevelConfig>(
      `/admin/ability/level-configs/${configId}`,
      data
    );
    if (!response.data) {
      throw new Error('更新失败');
    }
    return response.data;
  },

  /**
   * 删除等级配置（管理员）
   */
  async deleteLevelConfig(configId: string): Promise<void> {
    await apiClient.delete(`/admin/ability/level-configs/${configId}`);
  },

  /**
   * 将模板复制到指定能力项（管理员）
   */
  async copyTemplateToItem(itemId: string): Promise<AbilityItemLevelConfig[]> {
    const response = await apiClient.post<AbilityItemLevelConfig[]>(
      '/admin/ability/level-configs/copy-to-item',
      { item_id: itemId }
    );
    return response.data || [];
  },

  /**
   * 获取我的能力等级列表
   */
  async getMyLevels(): Promise<UserAbilityLevel[]> {
    const response = await apiClient.get<UserAbilityLevel[]>('/ability/my-levels');
    return response.data || [];
  },

  /**
   * 获取指定能力项的等级详情
   */
  async getMyLevel(itemId: string): Promise<UserAbilityLevel | null> {
    const response = await apiClient.get<UserAbilityLevel>(`/ability/my-levels/${itemId}`);
    return response.data || null;
  },

  /**
   * 获取经验获得记录
   */
  async getExperienceLogs(options?: {
    itemId?: string;
    expType?: string;
    limit?: number;
    offset?: number;
  }): Promise<UserAbilityExperienceLog[]> {
    const params = options || {};
    const response = await apiClient.get<UserAbilityExperienceLog[]>(
      '/ability/experience/logs',
      params
    );
    return response.data || [];
  },

  /**
   * 增加经验值（测试用）
   */
  async addExperience(
    itemId: string,
    expAmount: number,
    options?: {
      expType?: string;
      sourceId?: string;
      sourceType?: string;
      notes?: string;
    }
  ): Promise<{
    userLevel: UserAbilityLevel;
    levelUp: boolean;
    newLevel?: number;
  }> {
    const response = await apiClient.post<{
      userLevel: UserAbilityLevel;
      levelUp: boolean;
      newLevel?: number;
    }>('/ability/experience/add', {
      item_id: itemId,
      exp_amount: expAmount,
      ...options,
    });
    if (!response.data) {
      throw new Error('增加经验失败');
    }
    return response.data;
  },
};

/**
 * 用户经验获得记录
 */
export interface UserAbilityExperienceLog {
  log_id: string;
  uid: number;
  item_id: string;
  exp_amount: number;
  exp_type: string;
  source_id: string | null;
  source_type: string | null;
  before_level: number;
  after_level: number;
  before_exp: number;
  after_exp: number;
  is_level_up: boolean;
  notes: string | null;
  metadata: Record<string, any>;
  created_at: string;
}


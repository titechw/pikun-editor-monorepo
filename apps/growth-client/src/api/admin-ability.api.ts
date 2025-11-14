import { adminApiClient } from '@/utils/adminApiClient';
import type {
  AbilityCategory,
  AbilityDimension,
  AbilityItem,
  AbilityItemLevelConfig,
} from './ability.api';

/**
 * 管理端能力模型 API（使用 adminApiClient，自动携带 admin_auth_token）
 */
export const adminAbilityApi = {
  /**
   * 获取能力类别列表（管理员）
   */
  async getCategories(): Promise<AbilityCategory[]> {
    const response = await adminApiClient.get<AbilityCategory[]>('/admin/ability/categories');
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
    const response = await adminApiClient.post<AbilityCategory>('/admin/ability/categories', data);
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
    const response = await adminApiClient.put<AbilityCategory>(
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
    await adminApiClient.delete(`/admin/ability/categories/${categoryId}`);
  },

  /**
   * 获取能力维度列表（管理员）
   */
  async getDimensions(categoryId?: string): Promise<AbilityDimension[]> {
    const params = categoryId ? { categoryId } : undefined;
    const response = await adminApiClient.get<AbilityDimension[]>('/admin/ability/dimensions', params);
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
    const response = await adminApiClient.post<AbilityDimension>('/admin/ability/dimensions', data);
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
    const response = await adminApiClient.put<AbilityDimension>(
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
    await adminApiClient.delete(`/admin/ability/dimensions/${dimensionId}`);
  },

  /**
   * 获取能力项列表（管理员）
   */
  async getItems(dimensionId?: string): Promise<AbilityItem[]> {
    const params = dimensionId ? { dimensionId } : undefined;
    const response = await adminApiClient.get<AbilityItem[]>('/admin/ability/items', params);
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
    const response = await adminApiClient.post<AbilityItem>('/admin/ability/items', data);
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
    const response = await adminApiClient.put<AbilityItem>(`/admin/ability/items/${itemId}`, data);
    if (!response.data) {
      throw new Error('更新失败');
    }
    return response.data;
  },

  /**
   * 删除能力项（管理员）
   */
  async deleteItem(itemId: string): Promise<void> {
    await adminApiClient.delete(`/admin/ability/items/${itemId}`);
  },

  /**
   * 获取等级配置列表（管理员）
   */
  async getLevelConfigs(itemId?: string): Promise<AbilityItemLevelConfig[]> {
    const params = itemId ? { itemId } : undefined;
    const response = await adminApiClient.get<AbilityItemLevelConfig[]>(
      '/admin/ability/level-configs',
      params
    );
    return response.data || [];
  },

  /**
   * 获取全局模板配置（管理员）
   */
  async getTemplateConfigs(): Promise<AbilityItemLevelConfig[]> {
    const response = await adminApiClient.get<AbilityItemLevelConfig[]>(
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
    requires_assessment: boolean;
    level_name?: string | null;
    level_description?: string | null;
    is_template?: boolean;
    sort_order?: number;
    metadata?: Record<string, any>;
  }): Promise<AbilityItemLevelConfig> {
    const response = await adminApiClient.post<AbilityItemLevelConfig>(
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
      level_name?: string | null;
      level_description?: string | null;
      sort_order?: number;
      metadata?: Record<string, any>;
    }
  ): Promise<AbilityItemLevelConfig> {
    const response = await adminApiClient.put<AbilityItemLevelConfig>(
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
    await adminApiClient.delete(`/admin/ability/level-configs/${configId}`);
  },

  /**
   * 将模板复制到能力项（管理员）
   */
  async copyTemplateToItem(itemId: string): Promise<void> {
    await adminApiClient.post('/admin/ability/level-configs/copy-to-item', { item_id: itemId });
  },
};


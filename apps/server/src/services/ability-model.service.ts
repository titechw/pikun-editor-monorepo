import { injectable, inject } from 'tsyringe';
import { AbilityCategoryDAO } from '@/dao/ability-category.dao';
import { AbilityDimensionDAO } from '@/dao/ability-dimension.dao';
import { AbilityItemDAO } from '@/dao/ability-item.dao';
import type {
  AbilityCategory,
  AbilityDimension,
  AbilityItem,
} from '@/entities';

/**
 * 能力模型服务
 */
@injectable()
export class AbilityModelService {
  constructor(
    @inject('AbilityCategoryDAO') private categoryDAO: AbilityCategoryDAO,
    @inject('AbilityDimensionDAO') private dimensionDAO: AbilityDimensionDAO,
    @inject('AbilityItemDAO') private itemDAO: AbilityItemDAO
  ) {}

  /**
   * 获取能力模型树形结构
   */
  async getModelTree(): Promise<Array<{
    category: AbilityCategory;
    dimensions: Array<{
      dimension: AbilityDimension;
      items: AbilityItem[];
    }>;
  }>> {
    const categories = await this.categoryDAO.findAll();
    const result = [];

    for (const category of categories) {
      const dimensions = await this.dimensionDAO.findAll(category.category_id);
      const dimensionItems = [];

      for (const dimension of dimensions) {
        const items = await this.itemDAO.findAll(dimension.dimension_id);
        dimensionItems.push({
          dimension,
          items,
        });
      }

      result.push({
        category,
        dimensions: dimensionItems,
      });
    }

    return result;
  }

  /**
   * 获取能力类别列表
   */
  async getCategories(): Promise<AbilityCategory[]> {
    return this.categoryDAO.findAll();
  }

  /**
   * 获取能力类别详情
   */
  async getCategoryById(categoryId: string): Promise<AbilityCategory | null> {
    return this.categoryDAO.findById(categoryId);
  }

  /**
   * 创建能力类别
   */
  async createCategory(data: {
    code: string;
    name: string;
    description?: string;
    sort_order?: number;
    metadata?: Record<string, any>;
  }): Promise<AbilityCategory> {
    return this.categoryDAO.create(data);
  }

  /**
   * 更新能力类别
   */
  async updateCategory(
    categoryId: string,
    updates: {
      code?: string;
      name?: string;
      description?: string;
      sort_order?: number;
      metadata?: Record<string, any>;
    }
  ): Promise<AbilityCategory> {
    return this.categoryDAO.update(categoryId, updates);
  }

  /**
   * 删除能力类别
   */
  async deleteCategory(categoryId: string): Promise<void> {
    return this.categoryDAO.delete(categoryId);
  }

  /**
   * 获取能力维度列表
   */
  async getDimensions(categoryId?: string): Promise<AbilityDimension[]> {
    return this.dimensionDAO.findAll(categoryId);
  }

  /**
   * 获取能力维度详情
   */
  async getDimensionById(dimensionId: string): Promise<AbilityDimension | null> {
    return this.dimensionDAO.findById(dimensionId);
  }

  /**
   * 创建能力维度
   */
  async createDimension(data: {
    category_id: string;
    code: string;
    name: string;
    description?: string;
    sort_order?: number;
    metadata?: Record<string, any>;
  }): Promise<AbilityDimension> {
    return this.dimensionDAO.create(data);
  }

  /**
   * 更新能力维度
   */
  async updateDimension(
    dimensionId: string,
    updates: {
      code?: string;
      name?: string;
      description?: string;
      sort_order?: number;
      metadata?: Record<string, any>;
    }
  ): Promise<AbilityDimension> {
    return this.dimensionDAO.update(dimensionId, updates);
  }

  /**
   * 删除能力维度
   */
  async deleteDimension(dimensionId: string): Promise<void> {
    return this.dimensionDAO.delete(dimensionId);
  }

  /**
   * 获取能力项列表
   */
  async getItems(dimensionId?: string): Promise<AbilityItem[]> {
    return this.itemDAO.findAll(dimensionId);
  }

  /**
   * 获取能力项详情
   */
  async getItemById(itemId: string): Promise<AbilityItem | null> {
    return this.itemDAO.findById(itemId);
  }

  /**
   * 创建能力项
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
    talent_ratio?: number;
    acquired_training_ratio?: number;
    sort_order?: number;
    metadata?: Record<string, any>;
  }): Promise<AbilityItem> {
    return this.itemDAO.create(data);
  }

  /**
   * 更新能力项
   */
  async updateItem(
    itemId: string,
    updates: {
      code?: string;
      name?: string;
      description?: string;
      definition?: string;
      performance_description?: string;
      evaluation_points?: string;
      training_strategies?: string;
      theoretical_basis?: string;
      talent_ratio?: number;
      acquired_training_ratio?: number;
      sort_order?: number;
      metadata?: Record<string, any>;
    }
  ): Promise<AbilityItem> {
    return this.itemDAO.update(itemId, updates);
  }

  /**
   * 删除能力项
   */
  async deleteItem(itemId: string): Promise<void> {
    return this.itemDAO.delete(itemId);
  }
}


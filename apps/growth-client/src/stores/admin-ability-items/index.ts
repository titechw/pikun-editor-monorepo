import { makeObservable, runInAction } from 'mobx';
import { message } from 'antd';
import { adminAbilityApi } from '@/api/admin-ability.api';
import type { AbilityItem, AbilityDimension, AbilityCategory } from '@/api/ability.api';
import {
  BaseListStore,
  BaseListItem,
  BaseListParams,
  BaseListResponse,
  BaseOperationType,
} from '@/stores/base/BaseListStore';

/**
 * 能力项列表项
 */
export interface AbilityItemListItem extends BaseListItem {
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
  talent_ratio: number;
  acquired_training_ratio: number;
  sort_order: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

/**
 * 能力项操作类型
 */
export enum AbilityItemOperationType {
  View = 'view',
  Edit = 'edit',
  Delete = 'delete',
}

/**
 * 能力项列表 Store
 */
export class AbilityItemListStore extends BaseListStore<
  AbilityItemListItem,
  AbilityItemOperationType
> {
  // 额外的状态
  dimensions: AbilityDimension[] = [];
  categories: AbilityCategory[] = [];
  activeTab = '';

  constructor() {
    super();
    makeObservable(this, {
      dimensions: true,
      categories: true,
      activeTab: true,
    });
    this.loadColumnSettings();
  }

  /**
   * 设置激活的 Tab
   */
  setActiveTab = (tab: string): void => {
    this.activeTab = tab;
  };

  /**
   * 加载类别列表
   */
  async loadCategories(): Promise<void> {
    try {
      const data = await adminAbilityApi.getCategories();
      const sorted = data.sort((a, b) => a.sort_order - b.sort_order);
      runInAction(() => {
        this.categories = sorted;
        if (sorted.length > 0 && !this.activeTab) {
          this.activeTab = sorted[0].category_id;
        }
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '加载类别失败，请重试';
      message.error(errorMessage);
      throw error;
    }
  }

  /**
   * 加载维度列表
   */
  async loadDimensions(): Promise<void> {
    try {
      const data = await adminAbilityApi.getDimensions();
      runInAction(() => {
        this.dimensions = data;
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '加载维度失败，请重试';
      message.error(errorMessage);
      throw error;
    }
  }

  /**
   * 实现抽象方法：查询数据
   */
  protected async queryData(params: BaseListParams): Promise<BaseListResponse<AbilityItemListItem>> {
    const response = await adminAbilityApi.getItems();
    // 转换为列表项格式
    const listItems: AbilityItemListItem[] = response.map((item) => ({
      ...item,
      id: item.item_id,
    }));

    // 按排序字段排序
    const sorted = listItems.sort((a, b) => a.sort_order - b.sort_order);

    return {
      data: sorted,
      pagination: {
        current: 1,
        pageSize: sorted.length,
        total: sorted.length,
      },
    };
  }

  /**
   * 实现抽象方法：获取数据
   */
  async fetchData(params?: Partial<BaseListParams>): Promise<void> {
    this.setLoading(true);
    try {
      const queryParams: BaseListParams = {
        current: this.pagination.current,
        pageSize: this.pagination.pageSize,
        filter: this.filter,
        ...params,
      };

      const result = await this.queryData(queryParams);

      runInAction(() => {
        this.setData(result.data);
        this.setPagination(result.pagination);
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '获取数据失败，请重试';
      message.error(errorMessage);
      throw error;
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  }

  /**
   * 实现抽象方法：处理单个操作
   */
  async handleOperation(type: AbilityItemOperationType, record: AbilityItemListItem): Promise<void> {
    await this.processOperation(type, record);
  }

  /**
   * 实现抽象方法：处理批量操作
   */
  async handleBatchOperation(): Promise<void> {
    // 能力项暂不支持批量操作
  }

  /**
   * 实现抽象方法：处理具体操作逻辑
   */
  protected async processOperation(
    type: AbilityItemOperationType,
    record: AbilityItemListItem
  ): Promise<void> {
    switch (type) {
      case AbilityItemOperationType.View:
        // 查看详情逻辑
        break;
      case AbilityItemOperationType.Edit:
        // 编辑逻辑由组件处理
        break;
      case AbilityItemOperationType.Delete:
        await adminAbilityApi.deleteItem(record.item_id);
        message.success('删除成功');
        await this.fetchData();
        break;
    }
  }

  /**
   * 实现抽象方法：处理批量操作逻辑
   */
  protected async processBatchOperation(): Promise<void> {
    // 能力项暂不支持批量操作
  }

  /**
   * 实现抽象方法：获取列配置存储键
   */
  getColumnStorageKey(): string {
    return 'ability_item_list_column_settings';
  }

  /**
   * 实现抽象方法：加载列配置
   */
  loadColumnSettings(): void {
    const storageKey = this.getColumnStorageKey();
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        this.columnSettings = JSON.parse(saved);
      } catch (error) {
        console.error('加载列配置失败:', error);
      }
    }
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
  }): Promise<void> {
    try {
      await adminAbilityApi.createItem(data);
      message.success('创建成功');
      await this.fetchData();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '创建失败，请重试';
      message.error(errorMessage);
      throw error;
    }
  }

  /**
   * 更新能力项
   */
  async updateItem(itemId: string, data: {
    dimension_id?: string;
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
  }): Promise<void> {
    try {
      await adminAbilityApi.updateItem(itemId, data);
      message.success('更新成功');
      await this.fetchData();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '更新失败，请重试';
      message.error(errorMessage);
      throw error;
    }
  }
}

export const abilityItemListStore = new AbilityItemListStore();


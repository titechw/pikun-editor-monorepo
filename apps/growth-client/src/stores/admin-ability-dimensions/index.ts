import { makeObservable, runInAction } from 'mobx';
import { message } from 'antd';
import { adminAbilityApi } from '@/api/admin-ability.api';
import type { AbilityDimension, AbilityCategory } from '@/api/ability.api';
import {
  BaseListStore,
  BaseListItem,
  BaseListParams,
  BaseListResponse,
  BaseOperationType,
} from '@/stores/base/BaseListStore';

/**
 * 能力维度列表项
 */
export interface AbilityDimensionListItem extends BaseListItem {
  dimension_id: string;
  category_id: string;
  code: string;
  name: string;
  description: string | null;
  sort_order: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

/**
 * 能力维度操作类型
 */
export enum AbilityDimensionOperationType {
  View = 'view',
  Edit = 'edit',
  Delete = 'delete',
}

/**
 * 能力维度列表 Store
 */
export class AbilityDimensionListStore extends BaseListStore<
  AbilityDimensionListItem,
  AbilityDimensionOperationType
> {
  // 额外的状态
  categories: AbilityCategory[] = [];
  activeTab = '';

  constructor() {
    super();
    makeObservable(this, {
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
   * 实现抽象方法：查询数据
   */
  protected async queryData(params: BaseListParams): Promise<BaseListResponse<AbilityDimensionListItem>> {
    const response = await adminAbilityApi.getDimensions();
    // 转换为列表项格式
    const listItems: AbilityDimensionListItem[] = response.map((item) => ({
      ...item,
      id: item.dimension_id,
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
  async handleOperation(type: AbilityDimensionOperationType, record: AbilityDimensionListItem): Promise<void> {
    await this.processOperation(type, record);
  }

  /**
   * 实现抽象方法：处理批量操作
   */
  async handleBatchOperation(): Promise<void> {
    // 能力维度暂不支持批量操作
  }

  /**
   * 实现抽象方法：处理具体操作逻辑
   */
  protected async processOperation(
    type: AbilityDimensionOperationType,
    record: AbilityDimensionListItem
  ): Promise<void> {
    switch (type) {
      case AbilityDimensionOperationType.View:
        // 查看详情逻辑
        break;
      case AbilityDimensionOperationType.Edit:
        // 编辑逻辑由组件处理
        break;
      case AbilityDimensionOperationType.Delete:
        await adminAbilityApi.deleteDimension(record.dimension_id);
        message.success('删除成功');
        await this.fetchData();
        break;
    }
  }

  /**
   * 实现抽象方法：处理批量操作逻辑
   */
  protected async processBatchOperation(): Promise<void> {
    // 能力维度暂不支持批量操作
  }

  /**
   * 实现抽象方法：获取列配置存储键
   */
  getColumnStorageKey(): string {
    return 'ability_dimension_list_column_settings';
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
   * 创建能力维度
   */
  async createDimension(data: {
    category_id: string;
    code: string;
    name: string;
    description?: string;
    sort_order?: number;
  }): Promise<void> {
    try {
      await adminAbilityApi.createDimension(data);
      message.success('创建成功');
      await this.fetchData();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '创建失败，请重试';
      message.error(errorMessage);
      throw error;
    }
  }

  /**
   * 更新能力维度
   */
  async updateDimension(dimensionId: string, data: {
    category_id?: string;
    code?: string;
    name?: string;
    description?: string;
    sort_order?: number;
  }): Promise<void> {
    try {
      await adminAbilityApi.updateDimension(dimensionId, data);
      message.success('更新成功');
      await this.fetchData();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '更新失败，请重试';
      message.error(errorMessage);
      throw error;
    }
  }
}

export const abilityDimensionListStore = new AbilityDimensionListStore();


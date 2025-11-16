import { makeObservable, runInAction } from 'mobx';
import { message } from 'antd';
import { adminAbilityApi } from '@/api/admin-ability.api';
import type { AbilityCategory } from '@/api/ability.api';
import {
  BaseListStore,
  BaseListItem,
  BaseListParams,
  BaseListResponse,
  BaseOperationType,
} from '@/stores/base/BaseListStore';

/**
 * 能力类别列表项
 */
export interface AbilityCategoryListItem extends BaseListItem {
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
 * 能力类别操作类型
 */
export enum AbilityCategoryOperationType {
  View = 'view',
  Edit = 'edit',
  Delete = 'delete',
}

/**
 * 能力类别列表 Store
 */
export class AbilityCategoryListStore extends BaseListStore<
  AbilityCategoryListItem,
  AbilityCategoryOperationType
> {
  constructor() {
    super();
    makeObservable(this, {
      // BaseListStore 已经定义了 observable，这里只需要添加新的
    });
    this.loadColumnSettings();
  }

  /**
   * 实现抽象方法：查询数据
   */
  protected async queryData(params: BaseListParams): Promise<BaseListResponse<AbilityCategoryListItem>> {
    const response = await adminAbilityApi.getCategories();
    // 转换为列表项格式
    const listItems: AbilityCategoryListItem[] = response.map((item) => ({
      ...item,
      id: item.category_id,
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
  async handleOperation(type: AbilityCategoryOperationType, record: AbilityCategoryListItem): Promise<void> {
    await this.processOperation(type, record);
  }

  /**
   * 实现抽象方法：处理批量操作
   */
  async handleBatchOperation(): Promise<void> {
    // 能力类别暂不支持批量操作
  }

  /**
   * 实现抽象方法：处理具体操作逻辑
   */
  protected async processOperation(
    type: AbilityCategoryOperationType,
    record: AbilityCategoryListItem
  ): Promise<void> {
    switch (type) {
      case AbilityCategoryOperationType.View:
        // 查看详情逻辑
        break;
      case AbilityCategoryOperationType.Edit:
        // 编辑逻辑由组件处理
        break;
      case AbilityCategoryOperationType.Delete:
        await adminAbilityApi.deleteCategory(record.category_id);
        message.success('删除成功');
        await this.fetchData();
        break;
    }
  }

  /**
   * 实现抽象方法：处理批量操作逻辑
   */
  protected async processBatchOperation(): Promise<void> {
    // 能力类别暂不支持批量操作
  }

  /**
   * 实现抽象方法：获取列配置存储键
   */
  getColumnStorageKey(): string {
    return 'ability_category_list_column_settings';
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
   * 创建能力类别
   */
  async createCategory(data: {
    code: string;
    name: string;
    description?: string;
    sort_order?: number;
  }): Promise<void> {
    try {
      await adminAbilityApi.createCategory(data);
      message.success('创建成功');
      await this.fetchData();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '创建失败，请重试';
      message.error(errorMessage);
      throw error;
    }
  }

  /**
   * 更新能力类别
   */
  async updateCategory(categoryId: string, data: {
    code?: string;
    name?: string;
    description?: string;
    sort_order?: number;
  }): Promise<void> {
    try {
      await adminAbilityApi.updateCategory(categoryId, data);
      message.success('更新成功');
      await this.fetchData();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '更新失败，请重试';
      message.error(errorMessage);
      throw error;
    }
  }
}

export const abilityCategoryListStore = new AbilityCategoryListStore();


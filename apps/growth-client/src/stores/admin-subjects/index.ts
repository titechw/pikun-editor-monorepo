import { makeObservable, runInAction, observable } from 'mobx';
import { message } from 'antd';
import { adminSubjectApi, type Subject, type SubjectCategory } from '@/api/admin-subject.api';
import {
  BaseListStore,
  BaseListItem,
  BaseListParams,
  BaseListResponse,
} from '@/stores/base/BaseListStore';

/**
 * 学科列表项
 */
export interface SubjectListItem extends BaseListItem {
  subject_id: string;
  category_id: string;
  code: string;
  name: string;
  short_name: string | null;
  icon_url: string | null;
  cover_image_url: string | null;
  sort_order: number;
  is_published: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

/**
 * 学科操作类型
 */
export enum SubjectOperationType {
  View = 'view',
  Edit = 'edit',
  Delete = 'delete',
}

/**
 * 学科列表 Store
 */
export class SubjectListStore extends BaseListStore<
  SubjectListItem,
  SubjectOperationType
> {
  categories: SubjectCategory[] = [];
  selectedCategoryId: string | null = null;
  searchKeyword: string = ''; // 搜索关键词

  constructor() {
    super();
    makeObservable(this, {
      categories: observable,
      selectedCategoryId: observable,
      searchKeyword: observable,
    });
    // 设置默认分页大小为 12
    this.pagination.pageSize = 12;
    this.loadColumnSettings();
  }

  /**
   * 加载分类列表
   */
  async loadCategories(): Promise<void> {
    try {
      const cats = await adminSubjectApi.getCategories();
      runInAction(() => {
        this.categories = cats;
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '获取分类失败，请重试';
      message.error(errorMessage);
    }
  }

  /**
   * 设置选中的分类
   */
  setSelectedCategoryId(categoryId: string | null): void {
    this.selectedCategoryId = categoryId;
    // 切换分类时重置到第一页
    this.pagination.current = 1;
  }

  /**
   * 实现抽象方法：查询数据
   */
  protected async queryData(params: BaseListParams): Promise<BaseListResponse<SubjectListItem>> {
    const response = await adminSubjectApi.getSubjects(this.selectedCategoryId || null, {
      current: params.current,
      pageSize: params.pageSize,
      keyword: this.searchKeyword || undefined,
    });
    const listItems: SubjectListItem[] = response.data.map((item) => ({
      ...item,
      id: item.subject_id,
    }));

    const sorted = listItems.slice().sort((a, b) => a.sort_order - b.sort_order);

    return {
      data: sorted,
      pagination: response.pagination,
    };
  }

  /**
   * 设置搜索关键词
   */
  setSearchKeyword(keyword: string): void {
    this.searchKeyword = keyword;
    this.pagination.current = 1;
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
  async handleOperation(type: SubjectOperationType, record: SubjectListItem): Promise<void> {
    await this.processOperation(type, record);
  }

  /**
   * 实现抽象方法：处理批量操作
   */
  async handleBatchOperation(): Promise<void> {
    // 学科暂不支持批量操作
  }

  /**
   * 实现抽象方法：处理具体操作逻辑
   */
  protected async processOperation(
    type: SubjectOperationType,
    record: SubjectListItem
  ): Promise<void> {
    switch (type) {
      case SubjectOperationType.View:
        break;
      case SubjectOperationType.Edit:
        break;
      case SubjectOperationType.Delete:
        await adminSubjectApi.deleteSubject(record.subject_id);
        message.success('删除成功');
        await this.fetchData();
        break;
    }
  }

  /**
   * 实现抽象方法：处理批量操作逻辑
   */
  protected async processBatchOperation(): Promise<void> {
    // 学科暂不支持批量操作
  }

  /**
   * 实现抽象方法：获取列配置存储键
   */
  getColumnStorageKey(): string {
    return 'subject_list_column_settings';
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
   * 创建学科
   */
  async createSubject(data: {
    category_id: string;
    code: string;
    name: string;
    short_name?: string;
    icon_url?: string;
    cover_image_url?: string;
    sort_order?: number;
    is_published?: boolean;
  }): Promise<void> {
    try {
      await adminSubjectApi.createSubject(data);
      message.success('创建成功');
      await this.fetchData();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '创建失败，请重试';
      message.error(errorMessage);
      throw error;
    }
  }

  /**
   * 更新学科
   */
  async updateSubject(subjectId: string, data: {
    category_id?: string;
    code?: string;
    name?: string;
    short_name?: string;
    icon_url?: string;
    cover_image_url?: string;
    sort_order?: number;
    is_published?: boolean;
  }): Promise<void> {
    try {
      await adminSubjectApi.updateSubject(subjectId, data);
      message.success('更新成功');
      await this.fetchData();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '更新失败，请重试';
      message.error(errorMessage);
      throw error;
    }
  }
}

export const subjectListStore = new SubjectListStore();


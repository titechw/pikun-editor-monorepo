import { makeObservable, runInAction, observable } from 'mobx';
import { message } from 'antd';
import { adminSubjectApi, type SubjectCategory } from '@/api/admin-subject.api';
import {
  BaseListStore,
  BaseListItem,
  BaseListParams,
  BaseListResponse,
} from '@/stores/base/BaseListStore';

/**
 * 学科分类列表项
 */
export interface SubjectCategoryListItem extends BaseListItem {
  category_id: string;
  parent_id: string | null;
  code: string;
  name: string;
  description: string | null;
  icon_url: string | null;
  level: number;
  path: string | null;
  sort_order: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  children?: SubjectCategoryListItem[];
}

/**
 * 学科分类操作类型
 */
export enum SubjectCategoryOperationType {
  View = 'view',
  Edit = 'edit',
  Delete = 'delete',
}

/**
 * 学科分类列表 Store
 */
export class SubjectCategoryListStore extends BaseListStore<
  SubjectCategoryListItem,
  SubjectCategoryOperationType
> {
  categoryTree: SubjectCategoryListItem[] = [];
  selectedParentId: string | null = null; // null 表示顶级分类
  searchKeyword: string = ''; // 搜索关键词
  loadedNodes: Set<string> = new Set(); // 已加载的节点（用于懒加载）

  constructor() {
    super();
    makeObservable(this, {
      categoryTree: observable,
      selectedParentId: observable,
      searchKeyword: observable,
      loadedNodes: observable,
    });
    // 设置默认分页大小为 12
    this.pagination.pageSize = 12;
    this.loadColumnSettings();
  }

  /**
   * 实现抽象方法：查询数据
   */
  protected async queryData(params: BaseListParams): Promise<BaseListResponse<SubjectCategoryListItem>> {
    // 如果 selectedParentId 是 null，表示查询顶级分类；如果是 undefined，表示查询所有分类
    // 这里我们明确传递 null 来查询顶级分类
    const response = await adminSubjectApi.getCategories(this.selectedParentId ?? null, {
      current: params.current,
      pageSize: params.pageSize,
      keyword: this.searchKeyword || undefined,
    });
    // 列表数据不应该包含 children，只保留基本字段
    const listItems: SubjectCategoryListItem[] = response.data.map((item) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { children: _children, ...rest } = item as SubjectCategoryListItem & { children?: unknown };
      return {
        ...rest,
        id: item.category_id,
      } as SubjectCategoryListItem;
    });

    const sorted = listItems.slice().sort((a, b) => a.sort_order - b.sort_order);

    return {
      data: sorted,
      pagination: response.pagination,
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
   * 加载分类树（懒加载：只加载顶层）
   */
  async loadCategoryTree(): Promise<void> {
    try {
      // 只加载顶层分类
      const topLevelCategories = await adminSubjectApi.getCategoryChildren(null);
      runInAction(() => {
        this.categoryTree = topLevelCategories.map((item) => ({
          ...item,
          id: item.category_id,
          children: undefined, // 懒加载，不加载子节点
        } as SubjectCategoryListItem));
        // 标记顶层节点已加载
        topLevelCategories.forEach((cat) => {
          this.loadedNodes.add(cat.category_id);
        });
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '获取分类树失败，请重试';
      message.error(errorMessage);
    }
  }

  /**
   * 加载指定节点的子分类（懒加载）
   */
  async loadCategoryChildren(parentId: string | null): Promise<void> {
    try {
      const children = await adminSubjectApi.getCategoryChildren(parentId);
      runInAction(() => {
        const convertChildren = (nodes: SubjectCategory[]): SubjectCategoryListItem[] => {
          return nodes.map((item) => ({
            ...item,
            id: item.category_id,
            children: undefined, // 懒加载，不加载子节点
          } as SubjectCategoryListItem));
        };

        const updateTree = (nodes: SubjectCategoryListItem[]): SubjectCategoryListItem[] => {
          return nodes.map((node) => {
            if (node.category_id === parentId || (parentId === null && node.parent_id === null)) {
              return {
                ...node,
                children: convertChildren(children),
              };
            }
            if (node.children) {
              return {
                ...node,
                children: updateTree(node.children),
              };
            }
            return node;
          });
        };

        this.categoryTree = updateTree(this.categoryTree);
        // 标记子节点已加载
        children.forEach((cat) => {
          this.loadedNodes.add(cat.category_id);
        });
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '获取子分类失败，请重试';
      message.error(errorMessage);
    }
  }

  /**
   * 设置搜索关键词
   */
  setSearchKeyword(keyword: string): void {
    this.searchKeyword = keyword;
    this.pagination.current = 1;
  }

  /**
   * 设置选中的父分类
   */
  setSelectedParentId(parentId: string | null): void {
    this.selectedParentId = parentId;
    // 切换分类时重置到第一页
    this.pagination.current = 1;
  }

  /**
   * 实现抽象方法：处理单个操作
   */
  async handleOperation(type: SubjectCategoryOperationType, record: SubjectCategoryListItem): Promise<void> {
    await this.processOperation(type, record);
  }

  /**
   * 实现抽象方法：处理批量操作
   */
  async handleBatchOperation(): Promise<void> {
    // 学科分类暂不支持批量操作
  }

  /**
   * 实现抽象方法：处理具体操作逻辑
   */
  protected async processOperation(
    type: SubjectCategoryOperationType,
    record: SubjectCategoryListItem
  ): Promise<void> {
    switch (type) {
      case SubjectCategoryOperationType.View:
        break;
      case SubjectCategoryOperationType.Edit:
        break;
      case SubjectCategoryOperationType.Delete:
        await adminSubjectApi.deleteCategory(record.category_id);
        message.success('删除成功');
        await this.fetchData();
        await this.loadCategoryTree();
        break;
    }
  }

  /**
   * 实现抽象方法：处理批量操作逻辑
   */
  protected async processBatchOperation(): Promise<void> {
    // 学科分类暂不支持批量操作
  }

  /**
   * 实现抽象方法：获取列配置存储键
   */
  getColumnStorageKey(): string {
    return 'subject_category_list_column_settings';
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
   * 创建学科分类
   */
  async createCategory(data: {
    parent_id?: string | null;
    code: string;
    name: string;
    description?: string;
    icon_url?: string;
    sort_order?: number;
  }): Promise<void> {
    try {
      await adminSubjectApi.createCategory(data);
      message.success('创建成功');
      await this.fetchData();
      await this.loadCategoryTree();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '创建失败，请重试';
      message.error(errorMessage);
      throw error;
    }
  }

  /**
   * 更新学科分类
   */
  async updateCategory(categoryId: string, data: {
    parent_id?: string | null;
    code?: string;
    name?: string;
    description?: string;
    icon_url?: string;
    sort_order?: number;
  }): Promise<void> {
    try {
      await adminSubjectApi.updateCategory(categoryId, data);
      message.success('更新成功');
      await this.fetchData();
      await this.loadCategoryTree();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '更新失败，请重试';
      message.error(errorMessage);
      throw error;
    }
  }
}

export const subjectCategoryListStore = new SubjectCategoryListStore();


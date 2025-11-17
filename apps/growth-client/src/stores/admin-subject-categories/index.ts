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
  children_count?: number; // 子分类数量
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
  filteredCategoryTree: SubjectCategoryListItem[] = []; // 过滤后的分类树（用于搜索）
  selectedParentId: string | null = null; // null 表示顶级分类
  searchKeyword: string = ''; // 搜索关键词（用于左侧树搜索）
  loadedNodes: Set<string> = new Set(); // 已加载的节点（用于懒加载）
  loadingChildren: Set<string> = new Set(); // 正在加载子节点的节点ID集合

  constructor() {
    super();
    makeObservable(this, {
      categoryTree: observable,
      filteredCategoryTree: observable,
      selectedParentId: observable,
      searchKeyword: observable,
      loadedNodes: observable,
      loadingChildren: observable,
    });
    // 设置默认分页大小为 12
    this.pagination.pageSize = 8;
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
    this.setLoading(true);
    try {
      // 使用 getCategories 获取顶层分类（支持分页，返回 children_count）
      // 先获取第一页，如果需要可以后续加载更多
      const result = await adminSubjectApi.getCategories(null, {
        current: 1,
        pageSize: 100, // 获取足够多的顶层分类
      });
      const topLevelCategories = result.data;
      runInAction(() => {
        this.categoryTree = topLevelCategories.map((item) => ({
          ...item,
          id: item.category_id,
          children: undefined, // 懒加载，不加载子节点
          children_count: (item as SubjectCategory & { children_count?: number }).children_count, // 保留子分类数量
        } as SubjectCategoryListItem));
        // 注意：不在这里标记顶层节点为已加载，因为它们的子节点还没有加载
        // loadedNodes 只用来标记"已经加载过子节点的节点"
        // 初始化时，如果没有搜索关键词，直接设置 filteredCategoryTree
        if (!this.searchKeyword || this.searchKeyword.trim() === '') {
          this.filteredCategoryTree = this.categoryTree;
        } else {
          // 如果有搜索关键词，需要过滤
          this.filterCategoryTree();
        }
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '获取分类树失败，请重试';
      message.error(errorMessage);
      runInAction(() => {
        this.categoryTree = [];
      });
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  }

  /**
   * 加载指定节点的子分类（懒加载）
   */
  async loadCategoryChildren(parentId: string | null): Promise<void> {
    const key = parentId || 'null';
    
    // 如果正在加载，直接返回
    if (this.loadingChildren.has(key)) {
      console.log('正在加载中，跳过:', key);
      return;
    }
    
    // 如果已加载，直接返回
    if (this.loadedNodes.has(key)) {
      console.log('已加载，跳过:', key);
      return;
    }

    runInAction(() => {
      this.loadingChildren.add(key);
    });

    try {
      console.log('开始加载子分类，parentId:', parentId, 'key:', key);
      const children = await adminSubjectApi.getCategoryChildren(parentId);
      console.log('子分类加载完成，数量:', children.length, children);
      
      runInAction(() => {
        const convertChildren = (nodes: SubjectCategory[]): SubjectCategoryListItem[] => {
          return nodes.map((item) => ({
            ...item,
            id: item.category_id,
            children: undefined, // 懒加载，不加载子节点
            children_count: (item as SubjectCategory & { children_count?: number }).children_count, // 保留子分类数量
          } as SubjectCategoryListItem));
        };

        const updateTree = (nodes: SubjectCategoryListItem[]): SubjectCategoryListItem[] => {
          return nodes.map((node) => {
            // 匹配当前节点
            if (node.category_id === parentId) {
              return {
                ...node,
                children: convertChildren(children),
              };
            }
            // 递归更新子节点
            if (node.children && node.children.length > 0) {
              return {
                ...node,
                children: updateTree(node.children),
              };
            }
            return node;
          });
        };

        this.categoryTree = updateTree(this.categoryTree);
        // 标记当前节点的子节点已加载（注意：这里标记的是父节点，表示它的子节点已经加载过）
        this.loadedNodes.add(key);
        // 注意：不需要标记子节点本身，因为子节点的子节点还没有加载
        // 更新过滤后的树（只在有搜索关键词时才需要重新过滤）
        if (this.searchKeyword && this.searchKeyword.trim() !== '') {
          this.filterCategoryTree();
        } else {
          // 如果没有搜索关键词，直接更新 filteredCategoryTree 为 categoryTree
          this.filteredCategoryTree = this.categoryTree;
        }
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '获取子分类失败，请重试';
      message.error(errorMessage);
    } finally {
      runInAction(() => {
        this.loadingChildren.delete(key);
      });
    }
  }

  /**
   * 设置搜索关键词（用于左侧树搜索）
   */
  setSearchKeyword(keyword: string): void {
    this.searchKeyword = keyword;
    this.filterCategoryTree();
  }

  /**
   * 过滤分类树（根据搜索关键词）
   * 优化：只在有搜索关键词时才进行过滤，避免不必要的计算
   */
  filterCategoryTree(): void {
    // 如果搜索关键词为空，直接设置 filteredCategoryTree 为 categoryTree
    if (!this.searchKeyword || this.searchKeyword.trim() === '') {
      runInAction(() => {
        this.filteredCategoryTree = this.categoryTree;
      });
      return;
    }

    const keyword = this.searchKeyword.toLowerCase().trim();
    
    // 使用 runInAction 包装，确保状态更新是原子的
    runInAction(() => {
      const filterTree = (nodes: SubjectCategoryListItem[]): SubjectCategoryListItem[] => {
        const result: SubjectCategoryListItem[] = [];
        for (const node of nodes) {
          const matches = 
            node.name.toLowerCase().includes(keyword) || 
            node.code.toLowerCase().includes(keyword);
          
          const filteredChildren = node.children && node.children.length > 0 
            ? filterTree(node.children) 
            : [];
          
          if (matches || filteredChildren.length > 0) {
            result.push({
              ...node,
              children: filteredChildren.length > 0 ? filteredChildren : node.children,
            });
          }
        }
        return result;
      };

      this.filteredCategoryTree = filterTree(this.categoryTree);
    });
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


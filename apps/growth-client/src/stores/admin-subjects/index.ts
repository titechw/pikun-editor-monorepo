import { makeObservable, runInAction, observable } from 'mobx';
import { message } from 'antd';
import { adminSubjectApi, type Subject, type SubjectCategory } from '@/api/admin-subject.api';
import {
  BaseListStore,
  BaseListItem,
  BaseListParams,
  BaseListResponse,
} from '@/stores/base/BaseListStore';
import type { SubjectCategoryListItem } from '@/stores/admin-subject-categories';

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
  categoryTree: SubjectCategoryListItem[] = []; // 分类树数据
  filteredCategoryTree: SubjectCategoryListItem[] = []; // 过滤后的分类树
  selectedCategoryId: string | null = null;
  categorySearchKeyword: string = ''; // 搜索关键词（用于搜索分类树）
  subjectSearchKeyword: string = ''; // 搜索关键词（用于搜索学科）
  loadedNodes: Set<string> = new Set(); // 已加载子节点的节点key集合
  loadingChildren: Set<string> = new Set(); // 正在加载子节点的节点key集合

  constructor() {
    super();
    makeObservable(this, {
      categories: observable,
      categoryTree: observable,
      filteredCategoryTree: observable,
      selectedCategoryId: observable,
      categorySearchKeyword: observable,
      subjectSearchKeyword: observable,
      loadedNodes: observable,
      loadingChildren: observable,
    });
    // 设置默认分页大小为 8
    this.pagination.pageSize = 8;
    this.loadColumnSettings();
  }

  /**
   * 加载分类树（懒加载：只加载顶层）
   */
  async loadCategoryTree(): Promise<void> {
    try {
      // 使用 getCategories 获取顶层分类（支持分页，返回 children_count）
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
          children_count: (item as SubjectCategory & { children_count?: number }).children_count,
        } as SubjectCategoryListItem));
        // 初始化时，如果没有搜索关键词，直接设置 filteredCategoryTree
        if (!this.categorySearchKeyword || this.categorySearchKeyword.trim() === '') {
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
        this.filteredCategoryTree = [];
      });
    }
  }

  /**
   * 加载指定节点的子分类（懒加载）
   */
  async loadCategoryChildren(parentId: string | null): Promise<void> {
    const key = parentId || 'null';
    // 如果已经加载过，跳过
    if (this.loadedNodes.has(key)) {
      return;
    }

    // 如果正在加载，跳过
    if (this.loadingChildren.has(key)) {
      return;
    }

    this.loadingChildren.add(key);
    try {
      const result = await adminSubjectApi.getCategories(parentId, {
        current: 1,
        pageSize: 100,
      });
      const children = result.data.map((item) => ({
        ...item,
        id: item.category_id,
        children: undefined,
        children_count: (item as SubjectCategory & { children_count?: number }).children_count,
      } as SubjectCategoryListItem));

      runInAction(() => {
        // 更新分类树中的子节点
        const updateTree = (tree: SubjectCategoryListItem[]): SubjectCategoryListItem[] => {
          return tree.map((node) => {
            if (node.category_id === parentId || (parentId === null && node.parent_id === null)) {
              return {
                ...node,
                children: children,
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
        this.loadedNodes.add(key);
        // 更新过滤后的树
        if (!this.categorySearchKeyword || this.categorySearchKeyword.trim() === '') {
          this.filteredCategoryTree = this.categoryTree;
        } else {
          this.filterCategoryTree();
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
   * 设置分类搜索关键词（用于搜索分类树）
   */
  setCategorySearchKeyword(keyword: string): void {
    this.categorySearchKeyword = keyword;
    if (!keyword || keyword.trim() === '') {
      this.filteredCategoryTree = this.categoryTree;
    } else {
      this.filterCategoryTree();
    }
  }

  /**
   * 设置学科搜索关键词（用于搜索学科）
   */
  setSubjectSearchKeyword(keyword: string): void {
    this.subjectSearchKeyword = keyword;
    this.pagination.current = 1;
  }

  /**
   * 过滤分类树
   */
  filterCategoryTree(): void {
    if (!this.categorySearchKeyword || this.categorySearchKeyword.trim() === '') {
      this.filteredCategoryTree = this.categoryTree;
      return;
    }

    const keyword = this.categorySearchKeyword.toLowerCase().trim();
    const filterTree = (tree: SubjectCategoryListItem[]): SubjectCategoryListItem[] => {
      const result: SubjectCategoryListItem[] = [];
      for (const node of tree) {
        const matchesKeyword =
          node.name.toLowerCase().includes(keyword) ||
          node.code.toLowerCase().includes(keyword);
        const filteredChildren = node.children ? filterTree(node.children) : [];

        if (matchesKeyword || filteredChildren.length > 0) {
          result.push({
            ...node,
            children: filteredChildren.length > 0 ? filteredChildren : node.children,
          });
        }
      }
      return result;
    };

    this.filteredCategoryTree = filterTree(this.categoryTree);
  }

  /**
   * 加载分类列表（兼容旧代码）
   */
  async loadCategories(): Promise<void> {
    // 如果分类树为空，先加载分类树
    if (this.categoryTree.length === 0) {
      await this.loadCategoryTree();
    }
    // 将分类树扁平化为列表
    const flattenTree = (tree: SubjectCategoryListItem[]): SubjectCategory[] => {
      const result: SubjectCategory[] = [];
      tree.forEach((node) => {
        result.push(node);
        if (node.children) {
          result.push(...flattenTree(node.children));
        }
      });
      return result;
    };
    runInAction(() => {
      this.categories = flattenTree(this.categoryTree);
    });
  }

  /**
   * 根据 category_id 加载完整的分类路径（用于编辑时回填）
   * 会加载该分类及其所有父分类，确保能够正确显示
   */
  async loadCategoryPath(categoryId: string): Promise<void> {
    try {
      // 先获取该分类的详情
      const category = await adminSubjectApi.getCategoryById(categoryId);
      
      // 检查该分类是否已经在 treeData 中
      const findInTree = (tree: SubjectCategoryListItem[], targetId: string): SubjectCategoryListItem | null => {
        for (const node of tree) {
          if (node.category_id === targetId) {
            return node;
          }
          if (node.children) {
            const found = findInTree(node.children, targetId);
            if (found) return found;
          }
        }
        return null;
      };

      const existingNode = findInTree(this.categoryTree, categoryId);
      if (existingNode) {
        // 如果已经存在，不需要加载
        return;
      }

      if (!category.path) {
        // 如果没有 path，说明是顶层分类，直接添加到顶层
        runInAction(() => {
          this.categoryTree.push({
            ...category,
            id: category.category_id,
            children: undefined,
            children_count: 0,
          } as SubjectCategoryListItem);
          if (!this.categorySearchKeyword || this.categorySearchKeyword.trim() === '') {
            this.filteredCategoryTree = this.categoryTree;
          } else {
            this.filterCategoryTree();
          }
        });
        return;
      }

      // 解析 path，获取所有父分类的 ID
      // path 格式：/parent1/parent2/categoryId
      const pathParts = category.path.split('/').filter(Boolean);
      
      // 从顶层开始，逐级加载分类路径
      for (let i = 0; i < pathParts.length; i++) {
        const currentId = pathParts[i];
        const parentId = i === 0 ? null : pathParts[i - 1];
        
        // 检查是否已经加载过
        const key = parentId || 'null';
        if (!this.loadedNodes.has(key)) {
          // 加载该层级的子分类
          await this.loadCategoryChildren(parentId);
        }
      }

      // 最后，确保该分类本身也在 treeData 中
      // 如果加载完路径后仍然没有，需要手动添加
      const stillNotFound = findInTree(this.categoryTree, categoryId);
      if (!stillNotFound) {
        if (category.parent_id) {
          // 找到父节点，将该分类添加到父节点的 children 中
          const updateTree = (tree: SubjectCategoryListItem[]): SubjectCategoryListItem[] => {
            return tree.map((node) => {
              if (node.category_id === category.parent_id) {
                const children = node.children || [];
                // 检查是否已经存在
                if (!children.find((child) => child.category_id === categoryId)) {
                  return {
                    ...node,
                    children: [
                      ...children,
                      {
                        ...category,
                        id: category.category_id,
                        children: undefined,
                        children_count: 0,
                      } as SubjectCategoryListItem,
                    ],
                  };
                }
                return node;
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

          runInAction(() => {
            this.categoryTree = updateTree(this.categoryTree);
            if (!this.categorySearchKeyword || this.categorySearchKeyword.trim() === '') {
              this.filteredCategoryTree = this.categoryTree;
            } else {
              this.filterCategoryTree();
            }
          });
        } else {
          // 如果没有 parent_id，说明是顶层分类，直接添加到顶层
          runInAction(() => {
            this.categoryTree.push({
              ...category,
              id: category.category_id,
              children: undefined,
              children_count: 0,
            } as SubjectCategoryListItem);
            if (!this.categorySearchKeyword || this.categorySearchKeyword.trim() === '') {
              this.filteredCategoryTree = this.categoryTree;
            } else {
              this.filterCategoryTree();
            }
          });
        }
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '加载分类路径失败，请重试';
      console.error(errorMessage, error);
      // 不显示错误提示，避免影响用户体验
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
      keyword: this.subjectSearchKeyword || undefined,
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


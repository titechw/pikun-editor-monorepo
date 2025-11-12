import { makeObservable, observable, action } from 'mobx';

// 通用分页参数
export interface BasePagination {
  current: number;
  pageSize: number;
  total: number;
}

// 通用筛选条件
export interface BaseFilter {
  [key: string]: unknown;
}

// 通用列表项
export interface BaseListItem {
  id: string;
  [key: string]: unknown;
}

// 通用列表查询参数
export interface BaseListParams {
  current: number;
  pageSize: number;
  total?: number;
  filter?: BaseFilter;
}

// 通用列表响应
export interface BaseListResponse<T = BaseListItem> {
  data: T[];
  pagination: BasePagination;
}

// 通用操作类型
export enum BaseOperationType {
  View = 'view',
  Edit = 'edit',
  Delete = 'delete',
  Print = 'print',
}

// 通用批量操作类型
export enum BaseBatchOperationType {
  Delete = 'delete',
  Export = 'export',
  Print = 'print',
}

// 泛型操作类型，允许业务层扩展
export type OperationType<T = BaseOperationType> = T;
export type BatchOperationType<T = BaseBatchOperationType> = T;

/**
 * 通用列表页 Store 抽象类
 * 提供列表页的基础功能：筛选、分页、选择、数据管理
 */
export abstract class BaseListStore<
  T extends BaseListItem = BaseListItem,
  TOperationType = BaseOperationType,
  TBatchOperationType = BaseBatchOperationType,
> {
  // 页面状态
  loading = false;
  activeTabKey = 'list'; // 当前激活的Tab

  // 筛选条件状态
  filter: BaseFilter = {};

  // 表格数据状态
  data: T[] = [];
  selectedRowKeys: string[] = [];
  selectedRows: T[] = [];

  // 分页状态
  pagination: BasePagination = {
    current: 1,
    pageSize: 100,
    total: 0,
  };

  // 表格列配置
  columnSettings: Record<string, boolean> = {};

  constructor() {
    makeObservable(this, {
      // 状态属性
      data: observable,
      loading: observable,
      pagination: observable,
      filter: observable,
      selectedRowKeys: observable,
      selectedRows: observable,
      activeTabKey: observable,
      columnSettings: observable,

      // 计算属性
      // hasSelectedRows: computed,

      // 方法
      setActiveTabKey: action,
      setFilter: action,
      resetFilter: action,
      setSelectedRowKeys: action,
      setSelectedRows: action,
      setCurrentPage: action,
      setPageSize: action,
      setLoading: action,
    });
  }

  // Tab切换
  setActiveTabKey = (key: string): void => {
    this.activeTabKey = key;
  };

  // 筛选条件管理
  setFilter = (filter: Partial<BaseFilter>): void => {
    this.filter = { ...this.filter, ...filter };
  };

  resetFilter = (): void => {
    this.filter = {};
  };

  // 数据管理
  setData = (data: T[]): void => {
    this.data = data;
  };

  setLoading = (loading: boolean): void => {
    this.loading = loading;
  };

  // 分页管理
  setPagination = (pagination: Partial<BasePagination>): void => {
    this.pagination = { ...this.pagination, ...pagination };
  };

  setCurrentPage = (current: number): void => {
    this.pagination.current = current;
  };

  setPageSize = (pageSize: number): void => {
    this.pagination.pageSize = pageSize;
    this.pagination.current = 1; // 重置到第一页
  };

  // 选择管理
  setSelectedRowKeys = (keys: string[]): void => {
    this.selectedRowKeys = keys;
  };

  setSelectedRows = (rows: T[]): void => {
    this.selectedRows = rows;
  };

  clearSelection = (): void => {
    this.selectedRowKeys = [];
    this.selectedRows = [];
  };

  // 列配置管理 - 抽象方法，子类必须实现
  abstract loadColumnSettings(): void;

  saveColumnSettings = (): void => {
    const storageKey = this.getColumnStorageKey();
    localStorage.setItem(storageKey, JSON.stringify(this.columnSettings));
  };

  setColumnVisible = (key: string, visible: boolean): void => {
    this.columnSettings[key] = visible;
    this.saveColumnSettings();
  };

  resetColumnSettings = (): void => {
    this.columnSettings = {};
    this.saveColumnSettings();
  };

  // 抽象方法 - 子类必须实现
  abstract fetchData(params?: Partial<BaseListParams>): Promise<void>;
  abstract handleOperation(type: TOperationType, record: T): Promise<void>;
  abstract handleBatchOperation(type: TBatchOperationType): Promise<void>;
  abstract getColumnStorageKey(): string;

  // 通用查询数据方法 - 抽象方法，子类必须实现
  protected abstract queryData(params: BaseListParams): Promise<BaseListResponse<T>>;

  // 抽象方法 - 子类必须实现具体的操作处理
  protected abstract processOperation(type: TOperationType, record: T): Promise<void>;
  protected abstract processBatchOperation(type: TBatchOperationType): Promise<void>;

  // 重置状态
  reset = (): void => {
    this.loading = false;
    this.activeTabKey = 'list';
    this.filter = {};
    this.data = [];
    this.selectedRowKeys = [];
    this.selectedRows = [];
    this.pagination = {
      current: 1,
      pageSize: 100,
      total: 0,
    };
  };
}

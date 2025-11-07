import { makeAutoObservable, runInAction } from 'mobx';
import { documentApi, type Document, type DocumentSnapshot } from '../api/document.api';

export class DocumentStore {
  documents: Document[] = [];
  currentDocument: Document | null = null;
  isLoading = false;
  error: string | null = null;
  total = 0;
  page = 1;
  pageSize = 20;
  sortBy: 'created_at' | 'updated_at' | 'title' = 'updated_at';
  order: 'asc' | 'desc' = 'desc';

  // 历史记录
  snapshots: DocumentSnapshot[] = [];
  snapshotsTotal = 0;
  isLoadingSnapshots = false;

  // 保存状态
  isSaving = false;
  lastSavedAt: Date | null = null;
  saveError: string | null = null;

  // 防抖保存定时器
  private saveTimer: NodeJS.Timeout | null = null;
  private pendingSave: (() => Promise<void>) | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * 获取文档列表
   */
  async loadDocuments(workspaceId: string): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await documentApi.getDocuments(workspaceId, {
        page: this.page,
        page_size: this.pageSize,
        sort_by: this.sortBy,
        order: this.order,
      });
      runInAction(() => {
        this.documents = response.documents;
        this.total = response.total;
        this.page = response.page;
        this.isLoading = false;
      });
    } catch (error: any) {
      runInAction(() => {
        this.error = error.message || 'Failed to load documents';
        this.isLoading = false;
      });
      throw error;
    }
  }

  /**
   * 加载文档详情
   */
  async loadDocument(
    workspaceId: string,
    objectId: string,
    includeContent: boolean = true,
  ): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const document = await documentApi.getDocument(workspaceId, objectId, includeContent);
      runInAction(() => {
        this.currentDocument = document as Document;
        this.isLoading = false;
      });
    } catch (error: any) {
      runInAction(() => {
        this.error = error.message || 'Failed to load document';
        this.isLoading = false;
      });
      throw error;
    }
  }

  /**
   * 创建文档
   */
  async createDocument(workspaceId: string, title: string, content?: string): Promise<string> {
    this.isLoading = true;
    this.error = null;
    try {
      const result = await documentApi.createDocument(workspaceId, {
        title,
        content,
        metadata: {},
      });
      // 重新加载文档列表
      await this.loadDocuments(workspaceId);
      return result.object_id;
    } catch (error: any) {
      runInAction(() => {
        this.error = error.message || 'Failed to create document';
        this.isLoading = false;
      });
      throw error;
    }
  }

  /**
   * 更新文档（防抖保存）
   * 参考 AppFlowy：使用防抖机制，避免频繁保存
   */
  async saveDocument(
    workspaceId: string,
    objectId: string,
    ydoc: any, // Y.Doc
    immediate: boolean = false,
  ): Promise<void> {
    // 清除之前的定时器
    if (this.saveTimer) {
      clearTimeout(this.saveTimer);
      this.saveTimer = null;
    }

    // 创建保存函数
    const saveFn = async () => {
      this.isSaving = true;
      this.saveError = null;
      try {
        await documentApi.saveDocument(workspaceId, objectId, ydoc);
        runInAction(() => {
          this.isSaving = false;
          this.lastSavedAt = new Date();
          this.saveError = null;
        });
      } catch (error: any) {
        runInAction(() => {
          this.isSaving = false;
          this.saveError = error.message || 'Failed to save document';
        });
        throw error;
      }
    };

    if (immediate) {
      // 立即保存
      await saveFn();
    } else {
      // 防抖保存：2秒后保存
      this.pendingSave = saveFn;
      this.saveTimer = setTimeout(async () => {
        if (this.pendingSave) {
          await this.pendingSave();
          this.pendingSave = null;
        }
      }, 2000);
    }
  }

  /**
   * 更新文档标题
   */
  async updateDocumentTitle(workspaceId: string, objectId: string, title: string): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      await documentApi.updateDocument(workspaceId, objectId, { title });
      // 更新本地状态
      runInAction(() => {
        if (this.currentDocument && this.currentDocument.object_id === objectId) {
          this.currentDocument.title = title;
        }
        const doc = this.documents.find((d) => d.object_id === objectId);
        if (doc) {
          doc.title = title;
        }
        this.isLoading = false;
      });
    } catch (error: any) {
      runInAction(() => {
        this.error = error.message || 'Failed to update document title';
        this.isLoading = false;
      });
      throw error;
    }
  }

  /**
   * 删除文档
   */
  async deleteDocument(workspaceId: string, objectId: string): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      await documentApi.deleteDocument(workspaceId, objectId);
      // 从列表中移除
      runInAction(() => {
        this.documents = this.documents.filter((d) => d.object_id !== objectId);
        if (this.currentDocument?.object_id === objectId) {
          this.currentDocument = null;
        }
        this.isLoading = false;
      });
    } catch (error: any) {
      runInAction(() => {
        this.error = error.message || 'Failed to delete document';
        this.isLoading = false;
      });
      throw error;
    }
  }

  /**
   * 加载文档快照列表
   */
  async loadSnapshots(
    workspaceId: string,
    objectId: string,
    limit: number = 20,
    offset: number = 0,
  ): Promise<void> {
    this.isLoadingSnapshots = true;
    try {
      const response = await documentApi.getSnapshots(workspaceId, objectId, { limit, offset });
      runInAction(() => {
        this.snapshots = response.snapshots;
        this.snapshotsTotal = response.total;
        this.isLoadingSnapshots = false;
      });
    } catch (error: any) {
      runInAction(() => {
        this.error = error.message || 'Failed to load snapshots';
        this.isLoadingSnapshots = false;
      });
      throw error;
    }
  }

  /**
   * 搜索文档
   */
  async searchDocuments(
    workspaceId: string,
    query: string,
    options: { limit?: number; offset?: number; threshold?: number } = {},
  ): Promise<Array<{
    object_id: string;
    title: string;
    preview: string;
    score: number;
    updated_at: string;
  }>> {
    try {
      return await documentApi.searchDocuments(workspaceId, query, options);
    } catch (error: any) {
      runInAction(() => {
        this.error = error.message || 'Failed to search documents';
      });
      throw error;
    }
  }

  /**
   * 设置当前文档
   */
  setCurrentDocument(document: Document | null): void {
    this.currentDocument = document;
  }

  /**
   * 设置分页参数
   */
  setPagination(page: number, pageSize: number): void {
    this.page = page;
    this.pageSize = pageSize;
  }

  /**
   * 设置排序
   */
  setSort(sortBy: 'created_at' | 'updated_at' | 'title', order: 'asc' | 'desc'): void {
    this.sortBy = sortBy;
    this.order = order;
  }

  /**
   * 清理
   */
  dispose(): void {
    if (this.saveTimer) {
      clearTimeout(this.saveTimer);
      this.saveTimer = null;
    }
    this.pendingSave = null;
  }
}

// 创建单例
export const documentStore = new DocumentStore();


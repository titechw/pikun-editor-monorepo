import { makeAutoObservable, runInAction } from 'mobx';
import * as Y from 'yjs';
import { documentApi, type Document, type DocumentSnapshot, type DocumentChange } from '../api/document.api';

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
  changes: DocumentChange[] = [];
  changesTotal = 0;
  isLoadingChanges = false;

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
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load documents';
      runInAction(() => {
        this.error = errorMessage;
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
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load document';
      runInAction(() => {
        this.error = errorMessage;
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
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create document';
      
      // 如果是 workspace 不存在的错误，清除缓存并重新获取
      if (errorMessage.includes('Workspace not found') || errorMessage.includes('404')) {
        // 清除无效的 workspace_id 缓存，强制从服务器重新获取
        const { authStore } = await import('./auth.store');
        try {
          await authStore.getDefaultWorkspaceId(true); // 强制刷新
        } catch {
          // 如果重新获取也失败，忽略错误（会在下次操作时重试）
        }
      }
      
      runInAction(() => {
        this.error = errorMessage;
        this.isLoading = false;
      });
      throw error;
    }
  }

  /**
   * 更新文档（防抖保存）
   * 参考 AppFlowy：使用防抖机制，避免频繁保存
   * @param immediate 是否立即保存（手动保存时使用，会强制创建快照）
   * @param changeData 增量更新（Yjs Update），如果提供则使用增量更新
   */
  async saveDocument(
    workspaceId: string,
    objectId: string,
    ydoc: Y.Doc,
    immediate: boolean = false,
    changeData?: Uint8Array
  ): Promise<void> {
    // 清除之前的定时器
    if (this.saveTimer) {
      clearTimeout(this.saveTimer);
      this.saveTimer = null;
    }

          if (immediate) {
            // 立即保存，强制创建快照
            this.isSaving = true;
            this.saveError = null;
            try {
              await documentApi.saveDocument(workspaceId, objectId, ydoc, true, changeData);
              runInAction(() => {
                this.isSaving = false;
                this.lastSavedAt = new Date();
                this.saveError = null;
              });
            } catch (error: unknown) {
              const errorMessage = error instanceof Error ? error.message : 'Failed to save document';
              runInAction(() => {
                this.isSaving = false;
                this.saveError = errorMessage;
              });
              throw error;
            }
          } else {
            // 防抖保存：2秒后保存，不强制创建快照
            this.pendingSave = async () => {
              this.isSaving = true;
              this.saveError = null;
              try {
                await documentApi.saveDocument(workspaceId, objectId, ydoc, false, changeData);
                runInAction(() => {
                  this.isSaving = false;
                  this.lastSavedAt = new Date();
                  this.saveError = null;
                });
              } catch (error: unknown) {
                const errorMessage = error instanceof Error ? error.message : 'Failed to save document';
                runInAction(() => {
                  this.isSaving = false;
                  this.saveError = errorMessage;
                });
                throw error;
              }
            };
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
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update document title';
      runInAction(() => {
        this.error = errorMessage;
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
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete document';
      runInAction(() => {
        this.error = errorMessage;
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
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load snapshots';
      runInAction(() => {
        this.error = errorMessage;
        this.isLoadingSnapshots = false;
      });
      throw error;
    }
  }

  /**
   * 加载文档变更列表
   */
  async loadChanges(
    workspaceId: string,
    objectId: string,
    options: {
      limit?: number;
      offset?: number;
      after_snapshot_id?: string | null;
    } = {},
  ): Promise<void> {
    this.isLoadingChanges = true;
    try {
      const response = await documentApi.getChanges(workspaceId, objectId, options);
      runInAction(() => {
        // 如果 after_snapshot_id 为空，说明是加载所有变更，替换；否则追加
        if (!options.after_snapshot_id) {
          this.changes = response.changes;
        } else {
          // 追加变更，避免重复
          const existingIds = new Set(this.changes.map(c => c.change_id));
          response.changes.forEach(change => {
            if (!existingIds.has(change.change_id)) {
              this.changes.push(change);
            }
          });
        }
        this.changesTotal = response.total;
        this.isLoadingChanges = false;
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load changes';
      runInAction(() => {
        this.error = errorMessage;
        this.isLoadingChanges = false;
      });
      throw error;
    }
  }

  /**
   * 获取两个快照之间的变更
   */
  async getChangesBetweenSnapshots(
    workspaceId: string,
    objectId: string,
    fromSnapshotId: string,
    toSnapshotId: string,
  ): Promise<DocumentChange[]> {
    try {
      const changes = await documentApi.getChangesBetweenSnapshots(
        workspaceId,
        objectId,
        fromSnapshotId,
        toSnapshotId,
      );
      // 将变更添加到 store（避免重复）
      runInAction(() => {
        const existingIds = new Set(this.changes.map(c => c.change_id));
        changes.forEach(change => {
          if (!existingIds.has(change.change_id)) {
            this.changes.push(change);
          }
        });
      });
      return changes;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get changes between snapshots';
      runInAction(() => {
        this.error = errorMessage;
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
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to search documents';
      runInAction(() => {
        this.error = errorMessage;
      });
      throw error;
    }
  }

  /**
   * 清空历史记录（切换文档时使用）
   */
  clearHistory(): void {
    this.snapshots = [];
    this.snapshotsTotal = 0;
    this.changes = [];
    this.changesTotal = 0;
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


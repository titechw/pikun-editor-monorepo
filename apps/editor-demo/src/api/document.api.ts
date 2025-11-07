import apiClient from '../utils/apiClient';
import * as Y from 'yjs';

export interface Document {
  object_id: string;
  workspace_id: string;
  title: string;
  content_length: number;
  owner_uid: number;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface CreateDocumentRequest {
  title: string;
  content?: string; // Base64 编码的内容
  metadata?: Record<string, any>;
}

export interface UpdateDocumentRequest {
  title?: string;
  content?: string; // Base64 编码的内容（Doc State）
  change_data?: string; // Base64 编码的增量更新（Yjs Update）
  snapshot?: string; // Base64 编码的 Snapshot（状态向量）
  metadata?: Record<string, any>;
  forceSnapshot?: boolean; // 是否强制创建快照
}

export interface DocumentChange {
  change_id: string;
  object_id: string;
  workspace_id: string;
  snapshot_id: string | null;
  change_type: 'auto_save' | 'manual_save';
  change_data: string; // Base64 编码的变更数据
  change_size: number;
  metadata?: Record<string, any>;
  created_at: number;
}

export interface DocumentSnapshot {
  snapshot_id: string;
  object_id: string;
  workspace_id: string;
  version_type: 'major' | 'minor'; // 版本类型
  created_at: number;
  metadata?: Record<string, any>;
}

export interface DocumentListResponse {
  documents: Document[];
  total: number;
  page: number;
  page_size: number;
}

/**
 * 文档 API
 */
export const documentApi = {
  /**
   * 创建文档
   */
  async createDocument(
    workspaceId: string,
    data: CreateDocumentRequest,
  ): Promise<{ object_id: string; workspace_id: string; created_at: string }> {
    // 过滤掉 undefined 值
    const requestData: any = {
      title: data.title,
    };
    if (data.content !== undefined && data.content !== null) {
      requestData.content = data.content;
    }
    if (data.metadata !== undefined && data.metadata !== null) {
      requestData.metadata = data.metadata;
    }

    const response = await apiClient.post<{
      object_id: string;
      workspace_id: string;
      created_at: string;
    }>(`/workspace/${workspaceId}/documents`, requestData);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to create document');
  },

  /**
   * 获取文档列表
   */
  async getDocuments(
    workspaceId: string,
    options: {
      page?: number;
      page_size?: number;
      sort_by?: 'created_at' | 'updated_at' | 'title';
      order?: 'asc' | 'desc';
    } = {},
  ): Promise<DocumentListResponse> {
    const params = new URLSearchParams();
    if (options.page) params.append('page', options.page.toString());
    if (options.page_size) params.append('page_size', options.page_size.toString());
    if (options.sort_by) params.append('sort_by', options.sort_by);
    if (options.order) params.append('order', options.order);

    const response = await apiClient.get<DocumentListResponse>(
      `/workspace/${workspaceId}/documents?${params.toString()}`,
    );
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to get documents');
  },

  /**
   * 获取文档详情
   */
  async getDocument(
    workspaceId: string,
    objectId: string,
    includeContent: boolean = true,
  ): Promise<Document & { content?: string }> {
    const params = includeContent ? '?include_content=true' : '';
    const response = await apiClient.get<Document & { content?: string }>(
      `/workspace/${workspaceId}/documents/${objectId}${params}`,
    );
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to get document');
  },

  /**
   * 更新文档
   * 参考 AppFlowy：将 Yjs 文档编码后保存
   */
  async updateDocument(
    workspaceId: string,
    objectId: string,
    data: UpdateDocumentRequest,
  ): Promise<{ object_id: string; updated_at: string }> {
    // 过滤掉 undefined 值
    const requestData: any = {};
    if (data.title !== undefined && data.title !== null) {
      requestData.title = data.title;
    }
    if (data.content !== undefined && data.content !== null) {
      requestData.content = data.content;
    }
    if (data.metadata !== undefined && data.metadata !== null) {
      requestData.metadata = data.metadata;
    }

    const response = await apiClient.put<{ object_id: string; updated_at: string }>(
      `/workspace/${workspaceId}/documents/${objectId}`,
      requestData,
    );
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to update document');
  },

  /**
   * 保存文档（将 Yjs 文档编码为 Base64）
   * @param forceSnapshot 是否强制创建快照（手动保存时使用）
   * @param changeData 增量更新（Yjs Update），如果提供则使用增量更新，否则使用完整状态
   */
  async saveDocument(
    workspaceId: string,
    objectId: string,
    ydoc: Y.Doc,
    forceSnapshot: boolean = false,
    changeData?: Uint8Array,
  ): Promise<{ object_id: string; updated_at: string }> {
    // 获取完整文档状态（Doc State）
    const docState = Y.encodeStateAsUpdate(ydoc);
    const base64Content = btoa(String.fromCharCode(...docState));

    // 创建 Snapshot（状态向量）
    let base64Snapshot: string | undefined;
    let base64ChangeData: string | undefined;

    try {
      // Y.snapshot 返回一个 Snapshot 对象
      // 注意：某些版本的 Yjs 可能不支持 snapshot，如果失败就跳过
      const snapshot = Y.snapshot(ydoc);
      if (snapshot) {
        // 尝试编码 snapshot（如果 Yjs 版本支持）
        try {
          // @ts-ignore - Y.encodeSnapshot 可能不存在于某些版本
          const snapshotBytes = Y.encodeSnapshot ? Y.encodeSnapshot(snapshot) : null;
          if (snapshotBytes && snapshotBytes.length > 0) {
            base64Snapshot = btoa(String.fromCharCode(...snapshotBytes));
          }
        } catch {
          // 如果编码失败，跳过 snapshot
          console.warn('Y.encodeSnapshot not available or failed');
        }
      }
    } catch (error) {
      // Snapshot 创建失败不影响保存
      console.warn('Failed to create snapshot:', error);
    }

    // 如果有增量更新，使用增量更新；否则使用完整状态
    if (changeData) {
      base64ChangeData = btoa(String.fromCharCode(...changeData));
    }

    return this.updateDocument(workspaceId, objectId, {
      content: base64Content,
      change_data: base64ChangeData,
      snapshot: base64Snapshot,
      forceSnapshot,
    });
  },

  /**
   * 删除文档
   */
  async deleteDocument(workspaceId: string, objectId: string): Promise<void> {
    const response = await apiClient.delete(`/workspace/${workspaceId}/documents/${objectId}`);
    if (!response.success) {
      throw new Error(response.message || 'Failed to delete document');
    }
  },

  /**
   * 获取文档快照列表
   */
  async getSnapshots(
    workspaceId: string,
    objectId: string,
    options: { limit?: number; offset?: number } = {},
  ): Promise<{ snapshots: DocumentSnapshot[]; total: number }> {
    const params = new URLSearchParams();
    if (options.limit) params.append('limit', options.limit.toString());
    if (options.offset) params.append('offset', options.offset.toString());

    const response = await apiClient.get<{ snapshots: DocumentSnapshot[]; total: number }>(
      `/workspace/${workspaceId}/documents/${objectId}/snapshots?${params.toString()}`,
    );
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to get snapshots');
  },

  /**
   * 获取最新快照
   */
  async getLatestSnapshot(
    workspaceId: string,
    objectId: string,
  ): Promise<{ snapshot_id: string; doc_state: string; snapshot: string; created_at: number }> {
    const response = await apiClient.get<{
      snapshot_id: string;
      doc_state: string;
      snapshot: string;
      created_at: number;
    }>(`/workspace/${workspaceId}/documents/${objectId}/snapshots/latest`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to get latest snapshot');
  },

  /**
   * 根据 snapshot_id 获取快照内容
   */
  async getSnapshotById(
    workspaceId: string,
    objectId: string,
    snapshotId: string,
  ): Promise<{
    snapshot_id: string;
    doc_state: string | null;
    snapshot: string | null;
    created_at: number;
  }> {
    const response = await apiClient.get<{
      snapshot_id: string;
      doc_state: string | null;
      snapshot: string | null;
      created_at: number;
    }>(`/workspace/${workspaceId}/documents/${objectId}/snapshots/${snapshotId}`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to get snapshot');
  },

  /**
   * 搜索文档
   */
  async searchDocuments(
    workspaceId: string,
    query: string,
    options: { limit?: number; offset?: number; threshold?: number } = {},
  ): Promise<
    Array<{
      object_id: string;
      title: string;
      preview: string;
      score: number;
      updated_at: string;
    }>
  > {
    const params = new URLSearchParams({ query });
    if (options.limit) params.append('limit', options.limit.toString());
    if (options.offset) params.append('offset', options.offset.toString());
    if (options.threshold) params.append('threshold', options.threshold.toString());

    const response = await apiClient.get<
      Array<{
        object_id: string;
        title: string;
        preview: string;
        score: number;
        updated_at: string;
      }>
    >(`/search/${workspaceId}?${params.toString()}`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to search documents');
  },

  /**
   * 获取文档变更列表
   */
  async getChanges(
    workspaceId: string,
    objectId: string,
    options: {
      limit?: number;
      offset?: number;
      after_snapshot_id?: string | null;
    } = {},
  ): Promise<{ changes: DocumentChange[]; total: number }> {
    const params = new URLSearchParams();
    if (options.limit) params.append('limit', options.limit.toString());
    if (options.offset) params.append('offset', options.offset.toString());
    if (options.after_snapshot_id) params.append('after_snapshot_id', options.after_snapshot_id);

    const response = await apiClient.get<{ changes: DocumentChange[]; total: number }>(
      `/workspace/${workspaceId}/documents/${objectId}/changes?${params.toString()}`,
    );
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to get changes');
  },

  /**
   * 获取两个快照之间的变更
   */
  async getChangesBetweenSnapshots(
    workspaceId: string,
    objectId: string,
    fromSnapshotId: string,
    toSnapshotId: string,
  ): Promise<DocumentChange[]> {
    const response = await apiClient.get<DocumentChange[]>(
      `/workspace/${workspaceId}/documents/${objectId}/changes/between/${fromSnapshotId}/${toSnapshotId}`,
    );
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to get changes between snapshots');
  },
};

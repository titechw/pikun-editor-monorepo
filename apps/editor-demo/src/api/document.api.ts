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
  content?: string; // Base64 编码的内容
  metadata?: Record<string, any>;
}

export interface DocumentSnapshot {
  snapshot_id: string;
  object_id: string;
  workspace_id: string;
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
   */
  async saveDocument(
    workspaceId: string,
    objectId: string,
    ydoc: Y.Doc,
  ): Promise<{ object_id: string; updated_at: string }> {
    // 将 Yjs 文档编码为 Uint8Array，然后转为 Base64
    const update = Y.encodeStateAsUpdate(ydoc);
    const base64Content = btoa(String.fromCharCode(...update));

    return this.updateDocument(workspaceId, objectId, {
      content: base64Content,
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
};

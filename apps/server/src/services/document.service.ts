import { injectable, inject } from 'tsyringe';
import { DocumentDAO } from '@/dao/document.dao';
import type { Document, DocumentSnapshot } from '@/entities';
import { Redis } from '@/core/redis';

/**
 * 文档服务
 */
@injectable()
export class DocumentService {
  constructor(
    @inject('DocumentDAO') private documentDAO: DocumentDAO,
    private redis: Redis
  ) {
    this.redis = Redis.getInstance();
  }

  /**
   * 创建文档
   */
  async createDocument(data: {
    workspace_id: string;
    title: string;
    content: Buffer;
    owner_uid: number;
    metadata?: Record<string, any>;
  }): Promise<Document> {
    const document = await this.documentDAO.create({
      workspace_id: data.workspace_id,
      title: data.title,
      content: data.content,
      content_length: data.content.length,
      owner_uid: data.owner_uid,
      metadata: data.metadata,
    });

    // 清除缓存
    await this.redis.del(`document:${document.object_id}`);
    await this.redis.del(`documents:workspace:${data.workspace_id}`);

    return document;
  }

  /**
   * 获取文档
   */
  async getDocument(object_id: string, includeContent: boolean = true): Promise<Document | null> {
    // 尝试从缓存获取
    const cacheKey = `document:${object_id}`;
    const cached = await this.redis.getJSON<Document>(cacheKey);
    if (cached) {
      return cached;
    }

    const document = await this.documentDAO.findById(object_id);
    if (!document) {
      return null;
    }

    // 缓存文档（不包含 content，减少内存占用）
    if (!includeContent) {
      const { content, ...docWithoutContent } = document;
      await this.redis.setJSON(cacheKey, docWithoutContent, 300); // 5分钟缓存
    }

    return document;
  }

  /**
   * 更新文档
   */
  async updateDocument(
    object_id: string,
    updates: {
      title?: string;
      content?: Buffer;
      metadata?: Record<string, any>;
    }
  ): Promise<Document> {
    const updateData: any = {};
    if (updates.title) updateData.title = updates.title;
    if (updates.content) {
      updateData.content = updates.content;
      updateData.content_length = updates.content.length;
    }
    if (updates.metadata) updateData.metadata = updates.metadata;

    const document = await this.documentDAO.update(object_id, updateData);

    // 清除缓存
    await this.redis.del(`document:${object_id}`);
    const doc = await this.documentDAO.findById(object_id);
    if (doc) {
      await this.redis.del(`documents:workspace:${doc.workspace_id}`);
    }

    return document;
  }

  /**
   * 获取文档列表
   */
  async getDocuments(
    workspace_id: string,
    options: {
      page?: number;
      page_size?: number;
      sort_by?: 'created_at' | 'updated_at' | 'title';
      order?: 'asc' | 'desc';
    } = {}
  ): Promise<{ documents: Document[]; total: number; page: number; page_size: number }> {
    // 尝试从缓存获取
    const cacheKey = `documents:workspace:${workspace_id}:${JSON.stringify(options)}`;
    const cached = await this.redis.getJSON<{
      documents: Document[];
      total: number;
    }>(cacheKey);
    if (cached) {
      return {
        ...cached,
        page: options.page || 1,
        page_size: options.page_size || 20,
      };
    }

    const result = await this.documentDAO.findByWorkspaceId(workspace_id, options);

    // 缓存结果
    await this.redis.setJSON(cacheKey, result, 60); // 1分钟缓存

    return {
      ...result,
      page: options.page || 1,
      page_size: options.page_size || 20,
    };
  }

  /**
   * 删除文档
   */
  async deleteDocument(object_id: string): Promise<void> {
    await this.documentDAO.delete(object_id);

    // 清除缓存
    await this.redis.del(`document:${object_id}`);
    const doc = await this.documentDAO.findById(object_id);
    if (doc) {
      await this.redis.del(`documents:workspace:${doc.workspace_id}`);
    }
  }

  /**
   * 创建文档快照
   */
  async createSnapshot(data: {
    object_id: string;
    workspace_id: string;
    snapshot_data: Buffer;
    snapshot_version?: number;
    doc_state?: Buffer;
    doc_state_version?: number;
    metadata?: Record<string, any>;
  }): Promise<DocumentSnapshot> {
    return await this.documentDAO.createSnapshot({
      object_id: data.object_id,
      workspace_id: data.workspace_id,
      snapshot_data: data.snapshot_data,
      snapshot_version: data.snapshot_version || 1,
      doc_state: data.doc_state,
      doc_state_version: data.doc_state_version || 1,
      metadata: data.metadata,
    });
  }

  /**
   * 获取文档快照列表
   */
  async getSnapshots(
    object_id: string,
    options: { limit?: number; offset?: number } = {}
  ): Promise<{ snapshots: DocumentSnapshot[]; total: number }> {
    return await this.documentDAO.getSnapshots(object_id, options);
  }

  /**
   * 获取最新快照
   */
  async getLatestSnapshot(object_id: string): Promise<DocumentSnapshot | null> {
    return await this.documentDAO.getLatestSnapshot(object_id);
  }

  /**
   * 搜索文档（简化版，实际应该使用向量搜索）
   */
  async searchDocuments(
    workspace_id: string,
    query: string,
    options: {
      limit?: number;
      offset?: number;
      threshold?: number;
    } = {}
  ): Promise<Array<{
    object_id: string;
    title: string;
    preview: string;
    score: number;
    updated_at: Date;
  }>> {
    // 这里简化实现，实际应该使用向量嵌入搜索
    // 暂时使用简单的文本搜索
    const limit = options.limit || 10;
    const offset = options.offset || 0;

    // TODO: 实现向量搜索
    // 这里返回空数组，实际应该查询 document_embeddings 表
    return [];
  }
}





import { injectable, inject } from 'tsyringe';
import { DocumentDAO } from '@/dao/document.dao';
import { DocumentChangeDAO } from '@/dao/document-change.dao';
import type { Document, DocumentSnapshot, DocumentChange } from '@/entities';
import { Redis } from '@/core/redis';
import { SnapshotScheduler } from './snapshot-scheduler.service';

/**
 * 文档服务
 */
@injectable()
export class DocumentService {
  constructor(
    @inject('DocumentDAO') private documentDAO: DocumentDAO,
    private redis: Redis,
    @inject('SnapshotScheduler') private snapshotScheduler?: SnapshotScheduler,
    @inject('DocumentChangeDAO') private changeDAO?: DocumentChangeDAO
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

    // 创建初始快照（如果文档有内容）
    if (data.content && data.content.length > 0 && this.snapshotScheduler) {
      try {
        // 创建初始快照（大版本）
        await this.snapshotScheduler.createSnapshotManually(
          document.object_id,
          document.workspace_id,
          data.content,
          undefined, // 初始快照可能没有 snapshot
          'major' // 初始快照作为大版本
        );
      } catch (error) {
        // 快照创建失败不应该影响文档创建，只记录错误
        console.error('Failed to create initial snapshot:', error);
      }
    }

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
      change_data?: Buffer; // 增量更新（Yjs Update）
      snapshot?: Buffer; // Yjs Snapshot（状态向量），可选
      metadata?: Record<string, any>;
      forceSnapshot?: boolean; // 是否强制创建快照（手动保存）
    }
  ): Promise<Document> {
    // 如果更新了内容，先获取当前文档信息以便创建快照
    const currentDoc = await this.documentDAO.findById(object_id);
    if (!currentDoc) {
      throw new Error('Document not found');
    }

    const updateData: any = {};
    if (updates.title) updateData.title = updates.title;
    if (updates.content) {
      updateData.content = updates.content;
      updateData.content_length = updates.content.length;
    }
    if (updates.metadata) updateData.metadata = updates.metadata;

    const document = await this.documentDAO.update(object_id, updateData);

    // 如果更新了内容，记录变更日志和快照
    if (updates.content && updates.content.length > 0) {
      try {
        // 1. 获取上一次的内容（用于计算变更）
        const previousContent = currentDoc.content;

        // 2. 计算变更（增量更新）
        // 优先使用 change_data（增量更新），否则使用完整状态
        const changeData =
          updates.change_data ||
          (previousContent && previousContent.length > 0
            ? this.calculateChange(previousContent, updates.content!)
            : updates.content!);

        // 2. 记录变更日志（每次保存都记录）
        let snapshotId: string | null = null;
        if (this.changeDAO) {
          // 如果是手动保存，先创建小版本快照
          if (updates.forceSnapshot && this.snapshotScheduler) {
            const snapshot = await this.snapshotScheduler.createSnapshotManually(
              document.object_id,
              document.workspace_id,
              updates.content,
              updates.snapshot,
              'minor' // 小版本快照
            );
            snapshotId = snapshot.snapshot_id;
          }

          await this.changeDAO.create({
            object_id: document.object_id,
            workspace_id: document.workspace_id,
            snapshot_id: snapshotId,
            change_type: updates.forceSnapshot ? 'manual_save' : 'auto_save',
            change_data: changeData,
            before_state_vector: updates.snapshot || null,
            after_state_vector: updates.snapshot || null,
            metadata: {
              content_length: updates.content?.length || 0,
              change_length: changeData.length,
              is_incremental: !!updates.change_data, // 标记是否为增量更新
            },
          });
        }

        // 3. 处理快照（大版本）
        if (this.snapshotScheduler) {
          if (updates.forceSnapshot) {
            // 手动保存时，如果还没创建快照，创建小版本快照
            if (!snapshotId) {
              await this.snapshotScheduler.createSnapshotManually(
                document.object_id,
                document.workspace_id,
                updates.content,
                updates.snapshot,
                'minor' // 小版本快照
              );
            }
          } else {
            // 自动保存，由调度器决定是否创建大版本快照
            await this.snapshotScheduler.recordEdit(
              document.object_id,
              document.workspace_id,
              updates.content,
              updates.snapshot
            );
          }
        }
      } catch (error) {
        // 变更日志和快照创建失败不应该影响文档更新，只记录错误
        console.error('Failed to create change log or snapshot:', error);
      }
    }

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
   * 根据 snapshot_id 获取快照内容
   */
  async getSnapshotById(snapshot_id: string): Promise<DocumentSnapshot | null> {
    return await this.documentDAO.getSnapshotById(snapshot_id);
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
  ): Promise<
    Array<{
      object_id: string;
      title: string;
      preview: string;
      score: number;
      updated_at: Date;
    }>
  > {
    // 这里简化实现，实际应该使用向量嵌入搜索
    // 暂时使用简单的文本搜索
    // TODO: 实现向量搜索
    // 这里返回空数组，实际应该查询 document_embeddings 表
    return [];
  }

  /**
   * 计算两个文档状态之间的变更（简化版）
   * 实际应该使用 Yjs 的 diff 算法
   * 注意：当前实现中，change_data 存储的是完整的文档状态
   * TODO: 优化为真正的增量更新
   */
  private calculateChange(previousContent: Buffer, currentContent: Buffer): Buffer {
    // 简化实现：直接返回当前内容
    // TODO: 使用 Yjs 的 diff 算法计算真正的增量变更
    // 或者，前端应该发送增量更新（Yjs update 事件），而不是完整状态
    return currentContent;
  }

  /**
   * 获取文档变更列表
   */
  async getDocumentChanges(
    object_id: string,
    options: {
      limit?: number;
      offset?: number;
      after_snapshot_id?: string | null;
    } = {}
  ): Promise<{ changes: DocumentChange[]; total: number }> {
    if (!this.changeDAO) {
      throw new Error('DocumentChangeDAO not initialized');
    }
    return await this.changeDAO.findByObjectId(object_id, options);
  }

  /**
   * 获取两个快照之间的变更
   */
  async getChangesBetweenSnapshots(
    object_id: string,
    from_snapshot_id: string,
    to_snapshot_id: string
  ): Promise<DocumentChange[]> {
    if (!this.changeDAO) {
      throw new Error('DocumentChangeDAO not initialized');
    }
    return await this.changeDAO.getChangesBetweenSnapshots(
      object_id,
      from_snapshot_id,
      to_snapshot_id
    );
  }
}

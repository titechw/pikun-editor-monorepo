import { injectable, inject } from 'tsyringe';
import * as Y from 'yjs';
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

    // 创建初始快照（无论是否有内容，都应该创建初始快照）
    // 这样即使文档创建时为空，也能有一个基准快照用于时间间隔计算
    if (this.snapshotScheduler) {
      try {
        console.log(
          `[DocumentService] Creating initial snapshot for document ${
            document.object_id
          }, contentLength: ${data.content?.length || 0}`
        );
        // 创建初始快照（强制创建大版本）
        // 即使 content 为空，也创建一个空内容的快照
        const contentToSnapshot =
          data.content && data.content.length > 0 ? data.content : Buffer.alloc(0); // 空内容也创建快照

        const snapshotResult = await this.snapshotScheduler.createSnapshotManually(
          document.object_id,
          document.workspace_id,
          contentToSnapshot,
          undefined, // 初始快照可能没有 snapshot
          true // 强制创建大版本
        );
        console.log(`[DocumentService] Initial snapshot created:`, {
          snapshot_id: snapshotResult.snapshot_id,
          version_type: snapshotResult.version_type,
          created_at: snapshotResult.created_at,
        });
      } catch (error) {
        // 快照创建失败不应该影响文档创建，只记录错误
        console.error('[DocumentService] Failed to create initial snapshot:', error);
      }
    } else {
      console.warn(
        `[DocumentService] SnapshotScheduler not available, cannot create initial snapshot`
      );
    }

    // 清除缓存
    await this.redis.del(`document:${document.object_id}`);
    // 清除该工作空间的所有文档列表缓存（因为缓存键包含 options 参数）
    await this.redis.delByPattern(`documents:workspace:${data.workspace_id}:*`);

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
   *
   * 优化策略：
   * - 如果只有 change_data（增量），应用增量到现有文档状态，然后更新数据库
   * - 如果有 content（全量），直接使用全量更新数据库
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

    // 优化：如果只有增量更新，应用增量到现有文档状态
    let finalContent: Buffer | undefined;
    let finalContentLength: number | undefined;

    if (updates.change_data && !updates.content) {
      // 只有增量更新：应用增量到现有文档状态
      console.log(
        `[DocumentService] Applying incremental update, size: ${updates.change_data.length} bytes`
      );

      try {
        // 创建临时 Y.Doc 并应用现有状态
        const ydoc = new Y.Doc();
        if (currentDoc.content && currentDoc.content.length > 0) {
          Y.applyUpdate(ydoc, currentDoc.content);
        }

        // 应用增量更新
        Y.applyUpdate(ydoc, updates.change_data);

        // 获取新的完整状态
        finalContent = Buffer.from(Y.encodeStateAsUpdate(ydoc));
        finalContentLength = finalContent.length;

        console.log(
          `[DocumentService] Incremental update applied, new content size: ${finalContentLength} bytes`
        );
      } catch (error) {
        console.error('[DocumentService] Failed to apply incremental update:', error);
        throw new Error('Failed to apply incremental update');
      }
    } else if (updates.content) {
      // 有全量更新：直接使用
      finalContent = updates.content;
      finalContentLength = updates.content.length;
      console.log(`[DocumentService] Using full update, size: ${finalContentLength} bytes`);
    }

    const updateData: any = {};
    if (updates.title) updateData.title = updates.title;
    if (finalContent) {
      updateData.content = finalContent;
      updateData.content_length = finalContentLength!;
    }
    if (updates.metadata) updateData.metadata = updates.metadata;

    const document = await this.documentDAO.update(object_id, updateData);

    // 如果更新了内容，记录变更日志和快照
    if (finalContent && finalContent.length > 0) {
      try {
        // 确定变更数据（用于变更日志）
        // 优先使用 change_data（增量更新），如果没有则使用完整状态
        const changeData = updates.change_data || finalContent!;

        // 2. 记录变更日志（每次保存都记录）
        let snapshotId: string | null = null;
        if (this.changeDAO) {
          // 检查是否已有快照
          const hasSnapshot = await this.documentDAO.getLatestSnapshot(document.object_id);

          // 如果是手动保存，使用策略判断是否创建快照及版本类型
          // 如果没有快照，强制创建大版本（初始快照）
          // 如果有快照，根据策略判断是否创建快照（避免频繁创建）
          if (updates.forceSnapshot && this.snapshotScheduler) {
            if (!hasSnapshot) {
              // 没有快照，强制创建大版本（初始快照）
              const snapshot = await this.snapshotScheduler.createSnapshotManually(
                document.object_id,
                document.workspace_id,
                finalContent!,
                updates.snapshot,
                true // 强制创建大版本
              );
              snapshotId = snapshot.snapshot_id;
            } else {
              // 有快照，使用策略判断是否创建快照
              // 手动保存时，也使用 recordEdit 来判断（复用相同的策略）
              const snapshotResult = await this.snapshotScheduler.recordEdit(
                document.object_id,
                document.workspace_id,
                finalContent!,
                updates.snapshot
              );
              // 如果 recordEdit 创建了快照，使用它；否则不创建快照
              if (snapshotResult) {
                snapshotId = snapshotResult.snapshot_id;
              }
              // 如果 recordEdit 没有创建快照（不满足条件），snapshotId 保持为 null
            }
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
              content_length: finalContent?.length || 0,
              change_length: changeData.length,
              is_incremental: !!updates.change_data, // 标记是否为增量更新
            },
          });
        }

        // 3. 处理快照（自动保存时，由调度器决定是否创建快照及版本类型）
        if (this.snapshotScheduler && !updates.forceSnapshot) {
          // 检查是否已有快照，如果没有，创建初始快照
          const hasSnapshot = await this.documentDAO.getLatestSnapshot(document.object_id);
          if (!hasSnapshot) {
            // 没有快照，创建初始快照（强制大版本）
            console.log(
              `[DocumentService] No snapshot found, creating initial snapshot for ${document.object_id}`
            );
            await this.snapshotScheduler.createSnapshotManually(
              document.object_id,
              document.workspace_id,
              finalContent!,
              updates.snapshot,
              true // 强制创建大版本
            );
          } else {
            // 自动保存，由调度器决定是否创建快照
            await this.snapshotScheduler.recordEdit(
              document.object_id,
              document.workspace_id,
              finalContent!,
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
      // 清除该工作空间的所有文档列表缓存（因为缓存键包含 options 参数）
      await this.redis.delByPattern(`documents:workspace:${doc.workspace_id}:*`);
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
    // 先获取文档信息以便清除缓存
    const doc = await this.documentDAO.findById(object_id);

    await this.documentDAO.delete(object_id);

    // 清除缓存
    await this.redis.del(`document:${object_id}`);
    if (doc) {
      // 清除该工作空间的所有文档列表缓存（因为缓存键包含 options 参数）
      await this.redis.delByPattern(`documents:workspace:${doc.workspace_id}:*`);
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

import {
  StorageFactory,
  getSnapshotKey,
  getSnapshotPrefix,
  extractTimestampFromKey,
} from '../core/storage/storage.factory';
import { StorageAdapter } from '../core/storage/storage.interface';
import * as zlib from 'zlib';
import { promisify } from 'util';

const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.gunzip);

/**
 * 快照服务
 * 负责创建、存储和管理文档快照
 */
export class SnapshotService {
  private storage: StorageAdapter;
  private readonly SNAPSHOT_LIMIT = parseInt(process.env.SNAPSHOT_LIMIT || '100', 10);

  constructor() {
    this.storage = StorageFactory.getInstance();
  }

  /**
   * 创建并存储快照
   * @param params 快照参数
   * @returns 快照元数据（包含 snapshot_id 和 created_at）
   */
  async createSnapshot(params: {
    workspaceId: string;
    objectId: string;
    docState: Buffer; // 完整文档状态（Y.encodeStateAsUpdate）
    snapshot?: Buffer; // Yjs Snapshot（状态向量），可选
    metadata?: Record<string, any>;
  }): Promise<{ snapshotId: number; createdAt: number }> {
    const timestamp = Date.now();
    const snapshotId = timestamp; // 使用时间戳作为 snapshot_id

    // 压缩 doc_state（使用 gzip，后续可以切换到 zstd）
    const compressed = await gzip(params.docState);

    // 生成存储键
    const key = getSnapshotKey(params.workspaceId, params.objectId, timestamp);

    // 存储到文件系统
    await this.storage.put(key, compressed, {
      snapshot_id: snapshotId,
      object_id: params.objectId,
      workspace_id: params.workspaceId,
      doc_state_length: params.docState.length,
      compressed_length: compressed.length,
      snapshot_length: params.snapshot?.length || 0,
      ...params.metadata,
    });

    // 清理旧快照（如果超过限制）
    await this.cleanupOldSnapshots(params.workspaceId, params.objectId);

    return {
      snapshotId,
      createdAt: timestamp,
    };
  }

  /**
   * 获取快照数据
   */
  async getSnapshot(
    workspaceId: string,
    objectId: string,
    snapshotId: number
  ): Promise<Buffer | null> {
    // 从数据库查询快照元数据，获取时间戳
    // 这里简化处理，直接使用 snapshotId 作为时间戳
    const timestamp = snapshotId;
    const key = getSnapshotKey(workspaceId, objectId, timestamp);

    const compressed = await this.storage.get(key);
    if (!compressed) {
      return null;
    }

    // 解压缩
    const docState = await gunzip(compressed);
    return docState;
  }

  /**
   * 获取快照列表
   */
  async listSnapshots(
    workspaceId: string,
    objectId: string,
    limit?: number
  ): Promise<Array<{ snapshotId: number; createdAt: number; key: string }>> {
    const prefix = getSnapshotPrefix(workspaceId, objectId);
    const keys = await this.storage.list(prefix, limit);

    return keys
      .map((key) => {
        const timestamp = extractTimestampFromKey(key);
        if (!timestamp) return null;

        return {
          snapshotId: timestamp,
          createdAt: timestamp,
          key,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => b.createdAt - a.createdAt); // 按时间降序
  }

  /**
   * 删除快照
   */
  async deleteSnapshot(workspaceId: string, objectId: string, snapshotId: number): Promise<void> {
    const timestamp = snapshotId;
    const key = getSnapshotKey(workspaceId, objectId, timestamp);
    await this.storage.delete(key);
  }

  /**
   * 清理旧快照（保留最新的 N 个）
   */
  private async cleanupOldSnapshots(workspaceId: string, objectId: string): Promise<void> {
    const snapshots = await this.listSnapshots(workspaceId, objectId);

    if (snapshots.length > this.SNAPSHOT_LIMIT) {
      const toDelete = snapshots.slice(this.SNAPSHOT_LIMIT);
      const keysToDelete = toDelete.map((s) => s.key);
      await this.storage.deleteMany(keysToDelete);
    }
  }
}

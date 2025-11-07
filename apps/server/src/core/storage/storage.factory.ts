import { StorageAdapter } from './storage.interface';
import { LocalFileStorage } from './local-file-storage';

/**
 * 存储工厂
 * 根据配置创建不同的存储实现
 */
export class StorageFactory {
  private static instance: StorageAdapter | null = null;

  /**
   * 获取存储实例（单例）
   */
  static getInstance(): StorageAdapter {
    if (!StorageFactory.instance) {
      const storageType = process.env.STORAGE_TYPE || 'local';
      const basePath = process.env.STORAGE_BASE_PATH || './storage/snapshots';

      switch (storageType) {
        case 'local':
          StorageFactory.instance = new LocalFileStorage(basePath);
          break;
        case 's3':
          // TODO: 实现 S3 存储
          // StorageFactory.instance = new S3Storage(...);
          throw new Error('S3 storage not implemented yet');
        default:
          throw new Error(`Unknown storage type: ${storageType}`);
      }
    }

    return StorageFactory.instance;
  }

  /**
   * 重置实例（用于测试）
   */
  static reset(): void {
    StorageFactory.instance = null;
  }
}

/**
 * 生成快照存储键
 * 格式：{workspaceId}/{objectId}/snapshot_{timestamp}.gz
 */
export function getSnapshotKey(
  workspaceId: string,
  objectId: string,
  timestamp: number
): string {
  // 使用倒序时间戳作为文件名的一部分，便于排序
  const reversedTimestamp = Number.MAX_SAFE_INTEGER - timestamp;
  return `${workspaceId}/${objectId}/snapshot_${reversedTimestamp.toString(16).padStart(16, '0')}.gz`;
}

/**
 * 生成快照前缀（用于列出某个文档的所有快照）
 */
export function getSnapshotPrefix(workspaceId: string, objectId: string): string {
  return `${workspaceId}/${objectId}/snapshot_`;
}

/**
 * 从键中提取时间戳
 */
export function extractTimestampFromKey(key: string): number | null {
  const match = key.match(/snapshot_([0-9a-f]+)\.gz$/);
  if (!match) return null;

  const reversedTimestamp = parseInt(match[1], 16);
  return Number.MAX_SAFE_INTEGER - reversedTimestamp;
}


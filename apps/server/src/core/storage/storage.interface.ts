/**
 * 存储抽象层接口
 * 支持本地文件存储和 S3 存储
 */
export interface StorageAdapter {
  /**
   * 存储快照数据
   * @param key 存储键（路径）
   * @param data 数据（Buffer）
   * @param metadata 元数据（可选）
   */
  put(key: string, data: Buffer, metadata?: Record<string, any>): Promise<void>;

  /**
   * 获取快照数据
   * @param key 存储键（路径）
   * @returns 数据（Buffer）或 null（如果不存在）
   */
  get(key: string): Promise<Buffer | null>;

  /**
   * 删除快照数据
   * @param key 存储键（路径）
   */
  delete(key: string): Promise<void>;

  /**
   * 列出指定前缀的所有键
   * @param prefix 前缀
   * @param limit 限制数量
   * @returns 键列表
   */
  list(prefix: string, limit?: number): Promise<string[]>;

  /**
   * 批量删除
   * @param keys 键列表
   */
  deleteMany(keys: string[]): Promise<void>;
}


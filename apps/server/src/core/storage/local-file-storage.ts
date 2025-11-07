import * as fs from 'fs/promises';
import * as path from 'path';
import { StorageAdapter } from './storage.interface';

/**
 * 本地文件存储实现
 * 存储路径：{basePath}/{workspaceId}/{objectId}/snapshot_{timestamp}.gz
 */
export class LocalFileStorage implements StorageAdapter {
  private basePath: string;

  constructor(basePath: string = './storage/snapshots') {
    this.basePath = basePath;
  }

  /**
   * 确保目录存在
   */
  private async ensureDir(dirPath: string): Promise<void> {
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (error: any) {
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }
  }

  /**
   * 获取完整文件路径
   */
  private getFilePath(key: string): string {
    return path.join(this.basePath, key);
  }

  /**
   * 存储快照数据
   */
  async put(key: string, data: Buffer, metadata?: Record<string, any>): Promise<void> {
    const filePath = this.getFilePath(key);
    const dirPath = path.dirname(filePath);

    // 确保目录存在
    await this.ensureDir(dirPath);

    // 写入文件
    await fs.writeFile(filePath, data);

    // 如果有元数据，写入元数据文件
    if (metadata) {
      const metaPath = filePath + '.meta.json';
      await fs.writeFile(metaPath, JSON.stringify(metadata, null, 2));
    }
  }

  /**
   * 获取快照数据
   */
  async get(key: string): Promise<Buffer | null> {
    const filePath = this.getFilePath(key);
    try {
      const data = await fs.readFile(filePath);
      return data;
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        return null;
      }
      throw error;
    }
  }

  /**
   * 删除快照数据
   */
  async delete(key: string): Promise<void> {
    const filePath = this.getFilePath(key);
    try {
      await fs.unlink(filePath);
      // 同时删除元数据文件
      const metaPath = filePath + '.meta.json';
      try {
        await fs.unlink(metaPath);
      } catch {
        // 忽略元数据文件不存在的错误
      }
    } catch (error: any) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
  }

  /**
   * 列出指定前缀的所有键
   */
  async list(prefix: string, limit?: number): Promise<string[]> {
    const dirPath = this.getFilePath(prefix);
    const keys: string[] = [];

    try {
      // 递归读取目录
      const readDirRecursive = async (dir: string, baseDir: string): Promise<string[]> => {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        const files: string[] = [];

        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          const relativePath = path.relative(baseDir, fullPath);

          if (entry.isDirectory()) {
            const subFiles = await readDirRecursive(fullPath, baseDir);
            files.push(...subFiles);
          } else if (entry.isFile() && !entry.name.endsWith('.meta.json')) {
            files.push(relativePath);
          }
        }

        return files;
      };

      const allFiles = await readDirRecursive(dirPath, this.basePath);

      // 按文件名排序（时间戳降序）
      allFiles.sort((a, b) => {
        const aName = path.basename(a);
        const bName = path.basename(b);
        return bName.localeCompare(aName);
      });

      // 应用限制
      if (limit) {
        return allFiles.slice(0, limit);
      }

      return allFiles;
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  /**
   * 批量删除
   */
  async deleteMany(keys: string[]): Promise<void> {
    await Promise.all(keys.map((key) => this.delete(key)));
  }
}


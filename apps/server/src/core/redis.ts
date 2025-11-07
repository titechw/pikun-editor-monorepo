import { createClient, RedisClientType } from 'redis';

export class Redis {
  private static instance: Redis;
  private client: RedisClientType;

  private constructor() {
    const url = process.env.REDIS_URL || 'redis://localhost:6379';
    this.client = createClient({
      url,
      password: process.env.REDIS_PASSWORD || undefined,
    }) as RedisClientType;

    this.client.on('error', (err) => {
      console.error('Redis Client Error', err);
    });
  }

  public static getInstance(): Redis {
    if (!Redis.instance) {
      Redis.instance = new Redis();
    }
    return Redis.instance;
  }

  public async connect(): Promise<void> {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  public getClient(): RedisClientType {
    return this.client;
  }

  /**
   * 设置缓存
   */
  public async set(
    key: string,
    value: string,
    ttl?: number
  ): Promise<void> {
    await this.connect();
    if (ttl) {
      await this.client.setEx(key, ttl, value);
    } else {
      await this.client.set(key, value);
    }
  }

  /**
   * 获取缓存
   */
  public async get(key: string): Promise<string | null> {
    await this.connect();
    return await this.client.get(key);
  }

  /**
   * 删除缓存
   */
  public async del(key: string): Promise<void> {
    await this.connect();
    await this.client.del(key);
  }

  /**
   * 删除匹配模式的所有键（使用 SCAN 避免阻塞）
   * @param pattern 匹配模式，例如 "documents:workspace:*"
   */
  public async delByPattern(pattern: string): Promise<number> {
    await this.connect();
    let deletedCount = 0;
    let cursor = 0;

    do {
      const result = await this.client.scan(cursor, {
        MATCH: pattern,
        COUNT: 100,
      });
      cursor = result.cursor;

      if (result.keys.length > 0) {
        await this.client.del(result.keys);
        deletedCount += result.keys.length;
      }
    } while (cursor !== 0);

    return deletedCount;
  }

  /**
   * 设置 JSON 缓存
   */
  public async setJSON<T>(key: string, value: T, ttl?: number): Promise<void> {
    await this.set(key, JSON.stringify(value), ttl);
  }

  /**
   * 获取 JSON 缓存
   */
  public async getJSON<T>(key: string): Promise<T | null> {
    const value = await this.get(key);
    if (!value) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }

  /**
   * 关闭连接
   */
  public async close(): Promise<void> {
    if (this.client.isOpen) {
      await this.client.quit();
    }
  }
}





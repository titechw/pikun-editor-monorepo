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





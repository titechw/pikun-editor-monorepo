import 'reflect-metadata';
import { Pool, PoolConfig } from 'pg';

export class Database {
  private static instance: Database;
  private pool: Pool;

  private constructor() {
    const connectionString = process.env.DATABASE_URL;
    console.log('connectionString', connectionString);

    if (!connectionString) {
      throw new Error(
        'DATABASE_URL environment variable is not set. ' +
          'Please create a .env file in apps/server/ directory with DATABASE_URL=postgresql://pikun@localhost:5432/postgres'
      );
    }

    const config: PoolConfig = {
      connectionString,
      min: parseInt(process.env.DATABASE_POOL_MIN || '2', 10),
      max: parseInt(process.env.DATABASE_POOL_MAX || '10', 10),
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    };

    this.pool = new Pool(config);

    // 处理连接错误
    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public getPool(): Pool {
    return this.pool;
  }

  /**
   * 执行查询（使用参数化查询防止 SQL 注入）
   */
  public async query<T = any>(
    text: string,
    params?: any[]
  ): Promise<{ rows: T[]; rowCount: number }> {
    const start = Date.now();
    try {
      // 设置默认 schema
      await this.pool.query('SET search_path TO pikun_db, public');
      const result = await this.pool.query(text, params);
      const duration = Date.now() - start;
      console.log('Executed query', { text, duration, rows: result.rowCount });
      return {
        rows: result.rows as T[],
        rowCount: result.rowCount || 0,
      };
    } catch (error) {
      console.error('Database query error', { text, error });
      throw error;
    }
  }

  /**
   * 执行事务
   */
  public async transaction<T>(callback: (client: any) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();
    try {
      await client.query('SET search_path TO pikun_db, public');
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * 关闭连接池
   */
  public async close(): Promise<void> {
    await this.pool.end();
  }
}

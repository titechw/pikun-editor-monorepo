import { Database } from '@/core/database';
import { Injectable } from '@/decorators/injectable.decorator';
import type { User, Document, DocumentSnapshot, Workspace } from '@/entities';

/**
 * 用户 DAO
 * 负责用户相关的数据库操作，使用参数化查询防止 SQL 注入
 */
@Injectable('UserDAO')
export class UserDAO {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  /**
   * 根据邮箱查找用户
   */
  async findByEmail(email: string): Promise<User | null> {
    const result = await this.db.query<User>(
      'SELECT * FROM pikun_db.users WHERE email = $1 AND deleted_at IS NULL',
      [email]
    );
    return result.rows[0] || null;
  }

  /**
   * 根据 UUID 查找用户
   */
  async findByUuid(uuid: string): Promise<User | null> {
    const result = await this.db.query<User>(
      'SELECT uid, uuid, email, name, metadata, deleted_at, created_at, updated_at FROM pikun_db.users WHERE uuid = $1 AND deleted_at IS NULL',
      [uuid]
    );
    return result.rows[0] || null;
  }

  /**
   * 根据 UID 查找用户
   */
  async findByUid(uid: number): Promise<User | null> {
    const result = await this.db.query<User>(
      'SELECT uid, uuid, email, name, metadata, deleted_at, created_at, updated_at FROM pikun_db.users WHERE uid = $1 AND deleted_at IS NULL',
      [uid]
    );
    return result.rows[0] || null;
  }

  /**
   * 创建用户
   */
  async create(user: {
    email: string;
    password: string;
    name: string;
    metadata?: Record<string, any>;
  }): Promise<User> {
    const result = await this.db.query<User>(
      `INSERT INTO pikun_db.users (email, password, name, metadata)
       VALUES ($1, $2, $3, $4)
       RETURNING uid, uuid, email, name, metadata, deleted_at, created_at, updated_at`,
      [user.email, user.password, user.name, JSON.stringify(user.metadata || {})]
    );
    return result.rows[0];
  }

  /**
   * 更新用户信息
   */
  async update(uid: number, updates: {
    name?: string;
    email?: string;
    metadata?: Record<string, any>;
  }): Promise<User> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (updates.name !== undefined) {
      fields.push(`name = $${paramIndex++}`);
      values.push(updates.name);
    }
    if (updates.email !== undefined) {
      fields.push(`email = $${paramIndex++}`);
      values.push(updates.email);
    }
    if (updates.metadata !== undefined) {
      fields.push(`metadata = $${paramIndex++}`);
      values.push(JSON.stringify(updates.metadata));
    }

    if (fields.length === 0) {
      return this.findByUid(uid) as Promise<User>;
    }

    values.push(uid);
    const result = await this.db.query<User>(
      `UPDATE pikun_db.users SET ${fields.join(', ')} WHERE uid = $${paramIndex} AND deleted_at IS NULL
       RETURNING uid, uuid, email, name, metadata, deleted_at, created_at, updated_at`,
      values
    );
    return result.rows[0];
  }

  /**
   * 删除用户（软删除）
   */
  async delete(uid: number): Promise<void> {
    await this.db.query(
      'UPDATE pikun_db.users SET deleted_at = CURRENT_TIMESTAMP WHERE uid = $1',
      [uid]
    );
  }
}


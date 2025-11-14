import { Database } from '@/core/database';
import { Injectable } from '@/decorators/injectable.decorator';
import type { UserAbilityLevel } from '@/entities';

/**
 * 用户能力等级 DAO
 * 负责用户能力等级相关的数据库操作，使用参数化查询防止 SQL 注入
 */
@Injectable('UserAbilityLevelDAO')
export class UserAbilityLevelDAO {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  /**
   * 规范化数字字段（PostgreSQL BIGINT 可能返回为字符串）
   */
  private normalizeUserLevel(level: UserAbilityLevel): UserAbilityLevel {
    return {
      ...level,
      current_level: Number(level.current_level),
      current_exp: Number(level.current_exp),
      total_exp: Number(level.total_exp),
      level_up_count: Number(level.level_up_count),
    };
  }

  /**
   * 获取用户的所有能力等级
   */
  async findByUserId(uid: number): Promise<UserAbilityLevel[]> {
    const result = await this.db.query<UserAbilityLevel>(
      'SELECT * FROM pikun_db.user_ability_levels WHERE uid = $1 ORDER BY created_at ASC',
      [uid]
    );
    return result.rows.map((row) => this.normalizeUserLevel(row));
  }

  /**
   * 根据用户ID和能力项ID查找
   */
  async findByUserAndItem(uid: number, itemId: string): Promise<UserAbilityLevel | null> {
    const result = await this.db.query<UserAbilityLevel>(
      'SELECT * FROM pikun_db.user_ability_levels WHERE uid = $1 AND item_id = $2',
      [uid, itemId]
    );
    return result.rows[0] ? this.normalizeUserLevel(result.rows[0]) : null;
  }

  /**
   * 创建或更新用户能力等级
   */
  async upsert(data: {
    uid: number;
    item_id: string;
    current_level?: number;
    current_exp?: number;
    total_exp?: number;
    level_up_count?: number;
    last_level_up_at?: Date;
    metadata?: Record<string, any>;
  }): Promise<UserAbilityLevel> {
    const existing = await this.findByUserAndItem(data.uid, data.item_id);
    if (existing) {
      return this.update(data.uid, data.item_id, {
        current_level: data.current_level,
        current_exp: data.current_exp,
        total_exp: data.total_exp,
        level_up_count: data.level_up_count,
        last_level_up_at: data.last_level_up_at,
        metadata: data.metadata,
      });
    }
    return this.create(data);
  }

  /**
   * 创建用户能力等级
   */
  async create(data: {
    uid: number;
    item_id: string;
    current_level?: number;
    current_exp?: number;
    total_exp?: number;
    level_up_count?: number;
    last_level_up_at?: Date;
    metadata?: Record<string, any>;
  }): Promise<UserAbilityLevel> {
    const result = await this.db.query<UserAbilityLevel>(
      `INSERT INTO pikun_db.user_ability_levels (
        uid, item_id, current_level, current_exp, total_exp, level_up_count, last_level_up_at, metadata
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        data.uid,
        data.item_id,
        data.current_level || 1,
        data.current_exp || 0,
        data.total_exp || 0,
        data.level_up_count || 0,
        data.last_level_up_at || null,
        JSON.stringify(data.metadata || {}),
      ]
    );
    return this.normalizeUserLevel(result.rows[0]);
  }

  /**
   * 更新用户能力等级
   */
  async update(
    uid: number,
    itemId: string,
    updates: {
      current_level?: number;
      current_exp?: number;
      total_exp?: number;
      level_up_count?: number;
      last_level_up_at?: Date;
      metadata?: Record<string, any>;
    }
  ): Promise<UserAbilityLevel> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (updates.current_level !== undefined) {
      fields.push(`current_level = $${paramIndex++}`);
      values.push(updates.current_level);
    }
    if (updates.current_exp !== undefined) {
      fields.push(`current_exp = $${paramIndex++}`);
      values.push(updates.current_exp);
    }
    if (updates.total_exp !== undefined) {
      fields.push(`total_exp = $${paramIndex++}`);
      values.push(updates.total_exp);
    }
    if (updates.level_up_count !== undefined) {
      fields.push(`level_up_count = $${paramIndex++}`);
      values.push(updates.level_up_count);
    }
    if (updates.last_level_up_at !== undefined) {
      fields.push(`last_level_up_at = $${paramIndex++}`);
      values.push(updates.last_level_up_at);
    }
    if (updates.metadata !== undefined) {
      fields.push(`metadata = $${paramIndex++}`);
      values.push(JSON.stringify(updates.metadata));
    }

    if (fields.length === 0) {
      return this.findByUserAndItem(uid, itemId) as Promise<UserAbilityLevel>;
    }

    values.push(uid, itemId);
    const result = await this.db.query<UserAbilityLevel>(
      `UPDATE pikun_db.user_ability_levels SET ${fields.join(', ')} WHERE uid = $${paramIndex} AND item_id = $${paramIndex + 1}
       RETURNING *`,
      values
    );
    return this.normalizeUserLevel(result.rows[0]);
  }

  /**
   * 增加经验值
   */
  async addExperience(uid: number, itemId: string, expAmount: number): Promise<UserAbilityLevel> {
    const existing = await this.findByUserAndItem(uid, itemId);
    if (!existing) {
      return this.create({
        uid,
        item_id: itemId,
        current_level: 1,
        current_exp: expAmount,
        total_exp: expAmount,
      });
    }
    // 确保 existing 的数字字段是数字类型（防止字符串拼接）
    const currentExp = Number(existing.current_exp);
    const totalExp = Number(existing.total_exp);
    return this.update(uid, itemId, {
      current_exp: currentExp + expAmount,
      total_exp: totalExp + expAmount,
    });
  }
}


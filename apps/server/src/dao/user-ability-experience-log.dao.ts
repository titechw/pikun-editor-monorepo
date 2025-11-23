import { Database } from '@/core/database';
import { Injectable } from '@/decorators/injectable.decorator';
import type { UserAbilityExperienceLog } from '@/entities';

/**
 * 用户经验获得记录 DAO
 * 负责用户经验获得记录相关的数据库操作，使用参数化查询防止 SQL 注入
 */
@Injectable('UserAbilityExperienceLogDAO')
export class UserAbilityExperienceLogDAO {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  /**
   * 获取用户的经验记录
   */
  async findByUserId(
    uid: number,
    options?: {
      itemId?: string;
      expType?: string;
      limit?: number;
      offset?: number;
    }
  ): Promise<UserAbilityExperienceLog[]> {
    let query = 'SELECT * FROM pikun_db.user_ability_experience_logs WHERE uid = $1';
    const params: any[] = [uid];
    let paramIndex = 2;

    if (options?.itemId) {
      query += ` AND item_id = $${paramIndex++}`;
      params.push(options.itemId);
    }
    if (options?.expType) {
      query += ` AND exp_type = $${paramIndex++}`;
      params.push(options.expType);
    }

    query += ' ORDER BY created_at DESC';

    if (options?.limit) {
      query += ` LIMIT $${paramIndex++}`;
      params.push(options.limit);
      if (options?.offset) {
        query += ` OFFSET $${paramIndex++}`;
        params.push(options.offset);
      }
    }

    const result = await this.db.query<UserAbilityExperienceLog>(query, params);
    return result.rows;
  }

  /**
   * 创建经验记录
   */
  async create(data: {
    uid: number;
    item_id: string;
    exp_amount: number;
    exp_type: string;
    source_id?: string;
    source_type?: string;
    before_level: number;
    after_level: number;
    before_exp: number;
    after_exp: number;
    is_level_up: boolean;
    notes?: string;
    metadata?: Record<string, any>;
  }): Promise<UserAbilityExperienceLog> {
    const result = await this.db.query<UserAbilityExperienceLog>(
      `INSERT INTO pikun_db.user_ability_experience_logs (
        uid, item_id, exp_amount, exp_type, source_id, source_type,
        before_level, after_level, before_exp, after_exp, is_level_up, notes, metadata
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [
        data.uid,
        data.item_id,
        data.exp_amount,
        data.exp_type,
        data.source_id || null,
        data.source_type || null,
        data.before_level,
        data.after_level,
        data.before_exp,
        data.after_exp,
        data.is_level_up,
        data.notes || null,
        JSON.stringify(data.metadata || {}),
      ]
    );
    return result.rows[0];
  }
}










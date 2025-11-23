import { Database } from '@/core/database';
import { Injectable } from '@/decorators/injectable.decorator';
import type { UserMemoryLevelProgress } from '@/entities';

/**
 * 用户关卡进度 DAO
 */
@Injectable('UserMemoryLevelProgressDAO')
export class UserMemoryLevelProgressDAO {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  /**
   * 根据用户 ID 和关卡 ID 查找进度
   */
  async findByUserAndLevel(
    uid: number,
    levelId: string
  ): Promise<UserMemoryLevelProgress | null> {
    const result = await this.db.query<UserMemoryLevelProgress>(
      `SELECT * FROM pikun_db.user_memory_level_progress 
       WHERE uid = $1 AND level_id = $2`,
      [uid, levelId]
    );
    return result.rows.length > 0 ? this.normalizeProgress(result.rows[0]) : null;
  }

  /**
   * 根据用户 ID 查找所有进度
   */
  async findByUserId(uid: number): Promise<UserMemoryLevelProgress[]> {
    const result = await this.db.query<UserMemoryLevelProgress>(
      `SELECT * FROM pikun_db.user_memory_level_progress 
       WHERE uid = $1 
       ORDER BY created_at DESC`,
      [uid]
    );
    return result.rows.map(this.normalizeProgress);
  }

  /**
   * 根据游戏 ID 查找用户在该游戏的所有进度
   */
  async findByUserAndGame(
    uid: number,
    gameId: string
  ): Promise<UserMemoryLevelProgress[]> {
    const result = await this.db.query<UserMemoryLevelProgress>(
      `SELECT p.* FROM pikun_db.user_memory_level_progress p
       INNER JOIN pikun_db.memory_training_levels l ON p.level_id = l.level_id
       WHERE p.uid = $1 AND l.game_id = $2
       ORDER BY l.level_number ASC`,
      [uid, gameId]
    );
    return result.rows.map(this.normalizeProgress);
  }

  /**
   * 创建或更新进度
   */
  async upsert(
    uid: number,
    levelId: string,
    updates: {
      is_unlocked?: boolean;
      is_completed?: boolean;
      best_score?: number;
      best_correct_rate?: number;
      best_time_spent?: number;
      completion_count?: number;
      total_exp_earned?: number;
      first_completed_at?: Date;
      last_played_at?: Date;
      metadata?: Record<string, unknown>;
    }
  ): Promise<UserMemoryLevelProgress> {
    const existing = await this.findByUserAndLevel(uid, levelId);

    if (existing) {
      // 更新
      const fields: string[] = [];
      const values: any[] = [];
      let paramIndex = 1;

      if (updates.is_unlocked !== undefined) {
        fields.push(`is_unlocked = $${paramIndex++}`);
        values.push(updates.is_unlocked);
      }
      if (updates.is_completed !== undefined) {
        fields.push(`is_completed = $${paramIndex++}`);
        values.push(updates.is_completed);
      }
      if (updates.best_score !== undefined) {
        fields.push(`best_score = $${paramIndex++}`);
        values.push(updates.best_score);
      }
      if (updates.best_correct_rate !== undefined) {
        fields.push(`best_correct_rate = $${paramIndex++}`);
        values.push(updates.best_correct_rate);
      }
      if (updates.best_time_spent !== undefined) {
        fields.push(`best_time_spent = $${paramIndex++}`);
        values.push(updates.best_time_spent);
      }
      if (updates.completion_count !== undefined) {
        fields.push(`completion_count = $${paramIndex++}`);
        values.push(updates.completion_count);
      }
      if (updates.total_exp_earned !== undefined) {
        fields.push(`total_exp_earned = $${paramIndex++}`);
        values.push(updates.total_exp_earned);
      }
      if (updates.first_completed_at !== undefined) {
        fields.push(`first_completed_at = $${paramIndex++}`);
        values.push(updates.first_completed_at);
      }
      if (updates.last_played_at !== undefined) {
        fields.push(`last_played_at = $${paramIndex++}`);
        values.push(updates.last_played_at);
      }
      if (updates.metadata !== undefined) {
        fields.push(`metadata = $${paramIndex++}`);
        values.push(JSON.stringify(updates.metadata));
      }

      if (fields.length === 0) {
        return existing;
      }

      values.push(uid, levelId);
      const result = await this.db.query<UserMemoryLevelProgress>(
        `UPDATE pikun_db.user_memory_level_progress 
         SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
         WHERE uid = $${paramIndex++} AND level_id = $${paramIndex}
         RETURNING *`,
        values
      );
      return this.normalizeProgress(result.rows[0]);
    } else {
      // 创建
      const result = await this.db.query<UserMemoryLevelProgress>(
        `INSERT INTO pikun_db.user_memory_level_progress (
          uid, level_id, is_unlocked, is_completed, best_score, best_correct_rate,
          best_time_spent, completion_count, total_exp_earned, first_completed_at,
          last_played_at, metadata
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *`,
        [
          uid,
          levelId,
          updates.is_unlocked || false,
          updates.is_completed || false,
          updates.best_score || 0,
          updates.best_correct_rate || 0,
          updates.best_time_spent || null,
          updates.completion_count || 0,
          updates.total_exp_earned || 0,
          updates.first_completed_at || null,
          updates.last_played_at || null,
          JSON.stringify(updates.metadata || {}),
        ]
      );
      return this.normalizeProgress(result.rows[0]);
    }
  }

  /**
   * 规范化进度数据
   */
  private normalizeProgress(row: any): UserMemoryLevelProgress {
    return {
      progress_id: row.progress_id,
      uid: Number(row.uid),
      level_id: row.level_id,
      is_unlocked: row.is_unlocked,
      is_completed: row.is_completed,
      best_score: Number(row.best_score),
      best_correct_rate: Number(row.best_correct_rate),
      best_time_spent: row.best_time_spent ? Number(row.best_time_spent) : null,
      completion_count: Number(row.completion_count),
      total_exp_earned: Number(row.total_exp_earned),
      first_completed_at: row.first_completed_at,
      last_played_at: row.last_played_at,
      metadata: row.metadata || {},
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }
}






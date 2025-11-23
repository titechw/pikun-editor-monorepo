import { Database } from '@/core/database';
import { Injectable } from '@/decorators/injectable.decorator';
import type { MemoryTrainingLevel } from '@/entities';

/**
 * 记忆训练关卡 DAO
 */
@Injectable('MemoryTrainingLevelDAO')
export class MemoryTrainingLevelDAO {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  /**
   * 根据游戏 ID 查找所有已发布的关卡
   */
  async findByGameId(gameId: string): Promise<MemoryTrainingLevel[]> {
    const result = await this.db.query<MemoryTrainingLevel>(
      `SELECT * FROM pikun_db.memory_training_levels 
       WHERE game_id = $1 AND is_published = true AND deleted_at IS NULL 
       ORDER BY level_number ASC, sort_order ASC`,
      [gameId]
    );
    return result.rows.map(this.normalizeLevel);
  }

  /**
   * 根据 ID 查找关卡
   */
  async findById(levelId: string): Promise<MemoryTrainingLevel | null> {
    const result = await this.db.query<MemoryTrainingLevel>(
      `SELECT * FROM pikun_db.memory_training_levels 
       WHERE level_id = $1 AND deleted_at IS NULL`,
      [levelId]
    );
    return result.rows.length > 0 ? this.normalizeLevel(result.rows[0]) : null;
  }

  /**
   * 规范化关卡数据
   */
  private normalizeLevel(row: any): MemoryTrainingLevel {
    return {
      level_id: row.level_id,
      game_id: row.game_id,
      level_number: Number(row.level_number),
      name: row.name,
      description: row.description,
      difficulty_config: row.difficulty_config || {},
      required_ability_level: Number(row.required_ability_level),
      base_exp_reward: Number(row.base_exp_reward),
      unlock_condition: row.unlock_condition || {},
      sort_order: Number(row.sort_order),
      is_published: row.is_published,
      metadata: row.metadata || {},
      created_at: row.created_at,
      updated_at: row.updated_at,
      deleted_at: row.deleted_at,
    };
  }
}






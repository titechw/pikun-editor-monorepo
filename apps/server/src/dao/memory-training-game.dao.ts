import { Database } from '@/core/database';
import { Injectable } from '@/decorators/injectable.decorator';
import type { MemoryTrainingGame } from '@/entities';

/**
 * 记忆训练游戏 DAO
 */
@Injectable('MemoryTrainingGameDAO')
export class MemoryTrainingGameDAO {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  /**
   * 查找所有已发布的游戏
   */
  async findAllPublished(): Promise<MemoryTrainingGame[]> {
    const result = await this.db.query<MemoryTrainingGame>(
      `SELECT * FROM pikun_db.memory_training_games 
       WHERE is_published = true AND deleted_at IS NULL 
       ORDER BY sort_order ASC, created_at ASC`
    );
    return result.rows.map(this.normalizeGame);
  }

  /**
   * 根据 ID 查找游戏
   */
  async findById(gameId: string): Promise<MemoryTrainingGame | null> {
    const result = await this.db.query<MemoryTrainingGame>(
      `SELECT * FROM pikun_db.memory_training_games 
       WHERE game_id = $1 AND deleted_at IS NULL`,
      [gameId]
    );
    return result.rows.length > 0 ? this.normalizeGame(result.rows[0]) : null;
  }

  /**
   * 根据 code 查找游戏
   */
  async findByCode(code: string): Promise<MemoryTrainingGame | null> {
    const result = await this.db.query<MemoryTrainingGame>(
      `SELECT * FROM pikun_db.memory_training_games 
       WHERE code = $1 AND deleted_at IS NULL`,
      [code]
    );
    return result.rows.length > 0 ? this.normalizeGame(result.rows[0]) : null;
  }

  /**
   * 规范化游戏数据
   */
  private normalizeGame(row: any): MemoryTrainingGame {
    return {
      game_id: row.game_id,
      code: row.code,
      name: row.name,
      description: row.description,
      icon: row.icon,
      game_type: row.game_type,
      ability_item_id: row.ability_item_id,
      min_ability_level: Number(row.min_ability_level),
      max_ability_level: Number(row.max_ability_level),
      sort_order: Number(row.sort_order),
      is_published: row.is_published,
      metadata: row.metadata || {},
      created_at: row.created_at,
      updated_at: row.updated_at,
      deleted_at: row.deleted_at,
    };
  }
}






import { Database } from '@/core/database';
import { Injectable } from '@/decorators/injectable.decorator';

/**
 * 基础能力实体
 */
export interface FoundationalAbility {
  ability_id: string;
  code: string;
  name: string;
  description: string | null;
  icon_url: string | null;
  sort_order: number;
  metadata: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

/**
 * 基础能力 DAO
 */
@Injectable('FoundationalAbilityDAO')
export class FoundationalAbilityDAO {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  /**
   * 获取所有基础能力
   */
  async findAll(): Promise<FoundationalAbility[]> {
    const result = await this.db.query<FoundationalAbility>(
      'SELECT * FROM pikun_db.foundational_abilities WHERE deleted_at IS NULL ORDER BY sort_order ASC, created_at ASC',
      []
    );
    return result.rows;
  }

  /**
   * 根据ID查找基础能力
   */
  async findById(abilityId: string): Promise<FoundationalAbility | null> {
    const result = await this.db.query<FoundationalAbility>(
      'SELECT * FROM pikun_db.foundational_abilities WHERE ability_id = $1 AND deleted_at IS NULL',
      [abilityId]
    );
    return result.rows[0] || null;
  }
}


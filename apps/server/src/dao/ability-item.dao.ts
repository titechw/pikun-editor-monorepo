import { Database } from '@/core/database';
import { Injectable } from '@/decorators/injectable.decorator';
import type { AbilityItem } from '@/entities';

/**
 * 能力项 DAO
 * 负责能力项相关的数据库操作，使用参数化查询防止 SQL 注入
 */
@Injectable('AbilityItemDAO')
export class AbilityItemDAO {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  /**
   * 获取所有能力项（未删除）
   */
  async findAll(dimensionId?: string): Promise<AbilityItem[]> {
    if (dimensionId) {
      const result = await this.db.query<AbilityItem>(
        'SELECT * FROM pikun_db.ability_items WHERE dimension_id = $1 AND deleted_at IS NULL ORDER BY sort_order ASC, created_at ASC',
        [dimensionId]
      );
      return result.rows;
    }
    const result = await this.db.query<AbilityItem>(
      'SELECT * FROM pikun_db.ability_items WHERE deleted_at IS NULL ORDER BY sort_order ASC, created_at ASC',
      []
    );
    return result.rows;
  }

  /**
   * 根据 ID 查找能力项
   */
  async findById(itemId: string): Promise<AbilityItem | null> {
    const result = await this.db.query<AbilityItem>(
      'SELECT * FROM pikun_db.ability_items WHERE item_id = $1 AND deleted_at IS NULL',
      [itemId]
    );
    return result.rows[0] || null;
  }

  /**
   * 根据维度ID和代码查找能力项
   */
  async findByDimensionAndCode(dimensionId: string, code: string): Promise<AbilityItem | null> {
    const result = await this.db.query<AbilityItem>(
      'SELECT * FROM pikun_db.ability_items WHERE dimension_id = $1 AND code = $2 AND deleted_at IS NULL',
      [dimensionId, code]
    );
    return result.rows[0] || null;
  }

  /**
   * 创建能力项
   */
  async create(data: {
    dimension_id: string;
    code: string;
    name: string;
    description?: string;
    definition?: string;
    performance_description?: string;
    evaluation_points?: string;
    training_strategies?: string;
    theoretical_basis?: string;
    talent_ratio?: number;
    acquired_training_ratio?: number;
    sort_order?: number;
    metadata?: Record<string, any>;
  }): Promise<AbilityItem> {
    // 如果没有提供占比，默认各 50%
    const talentRatio = data.talent_ratio ?? 50.00;
    const acquiredTrainingRatio = data.acquired_training_ratio ?? 50.00;

    const result = await this.db.query<AbilityItem>(
      `INSERT INTO pikun_db.ability_items (
        dimension_id, code, name, description, definition, performance_description,
        evaluation_points, training_strategies, theoretical_basis, talent_ratio, acquired_training_ratio, sort_order, metadata
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [
        data.dimension_id,
        data.code,
        data.name,
        data.description || null,
        data.definition || null,
        data.performance_description || null,
        data.evaluation_points || null,
        data.training_strategies || null,
        data.theoretical_basis || null,
        talentRatio,
        acquiredTrainingRatio,
        data.sort_order || 0,
        JSON.stringify(data.metadata || {}),
      ]
    );
    return result.rows[0];
  }

  /**
   * 更新能力项
   */
  async update(
    itemId: string,
    updates: {
      code?: string;
      name?: string;
      description?: string;
      definition?: string;
      performance_description?: string;
      evaluation_points?: string;
      training_strategies?: string;
      theoretical_basis?: string;
      talent_ratio?: number;
      acquired_training_ratio?: number;
      sort_order?: number;
      metadata?: Record<string, any>;
    }
  ): Promise<AbilityItem> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (updates.code !== undefined) {
      fields.push(`code = $${paramIndex++}`);
      values.push(updates.code);
    }
    if (updates.name !== undefined) {
      fields.push(`name = $${paramIndex++}`);
      values.push(updates.name);
    }
    if (updates.description !== undefined) {
      fields.push(`description = $${paramIndex++}`);
      values.push(updates.description);
    }
    if (updates.definition !== undefined) {
      fields.push(`definition = $${paramIndex++}`);
      values.push(updates.definition);
    }
    if (updates.performance_description !== undefined) {
      fields.push(`performance_description = $${paramIndex++}`);
      values.push(updates.performance_description);
    }
    if (updates.evaluation_points !== undefined) {
      fields.push(`evaluation_points = $${paramIndex++}`);
      values.push(updates.evaluation_points);
    }
    if (updates.training_strategies !== undefined) {
      fields.push(`training_strategies = $${paramIndex++}`);
      values.push(updates.training_strategies);
    }
    if (updates.theoretical_basis !== undefined) {
      fields.push(`theoretical_basis = $${paramIndex++}`);
      values.push(updates.theoretical_basis);
    }
    if (updates.talent_ratio !== undefined) {
      fields.push(`talent_ratio = $${paramIndex++}`);
      values.push(updates.talent_ratio);
    }
    if (updates.acquired_training_ratio !== undefined) {
      fields.push(`acquired_training_ratio = $${paramIndex++}`);
      values.push(updates.acquired_training_ratio);
    }
    if (updates.sort_order !== undefined) {
      fields.push(`sort_order = $${paramIndex++}`);
      values.push(updates.sort_order);
    }
    if (updates.metadata !== undefined) {
      fields.push(`metadata = $${paramIndex++}`);
      values.push(JSON.stringify(updates.metadata));
    }

    if (fields.length === 0) {
      return this.findById(itemId) as Promise<AbilityItem>;
    }

    values.push(itemId);
    const result = await this.db.query<AbilityItem>(
      `UPDATE pikun_db.ability_items SET ${fields.join(', ')} WHERE item_id = $${paramIndex} AND deleted_at IS NULL
       RETURNING *`,
      values
    );
    return result.rows[0];
  }

  /**
   * 删除能力项（软删除）
   */
  async delete(itemId: string): Promise<void> {
    await this.db.query(
      'UPDATE pikun_db.ability_items SET deleted_at = CURRENT_TIMESTAMP WHERE item_id = $1',
      [itemId]
    );
  }
}


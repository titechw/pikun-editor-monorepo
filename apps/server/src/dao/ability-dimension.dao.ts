import { Database } from '@/core/database';
import { Injectable } from '@/decorators/injectable.decorator';
import type { AbilityDimension } from '@/entities';

/**
 * 能力维度 DAO
 * 负责能力维度相关的数据库操作，使用参数化查询防止 SQL 注入
 */
@Injectable('AbilityDimensionDAO')
export class AbilityDimensionDAO {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  /**
   * 获取所有能力维度（未删除）
   */
  async findAll(categoryId?: string): Promise<AbilityDimension[]> {
    if (categoryId) {
      const result = await this.db.query<AbilityDimension>(
        'SELECT * FROM pikun_db.ability_dimensions WHERE category_id = $1 AND deleted_at IS NULL ORDER BY sort_order ASC, created_at ASC',
        [categoryId]
      );
      return result.rows;
    }
    const result = await this.db.query<AbilityDimension>(
      'SELECT * FROM pikun_db.ability_dimensions WHERE deleted_at IS NULL ORDER BY sort_order ASC, created_at ASC',
      []
    );
    return result.rows;
  }

  /**
   * 根据 ID 查找能力维度
   */
  async findById(dimensionId: string): Promise<AbilityDimension | null> {
    const result = await this.db.query<AbilityDimension>(
      'SELECT * FROM pikun_db.ability_dimensions WHERE dimension_id = $1 AND deleted_at IS NULL',
      [dimensionId]
    );
    return result.rows[0] || null;
  }

  /**
   * 根据类别ID和代码查找能力维度
   */
  async findByCategoryAndCode(categoryId: string, code: string): Promise<AbilityDimension | null> {
    const result = await this.db.query<AbilityDimension>(
      'SELECT * FROM pikun_db.ability_dimensions WHERE category_id = $1 AND code = $2 AND deleted_at IS NULL',
      [categoryId, code]
    );
    return result.rows[0] || null;
  }

  /**
   * 创建能力维度
   */
  async create(data: {
    category_id: string;
    code: string;
    name: string;
    description?: string;
    sort_order?: number;
    metadata?: Record<string, any>;
  }): Promise<AbilityDimension> {
    const result = await this.db.query<AbilityDimension>(
      `INSERT INTO pikun_db.ability_dimensions (category_id, code, name, description, sort_order, metadata)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        data.category_id,
        data.code,
        data.name,
        data.description || null,
        data.sort_order || 0,
        JSON.stringify(data.metadata || {}),
      ]
    );
    return result.rows[0];
  }

  /**
   * 更新能力维度
   */
  async update(
    dimensionId: string,
    updates: {
      code?: string;
      name?: string;
      description?: string;
      sort_order?: number;
      metadata?: Record<string, any>;
    }
  ): Promise<AbilityDimension> {
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
    if (updates.sort_order !== undefined) {
      fields.push(`sort_order = $${paramIndex++}`);
      values.push(updates.sort_order);
    }
    if (updates.metadata !== undefined) {
      fields.push(`metadata = $${paramIndex++}`);
      values.push(JSON.stringify(updates.metadata));
    }

    if (fields.length === 0) {
      return this.findById(dimensionId) as Promise<AbilityDimension>;
    }

    values.push(dimensionId);
    const result = await this.db.query<AbilityDimension>(
      `UPDATE pikun_db.ability_dimensions SET ${fields.join(', ')} WHERE dimension_id = $${paramIndex} AND deleted_at IS NULL
       RETURNING *`,
      values
    );
    return result.rows[0];
  }

  /**
   * 删除能力维度（软删除）
   */
  async delete(dimensionId: string): Promise<void> {
    await this.db.query(
      'UPDATE pikun_db.ability_dimensions SET deleted_at = CURRENT_TIMESTAMP WHERE dimension_id = $1',
      [dimensionId]
    );
  }
}










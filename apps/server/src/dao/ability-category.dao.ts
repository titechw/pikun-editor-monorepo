import { Database } from '@/core/database';
import { Injectable } from '@/decorators/injectable.decorator';
import type { AbilityCategory } from '@/entities';

/**
 * 能力类别 DAO
 * 负责能力类别相关的数据库操作，使用参数化查询防止 SQL 注入
 */
@Injectable('AbilityCategoryDAO')
export class AbilityCategoryDAO {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  /**
   * 获取所有能力类别（未删除）
   */
  async findAll(): Promise<AbilityCategory[]> {
    const result = await this.db.query<AbilityCategory>(
      'SELECT * FROM pikun_db.ability_categories WHERE deleted_at IS NULL ORDER BY sort_order ASC, created_at ASC',
      []
    );
    return result.rows;
  }

  /**
   * 根据 ID 查找能力类别
   */
  async findById(categoryId: string): Promise<AbilityCategory | null> {
    const result = await this.db.query<AbilityCategory>(
      'SELECT * FROM pikun_db.ability_categories WHERE category_id = $1 AND deleted_at IS NULL',
      [categoryId]
    );
    return result.rows[0] || null;
  }

  /**
   * 根据代码查找能力类别
   */
  async findByCode(code: string): Promise<AbilityCategory | null> {
    const result = await this.db.query<AbilityCategory>(
      'SELECT * FROM pikun_db.ability_categories WHERE code = $1 AND deleted_at IS NULL',
      [code]
    );
    return result.rows[0] || null;
  }

  /**
   * 创建能力类别
   */
  async create(data: {
    code: string;
    name: string;
    description?: string;
    sort_order?: number;
    metadata?: Record<string, any>;
  }): Promise<AbilityCategory> {
    const result = await this.db.query<AbilityCategory>(
      `INSERT INTO pikun_db.ability_categories (code, name, description, sort_order, metadata)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
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
   * 更新能力类别
   */
  async update(
    categoryId: string,
    updates: {
      code?: string;
      name?: string;
      description?: string;
      sort_order?: number;
      metadata?: Record<string, any>;
    }
  ): Promise<AbilityCategory> {
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
      return this.findById(categoryId) as Promise<AbilityCategory>;
    }

    values.push(categoryId);
    const result = await this.db.query<AbilityCategory>(
      `UPDATE pikun_db.ability_categories SET ${fields.join(', ')} WHERE category_id = $${paramIndex} AND deleted_at IS NULL
       RETURNING *`,
      values
    );
    return result.rows[0];
  }

  /**
   * 删除能力类别（软删除）
   */
  async delete(categoryId: string): Promise<void> {
    await this.db.query(
      'UPDATE pikun_db.ability_categories SET deleted_at = CURRENT_TIMESTAMP WHERE category_id = $1',
      [categoryId]
    );
  }
}





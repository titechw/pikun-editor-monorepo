import { Database } from '@/core/database';
import { Injectable } from '@/decorators/injectable.decorator';
import type { Subject, SubjectDetail } from '@/entities';

/**
 * 学科 DAO
 * 负责学科相关的数据库操作，使用参数化查询防止 SQL 注入
 */
@Injectable('SubjectDAO')
export class SubjectDAO {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  /**
   * 获取所有学科（未删除）
   */
  async findAll(): Promise<Subject[]> {
    const result = await this.db.query<Subject>(
      'SELECT * FROM pikun_db.subjects WHERE deleted_at IS NULL ORDER BY sort_order ASC, created_at ASC',
      []
    );
    return result.rows;
  }

  /**
   * 根据分类 ID 查找学科（支持分页和搜索）
   */
  async findByCategoryId(
    categoryId: string | null,
    options?: { current?: number; pageSize?: number; keyword?: string }
  ): Promise<{ subjects: Subject[]; total: number }> {
    const current = options?.current || 1;
    const pageSize = options?.pageSize || 20;
    const offset = (current - 1) * pageSize;
    const keyword = options?.keyword?.trim();

    let countQuery: string;
    let listQuery: string;
    const params: any[] = [];
    let paramIndex = 1;

    if (categoryId) {
      const keywordCondition = keyword ? ` AND (name ILIKE $${paramIndex + 1} OR code ILIKE $${paramIndex + 1})` : '';
      const keywordParam = keyword ? `%${keyword}%` : null;
      countQuery = `SELECT COUNT(*) as count FROM pikun_db.subjects WHERE category_id = $1 AND deleted_at IS NULL${keywordCondition}`;
      listQuery = `SELECT * FROM pikun_db.subjects WHERE category_id = $1 AND deleted_at IS NULL${keywordCondition} ORDER BY sort_order ASC, created_at ASC LIMIT $${paramIndex + (keyword ? 2 : 1)} OFFSET $${paramIndex + (keyword ? 3 : 2)}`;
      params.push(categoryId);
      if (keyword) {
        params.push(keywordParam, pageSize, offset);
      } else {
        params.push(pageSize, offset);
      }
    } else {
      // 查询所有学科（不分分类）
      const keywordCondition = keyword ? ` AND (name ILIKE $${paramIndex} OR code ILIKE $${paramIndex})` : '';
      const keywordParam = keyword ? `%${keyword}%` : null;
      countQuery = `SELECT COUNT(*) as count FROM pikun_db.subjects WHERE deleted_at IS NULL${keywordCondition}`;
      listQuery = `SELECT * FROM pikun_db.subjects WHERE deleted_at IS NULL${keywordCondition} ORDER BY sort_order ASC, created_at ASC LIMIT $${paramIndex + (keyword ? 1 : 0)} OFFSET $${paramIndex + (keyword ? 2 : 1)}`;
      if (keyword) {
        params.push(keywordParam, pageSize, offset);
      } else {
        params.push(pageSize, offset);
      }
    }

    const countParams = categoryId ? (keyword ? [categoryId, keywordParam] : [categoryId]) : (keyword ? [keywordParam] : []);
    const countResult = await this.db.query<{ count: string }>(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count, 10);

    const result = await this.db.query<Subject>(listQuery, params);

    return {
      subjects: result.rows,
      total,
    };
  }

  /**
   * 根据 ID 查找学科
   */
  async findById(subjectId: string): Promise<Subject | null> {
    const result = await this.db.query<Subject>(
      'SELECT * FROM pikun_db.subjects WHERE subject_id = $1 AND deleted_at IS NULL',
      [subjectId]
    );
    return result.rows[0] || null;
  }

  /**
   * 根据代码查找学科
   */
  async findByCode(code: string): Promise<Subject | null> {
    const result = await this.db.query<Subject>(
      'SELECT * FROM pikun_db.subjects WHERE code = $1 AND deleted_at IS NULL',
      [code]
    );
    return result.rows[0] || null;
  }

  /**
   * 创建学科
   */
  async create(data: {
    category_id: string;
    code: string;
    name: string;
    short_name?: string;
    icon_url?: string;
    cover_image_url?: string;
    sort_order?: number;
    is_published?: boolean;
    metadata?: Record<string, any>;
  }): Promise<Subject> {
    const result = await this.db.query<Subject>(
      `INSERT INTO pikun_db.subjects (category_id, code, name, short_name, icon_url, cover_image_url, sort_order, is_published, metadata)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        data.category_id,
        data.code,
        data.name,
        data.short_name || null,
        data.icon_url || null,
        data.cover_image_url || null,
        data.sort_order || 0,
        data.is_published !== undefined ? data.is_published : false,
        JSON.stringify(data.metadata || {}),
      ]
    );
    return result.rows[0];
  }

  /**
   * 更新学科
   */
  async update(
    subjectId: string,
    updates: {
      category_id?: string;
      code?: string;
      name?: string;
      short_name?: string;
      icon_url?: string;
      cover_image_url?: string;
      sort_order?: number;
      is_published?: boolean;
      metadata?: Record<string, any>;
    }
  ): Promise<Subject> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (updates.category_id !== undefined) {
      fields.push(`category_id = $${paramIndex++}`);
      values.push(updates.category_id);
    }
    if (updates.code !== undefined) {
      fields.push(`code = $${paramIndex++}`);
      values.push(updates.code);
    }
    if (updates.name !== undefined) {
      fields.push(`name = $${paramIndex++}`);
      values.push(updates.name);
    }
    if (updates.short_name !== undefined) {
      fields.push(`short_name = $${paramIndex++}`);
      values.push(updates.short_name);
    }
    if (updates.icon_url !== undefined) {
      fields.push(`icon_url = $${paramIndex++}`);
      values.push(updates.icon_url);
    }
    if (updates.cover_image_url !== undefined) {
      fields.push(`cover_image_url = $${paramIndex++}`);
      values.push(updates.cover_image_url);
    }
    if (updates.sort_order !== undefined) {
      fields.push(`sort_order = $${paramIndex++}`);
      values.push(updates.sort_order);
    }
    if (updates.is_published !== undefined) {
      fields.push(`is_published = $${paramIndex++}`);
      values.push(updates.is_published);
    }
    if (updates.metadata !== undefined) {
      fields.push(`metadata = $${paramIndex++}`);
      values.push(JSON.stringify(updates.metadata));
    }

    if (fields.length === 0) {
      return this.findById(subjectId) as Promise<Subject>;
    }

    values.push(subjectId);
    const result = await this.db.query<Subject>(
      `UPDATE pikun_db.subjects SET ${fields.join(', ')} WHERE subject_id = $${paramIndex} AND deleted_at IS NULL
       RETURNING *`,
      values
    );
    return result.rows[0];
  }

  /**
   * 删除学科（软删除）
   */
  async delete(subjectId: string): Promise<void> {
    await this.db.query(
      'UPDATE pikun_db.subjects SET deleted_at = CURRENT_TIMESTAMP WHERE subject_id = $1',
      [subjectId]
    );
  }

  /**
   * 获取学科详情
   */
  async findDetailBySubjectId(subjectId: string): Promise<SubjectDetail | null> {
    const result = await this.db.query<SubjectDetail>(
      'SELECT * FROM pikun_db.subject_details WHERE subject_id = $1',
      [subjectId]
    );
    return result.rows[0] || null;
  }

  /**
   * 创建或更新学科详情
   */
  async upsertDetail(data: {
    subject_id: string;
    definition?: string;
    description?: string;
    purpose?: string;
    value?: string;
    application_scenarios?: string;
    learning_objectives?: string;
    prerequisites?: string;
    related_subjects?: string[];
    metadata?: Record<string, any>;
  }): Promise<SubjectDetail> {
    const result = await this.db.query<SubjectDetail>(
      `INSERT INTO pikun_db.subject_details (
        subject_id, definition, description, purpose, value, application_scenarios,
        learning_objectives, prerequisites, related_subjects, metadata
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (subject_id) DO UPDATE SET
        definition = EXCLUDED.definition,
        description = EXCLUDED.description,
        purpose = EXCLUDED.purpose,
        value = EXCLUDED.value,
        application_scenarios = EXCLUDED.application_scenarios,
        learning_objectives = EXCLUDED.learning_objectives,
        prerequisites = EXCLUDED.prerequisites,
        related_subjects = EXCLUDED.related_subjects,
        metadata = EXCLUDED.metadata,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *`,
      [
        data.subject_id,
        data.definition || null,
        data.description || null,
        data.purpose || null,
        data.value || null,
        data.application_scenarios || null,
        data.learning_objectives || null,
        data.prerequisites || null,
        JSON.stringify(data.related_subjects || []),
        JSON.stringify(data.metadata || {}),
      ]
    );
    return result.rows[0];
  }
}


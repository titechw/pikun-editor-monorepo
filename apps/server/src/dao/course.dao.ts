import { Database } from '@/core/database';
import { Injectable } from '@/decorators/injectable.decorator';
import type { Course } from '@/entities';
import { randomBytes } from 'crypto';

/**
 * 课程 DAO
 * 负责课程相关的数据库操作，使用参数化查询防止 SQL 注入
 */
@Injectable('CourseDAO')
export class CourseDAO {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  /**
   * 获取所有课程（未删除，支持分页和搜索）
   */
  async findAll(options?: {
    current?: number;
    pageSize?: number;
    keyword?: string;
    courseType?: string;
    courseSource?: string;
  }): Promise<{ courses: Course[]; total: number }> {
    const current = options?.current || 1;
    const pageSize = options?.pageSize || 20;
    const offset = (current - 1) * pageSize;
    const keyword = options?.keyword?.trim();
    const courseType = options?.courseType;
    const courseSource = options?.courseSource;

    const conditions: string[] = ['deleted_at IS NULL'];
    const params: any[] = [];
    let paramIndex = 1;

    if (keyword) {
      conditions.push(
        `(name ILIKE $${paramIndex} OR description ILIKE $${paramIndex} OR code ILIKE $${paramIndex})`
      );
      params.push(`%${keyword}%`);
      paramIndex++;
    }

    if (courseType) {
      conditions.push(`course_type = $${paramIndex}`);
      params.push(courseType);
      paramIndex++;
    }

    if (courseSource) {
      conditions.push(`course_source = $${paramIndex}`);
      params.push(courseSource);
      paramIndex++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // 获取总数
    const countResult = await this.db.query<{ count: string }>(
      `SELECT COUNT(*) as count FROM pikun_db.courses ${whereClause}`,
      params
    );
    const total = parseInt(countResult.rows[0].count, 10);

    // 获取列表
    params.push(pageSize, offset);
    const listResult = await this.db.query<Course>(
      `SELECT * FROM pikun_db.courses ${whereClause} ORDER BY sort_order ASC, created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      params
    );

    return {
      courses: listResult.rows.map(this.normalizeCourse),
      total,
    };
  }

  /**
   * 根据 ID 查找课程
   */
  async findById(courseId: string): Promise<Course | null> {
    const result = await this.db.query<Course>(
      'SELECT * FROM pikun_db.courses WHERE course_id = $1 AND deleted_at IS NULL',
      [courseId]
    );
    return result.rows.length > 0 ? this.normalizeCourse(result.rows[0]) : null;
  }

  /**
   * 根据 code 查找课程
   */
  async findByCode(code: string): Promise<Course | null> {
    const result = await this.db.query<Course>(
      'SELECT * FROM pikun_db.courses WHERE code = $1 AND deleted_at IS NULL',
      [code]
    );
    return result.rows.length > 0 ? this.normalizeCourse(result.rows[0]) : null;
  }

  /**
   * 根据 secretId 查找课程
   */
  async findBySecretId(secretId: string): Promise<Course | null> {
    const result = await this.db.query<Course>(
      'SELECT * FROM pikun_db.courses WHERE secret_id = $1 AND deleted_at IS NULL',
      [secretId]
    );
    return result.rows.length > 0 ? this.normalizeCourse(result.rows[0]) : null;
  }

  /**
   * 创建课程
   */
  async create(course: {
    code: string;
    name: string;
    description?: string | null;
    cover_image_url?: string | null;
    course_type: string;
    difficulty_level?: number;
    estimated_duration?: number | null;
    sort_order?: number;
    is_published?: boolean;
    course_url?: string | null;
    course_source?: 'official' | 'third_party';
    author_name?: string | null;
    secret_id?: string | null; // 允许手动设置 secretId，如果没有则自动生成
    primary_item_id?: string | null;
    metadata?: Record<string, any>;
  }): Promise<Course> {
    // 生成 secretId（如果没有提供则自动生成）
    const secretId = course.secret_id || randomBytes(32).toString('hex');

    const result = await this.db.query<Course>(
      `INSERT INTO pikun_db.courses (
        code, name, description, cover_image_url, course_type, difficulty_level,
        estimated_duration, sort_order, is_published, course_url, course_source,
        author_name, secret_id, primary_item_id, metadata
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
      ) RETURNING *`,
      [
        course.code,
        course.name,
        course.description || null,
        course.cover_image_url || null,
        course.course_type,
        course.difficulty_level || 1,
        course.estimated_duration || null,
        course.sort_order || 0,
        course.is_published || false,
        course.course_url || null,
        course.course_source || 'official',
        course.author_name || null,
        secretId,
        course.primary_item_id || null,
        JSON.stringify(course.metadata || {}),
      ]
    );
    return this.normalizeCourse(result.rows[0]);
  }

  /**
   * 更新课程
   */
  async update(
    courseId: string,
    updates: {
      name?: string;
      description?: string | null;
      cover_image_url?: string | null;
      course_type?: string;
      difficulty_level?: number;
      estimated_duration?: number | null;
      sort_order?: number;
      is_published?: boolean;
      course_url?: string | null;
      course_source?: 'official' | 'third_party';
      author_name?: string | null;
      primary_item_id?: string | null;
      secret_id?: string | null;
      metadata?: Record<string, any>;
    }
  ): Promise<Course> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (updates.name !== undefined) {
      fields.push(`name = $${paramIndex++}`);
      values.push(updates.name);
    }
    if (updates.description !== undefined) {
      fields.push(`description = $${paramIndex++}`);
      values.push(updates.description);
    }
    if (updates.cover_image_url !== undefined) {
      fields.push(`cover_image_url = $${paramIndex++}`);
      values.push(updates.cover_image_url);
    }
    if (updates.course_type !== undefined) {
      fields.push(`course_type = $${paramIndex++}`);
      values.push(updates.course_type);
    }
    if (updates.difficulty_level !== undefined) {
      fields.push(`difficulty_level = $${paramIndex++}`);
      values.push(updates.difficulty_level);
    }
    if (updates.estimated_duration !== undefined) {
      fields.push(`estimated_duration = $${paramIndex++}`);
      values.push(updates.estimated_duration);
    }
    if (updates.sort_order !== undefined) {
      fields.push(`sort_order = $${paramIndex++}`);
      values.push(updates.sort_order);
    }
    if (updates.is_published !== undefined) {
      fields.push(`is_published = $${paramIndex++}`);
      values.push(updates.is_published);
    }
    if (updates.course_url !== undefined) {
      fields.push(`course_url = $${paramIndex++}`);
      values.push(updates.course_url);
    }
    if (updates.course_source !== undefined) {
      fields.push(`course_source = $${paramIndex++}`);
      values.push(updates.course_source);
    }
    if (updates.author_name !== undefined) {
      fields.push(`author_name = $${paramIndex++}`);
      values.push(updates.author_name);
    }
    if (updates.primary_item_id !== undefined) {
      fields.push(`primary_item_id = $${paramIndex++}`);
      values.push(updates.primary_item_id);
    }
    if (updates.secret_id !== undefined) {
      fields.push(`secret_id = $${paramIndex++}`);
      values.push(updates.secret_id);
    }
    if (updates.metadata !== undefined) {
      fields.push(`metadata = $${paramIndex++}`);
      values.push(JSON.stringify(updates.metadata));
    }

    if (fields.length === 0) {
      return (await this.findById(courseId)) as Course;
    }

    values.push(courseId);
    const result = await this.db.query<Course>(
      `UPDATE pikun_db.courses SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP 
       WHERE course_id = $${paramIndex} AND deleted_at IS NULL RETURNING *`,
      values
    );
    return this.normalizeCourse(result.rows[0]);
  }

  /**
   * 删除课程（软删除）
   */
  async delete(courseId: string): Promise<void> {
    await this.db.query(
      'UPDATE pikun_db.courses SET deleted_at = CURRENT_TIMESTAMP WHERE course_id = $1',
      [courseId]
    );
  }

  /**
   * 规范化课程数据
   */
  private normalizeCourse(row: any): Course {
    return {
      course_id: row.course_id,
      code: row.code,
      name: row.name,
      description: row.description,
      cover_image_url: row.cover_image_url,
      course_type: row.course_type,
      difficulty_level: Number(row.difficulty_level),
      estimated_duration: row.estimated_duration ? Number(row.estimated_duration) : null,
      sort_order: Number(row.sort_order),
      is_published: row.is_published,
      course_url: row.course_url,
      course_source: row.course_source || 'official',
      author_name: row.author_name,
      secret_id: row.secret_id,
      primary_item_id: row.primary_item_id,
      metadata: row.metadata || {},
      created_at: row.created_at,
      updated_at: row.updated_at,
      deleted_at: row.deleted_at,
    };
  }
}


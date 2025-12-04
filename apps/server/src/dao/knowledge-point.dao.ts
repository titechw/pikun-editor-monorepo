import { Database } from '@/core/database';
import { Injectable } from '@/decorators/injectable.decorator';

/**
 * 知识点实体
 */
export interface KnowledgePoint {
  point_id: string;
  subject_id: string;
  parent_point_id: string | null;
  code: string;
  name: string;
  description: string | null;
  difficulty: 'easy' | 'medium' | 'hard';
  ';
  estimated_time: number | null;
  sort_order: number;
  metadata: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

/**
 * 知识点 DAO
 * 负责知识点相关的数据库操作
 */
@Injectable('KnowledgePointDAO')
export class KnowledgePointDAO {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  /**
   * 根据学科ID查找知识点（支持分页和搜索）
   * 当 parentPointId 为 null 时，返回该学科的顶级知识点
   */
  async findBySubjectId(
    subjectId: string,
    parentPointId?: string | null,
    options?: { current?: number; pageSize?: number; keyword?: string }
  ): Promise<{ points: KnowledgePoint[]; total: number }> {
    const current = options?.current || 1;
    const pageSize = options?.pageSize || 20;
    const offset = (current - 1) * pageSize;
    const keyword = options?.keyword?.trim();

    let countQuery: string;
    let listQuery: string;
    const params: any[] = [subjectId];
    let paramIndex = 2;

    // 构建查询条件
    let whereConditions = 'kp.subject_id = $1 AND kp.deleted_at IS NULL';
    
    if (parentPointId === null || parentPointId === undefined) {
      // 查询顶级知识点（parent_point_id 为 NULL）
      whereConditions += ' AND kp.parent_point_id IS NULL';
    } else {
      // 查询指定父知识点下的子知识点
      params.push(parentPointId);
      whereConditions += ` AND kp.parent_point_id = $${paramIndex}`;
      paramIndex++;
    }

    if (keyword) {
      params.push(`%${keyword}%`);
      whereConditions += ` AND (kp.name ILIKE $${paramIndex} OR kp.code ILIKE $${paramIndex})`;
      paramIndex++;
    }

    countQuery = `SELECT COUNT(*) as count FROM pikun_db.knowledge_points kp WHERE ${whereConditions}`;
    listQuery = `SELECT * FROM pikun_db.knowledge_points kp WHERE ${whereConditions} ORDER BY kp.sort_order ASC, kp.created_at ASC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(pageSize, offset);

    const countResult = await this.db.query<{ count: string }>(countQuery, params.slice(0, paramIndex - 2));
    const listResult = await this.db.query<KnowledgePoint>(listQuery, params);

    return {
      points: listResult.rows,
      total: parseInt(countResult.rows[0].count, 10),
    };
  }

  /**
   * 根据ID查找知识点
   */
  async findById(pointId: string): Promise<KnowledgePoint | null> {
    const result = await this.db.query<KnowledgePoint>(
      'SELECT * FROM pikun_db.knowledge_points WHERE point_id = $1 AND deleted_at IS NULL',
      [pointId]
    );
    return result.rows[0] || null;
  }

  /**
   * 创建知识点
   */
  async create(data: {
    subject_id: string;
    parent_point_id?: string | null;
    code: string;
    name: string;
    description?: string | null;
    difficulty?: 'easy' | 'medium' | 'hard';
    estimated_time?: number | null;
    sort_order?: number;
    metadata?: Record<string, unknown>;
  }): Promise<KnowledgePoint> {
    const result = await this.db.query<KnowledgePoint>(
      `INSERT INTO pikun_db.knowledge_points 
       (subject_id, parent_point_id, code, name, description, difficulty, estimated_time, sort_order, metadata)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        data.subject_id,
        data.parent_point_id || null,
        data.code,
        data.name,
        data.description || null,
        data.difficulty || 'medium',
        data.estimated_time || null,
        data.sort_order || 0,
        JSON.stringify(data.metadata || {}),
      ]
    );
    return result.rows[0];
  }

  /**
   * 更新知识点
   */
  async update(pointId: string, data: Partial<{
    code: string;
    name: string;
    description: string | null;
    difficulty: 'easy' | 'medium' | 'hard';
    estimated_time: number | null;
    sort_order: number;
    metadata: Record<string, unknown>;
  }>): Promise<KnowledgePoint> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (data.code !== undefined) {
      updates.push(`code = $${paramIndex++}`);
      values.push(data.code);
    }
    if (data.name !== undefined) {
      updates.push(`name = $${paramIndex++}`);
      values.push(data.name);
    }
    if (data.description !== undefined) {
      updates.push(`description = $${paramIndex++}`);
      values.push(data.description);
    }
    if (data.difficulty !== undefined) {
      updates.push(`difficulty = $${paramIndex++}`);
      values.push(data.difficulty);
    }
    if (data.estimated_time !== undefined) {
      updates.push(`estimated_time = $${paramIndex++}`);
      values.push(data.estimated_time);
    }
    if (data.sort_order !== undefined) {
      updates.push(`sort_order = $${paramIndex++}`);
      values.push(data.sort_order);
    }
    if (data.metadata !== undefined) {
      updates.push(`metadata = $${paramIndex++}`);
      values.push(JSON.stringify(data.metadata));
    }

    if (updates.length === 0) {
      const point = await this.findById(pointId);
      if (!point) {
        throw new Error('Knowledge point not found');
      }
      return point;
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(pointId);

    const result = await this.db.query<KnowledgePoint>(
      `UPDATE pikun_db.knowledge_points 
       SET ${updates.join(', ')} 
       WHERE point_id = $${paramIndex} AND deleted_at IS NULL
       RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      throw new Error('Knowledge point not found');
    }

    return result.rows[0];
  }

  /**
   * 删除知识点（软删除）
   */
  async deleteById(pointId: string): Promise<void> {
    await this.db.query(
      'UPDATE pikun_db.knowledge_points SET deleted_at = CURRENT_TIMESTAMP WHERE point_id = $1',
      [pointId]
    );
  }

  /**
   * 获取知识点的子知识点数量
   */
  async getChildrenCount(pointId: string): Promise<number> {
    const result = await this.db.query<{ count: string }>(
      'SELECT COUNT(*) as count FROM pikun_db.knowledge_points WHERE parent_point_id = $1 AND deleted_at IS NULL',
      [pointId]
    );
    return parseInt(result.rows[0].count, 10);
  }
}



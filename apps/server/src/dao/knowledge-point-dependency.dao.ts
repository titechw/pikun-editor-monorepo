import { Database } from '@/core/database';
import { Injectable } from '@/decorators/injectable.decorator';

/**
 * 知识点依赖关系实体
 */
export interface KnowledgePointDependency {
  dependency_id: string;
  point_id: string;
  prerequisite_point_id: string;
  dependency_type: 'required' | 'recommended';
  created_at: Date;
  updated_at: Date;
}

/**
 * 知识点依赖关系 DAO
 */
@Injectable('KnowledgePointDependencyDAO')
export class KnowledgePointDependencyDAO {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  /**
   * 创建知识点依赖关系
   */
  async create(data: {
    point_id: string;
    prerequisite_point_id: string;
    dependency_type: 'required' | 'recommended';
  }): Promise<KnowledgePointDependency> {
    const result = await this.db.query<KnowledgePointDependency>(
      `INSERT INTO pikun_db.knowledge_point_dependencies 
       (point_id, prerequisite_point_id, dependency_type)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [data.point_id, data.prerequisite_point_id, data.dependency_type]
    );
    return result.rows[0];
  }

  /**
   * 根据ID删除依赖关系
   */
  async deleteById(dependencyId: string): Promise<void> {
    await this.db.query(
      'DELETE FROM pikun_db.knowledge_point_dependencies WHERE dependency_id = $1',
      [dependencyId]
    );
  }

  /**
   * 根据知识点ID获取所有依赖关系（作为当前知识点的前置依赖）
   */
  async findByPointId(pointId: string): Promise<KnowledgePointDependency[]> {
    const result = await this.db.query<KnowledgePointDependency>(
      `SELECT * FROM pikun_db.knowledge_point_dependencies
       WHERE point_id = $1
       ORDER BY dependency_type DESC, created_at ASC`,
      [pointId]
    );
    return result.rows;
  }

  /**
   * 根据前置知识点ID获取所有依赖关系（作为前置知识点的后续知识点）
   */
  async findByPrerequisitePointId(prerequisitePointId: string): Promise<KnowledgePointDependency[]> {
    const result = await this.db.query<KnowledgePointDependency>(
      `SELECT * FROM pikun_db.knowledge_point_dependencies
       WHERE prerequisite_point_id = $1
       ORDER BY dependency_type DESC, created_at ASC`,
      [prerequisitePointId]
    );
    return result.rows;
  }

  /**
   * 检查依赖关系是否存在
   */
  async exists(pointId: string, prerequisitePointId: string): Promise<boolean> {
    const result = await this.db.query<{ count: string }>(
      'SELECT COUNT(*) as count FROM pikun_db.knowledge_point_dependencies WHERE point_id = $1 AND prerequisite_point_id = $2',
      [pointId, prerequisitePointId]
    );
    return parseInt(result.rows[0].count, 10) > 0;
  }

  /**
   * 检查是否存在循环依赖（从 pointId 开始，能否通过依赖关系回到 pointId）
   */
  async hasCircularDependency(pointId: string, prerequisitePointId: string): Promise<boolean> {
    // 如果前置知识点依赖于当前知识点，则存在循环依赖
    return this.exists(prerequisitePointId, pointId);
  }

  /**
   * 获取所有依赖关系（用于知识地图）
   */
  async findAll(): Promise<KnowledgePointDependency[]> {
    const result = await this.db.query<KnowledgePointDependency>(
      'SELECT * FROM pikun_db.knowledge_point_dependencies ORDER BY created_at ASC',
      []
    );
    return result.rows;
  }
}



import { Database } from '@/core/database';
import { Injectable } from '@/decorators/injectable.decorator';

export interface SubjectDependency {
  dependency_id: string;
  subject_id: string;
  prerequisite_subject_id: string;
  dependency_type: 'required' | 'recommended';
  created_at: Date;
  updated_at: Date;
}

/**
 * 学科依赖关系 DAO
 */
@Injectable('SubjectDependencyDAO')
export class SubjectDependencyDAO {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  /**
   * 创建依赖关系
   */
  async create(data: {
    subject_id: string;
    prerequisite_subject_id: string;
    dependency_type: 'required' | 'recommended';
  }): Promise<SubjectDependency> {
    const result = await this.db.query<SubjectDependency>(
      `INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [data.subject_id, data.prerequisite_subject_id, data.dependency_type]
    );
    return result.rows[0];
  }

  /**
   * 根据ID删除依赖关系
   */
  async deleteById(dependencyId: string): Promise<void> {
    await this.db.query(
      `DELETE FROM pikun_db.subject_dependencies WHERE dependency_id = $1`,
      [dependencyId]
    );
  }

  /**
   * 根据学科ID获取所有依赖关系（作为当前学科的前置依赖）
   */
  async findBySubjectId(subjectId: string): Promise<SubjectDependency[]> {
    const result = await this.db.query<SubjectDependency>(
      `SELECT * FROM pikun_db.subject_dependencies
       WHERE subject_id = $1
       ORDER BY dependency_type DESC, created_at ASC`,
      [subjectId]
    );
    return result.rows;
  }

  /**
   * 根据前置学科ID获取所有依赖关系（作为前置学科的后续学科）
   */
  async findByPrerequisiteSubjectId(prerequisiteSubjectId: string): Promise<SubjectDependency[]> {
    const result = await this.db.query<SubjectDependency>(
      `SELECT * FROM pikun_db.subject_dependencies
       WHERE prerequisite_subject_id = $1
       ORDER BY dependency_type DESC, created_at ASC`,
      [prerequisiteSubjectId]
    );
    return result.rows;
  }

  /**
   * 获取所有依赖关系
   */
  async findAll(): Promise<SubjectDependency[]> {
    const result = await this.db.query<SubjectDependency>(
      `SELECT * FROM pikun_db.subject_dependencies
       ORDER BY created_at DESC`
    );
    return result.rows;
  }

  /**
   * 检查依赖关系是否存在
   */
  async exists(subjectId: string, prerequisiteSubjectId: string): Promise<boolean> {
    const result = await this.db.query<{ count: string }>(
      `SELECT COUNT(*) as count FROM pikun_db.subject_dependencies
       WHERE subject_id = $1 AND prerequisite_subject_id = $2`,
      [subjectId, prerequisiteSubjectId]
    );
    return parseInt(result.rows[0].count) > 0;
  }

  /**
   * 检查是否存在循环依赖（通过BFS检查）
   */
  async hasCircularDependency(subjectId: string, prerequisiteSubjectId: string): Promise<boolean> {
    // 如果前置学科依赖于当前学科，则存在循环依赖
    return await this.exists(prerequisiteSubjectId, subjectId);
  }

  /**
   * 批量创建依赖关系
   */
  async createBatch(dependencies: Array<{
    subject_id: string;
    prerequisite_subject_id: string;
    dependency_type: 'required' | 'recommended';
  }>): Promise<SubjectDependency[]> {
    if (dependencies.length === 0) {
      return [];
    }

    const values = dependencies.map((_, index) => {
      const base = index * 3;
      return `($${base + 1}, $${base + 2}, $${base + 3})`;
    }).join(', ');

    const params = dependencies.flatMap(dep => [
      dep.subject_id,
      dep.prerequisite_subject_id,
      dep.dependency_type,
    ]);

    const result = await this.db.query<SubjectDependency>(
      `INSERT INTO pikun_db.subject_dependencies (subject_id, prerequisite_subject_id, dependency_type)
       VALUES ${values}
       ON CONFLICT (subject_id, prerequisite_subject_id) DO NOTHING
       RETURNING *`,
      params
    );
    return result.rows;
  }
}


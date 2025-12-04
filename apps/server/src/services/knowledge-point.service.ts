import { injectable, inject } from 'tsyringe';
import { KnowledgePointDAO, type KnowledgePoint } from '@/dao/knowledge-point.dao';
import { KnowledgePointDependencyDAO, type KnowledgePointDependency } from '@/dao/knowledge-point-dependency.dao';

/**
 * 知识点服务
 */
@injectable()
export class KnowledgePointService {
  constructor(
    @inject('KnowledgePointDAO') private pointDAO: KnowledgePointDAO,
    @inject('KnowledgePointDependencyDAO') private dependencyDAO: KnowledgePointDependencyDAO
  ) {}

  /**
   * 根据学科ID获取知识点（支持分页和搜索）
   */
  async getPointsBySubjectId(
    subjectId: string,
    parentPointId?: string | null,
    options?: { current?: number; pageSize?: number; keyword?: string }
  ): Promise<{ points: KnowledgePoint[]; total: number }> {
    return this.pointDAO.findBySubjectId(subjectId, parentPointId, options);
  }

  /**
   * 根据ID获取知识点
   */
  async getPointById(pointId: string): Promise<KnowledgePoint | null> {
    return this.pointDAO.findById(pointId);
  }

  /**
   * 创建知识点
   */
  async createPoint(data: {
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
    return this.pointDAO.create(data);
  }

  /**
   * 更新知识点
   */
  async updatePoint(
    pointId: string,
    data: Partial<{
      code: string;
      name: string;
      description: string | null;
      difficulty: 'easy' | 'medium' | 'hard';
      estimated_time: number | null;
      sort_order: number;
      metadata: Record<string, unknown>;
    }>
  ): Promise<KnowledgePoint> {
    return this.pointDAO.update(pointId, data);
  }

  /**
   * 删除知识点
   */
  async deletePoint(pointId: string): Promise<void> {
    return this.pointDAO.deleteById(pointId);
  }

  /**
   * 创建知识点依赖关系
   */
  async createDependency(data: {
    point_id: string;
    prerequisite_point_id: string;
    dependency_type: 'required' | 'recommended';
  }): Promise<KnowledgePointDependency> {
    // 检查循环依赖
    const hasCircular = await this.dependencyDAO.hasCircularDependency(
      data.point_id,
      data.prerequisite_point_id
    );
    if (hasCircular) {
      throw new Error('不能创建循环依赖关系');
    }

    // 检查依赖关系是否已存在
    const exists = await this.dependencyDAO.exists(data.point_id, data.prerequisite_point_id);
    if (exists) {
      throw new Error('依赖关系已存在');
    }

    return this.dependencyDAO.create(data);
  }

  /**
   * 删除知识点依赖关系
   */
  async deleteDependency(dependencyId: string): Promise<void> {
    return this.dependencyDAO.deleteById(dependencyId);
  }

  /**
   * 获取知识点的所有依赖关系
   */
  async getPointDependencies(pointId: string): Promise<KnowledgePointDependency[]> {
    return this.dependencyDAO.findByPointId(pointId);
  }

  /**
   * 获取所有知识点依赖关系（用于知识地图）
   */
  async getAllDependencies(): Promise<KnowledgePointDependency[]> {
    return this.dependencyDAO.findAll();
  }
}


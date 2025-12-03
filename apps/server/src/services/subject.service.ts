import { injectable, inject } from 'tsyringe';
import { SubjectCategoryDAO } from '@/dao/subject-category.dao';
import { SubjectDAO } from '@/dao/subject.dao';
import { SubjectDependencyDAO, type SubjectDependency } from '@/dao/subject-dependency.dao';
import type { SubjectCategory, Subject, SubjectDetail } from '@/entities';

/**
 * 学科服务
 */
@injectable()
export class SubjectService {
  constructor(
    @inject('SubjectCategoryDAO') private categoryDAO: SubjectCategoryDAO,
    @inject('SubjectDAO') private subjectDAO: SubjectDAO,
    @inject('SubjectDependencyDAO') private dependencyDAO: SubjectDependencyDAO
  ) {}

  /**
   * 获取学科分类树形结构
   */
  async getCategoryTree(): Promise<Array<SubjectCategory & { children?: SubjectCategory[] }>> {
    return this.categoryDAO.findTree();
  }

  /**
   * 获取所有学科分类
   */
  async getCategories(): Promise<SubjectCategory[]> {
    return this.categoryDAO.findAll();
  }

  /**
   * 根据父分类 ID 获取子分类（支持分页和搜索）
   */
  async getCategoriesByParentId(
    parentId: string | null,
    options?: { current?: number; pageSize?: number; keyword?: string }
  ): Promise<{ categories: SubjectCategory[]; total: number }> {
    return this.categoryDAO.findByParentId(parentId, options);
  }

  /**
   * 获取分类的直接子分类（用于树懒加载）
   */
  async getCategoryChildren(parentId: string | null): Promise<SubjectCategory[]> {
    return this.categoryDAO.findChildrenByParentId(parentId);
  }

  /**
   * 获取学科分类详情
   */
  async getCategoryById(categoryId: string): Promise<SubjectCategory | null> {
    return this.categoryDAO.findById(categoryId);
  }

  /**
   * 创建学科分类
   */
  async createCategory(data: {
    parent_id?: string | null;
    code: string;
    name: string;
    description?: string;
    icon_url?: string;
    sort_order?: number;
    metadata?: Record<string, any>;
  }): Promise<SubjectCategory> {
    return this.categoryDAO.create(data);
  }

  /**
   * 更新学科分类
   */
  async updateCategory(
    categoryId: string,
    updates: {
      parent_id?: string | null;
      code?: string;
      name?: string;
      description?: string;
      icon_url?: string;
      sort_order?: number;
      metadata?: Record<string, any>;
    }
  ): Promise<SubjectCategory> {
    return this.categoryDAO.update(categoryId, updates);
  }

  /**
   * 删除学科分类
   */
  async deleteCategory(categoryId: string): Promise<void> {
    return this.categoryDAO.delete(categoryId);
  }

  /**
   * 获取所有学科
   */
  async getSubjects(): Promise<Subject[]> {
    return this.subjectDAO.findAll();
  }

  /**
   * 根据分类 ID 获取学科（支持分页和搜索，categoryId 为 null 时查询所有学科）
   */
  async getSubjectsByCategoryId(
    categoryId: string | null,
    options?: { current?: number; pageSize?: number; keyword?: string }
  ): Promise<{ subjects: Subject[]; total: number }> {
    return this.subjectDAO.findByCategoryId(categoryId, options);
  }

  /**
   * 获取学科详情
   */
  async getSubjectById(subjectId: string): Promise<Subject | null> {
    return this.subjectDAO.findById(subjectId);
  }

  /**
   * 创建学科
   */
  async createSubject(data: {
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
    return this.subjectDAO.create(data);
  }

  /**
   * 更新学科
   */
  async updateSubject(
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
    return this.subjectDAO.update(subjectId, updates);
  }

  /**
   * 删除学科
   */
  async deleteSubject(subjectId: string): Promise<void> {
    return this.subjectDAO.delete(subjectId);
  }

  /**
   * 获取学科详情信息
   */
  async getSubjectDetail(subjectId: string): Promise<SubjectDetail | null> {
    return this.subjectDAO.findDetailBySubjectId(subjectId);
  }

  /**
   * 创建或更新学科详情
   */
  async upsertSubjectDetail(data: {
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
    return this.subjectDAO.upsertDetail(data);
  }

  /**
   * 创建学科依赖关系
   */
  async createDependency(data: {
    subject_id: string;
    prerequisite_subject_id: string;
    dependency_type: 'required' | 'recommended';
  }): Promise<SubjectDependency> {
    // 检查是否存在循环依赖
    const hasCircular = await this.dependencyDAO.hasCircularDependency(
      data.subject_id,
      data.prerequisite_subject_id
    );
    if (hasCircular) {
      throw new Error('不能创建循环依赖关系');
    }

    // 检查依赖关系是否已存在
    const exists = await this.dependencyDAO.exists(
      data.subject_id,
      data.prerequisite_subject_id
    );
    if (exists) {
      throw new Error('依赖关系已存在');
    }

    return this.dependencyDAO.create(data);
  }

  /**
   * 删除学科依赖关系
   */
  async deleteDependency(dependencyId: string): Promise<void> {
    return this.dependencyDAO.deleteById(dependencyId);
  }

  /**
   * 获取学科的所有依赖关系
   */
  async getSubjectDependencies(subjectId: string): Promise<SubjectDependency[]> {
    return this.dependencyDAO.findBySubjectId(subjectId);
  }

  /**
   * 获取知识地图数据
   */
  async getKnowledgeMap(categoryId?: string | null): Promise<{
    nodes: Array<{
      id: string;
      subject_id: string;
      name: string;
      code: string;
      category_id: string;
      category_name?: string;
      level: number;
    }>;
    edges: Array<{
      id: string;
      source: string;
      target: string;
      dependency_type: 'required' | 'recommended';
    }>;
  }> {
    // 获取所有学科
    const subjects = categoryId
      ? (await this.getSubjectsByCategoryId(categoryId, { current: 1, pageSize: 10000 })).subjects
      : await this.getSubjects();

    // 获取所有依赖关系
    const allDependencies = await this.dependencyDAO.findAll();

    // 构建节点映射
    const subjectMap = new Map(subjects.map(s => [s.subject_id, s]));

    // 获取分类信息
    const categories = await this.getCategories();
    const categoryMap = new Map(categories.map(c => [c.category_id, c]));

    // 计算每个学科的层级（基于依赖关系）
    const calculateLevel = (subjectId: string, visited: Set<string> = new Set()): number => {
      if (visited.has(subjectId)) {
        return 0; // 避免循环依赖
      }
      visited.add(subjectId);

      const prerequisites = allDependencies.filter(d => d.subject_id === subjectId);
      if (prerequisites.length === 0) {
        return 0;
      }

      const maxPrerequisiteLevel = Math.max(
        ...prerequisites.map(d => calculateLevel(d.prerequisite_subject_id, new Set(visited)))
      );
      return maxPrerequisiteLevel + 1;
    };

    // 构建节点
    const nodes = subjects.map(subject => {
      const category = categoryMap.get(subject.category_id);
      return {
        id: subject.subject_id,
        subject_id: subject.subject_id,
        name: subject.name,
        code: subject.code,
        category_id: subject.category_id,
        category_name: category?.name,
        level: calculateLevel(subject.subject_id),
      };
    });

    // 构建边（只包含在节点列表中的学科）
    const subjectIds = new Set(subjects.map(s => s.subject_id));
    const edges = allDependencies
      .filter(d => subjectIds.has(d.subject_id) && subjectIds.has(d.prerequisite_subject_id))
      .map(d => ({
        id: d.dependency_id,
        source: d.prerequisite_subject_id,
        target: d.subject_id,
        dependency_type: d.dependency_type,
      }));

    return { nodes, edges };
  }
}


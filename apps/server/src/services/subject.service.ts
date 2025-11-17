import { injectable, inject } from 'tsyringe';
import { SubjectCategoryDAO } from '@/dao/subject-category.dao';
import { SubjectDAO } from '@/dao/subject.dao';
import type { SubjectCategory, Subject, SubjectDetail } from '@/entities';

/**
 * 学科服务
 */
@injectable()
export class SubjectService {
  constructor(
    @inject('SubjectCategoryDAO') private categoryDAO: SubjectCategoryDAO,
    @inject('SubjectDAO') private subjectDAO: SubjectDAO
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
}


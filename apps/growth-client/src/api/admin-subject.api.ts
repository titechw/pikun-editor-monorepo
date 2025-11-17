import { adminApiClient } from '@/utils/adminApiClient';

/**
 * 学科分类接口
 */
export interface SubjectCategory {
  category_id: string;
  parent_id: string | null;
  code: string;
  name: string;
  description: string | null;
  icon_url: string | null;
  level: number;
  path: string | null;
  sort_order: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  children?: SubjectCategory[];
  children_count?: number; // 子分类数量
}

/**
 * 学科接口
 */
export interface Subject {
  subject_id: string;
  category_id: string;
  code: string;
  name: string;
  short_name: string | null;
  icon_url: string | null;
  cover_image_url: string | null;
  sort_order: number;
  is_published: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

/**
 * 学科详情接口
 */
export interface SubjectDetail {
  detail_id: string;
  subject_id: string;
  definition: string | null;
  description: string | null;
  purpose: string | null;
  value: string | null;
  application_scenarios: string | null;
  learning_objectives: string | null;
  prerequisites: string | null;
  related_subjects: string[];
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

/**
 * 管理端学科 API（使用 adminApiClient，自动携带 admin_auth_token）
 */
export const adminSubjectApi = {
  /**
   * 获取学科分类树形结构（管理员）
   */
  async getCategoryTree(): Promise<SubjectCategory[]> {
    const response = await adminApiClient.get<SubjectCategory[]>('/admin/subject/categories/tree');
    return response.data || [];
  },

  /**
   * 获取学科分类列表（管理员）
   */
  async getCategories(
    parentId?: string | null,
    options?: { current?: number; pageSize?: number; keyword?: string }
  ): Promise<{ data: SubjectCategory[]; pagination: { current: number; pageSize: number; total: number } }> {
    const params: Record<string, string | number> = {};
    // 明确传递 parent_id 参数
    if (parentId !== undefined) {
      params.parent_id = parentId === null ? 'null' : parentId;
    }
    if (options?.current) params.current = options.current;
    if (options?.pageSize) params.pageSize = options.pageSize;
    if (options?.keyword) params.keyword = options.keyword;
    
    const response = await adminApiClient.get<SubjectCategory[]>('/admin/subject/categories', params);
    return {
      data: response.data || [],
      pagination: response.pagination || {
        current: options?.current || 1,
        pageSize: options?.pageSize || 20,
        total: 0,
      },
    };
  },

  /**
   * 获取分类的直接子分类（用于树懒加载）
   */
  async getCategoryChildren(parentId?: string | null): Promise<SubjectCategory[]> {
    const params: Record<string, string> = {};
    if (parentId !== undefined) {
      params.parent_id = parentId === null ? 'null' : parentId;
    }
    const response = await adminApiClient.get<SubjectCategory[]>('/admin/subject/categories/children', params);
    return response.data || [];
  },

  /**
   * 根据 ID 获取分类详情（管理员）
   */
  async getCategoryById(categoryId: string): Promise<SubjectCategory> {
    const response = await adminApiClient.get<SubjectCategory>(`/admin/subject/categories/${categoryId}`);
    if (!response.data) {
      throw new Error('获取分类失败');
    }
    return response.data;
  },

  /**
   * 创建学科分类（管理员）
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
    const response = await adminApiClient.post<SubjectCategory>('/admin/subject/categories', data);
    if (!response.data) {
      throw new Error('创建失败');
    }
    return response.data;
  },

  /**
   * 更新学科分类（管理员）
   */
  async updateCategory(
    categoryId: string,
    data: {
      parent_id?: string | null;
      code?: string;
      name?: string;
      description?: string;
      icon_url?: string;
      sort_order?: number;
      metadata?: Record<string, any>;
    }
  ): Promise<SubjectCategory> {
    const response = await adminApiClient.put<SubjectCategory>(`/admin/subject/categories/${categoryId}`, data);
    if (!response.data) {
      throw new Error('更新失败');
    }
    return response.data;
  },

  /**
   * 删除学科分类（管理员）
   */
  async deleteCategory(categoryId: string): Promise<void> {
    await adminApiClient.delete(`/admin/subject/categories/${categoryId}`);
  },

  /**
   * 获取学科列表（管理员）
   */
  async getSubjects(
    categoryId?: string | null,
    options?: { current?: number; pageSize?: number; keyword?: string }
  ): Promise<{ data: Subject[]; pagination: { current: number; pageSize: number; total: number } }> {
    const params: any = categoryId ? { category_id: categoryId } : {};
    if (options?.current) params.current = options.current;
    if (options?.pageSize) params.pageSize = options.pageSize;
    if (options?.keyword) params.keyword = options.keyword;
    const response = await adminApiClient.get<Subject[]>('/admin/subject/subjects', params);
    return {
      data: response.data || [],
      pagination: response.pagination || {
        current: options?.current || 1,
        pageSize: options?.pageSize || 20,
        total: 0,
      },
    };
  },

  /**
   * 创建学科（管理员）
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
    const response = await adminApiClient.post<Subject>('/admin/subject/subjects', data);
    if (!response.data) {
      throw new Error('创建失败');
    }
    return response.data;
  },

  /**
   * 更新学科（管理员）
   */
  async updateSubject(
    subjectId: string,
    data: {
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
    const response = await adminApiClient.put<Subject>(`/admin/subject/subjects/${subjectId}`, data);
    if (!response.data) {
      throw new Error('更新失败');
    }
    return response.data;
  },

  /**
   * 删除学科（管理员）
   */
  async deleteSubject(subjectId: string): Promise<void> {
    await adminApiClient.delete(`/admin/subject/subjects/${subjectId}`);
  },

  /**
   * 获取学科详情信息（管理员）
   */
  async getSubjectDetail(subjectId: string): Promise<SubjectDetail | null> {
    const response = await adminApiClient.get<SubjectDetail>(`/admin/subject/subjects/${subjectId}/detail`);
    return response.data || null;
  },

  /**
   * 创建或更新学科详情信息（管理员）
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
    const response = await adminApiClient.post<SubjectDetail>('/admin/subject/subjects/detail', data);
    if (!response.data) {
      throw new Error('保存失败');
    }
    return response.data;
  },
};


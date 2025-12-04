import { apiClient } from '@/utils/apiClient';

/**
 * 学科接口（C端）
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
 * 学科分类接口（C端）
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
}

/**
 * 学科依赖关系接口（C端）
 */
export interface SubjectDependency {
  dependency_id: string;
  subject_id: string; // 当前学科
  prerequisite_subject_id: string; // 前置学科
  dependency_type: 'required' | 'recommended'; // 必需依赖或推荐依赖
  created_at: string;
  updated_at: string;
}

/**
 * 知识地图节点数据（C端）
 */
export interface KnowledgeMapNode {
  id: string;
  subject_id: string;
  name: string;
  code: string;
  category_id: string;
  category_name?: string;
  level: number; // 层级（从根节点开始）
  x?: number; // 图形坐标
  y?: number;
}

/**
 * 知识地图边数据（C端）
 */
export interface KnowledgeMapEdge {
  id: string;
  source: string; // 前置学科ID
  target: string; // 当前学科ID
  dependency_type: 'required' | 'recommended';
}

/**
 * 知识地图完整数据（C端）
 */
export interface KnowledgeMapData {
  nodes: KnowledgeMapNode[];
  edges: KnowledgeMapEdge[];
}

/**
 * C端学科 API（使用 apiClient，自动携带用户 token）
 */
export const subjectApi = {
  /**
   * 获取学科列表（C端）
   */
  async getSubjects(
    categoryId?: string | null,
    options?: { current?: number; pageSize?: number; keyword?: string }
  ): Promise<{ data: Subject[]; pagination: { current: number; pageSize: number; total: number } }> {
    const params: any = categoryId ? { category_id: categoryId } : {};
    if (options?.current) params.current = options.current;
    if (options?.pageSize) params.pageSize = options.pageSize;
    if (options?.keyword) params.keyword = options.keyword;
    const response = await apiClient.get<Subject[]>('/subject/subjects', params);
    return {
      data: response.data || [],
      pagination: {
        current: options?.current || 1,
        pageSize: options?.pageSize || 20,
        total: 0,
      },
    };
  },

  /**
   * 获取学科分类列表（C端）
   */
  async getCategories(
    parentId?: string | null,
    options?: { current?: number; pageSize?: number; keyword?: string }
  ): Promise<{ data: SubjectCategory[]; pagination: { current: number; pageSize: number; total: number } }> {
    const params: Record<string, string | number> = {};
    if (parentId !== undefined) {
      params.parent_id = parentId === null ? 'null' : parentId;
    }
    if (options?.current) params.current = options.current;
    if (options?.pageSize) params.pageSize = options.pageSize;
    if (options?.keyword) params.keyword = options.keyword;

    const response = await apiClient.get<SubjectCategory[]>('/subject/categories', params);
    return {
      data: response.data || [],
      pagination: {
        current: options?.current || 1,
        pageSize: options?.pageSize || 20,
        total: 0,
      },
    };
  },
};

/**
 * C端知识地图 API（使用 apiClient，自动携带用户 token）
 */
export const knowledgeMapApi = {
  /**
   * 获取学科的所有依赖关系（C端）
   */
  async getSubjectDependencies(subjectId: string): Promise<SubjectDependency[]> {
    const response = await apiClient.get<SubjectDependency[]>(`/subject/subjects/${subjectId}/dependencies`);
    return response.data || [];
  },

  /**
   * 创建学科依赖关系（C端）
   */
  async createDependency(data: {
    subject_id: string;
    prerequisite_subject_id: string;
    dependency_type: 'required' | 'recommended';
  }): Promise<SubjectDependency> {
    const response = await apiClient.post<SubjectDependency>('/subject/dependencies', data);
    if (!response.data) {
      throw new Error('创建依赖关系失败');
    }
    return response.data;
  },

  /**
   * 删除学科依赖关系（C端）
   */
  async deleteDependency(dependencyId: string): Promise<void> {
    await apiClient.delete(`/subject/dependencies/${dependencyId}`);
  },

  /**
   * 获取知识地图数据（C端，根据分类或全部）
   */
  async getKnowledgeMap(categoryId?: string | null): Promise<KnowledgeMapData> {
    const params: Record<string, string> = {};
    if (categoryId) {
      params.category_id = categoryId;
    }
    const response = await apiClient.get<KnowledgeMapData>('/subject/knowledge-map', params);
    return response.data || { nodes: [], edges: [] };
  },
};



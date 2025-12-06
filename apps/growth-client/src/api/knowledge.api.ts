import { apiClient } from '@/utils/apiClient';

/**
 * 知识节点类型
 */
export type KnowledgeNodeType =
  | 'foundational_ability'
  | 'subject_domain'
  | 'subject_category'
  | 'subject'
  | 'knowledge_point';

/**
 * 知识节点接口
 */
export interface KnowledgeNode {
  node_id: string;
  parent_id: string | null;
  node_type: KnowledgeNodeType;
  code: string;
  name: string;
  description: string | null;
  metadata: Record<string, any>;
  sort_order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

/**
 * 知识依赖关系接口
 */
export interface KnowledgeDependency {
  dependency_id: string;
  source_node_id: string; // 前置节点（需要先学的）
  target_node_id: string; // 目标节点（需要后学的）
  dependency_type: 'required' | 'recommended';
  created_at: string;
  updated_at: string;
}

/**
 * 节点详情（包含路径）
 */
export interface KnowledgeNodeDetail extends KnowledgeNode {
  path: KnowledgeNode[];
}

/**
 * 节点子节点响应
 */
export interface KnowledgeNodeChildrenResponse {
  parent: KnowledgeNode;
  nodes: KnowledgeNode[];
  edges: Array<{
    id: string;
    source: string;
    target: string;
    type: 'required' | 'recommended';
  }>;
}

/**
 * 统一的知识节点 API
 */
export const knowledgeApi = {
  /**
   * 获取知识节点列表
   * @param parentId 父节点ID（可选，null表示查询顶级节点）
   * @param nodeType 节点类型过滤（可选）
   */
  async getNodes(
    parentId?: string | null,
    nodeType?: KnowledgeNodeType
  ): Promise<KnowledgeNode[]> {
    const params: Record<string, string> = {};
    if (parentId !== undefined) {
      params.parent_id = parentId === null ? 'null' : parentId;
    }
    if (nodeType) {
      params.node_type = nodeType;
    }
    const response = await apiClient.get<KnowledgeNode[]>('/knowledge/nodes', params);
    return response.data || [];
  },

  /**
   * 获取节点详情
   * @param nodeId 节点ID
   */
  async getNodeById(nodeId: string): Promise<KnowledgeNodeDetail> {
    const response = await apiClient.get<KnowledgeNodeDetail>(`/knowledge/nodes/${nodeId}`);
    if (!response.data) {
      throw new Error('节点不存在');
    }
    return response.data;
  },

  /**
   * 获取节点的子节点（用于层级展示）
   * @param nodeId 节点ID
   * @param nodeType 节点类型过滤（可选）
   */
  async getNodeChildren(
    nodeId: string,
    nodeType?: KnowledgeNodeType
  ): Promise<KnowledgeNodeChildrenResponse> {
    const params: Record<string, string> = {};
    if (nodeType) {
      params.node_type = nodeType;
    }
    const response = await apiClient.get<KnowledgeNodeChildrenResponse>(
      `/knowledge/nodes/${nodeId}/children`,
      params
    );
    if (!response.data) {
      throw new Error('获取子节点失败');
    }
    return response.data;
  },

  /**
   * 获取依赖关系
   * @param sourceNodeId 前置节点ID（可选）
   * @param targetNodeId 目标节点ID（可选）
   */
  async getDependencies(
    sourceNodeId?: string,
    targetNodeId?: string
  ): Promise<KnowledgeDependency[]> {
    const params: Record<string, string> = {};
    if (sourceNodeId) {
      params.source_node_id = sourceNodeId;
    }
    if (targetNodeId) {
      params.target_node_id = targetNodeId;
    }
    const response = await apiClient.get<KnowledgeDependency[]>('/knowledge/dependencies', params);
    return response.data || [];
  },

  /**
   * 获取学习路径
   * @param nodeId 目标节点ID
   */
  async getLearningPath(nodeId: string): Promise<KnowledgeNode[]> {
    const response = await apiClient.get<KnowledgeNode[]>('/knowledge/learning-path', {
      node_id: nodeId,
    });
    return response.data || [];
  },
};


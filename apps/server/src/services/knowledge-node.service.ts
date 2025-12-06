import { injectable, inject } from 'tsyringe';
import { Database } from '@/core/database';

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
 * 知识节点实体
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
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

/**
 * 知识依赖关系实体
 */
export interface KnowledgeDependency {
  dependency_id: string;
  source_node_id: string; // 前置节点（需要先学的）
  target_node_id: string; // 目标节点（需要后学的）
  dependency_type: 'required' | 'recommended';
  created_at: Date;
  updated_at: Date;
}

/**
 * 查询选项
 */
export interface KnowledgeNodeQueryOptions {
  parent_id?: string | null;
  node_type?: KnowledgeNodeType;
  include_deleted?: boolean;
}

/**
 * 统一的知识节点服务
 */
@injectable()
export class KnowledgeNodeService {
  constructor(@inject('Database') public db: Database) {}

  /**
   * 根据ID获取节点
   */
  async getNodeById(nodeId: string): Promise<KnowledgeNode | null> {
    const result = await this.db.query<KnowledgeNode>(
      `SELECT * FROM pikun_db.knowledge_nodes 
       WHERE node_id = $1 AND deleted_at IS NULL`,
      [nodeId]
    );
    return result.rows[0] || null;
  }

  /**
   * 查询子节点
   */
  async getChildren(
    parentId: string | null,
    options?: KnowledgeNodeQueryOptions
  ): Promise<KnowledgeNode[]> {
    const conditions: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    // parent_id 条件
    if (parentId === null) {
      conditions.push('parent_id IS NULL');
    } else {
      conditions.push(`parent_id = $${paramIndex++}`);
      params.push(parentId);
    }

    // node_type 过滤
    if (options?.node_type) {
      conditions.push(`node_type = $${paramIndex++}`);
      params.push(options.node_type);
    }

    // deleted_at 条件
    if (!options?.include_deleted) {
      conditions.push('deleted_at IS NULL');
    }

    const query = `
      SELECT * FROM pikun_db.knowledge_nodes
      WHERE ${conditions.join(' AND ')}
      ORDER BY sort_order ASC, name ASC
    `;

    const result = await this.db.query<KnowledgeNode>(query, params);
    return result.rows;
  }

  /**
   * 获取节点的完整路径（从根节点到当前节点）
   */
  async getNodePath(nodeId: string): Promise<KnowledgeNode[]> {
    const path: KnowledgeNode[] = [];
    let currentNodeId: string | null = nodeId;

    while (currentNodeId) {
      const node = await this.getNodeById(currentNodeId);
      if (!node) break;

      path.unshift(node);
      currentNodeId = node.parent_id;
    }

    return path;
  }

  /**
   * 获取节点的所有子节点（递归）
   */
  async getAllDescendants(nodeId: string): Promise<KnowledgeNode[]> {
    const descendants: KnowledgeNode[] = [];
    const queue: string[] = [nodeId];

    while (queue.length > 0) {
      const currentId = queue.shift()!;
      const children = await this.getChildren(currentId);

      for (const child of children) {
        descendants.push(child);
        queue.push(child.node_id);
      }
    }

    return descendants;
  }

  /**
   * 获取节点的直接依赖关系（前置节点）
   */
  async getPrerequisites(nodeId: string): Promise<KnowledgeDependency[]> {
    const result = await this.db.query<KnowledgeDependency>(
      `SELECT * FROM pikun_db.knowledge_dependencies 
       WHERE target_node_id = $1
       ORDER BY dependency_type DESC, created_at ASC`,
      [nodeId]
    );
    return result.rows;
  }

  /**
   * 获取节点的直接依赖目标（后置节点）
   */
  async getDependents(nodeId: string): Promise<KnowledgeDependency[]> {
    const result = await this.db.query<KnowledgeDependency>(
      `SELECT * FROM pikun_db.knowledge_dependencies 
       WHERE source_node_id = $1
       ORDER BY dependency_type DESC, created_at ASC`,
      [nodeId]
    );
    return result.rows;
  }

  /**
   * 获取节点的学习路径（拓扑排序）
   * 返回从基础节点到目标节点的所有前置节点
   */
  async getLearningPath(nodeId: string): Promise<KnowledgeNode[]> {
    const visited = new Set<string>();
    const path: KnowledgeNode[] = [];
    const queue: string[] = [nodeId];

    while (queue.length > 0) {
      const currentId = queue.shift()!;
      if (visited.has(currentId)) continue;
      visited.add(currentId);

      const prerequisites = await this.getPrerequisites(currentId);
      for (const dep of prerequisites) {
        if (!visited.has(dep.source_node_id)) {
          queue.push(dep.source_node_id);
        }
      }
    }

    // 拓扑排序
    const sortedIds = await this.topologicalSort(Array.from(visited));
    for (const id of sortedIds) {
      const node = await this.getNodeById(id);
      if (node) {
        path.push(node);
      }
    }

    return path;
  }

  /**
   * 拓扑排序
   */
  private async topologicalSort(nodeIds: string[]): Promise<string[]> {
    if (nodeIds.length === 0) return [];

    // 构建依赖图
    const inDegree = new Map<string, number>();
    const graph = new Map<string, string[]>();

    for (const id of nodeIds) {
      inDegree.set(id, 0);
      graph.set(id, []);
    }

    // 查询所有依赖关系
    const placeholders = nodeIds.map((_, i) => `$${i + 1}`).join(',');
    const result = await this.db.query<{
      source_node_id: string;
      target_node_id: string;
    }>(
      `SELECT source_node_id, target_node_id 
       FROM pikun_db.knowledge_dependencies 
       WHERE source_node_id IN (${placeholders}) 
         AND target_node_id IN (${placeholders})`,
      [...nodeIds, ...nodeIds]
    );

    // 构建图
    for (const edge of result.rows) {
      if (graph.has(edge.source_node_id) && graph.has(edge.target_node_id)) {
        graph.get(edge.source_node_id)!.push(edge.target_node_id);
        inDegree.set(
          edge.target_node_id,
          (inDegree.get(edge.target_node_id) || 0) + 1
        );
      }
    }

    // Kahn 算法进行拓扑排序
    const queue: string[] = [];
    for (const [id, degree] of inDegree.entries()) {
      if (degree === 0) {
        queue.push(id);
      }
    }

    const sorted: string[] = [];
    while (queue.length > 0) {
      const node = queue.shift()!;
      sorted.push(node);

      for (const neighbor of graph.get(node) || []) {
        const newDegree = (inDegree.get(neighbor) || 0) - 1;
        inDegree.set(neighbor, newDegree);
        if (newDegree === 0) {
          queue.push(neighbor);
        }
      }
    }

    return sorted;
  }

  /**
   * 创建依赖关系
   */
  async createDependency(
    sourceNodeId: string,
    targetNodeId: string,
    dependencyType: 'required' | 'recommended' = 'required'
  ): Promise<KnowledgeDependency> {
    const result = await this.db.query<KnowledgeDependency>(
      `INSERT INTO pikun_db.knowledge_dependencies 
       (source_node_id, target_node_id, dependency_type)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [sourceNodeId, targetNodeId, dependencyType]
    );
    return result.rows[0];
  }

  /**
   * 删除依赖关系
   */
  async deleteDependency(dependencyId: string): Promise<boolean> {
    const result = await this.db.query(
      `DELETE FROM pikun_db.knowledge_dependencies 
       WHERE dependency_id = $1`,
      [dependencyId]
    );
    return result.rowCount > 0;
  }
}


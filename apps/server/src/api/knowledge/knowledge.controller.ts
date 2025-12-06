import { NextRequest, NextResponse } from 'next/server';
import { injectable, inject } from 'tsyringe';
import { KnowledgeNodeService, type KnowledgeNodeType, type KnowledgeNode } from '@/services/knowledge-node.service';

/**
 * 统一的知识节点控制器
 * 不再使用硬编码的 level 判断，而是通过 parent_id 和 node_type 来查询
 */
@injectable()
export class KnowledgeController {
  constructor(
    @inject(KnowledgeNodeService) private knowledgeNodeService: KnowledgeNodeService
  ) {}

  /**
   * 获取知识节点列表
   * GET /api/knowledge/nodes?parent_id={parent_id}&node_type={node_type}
   */
  async getNodes(req: NextRequest): Promise<NextResponse> {
    try {
      const { searchParams } = new URL(req.url);
      const parentId = searchParams.get('parent_id');
      const nodeType = searchParams.get('node_type') as KnowledgeNodeType | null;

      // 处理 parent_id：如果为 "null" 字符串，则转换为 null
      const actualParentId =
        parentId === null || parentId === 'null' ? null : parentId;

      const nodes = await this.knowledgeNodeService.getChildren(actualParentId, {
        node_type: nodeType || undefined,
      });

      return NextResponse.json({
        success: true,
        data: nodes,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get knowledge nodes',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 虚拟根节点ID
   */
  private static readonly ROOT_NODE_ID = 'knowledge-world-root';

  /**
   * 创建虚拟根节点
   */
  private createRootNode(): KnowledgeNode {
    return {
      node_id: KnowledgeController.ROOT_NODE_ID,
      parent_id: null,
      node_type: 'subject_domain' as KnowledgeNodeType, // 使用一个存在的类型
      code: 'knowledge-world',
      name: '知识世界',
      description: '所有知识的起点',
      metadata: { is_virtual: true },
      sort_order: 0,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
  }

  /**
   * 获取节点详情
   * GET /api/knowledge/nodes/{node_id}
   */
  async getNodeById(req: NextRequest, nodeId: string): Promise<NextResponse> {
    try {
      // 如果是虚拟根节点，直接返回
      if (nodeId === KnowledgeController.ROOT_NODE_ID) {
        const rootNode = this.createRootNode();
        return NextResponse.json({
          success: true,
          data: {
            ...rootNode,
            path: [rootNode],
          },
        });
      }

      const node = await this.knowledgeNodeService.getNodeById(nodeId);
      if (!node) {
        return NextResponse.json(
          {
            success: false,
            message: 'Node not found',
          },
          { status: 404 }
        );
      }

      // 获取节点路径
      const path = await this.knowledgeNodeService.getNodePath(nodeId);

      return NextResponse.json({
        success: true,
        data: {
          ...node,
          path,
        },
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get knowledge node',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 获取节点的子节点（用于层级展示）
   * GET /api/knowledge/nodes/{node_id}/children
   */
  async getNodeChildren(
    req: NextRequest,
    nodeId: string
  ): Promise<NextResponse> {
    try {
      const { searchParams } = new URL(req.url);
      const nodeType = searchParams.get('node_type') as KnowledgeNodeType | null;

      // 如果是虚拟根节点，返回顶级节点（默认只返回学科门类，不包括基础能力）
      if (nodeId === KnowledgeController.ROOT_NODE_ID) {
        const topLevelNodes = await this.knowledgeNodeService.getChildren(null, {
          node_type: nodeType || 'subject_domain', // 默认只返回学科门类
        });

        const rootNode = this.createRootNode();
        const edges: Array<{
          id: string;
          source: string;
          target: string;
          type: 'required' | 'recommended';
        }> = topLevelNodes.map((node) => ({
          id: `edge_root_${node.node_id}`,
          source: KnowledgeController.ROOT_NODE_ID,
          target: node.node_id,
          type: 'required' as const,
        }));

        // 获取顶级节点之间的依赖关系
        const topLevelNodeIds = topLevelNodes.map((n) => n.node_id);
        if (topLevelNodeIds.length > 0) {
          const sourcePlaceholders = topLevelNodeIds.map((_, i) => `$${i + 1}`).join(',');
          const targetPlaceholders = topLevelNodeIds.map((_, i) => `$${topLevelNodeIds.length + i + 1}`).join(',');
          const depResult = await this.knowledgeNodeService.db.query<{
            dependency_id: string;
            source_node_id: string;
            target_node_id: string;
            dependency_type: 'required' | 'recommended';
          }>(
            `SELECT dependency_id, source_node_id, target_node_id, dependency_type
             FROM pikun_db.knowledge_dependencies
             WHERE source_node_id IN (${sourcePlaceholders})
               AND target_node_id IN (${targetPlaceholders})`,
            [...topLevelNodeIds, ...topLevelNodeIds]
          );

          for (const dep of depResult.rows) {
            edges.push({
              id: dep.dependency_id,
              source: dep.source_node_id,
              target: dep.target_node_id,
              type: dep.dependency_type,
            });
          }
        }

        return NextResponse.json({
          success: true,
          data: {
            parent: rootNode,
            nodes: [rootNode, ...topLevelNodes],
            edges,
          },
        });
      }

      // 获取父节点
      const parentNode = await this.knowledgeNodeService.getNodeById(nodeId);
      if (!parentNode) {
        return NextResponse.json(
          {
            success: false,
            message: 'Parent node not found',
          },
          { status: 404 }
        );
      }

      // 获取子节点
      let children = await this.knowledgeNodeService.getChildren(nodeId, {
        node_type: nodeType || undefined,
      });

      // 如果父节点是分类，且没有指定 node_type，需要获取该分类下的所有学科（包括子分类下的学科）
      if (parentNode.node_type === 'subject_category' && !nodeType) {
        // 获取所有子分类（递归）
        const allDescendantCategories = await this.knowledgeNodeService.getAllDescendants(nodeId);
        const categoryIds = [nodeId, ...allDescendantCategories.map((c) => c.node_id)];
        
        // 获取所有这些分类下的学科
        const categoryPlaceholders = categoryIds.map((_, i) => `$${i + 1}`).join(',');
        const subjectsResult = await this.knowledgeNodeService.db.query<KnowledgeNode>(
          `SELECT * FROM pikun_db.knowledge_nodes
           WHERE parent_id IN (${categoryPlaceholders})
             AND node_type = 'subject'
             AND deleted_at IS NULL
           ORDER BY sort_order ASC, name ASC`,
          categoryIds
        );
        
        // 合并直接子节点和所有学科
        children = [...children.filter((c) => c.node_type !== 'subject'), ...subjectsResult.rows];
      }

      // 获取依赖关系（从父节点到子节点的层级关系）
      const edges: Array<{
        id: string;
        source: string;
        target: string;
        type: 'required' | 'recommended';
      }> = children.map((child) => ({
        id: `edge_${nodeId}_${child.node_id}`,
        source: nodeId,
        target: child.node_id,
        type: 'required' as const, // 层级关系是必需的
      }));

      // 获取子节点之间的学习顺序依赖关系
      const childIds = children.map((c) => c.node_id);
      if (childIds.length > 0) {
        // 创建两套占位符，索引从 1 开始和从 childIds.length + 1 开始
        const sourcePlaceholders = childIds.map((_, i) => `$${i + 1}`).join(',');
        const targetPlaceholders = childIds.map((_, i) => `$${childIds.length + i + 1}`).join(',');
        const depResult = await this.knowledgeNodeService.db.query<{
          dependency_id: string;
          source_node_id: string;
          target_node_id: string;
          dependency_type: 'required' | 'recommended';
        }>(
          `SELECT dependency_id, source_node_id, target_node_id, dependency_type
           FROM pikun_db.knowledge_dependencies
           WHERE source_node_id IN (${sourcePlaceholders})
             AND target_node_id IN (${targetPlaceholders})`,
          [...childIds, ...childIds]
        );

        for (const dep of depResult.rows) {
          edges.push({
            id: dep.dependency_id,
            source: dep.source_node_id,
            target: dep.target_node_id,
            type: dep.dependency_type,
          });
        }
      }

      return NextResponse.json({
        success: true,
        data: {
          parent: parentNode,
          nodes: [parentNode, ...children],
          edges,
        },
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get node children',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 获取依赖关系
   * GET /api/knowledge/dependencies?source_node_id={source_id}&target_node_id={target_id}
   */
  async getDependencies(req: NextRequest): Promise<NextResponse> {
    try {
      const { searchParams } = new URL(req.url);
      const sourceNodeId = searchParams.get('source_node_id');
      const targetNodeId = searchParams.get('target_node_id');

      let dependencies;

      if (sourceNodeId && targetNodeId) {
        // 查询特定节点对的依赖关系
        const result = await this.knowledgeNodeService.db.query(
          `SELECT * FROM pikun_db.knowledge_dependencies 
           WHERE source_node_id = $1 AND target_node_id = $2`,
          [sourceNodeId, targetNodeId]
        );
        dependencies = result.rows;
      } else if (sourceNodeId) {
        // 查询某个节点的所有依赖目标
        dependencies = await this.knowledgeNodeService.getDependents(
          sourceNodeId
        );
      } else if (targetNodeId) {
        // 查询某个节点的所有前置依赖
        dependencies = await this.knowledgeNodeService.getPrerequisites(
          targetNodeId
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: 'Please provide source_node_id or target_node_id',
          },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        data: dependencies,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get dependencies',
        },
        { status: 500 }
      );
    }
  }

  /**
   * 获取学习路径
   * GET /api/knowledge/learning-path?node_id={node_id}
   */
  async getLearningPath(req: NextRequest): Promise<NextResponse> {
    try {
      const { searchParams } = new URL(req.url);
      const nodeId = searchParams.get('node_id');

      if (!nodeId) {
        return NextResponse.json(
          {
            success: false,
            message: 'Please provide node_id',
          },
          { status: 400 }
        );
      }

      const path = await this.knowledgeNodeService.getLearningPath(nodeId);

      return NextResponse.json({
        success: true,
        data: path,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          success: false,
          message: error.message || 'Failed to get learning path',
        },
        { status: 500 }
      );
    }
  }
}


import React, { useEffect, useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Spin, Typography, Tag, Drawer } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { HierarchicalKnowledgeGraph } from '@/components/KnowledgeGraph';
import type {
  HierarchicalKnowledgeNode,
  KnowledgeGraphEdge,
} from '@/components/KnowledgeGraph/types';
import { knowledgeApi, type KnowledgeNode } from '@/api/knowledge.api';
import './Knowledge.less';

const { Title, Text } = Typography;

/**
 * 技能知识页面
 * 展示知识地图和学习路径
 */
export const Knowledge = observer((): React.JSX.Element => {
  const [selectedNode, setSelectedNode] = useState<HierarchicalKnowledgeNode | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<KnowledgeGraphEdge | null>(null);

  const [hierarchicalData, setHierarchicalData] = useState<{
    nodes: HierarchicalKnowledgeNode[];
    edges: KnowledgeGraphEdge[];
  }>({ nodes: [], edges: [] });
  const [currentParentId, setCurrentParentId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // 将 KnowledgeNode 转换为 HierarchicalKnowledgeNode
  const convertToHierarchicalNode = (node: KnowledgeNode): HierarchicalKnowledgeNode => {
    // 根据 node_type 推断 level（用于兼容现有组件）
    let level: 0 | 1 | 2 | 3 = 0;
    if (node.node_type === 'foundational_ability') {
      level = 0;
    } else if (node.node_type === 'subject_domain') {
      level = 0;
    } else if (node.node_type === 'subject_category') {
      level = 1;
    } else if (node.node_type === 'subject') {
      level = 2;
    } else if (node.node_type === 'knowledge_point') {
      level = 3;
    }

    return {
      id: node.node_id,
      name: node.name,
      code: node.code,
      level,
      parentId: node.parent_id || undefined,
      description: node.description || undefined,
      difficulty: node.metadata?.difficulty,
      estimatedTime: node.metadata?.estimated_time,
      metadata: node.metadata,
    };
  };

  // 加载分层知识地图数据（查询顶级节点：学科门类）
  useEffect(() => {
    const loadHierarchicalData = async () => {
      setLoading(true);
      try {
        console.log('Loading hierarchical data:', {
          parentId: currentParentId,
        });
        
        // 如果 currentParentId 为 null，使用虚拟根节点"知识世界"
        // 否则查询指定节点的子节点
        let nodes: KnowledgeNode[] = [];
        let edges: KnowledgeGraphEdge[] = [];

        if (currentParentId === null) {
          // 使用虚拟根节点"知识世界"作为起点
          const rootNodeId = 'knowledge-world-root';
          const response = await knowledgeApi.getNodeChildren(rootNodeId);
          nodes = response.nodes;
          edges = response.edges.map((edge) => ({
            id: edge.id,
            source: edge.source,
            target: edge.target,
            type: edge.type,
          }));
        } else {
          // 查询指定节点的子节点
          const response = await knowledgeApi.getNodeChildren(currentParentId);
          nodes = response.nodes;
          edges = response.edges.map((edge) => ({
            id: edge.id,
            source: edge.source,
            target: edge.target,
            type: edge.type,
          }));
        }

        // 转换数据格式
        const hierarchicalNodes: HierarchicalKnowledgeNode[] = nodes.map(convertToHierarchicalNode);
        
        console.log('Loaded hierarchical data:', {
          nodes: hierarchicalNodes,
          edges,
          nodeCount: hierarchicalNodes.length,
          parentId: currentParentId,
          sampleNodes: hierarchicalNodes.slice(0, 3),
        });
        setHierarchicalData({ nodes: hierarchicalNodes, edges });
      } catch (error) {
        console.error('Failed to load hierarchical knowledge map:', error);
        setHierarchicalData({ nodes: [], edges: [] });
      } finally {
        setLoading(false);
      }
    };
    loadHierarchicalData();
  }, [currentParentId]);

  // 处理节点点击（显示详情）
  const handleNodeClick = useCallback((node: HierarchicalKnowledgeNode) => {
    setSelectedNode(node);
  }, []);

  // 处理边点击
  const handleEdgeClick = useCallback((edge: KnowledgeGraphEdge) => {
    setSelectedEdge(edge);
  }, []);

  // 动态加载子节点数据（不再需要 level 判断）
  const handleLoadChildren = useCallback(
    async (
      parentId: string,
    ): Promise<{
      nodes: HierarchicalKnowledgeNode[];
      edges: KnowledgeGraphEdge[];
    }> => {
      console.log('handleLoadChildren called:', { parentId });
      
      // 调用新的统一 API 获取子节点数据
      const response = await knowledgeApi.getNodeChildren(parentId);
      console.log('handleLoadChildren API response:', {
        nodeCount: response.nodes.length,
        edgeCount: response.edges.length,
        sampleNodes: response.nodes.slice(0, 3),
      });
      
      // 转换数据格式
      const nodes: HierarchicalKnowledgeNode[] = response.nodes.map(convertToHierarchicalNode);
      const edges: KnowledgeGraphEdge[] = response.edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type,
      }));
      
      return { nodes, edges };
    },
    [],
  );

  return (
    <div className="knowledge-page">
      <div className="knowledge-header">
        <div className="header-left">
          <Title level={2}>
            <BookOutlined /> 知识地图
          </Title>
          <Text type="secondary">探索学科之间的学习路径和依赖关系</Text>
        </div>
      </div>

      <div className="knowledge-content">
        {loading ? (
          <div className="loading-container">
            <Spin size="large" />
          </div>
        ) : hierarchicalData.nodes.length === 0 ? (
          <div className="empty-container">
            <Text type="secondary">暂无知识地图数据</Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              请先在管理端创建学科和依赖关系
            </Text>
          </div>
        ) : (
          <div className="knowledge-map-wrapper">
            <HierarchicalKnowledgeGraph
              nodes={hierarchicalData.nodes}
              edges={hierarchicalData.edges}
              onNodeClick={handleNodeClick}
              onEdgeClick={handleEdgeClick}
              onLoadChildren={handleLoadChildren}
              showControls={true}
              showMiniMap={true}
              showBackground={true}
              enableDrillDown={true}
            />
          </div>
        )}
      </div>

      {/* 节点信息抽屉 */}
      <Drawer
        title={selectedNode?.level === 0 ? '分类信息' : '学科信息'}
        placement="right"
        open={!!selectedNode}
        onClose={() => setSelectedNode(null)}
        width={400}
      >
        {selectedNode && (
          <div className="node-info-content">
            <div className="info-item">
              <Text strong>名称：</Text>
              <Text>{selectedNode.name}</Text>
            </div>
            {selectedNode.code && (
              <div className="info-item">
                <Text strong>代码：</Text>
                <Text code>{selectedNode.code}</Text>
              </div>
            )}
            {selectedNode.category && (
              <div className="info-item">
                <Text strong>分类：</Text>
                <Text>{selectedNode.category}</Text>
              </div>
            )}
            <div className="info-item">
              <Text strong>层级：</Text>
              <Text>
                {selectedNode.level === 0
                  ? '分类'
                  : selectedNode.level === 1
                    ? '学科'
                    : selectedNode.level === 2
                      ? '子分类'
                      : '知识点'}
              </Text>
            </div>
            {selectedNode.learningStatus && (
              <div className="info-item">
                <Text strong>学习状态：</Text>
                <Text>
                  {selectedNode.learningStatus === 'completed'
                    ? '已完成'
                    : selectedNode.learningStatus === 'in_progress'
                      ? '进行中'
                      : selectedNode.learningStatus === 'locked'
                        ? '已锁定'
                        : '未开始'}
                </Text>
              </div>
            )}
            {selectedNode.progress !== undefined && (
              <div className="info-item">
                <Text strong>学习进度：</Text>
                <Text>{selectedNode.progress}%</Text>
              </div>
            )}
            {selectedNode.description && (
              <div className="info-item">
                <Text strong>描述：</Text>
                <Text>{selectedNode.description}</Text>
              </div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
});

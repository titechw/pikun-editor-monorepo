import React, { useEffect, useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Spin, Typography, Tag, Drawer } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { HierarchicalKnowledgeGraph } from '@/components/KnowledgeGraph';
import type {
  HierarchicalKnowledgeNode,
  KnowledgeGraphEdge,
} from '@/components/KnowledgeGraph/types';
import { knowledgeMapApi } from '@/api/subject.api';
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
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [currentParentId, setCurrentParentId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // 加载分层知识地图数据（直接从数据库查询第一层）
  useEffect(() => {
    const loadHierarchicalData = async () => {
      setLoading(true);
      try {
        console.log('Loading hierarchical data:', {
          level: currentLevel,
          parentId: currentParentId,
        });
        const data = await knowledgeMapApi.getHierarchicalKnowledgeMap(
          null,
          currentParentId || undefined,
          currentLevel,
        );
        // 转换数据格式以匹配 HierarchicalKnowledgeNode
        const nodes: HierarchicalKnowledgeNode[] = data.nodes.map((node) => ({
          id: node.id,
          name: node.name,
          code: node.code,
          level: node.level,
          parentId: node.parentId,
          category: node.category,
          description: node.description,
          difficulty: node.difficulty,
          estimatedTime: node.estimatedTime,
        }));
        const edges: KnowledgeGraphEdge[] = data.edges.map((edge) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          type: edge.type,
        }));
        console.log('Loaded hierarchical data:', {
          nodes,
          edges,
          nodeCount: nodes.length,
          level: currentLevel,
          parentId: currentParentId,
          sampleNodes: nodes.slice(0, 3),
        });
        setHierarchicalData({ nodes, edges });
      } catch (error) {
        console.error('Failed to load hierarchical knowledge map:', error);
        setHierarchicalData({ nodes: [], edges: [] });
      } finally {
        setLoading(false);
      }
    };
    loadHierarchicalData();
  }, [currentLevel, currentParentId]);

  // 处理节点点击（显示详情）
  const handleNodeClick = useCallback((node: HierarchicalKnowledgeNode) => {
    setSelectedNode(node);
  }, []);

  // 处理边点击
  const handleEdgeClick = useCallback((edge: KnowledgeGraphEdge) => {
    setSelectedEdge(edge);
  }, []);

  // 动态加载子节点数据
  const handleLoadChildren = useCallback(
    async (
      parentId: string,
    ): Promise<{
      nodes: HierarchicalKnowledgeNode[];
      edges: KnowledgeGraphEdge[];
    }> => {
      // 判断当前层级，确定下一层级
      const nextLevel = currentLevel + 1;
      console.log('handleLoadChildren called:', { parentId, currentLevel, nextLevel });
      // 调用 API 获取子节点数据
      const data = await knowledgeMapApi.getHierarchicalKnowledgeMap(null, parentId, nextLevel);
      console.log('handleLoadChildren API response:', {
        nodeCount: data.nodes.length,
        edgeCount: data.edges.length,
        sampleNodes: data.nodes.slice(0, 3),
      });
      // 转换数据格式
      const nodes: HierarchicalKnowledgeNode[] = data.nodes.map((node) => ({
        id: node.id,
        name: node.name,
        code: node.code,
        level: node.level,
        parentId: node.parentId,
        category: node.category,
        description: node.description,
        difficulty: node.difficulty,
        estimatedTime: node.estimatedTime,
      }));
      const edges: KnowledgeGraphEdge[] = data.edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type,
      }));
      // 更新状态（这会触发 useEffect 重新加载数据）
      setCurrentLevel(nextLevel);
      setCurrentParentId(parentId);
      return { nodes, edges };
    },
    [currentLevel],
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

import React, { useState, useCallback } from 'react';
import { Card, Button, Space, Typography, message, Drawer } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { HierarchicalKnowledgeGraph } from '@/components/KnowledgeGraph';
import {
  mockHierarchicalData,
  generateHierarchicalMathData,
  generateHierarchicalPhysicsData,
} from '@/components/KnowledgeGraph/hierarchicalMockData';
import type {
  HierarchicalKnowledgeNode,
  KnowledgeGraphEdge,
} from '@/components/KnowledgeGraph/types';
import './HierarchicalKnowledgeGraphDemo.less';

const { Title, Text } = Typography;

/**
 * 多层级知识图谱 Demo 页面
 * 演示从学科到知识点的多层级展示和学习状态可视化
 */
export const HierarchicalKnowledgeGraphDemo: React.FC = () => {
  const [data, setData] = useState(mockHierarchicalData);
  const [selectedNode, setSelectedNode] = useState<HierarchicalKnowledgeNode | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<KnowledgeGraphEdge | null>(null);

  // 重新生成数据
  const handleRegenerate = useCallback(() => {
    const newData = generateHierarchicalMathData();
    setData(newData);
    setSelectedNode(null);
    setSelectedEdge(null);
    message.success('数据已重新生成');
  }, []);

  // 切换到物理数据
  const handleSwitchToPhysics = useCallback(() => {
    const newData = generateHierarchicalPhysicsData();
    setData(newData);
    setSelectedNode(null);
    setSelectedEdge(null);
    message.success('已切换到物理学科');
  }, []);

  // 处理节点点击
  const handleNodeClick = useCallback((node: HierarchicalKnowledgeNode) => {
    setSelectedNode(node);
    setSelectedEdge(null);
    message.info(`点击了节点: ${node.name} (${node.level === 0 ? '学科' : node.level === 1 ? '主题' : '知识点'})`);
  }, []);

  // 处理节点双击（钻取）
  const handleNodeDoubleClick = useCallback((node: HierarchicalKnowledgeNode) => {
    setSelectedNode(node);
    setSelectedEdge(null);
    message.success(`钻取到: ${node.name}`);
  }, []);

  // 处理边点击
  const handleEdgeClick = useCallback((edge: KnowledgeGraphEdge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
    message.info(`点击了边: ${edge.source} -> ${edge.target}`);
  }, []);

  return (
    <div className="hierarchical-knowledge-graph-demo">
      <Card className="demo-header">
        <div className="header-content">
          <div className="header-left">
            <Title level={2}>多层级知识图谱 Demo</Title>
            <Text type="secondary">
              演示从学科到知识点的多层级展示和学习状态可视化 - 节点数: {data.nodes.length}, 边数:{' '}
              {data.edges.length}
            </Text>
            <div className="header-tips" style={{ marginTop: 8 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                💡 提示：双击节点可以钻取到下一层级查看详情
              </Text>
            </div>
          </div>
          <div className="header-right">
            <Space>
              <Button onClick={handleSwitchToPhysics}>切换到物理</Button>
              <Button icon={<ReloadOutlined />} onClick={handleRegenerate}>
                重新生成数据
              </Button>
            </Space>
          </div>
        </div>
      </Card>

      <Card className="demo-content">
        <div className="graph-wrapper">
          <HierarchicalKnowledgeGraph
            nodes={data.nodes}
            edges={data.edges}
            onNodeClick={handleNodeClick}
            onNodeDoubleClick={handleNodeDoubleClick}
            onEdgeClick={handleEdgeClick}
            showControls={true}
            showMiniMap={true}
            showBackground={true}
            enableDrillDown={true}
          />
        </div>
      </Card>

      <Drawer
        title="选中信息"
        placement="right"
        open={!!(selectedNode || selectedEdge)}
        onClose={() => {
          setSelectedNode(null);
          setSelectedEdge(null);
        }}
        width={400}
        className="demo-drawer"
      >
        {selectedNode && (
          <div className="info-content">
            <Title level={4}>节点信息</Title>
            <div className="info-item">
              <Text strong>ID: </Text>
              <Text code>{selectedNode.id}</Text>
            </div>
            <div className="info-item">
              <Text strong>名称: </Text>
              <Text>{selectedNode.name}</Text>
            </div>
            {selectedNode.code && (
              <div className="info-item">
                <Text strong>代码: </Text>
                <Text code>{selectedNode.code}</Text>
              </div>
            )}
            <div className="info-item">
              <Text strong>层级: </Text>
              <Text>
                {selectedNode.level === 0
                  ? '学科'
                  : selectedNode.level === 1
                    ? '主题'
                    : '知识点'}
              </Text>
            </div>
            {selectedNode.category && (
              <div className="info-item">
                <Text strong>分类: </Text>
                <Text>{selectedNode.category}</Text>
              </div>
            )}
            {selectedNode.learningStatus && (
              <div className="info-item">
                <Text strong>学习状态: </Text>
                <Text>{selectedNode.learningStatus}</Text>
              </div>
            )}
            {selectedNode.progress !== undefined && (
              <div className="info-item">
                <Text strong>学习进度: </Text>
                <Text>{selectedNode.progress}%</Text>
              </div>
            )}
            {selectedNode.masteryLevel !== undefined && (
              <div className="info-item">
                <Text strong>掌握程度: </Text>
                <Text>{selectedNode.masteryLevel}%</Text>
              </div>
            )}
            {selectedNode.difficulty && (
              <div className="info-item">
                <Text strong>难度: </Text>
                <Text>{selectedNode.difficulty}</Text>
              </div>
            )}
            {selectedNode.estimatedTime && (
              <div className="info-item">
                <Text strong>预计学习时间: </Text>
                <Text>{selectedNode.estimatedTime} 分钟</Text>
              </div>
            )}
            {selectedNode.description && (
              <div className="info-item">
                <Text strong>描述: </Text>
                <Text>{selectedNode.description}</Text>
              </div>
            )}
            {selectedNode.children && selectedNode.children.length > 0 && (
              <div className="info-item">
                <Text strong>子节点数量: </Text>
                <Text>{selectedNode.children.length}</Text>
              </div>
            )}
          </div>
        )}
        {selectedEdge && (
          <div className="info-content">
            <Title level={4}>边信息</Title>
            <div className="info-item">
              <Text strong>ID: </Text>
              <Text code>{selectedEdge.id}</Text>
            </div>
            <div className="info-item">
              <Text strong>源节点: </Text>
              <Text code>{selectedEdge.source}</Text>
            </div>
            <div className="info-item">
              <Text strong>目标节点: </Text>
              <Text code>{selectedEdge.target}</Text>
            </div>
            {selectedEdge.type && (
              <div className="info-item">
                <Text strong>类型: </Text>
                <Text>{selectedEdge.type === 'required' ? '必需' : '推荐'}</Text>
              </div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
};


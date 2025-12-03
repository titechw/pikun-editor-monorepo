import React, { useState, useCallback } from 'react';
import { Card, Button, Space, Typography, message, Drawer } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { KnowledgeGraph } from '@/components/KnowledgeGraph';
import { mockKnowledgeGraphData, generateKnowledgeGraphData } from '@/components/KnowledgeGraph';
import type { KnowledgeGraphNode, KnowledgeGraphEdge } from '@/components/KnowledgeGraph';
import './KnowledgeGraphDemo.less';

const { Title, Text } = Typography;

/**
 * 知识图谱 Demo 页面
 * 用于测试 ReactFlow 的画图能力和性能
 */
export const KnowledgeGraphDemo: React.FC = () => {
  const [data, setData] = useState(mockKnowledgeGraphData);
  const [selectedNode, setSelectedNode] = useState<KnowledgeGraphNode | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<KnowledgeGraphEdge | null>(null);

  // 重新生成数据
  const handleRegenerate = useCallback(() => {
    const newData = generateKnowledgeGraphData();
    setData(newData);
    setSelectedNode(null);
    setSelectedEdge(null);
    message.success('数据已重新生成');
  }, []);

  // 处理节点点击
  const handleNodeClick = useCallback((node: KnowledgeGraphNode) => {
    setSelectedNode(node);
    setSelectedEdge(null);
    message.info(`点击了节点: ${node.name}`);
  }, []);

  // 处理边点击
  const handleEdgeClick = useCallback((edge: KnowledgeGraphEdge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
    message.info(`点击了边: ${edge.source} -> ${edge.target}`);
  }, []);

  return (
    <div className="knowledge-graph-demo">
      <Card className="demo-header">
        <div className="header-content">
          <div className="header-left">
            <Title level={2}>知识图谱 Demo</Title>
            <Text type="secondary">
              测试 ReactFlow 的画图能力和性能 - 节点数: {data.nodes.length}, 边数:{' '}
              {data.edges.length}
            </Text>
          </div>
          <div className="header-right">
            <Space>
              <Button icon={<ReloadOutlined />} onClick={handleRegenerate}>
                重新生成数据
              </Button>
            </Space>
          </div>
        </div>
      </Card>

      <Card className="demo-content">
        <div className="graph-wrapper">
          <KnowledgeGraph
            nodes={data.nodes}
            edges={data.edges}
            onNodeClick={handleNodeClick}
            onEdgeClick={handleEdgeClick}
            showControls={true}
            showMiniMap={true}
            showBackground={true}
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
            {selectedNode.category && (
              <div className="info-item">
                <Text strong>分类: </Text>
                <Text>{selectedNode.category}</Text>
              </div>
            )}
            {selectedNode.level !== undefined && (
              <div className="info-item">
                <Text strong>层级: </Text>
                <Text>{selectedNode.level}</Text>
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

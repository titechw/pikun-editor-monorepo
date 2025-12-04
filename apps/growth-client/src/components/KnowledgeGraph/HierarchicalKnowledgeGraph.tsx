import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';
// @ts-ignore
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
  type Node,
  type Edge,
  type ReactFlowInstance,
} from 'reactflow';
// @ts-ignore
import 'reactflow/dist/style.css';
import dagre from 'dagre';
import { Button, Breadcrumb, Space, Badge, Progress } from 'antd';
import { ArrowLeftOutlined, ZoomInOutlined } from '@ant-design/icons';
import type {
  HierarchicalKnowledgeNode,
  KnowledgeGraphEdge,
  ViewMode,
  DrillDownContext,
  NodeLevel,
  LearningStatus,
} from './types';
import './HierarchicalKnowledgeGraph.less';

export interface HierarchicalKnowledgeGraphProps {
  nodes: HierarchicalKnowledgeNode[];
  edges: KnowledgeGraphEdge[];
  onNodeClick?: (node: HierarchicalKnowledgeNode) => void;
  onEdgeClick?: (edge: KnowledgeGraphEdge) => void;
  onLoadChildren?: (parentId: string) => Promise<{
    nodes: HierarchicalKnowledgeNode[];
    edges: KnowledgeGraphEdge[];
  }>; // 动态加载子节点的回调
  readonly?: boolean;
  showControls?: boolean;
  showMiniMap?: boolean;
  showBackground?: boolean;
  layout?: 'hierarchical' | 'force';
  defaultViewMode?: ViewMode;
  enableDrillDown?: boolean; // 是否启用钻取功能
}

/**
 * 获取学习状态的颜色
 */
const getStatusColor = (status?: LearningStatus): string => {
  switch (status) {
    case 'completed':
      return '#52c41a'; // 绿色
    case 'in_progress':
      return '#1890ff'; // 蓝色
    case 'locked':
      return '#ff4d4f'; // 红色
    case 'not_started':
    default:
      return '#8c8c8c'; // 灰色
  }
};

/**
 * 获取学习状态的文本
 */
const getStatusText = (status?: LearningStatus): string => {
  switch (status) {
    case 'completed':
      return '已完成';
    case 'in_progress':
      return '进行中';
    case 'locked':
      return '已锁定';
    case 'not_started':
    default:
      return '未开始';
  }
};

/**
 * 自定义节点组件（支持多层级和学习状态）
 */
const CustomHierarchicalNode = React.memo(
  ({
    data,
    onDrillDown,
    onShowDetail,
  }: {
    data: HierarchicalKnowledgeNode & { viewLevel: NodeLevel };
    onDrillDown?: (nodeId: string) => void;
    onShowDetail?: (nodeId: string) => void;
  }) => {
    const { level, learningStatus, progress, masteryLevel, children } = data;
    const statusColor = getStatusColor(learningStatus);
    const hasChildren = children && children.length > 0;
    const canDrillDown = hasChildren && level < 3; // 知识点（level 3）不能再钻取

    // 根据层级调整节点样式
    const nodeSizeClass = `node-level-${level}`;

    // 处理详情按钮点击
    const handleDetailClick = (e: React.MouseEvent) => {
      e.stopPropagation(); // 阻止事件冒泡，避免触发节点点击
      if (onShowDetail) {
        onShowDetail(data.id);
      }
    };

    // 处理进入按钮点击
    const handleEnterClick = (e: React.MouseEvent) => {
      e.stopPropagation(); // 阻止事件冒泡，避免触发节点点击
      if (canDrillDown && onDrillDown) {
        onDrillDown(data.id);
      }
    };

    return (
      <div className={`hierarchical-knowledge-node ${nodeSizeClass}`}>
        {/* 输入 Handle */}
        <Handle type="target" position={Position.Left} style={{ background: statusColor }} />

        {/* 节点内容 */}
        <div className="node-content" style={{ borderColor: statusColor }}>
          {/* 头部：代码和状态 */}
          <div className="node-header">
            {data.code && <div className="node-code">{data.code}</div>}
            <Badge
              color={statusColor}
              text={getStatusText(learningStatus)}
              style={{ fontSize: '10px' }}
            />
          </div>

          {/* 名称 */}
          <div className="node-name">{data.name}</div>

          {/* 分类 */}
          {data.category && <div className="node-category">{data.category}</div>}

          {/* 学习进度 */}
          {learningStatus === 'in_progress' && progress !== undefined && (
            <div className="node-progress">
              <Progress
                percent={progress}
                size="small"
                strokeColor={statusColor}
                showInfo={false}
              />
              <span className="progress-text">{progress}%</span>
            </div>
          )}

          {/* 掌握程度 */}
          {masteryLevel !== undefined && learningStatus === 'completed' && (
            <div className="node-mastery">
              <span>掌握度: {masteryLevel}%</span>
            </div>
          )}

          {/* 难度标签 */}
          {data.difficulty && (
            <div className={`node-difficulty difficulty-${data.difficulty}`}>
              {data.difficulty === 'easy' ? '简单' : data.difficulty === 'medium' ? '中等' : '困难'}
            </div>
          )}

          {/* 操作按钮区域 */}
          <div className="node-action-buttons">
            <Space size="small" style={{ width: '100%', marginTop: '8px' }}>
              <Button type="default" size="small" onClick={handleDetailClick} style={{ flex: 1 }}>
                详情
              </Button>
              {canDrillDown && (
                <Button
                  type="primary"
                  size="small"
                  icon={<ZoomInOutlined />}
                  onClick={handleEnterClick}
                  style={{ flex: 1 }}
                >
                  进入 ({children?.length || 0})
                </Button>
              )}
            </Space>
          </div>
        </div>

        {/* 输出 Handle */}
        <Handle type="source" position={Position.Right} style={{ background: statusColor }} />
      </div>
    );
  },
);

CustomHierarchicalNode.displayName = 'CustomHierarchicalNode';

/**
 * 多层级知识图谱组件
 */
export const HierarchicalKnowledgeGraph: React.FC<HierarchicalKnowledgeGraphProps> = ({
  nodes,
  edges,
  onNodeClick,
  onEdgeClick,
  onLoadChildren,
  readonly = false,
  showControls = true,
  showMiniMap = true,
  showBackground = true,
  layout = 'hierarchical',
  defaultViewMode = 'all',
  enableDrillDown = true,
}) => {
  const reactFlowInstanceRef = useRef<ReactFlowInstance | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('drill-down'); // 默认使用钻取模式
  const [drillDownContext, setDrillDownContext] = useState<DrillDownContext | null>(null);
  const [loadedNodes, setLoadedNodes] = useState<HierarchicalKnowledgeNode[]>(nodes);
  const [loadedEdges, setLoadedEdges] = useState<KnowledgeGraphEdge[]>(edges);
  const [loadingChildren, setLoadingChildren] = useState<boolean>(false);

  // 当外部 nodes 或 edges 变化时，更新内部状态
  useEffect(() => {
    console.log('HierarchicalKnowledgeGraph: nodes/edges updated', {
      nodesCount: nodes.length,
      edgesCount: edges.length,
      nodes: nodes.slice(0, 3), // 只打印前3个节点
    });
    setLoadedNodes(nodes);
    setLoadedEdges(edges);
  }, [nodes, edges]);

  // 构建节点树结构（用于钻取）
  const nodeTree = useMemo(() => {
    const tree = new Map<string, HierarchicalKnowledgeNode>();
    loadedNodes.forEach((node) => {
      tree.set(node.id, { ...node, children: [] });
    });
    loadedNodes.forEach((node) => {
      if (node.parentId && tree.has(node.parentId)) {
        const parent = tree.get(node.parentId)!;
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(tree.get(node.id)!);
      }
    });
    return tree;
  }, [loadedNodes]);

  // 处理节点钻取（点击进入按钮或点击节点主体）
  const handleDrillDown = useCallback(
    async (nodeId: string) => {
      const targetNode = loadedNodes.find((n) => n.id === nodeId);
      if (!targetNode) return;

      const nodeInTree = nodeTree.get(nodeId);
      const hasChildren = nodeInTree?.children && nodeInTree.children.length > 0;

      // 如果没有子节点但有 onLoadChildren 回调，尝试动态加载
      if (!hasChildren && onLoadChildren && targetNode.level < 3) {
        setLoadingChildren(true);
        try {
          const childrenData = await onLoadChildren(nodeId);
          // 更新节点树，添加新加载的子节点
          const updatedNodes = [...loadedNodes];
          childrenData.nodes.forEach((childNode) => {
            if (!updatedNodes.find((n) => n.id === childNode.id)) {
              updatedNodes.push(childNode);
            }
          });
          setLoadedNodes(updatedNodes);

          // 更新边
          const updatedEdges = [...loadedEdges];
          childrenData.edges.forEach((childEdge) => {
            if (!updatedEdges.find((e) => e.id === childEdge.id)) {
              updatedEdges.push(childEdge);
            }
          });
          setLoadedEdges(updatedEdges);

          // 重新构建节点树
          const newTree = new Map<string, HierarchicalKnowledgeNode>();
          updatedNodes.forEach((node) => {
            newTree.set(node.id, { ...node, children: [] });
          });
          updatedNodes.forEach((node) => {
            if (node.parentId && newTree.has(node.parentId)) {
              const parent = newTree.get(node.parentId)!;
              if (!parent.children) {
                parent.children = [];
              }
              parent.children.push(newTree.get(node.id)!);
            }
          });

          // 检查现在是否有子节点
          const updatedNodeInTree = newTree.get(nodeId);
          if (!updatedNodeInTree?.children || updatedNodeInTree.children.length === 0) {
            setLoadingChildren(false);
            return; // 仍然没有子节点，不进行钻取
          }
        } catch (error) {
          console.error('Failed to load children:', error);
          setLoadingChildren(false);
          return;
        } finally {
          setLoadingChildren(false);
        }
      }

      // 重新获取节点树（可能已更新）
      const finalNodeInTree = nodeTree.get(nodeId);
      const finalHasChildren = finalNodeInTree?.children && finalNodeInTree.children.length > 0;
      if (!finalHasChildren || targetNode.level >= 3) return; // 知识点（level 3）不能再钻取

      // 更新钻取上下文
      const newPath = drillDownContext
        ? [
            ...drillDownContext.path,
            { id: targetNode.id, name: targetNode.name, level: targetNode.level },
          ]
        : [{ id: targetNode.id, name: targetNode.name, level: targetNode.level }];

      setDrillDownContext({
        nodeId: targetNode.id,
        nodeName: targetNode.name,
        level: targetNode.level,
        path: newPath,
      });

      setViewMode('drill-down');
    },
    [loadedNodes, nodeTree, drillDownContext, onLoadChildren, loadedEdges],
  );

  // 处理显示详情
  const handleShowDetail = useCallback(
    (nodeId: string) => {
      const targetNode = loadedNodes.find((n) => n.id === nodeId);
      if (targetNode && onNodeClick) {
        onNodeClick(targetNode);
      }
    },
    [loadedNodes, onNodeClick],
  );

  // 节点类型定义（使用 useMemo 确保不会每次都重新创建）
  const nodeTypes = useMemo(() => {
    const HierarchicalNode = (props: any) => (
      <CustomHierarchicalNode
        {...props}
        onDrillDown={handleDrillDown}
        onShowDetail={handleShowDetail}
      />
    );
    return {
      hierarchical: HierarchicalNode,
    };
  }, [handleDrillDown, handleShowDetail]);

  // 根据视图模式过滤节点
  const filteredNodes = useMemo(() => {
    // 如果没有钻取上下文，显示所有学科（level 0）
    if (!drillDownContext) {
      const level0Nodes = loadedNodes.filter((node) => node.level === 0);
      console.log('Filtered nodes (level 0):', {
        totalNodes: loadedNodes.length,
        level0Nodes: level0Nodes.length,
        nodes: level0Nodes,
      });
      return level0Nodes;
    }

    // 钻取模式：只显示选中节点及其直接子节点（不递归）
    const targetNode = nodeTree.get(drillDownContext.nodeId);
    if (!targetNode) return [];

    const result: HierarchicalKnowledgeNode[] = [targetNode];
    // 只添加直接子节点，不递归
    if (targetNode.children) {
      targetNode.children.forEach((child) => {
        result.push(child);
      });
    }
    return result;
  }, [loadedNodes, drillDownContext, nodeTree]);

  // 根据过滤后的节点过滤边
  const filteredEdges = useMemo(() => {
    const nodeIdSet = new Set(filteredNodes.map((n) => n.id));
    return loadedEdges.filter((edge) => nodeIdSet.has(edge.source) && nodeIdSet.has(edge.target));
  }, [loadedEdges, filteredNodes]);

  // 使用 dagre 计算自动布局
  const getLayoutedElements = useCallback(
    (direction: 'TB' | 'LR' = 'LR') => {
      const dagreGraph = new dagre.graphlib.Graph();
      dagreGraph.setDefaultEdgeLabel(() => ({}));

      // 根据层级调整节点尺寸
      const getNodeSize = (level: NodeLevel) => {
        switch (level) {
          case 0:
            return { width: 320, height: 220 }; // 学科节点较大
          case 1:
            return { width: 280, height: 200 }; // 主题节点中等
          case 2:
            return { width: 260, height: 180 }; // 子分类节点
          case 3:
            return { width: 240, height: 160 }; // 知识点节点较小
          default:
            return { width: 280, height: 180 };
        }
      };

      dagreGraph.setGraph({
        rankdir: direction,
        nodesep: 80,
        ranksep: 150,
        edgesep: 20,
      });

      filteredNodes.forEach((node) => {
        const { width, height } = getNodeSize(node.level);
        dagreGraph.setNode(node.id, { width, height });
      });

      filteredEdges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
      });

      dagre.layout(dagreGraph);

      return filteredNodes.map((node) => {
        const { width, height } = getNodeSize(node.level);
        const nodeWithPosition = dagreGraph.node(node.id);
        return {
          id: node.id,
          type: 'hierarchical' as const,
          position: {
            x: nodeWithPosition.x - width / 2,
            y: nodeWithPosition.y - height / 2,
          },
          data: {
            ...node,
            viewLevel: drillDownContext?.level ?? 0,
          },
        };
      });
    },
    [filteredNodes, filteredEdges, viewMode, drillDownContext],
  );

  // 转换节点数据为 ReactFlow 格式
  const reactFlowNodes: Node[] = useMemo(() => {
    console.log('Converting to ReactFlow nodes:', {
      filteredNodesCount: filteredNodes.length,
      layout,
      filteredNodes: filteredNodes.slice(0, 3),
    });

    if (filteredNodes.length === 0) {
      console.warn('No filtered nodes to render');
      return [];
    }

    if (layout === 'hierarchical') {
      const layouted = getLayoutedElements('LR');
      console.log('Layouted nodes:', layouted.length);
      return layouted;
    }

    const nodes = filteredNodes.map((node, index) => ({
      id: node.id,
      type: 'hierarchical' as const,
      position: {
        x: node.level * 400 + 200,
        y: index * 220 - filteredNodes.length * 110,
      },
      data: {
        ...node,
        viewLevel: drillDownContext?.level ?? 0,
      },
    }));
    console.log('Mapped nodes:', nodes.length);
    return nodes;
  }, [filteredNodes, layout, getLayoutedElements, viewMode, drillDownContext]);

  // 转换边数据为 ReactFlow 格式
  const reactFlowEdges: Edge[] = useMemo(() => {
    if (filteredEdges.length === 0 || filteredNodes.length === 0) {
      return [];
    }

    const nodeIdSet = new Set(filteredNodes.map((n) => n.id));
    const validEdges = filteredEdges.filter(
      (edge) => nodeIdSet.has(edge.source) && nodeIdSet.has(edge.target),
    );

    return validEdges.map((edge) => {
      const edgeColor = edge.type === 'required' ? '#ff6b6b' : '#69b7ff';
      return {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: 'bezier', // 使用贝塞尔曲线，更平滑美观
        animated: edge.type === 'recommended',
        style: {
          stroke: edgeColor,
          strokeWidth: edge.type === 'required' ? 4 : 3,
          strokeOpacity: 0.9,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: edgeColor,
          width: 20,
          height: 20,
        },
        label: edge.label || (edge.type === 'required' ? '必需' : '推荐'),
        labelStyle: {
          fill: '#fff',
          fontWeight: 600,
          fontSize: 11,
          background: 'rgba(15, 12, 41, 0.95)',
          padding: '2px 8px',
          borderRadius: '4px',
        },
        labelBgStyle: {
          fill: 'rgba(15, 12, 41, 0.95)',
          fillOpacity: 0.8,
        },
        data: edge,
      };
    });
  }, [filteredEdges, filteredNodes]);

  const [reactFlowNodesState, setNodes, onNodesChange] = useNodesState(reactFlowNodes);
  const [reactFlowEdgesState, setEdges, onEdgesChange] = useEdgesState(reactFlowEdges);

  useEffect(() => {
    setNodes(reactFlowNodes);
  }, [reactFlowNodes, setNodes]);

  useEffect(() => {
    setEdges(reactFlowEdges);
  }, [reactFlowEdges, setEdges]);

  // 处理 ReactFlow 初始化
  const handleInit = useCallback(
    (instance: ReactFlowInstance) => {
      reactFlowInstanceRef.current = instance;
      if (reactFlowNodes.length > 0 && instance) {
        setTimeout(() => {
          if (instance && typeof instance.fitView === 'function') {
            try {
              instance.fitView({ padding: 0.1, duration: 300 });
            } catch (error) {
              console.warn('Failed to fit view on init:', error);
            }
          }
        }, 300);
      }
    },
    [reactFlowNodes.length],
  );

  // 处理节点点击（点击节点主体区域进入下一层）
  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      // 检查点击的目标是否是按钮
      const target = _event.target as HTMLElement;
      if (target.closest('.node-action-buttons') || target.closest('button')) {
        return; // 如果点击的是按钮，不处理
      }

      // 触发钻取
      const originalNode = loadedNodes.find((n) => n.id === node.id);
      if (originalNode) {
        handleDrillDown(node.id);
      }
    },
    [loadedNodes, handleDrillDown],
  );

  // 处理边点击
  const handleEdgeClick = useCallback(
    (_event: React.MouseEvent, edge: Edge) => {
      if (onEdgeClick && edge.data) {
        onEdgeClick(edge.data as KnowledgeGraphEdge);
      }
    },
    [onEdgeClick],
  );

  // 返回上一层级
  const handleBack = useCallback(() => {
    if (drillDownContext && drillDownContext.path.length > 1) {
      const newPath = drillDownContext.path.slice(0, -1);
      const parent = newPath[newPath.length - 1];
      setDrillDownContext({
        nodeId: parent.id,
        nodeName: parent.name,
        level: parent.level,
        path: newPath,
      });
    } else {
      setDrillDownContext(null);
    }
  }, [drillDownContext]);

  // 返回根视图
  const handleReset = useCallback(() => {
    setDrillDownContext(null);
  }, []);

  // 当节点数据变化时，自动适应视图
  useEffect(() => {
    if (reactFlowNodes.length > 0 && reactFlowInstanceRef.current) {
      const timer = setTimeout(() => {
        if (
          reactFlowInstanceRef.current &&
          typeof reactFlowInstanceRef.current.fitView === 'function'
        ) {
          try {
            reactFlowInstanceRef.current.fitView({ padding: 0.1, duration: 300 });
          } catch (error) {
            console.warn('Failed to fit view:', error);
          }
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [reactFlowNodes.length, viewMode, drillDownContext]);

  return (
    <div
      className="hierarchical-knowledge-graph-container"
      style={{ width: '100%', height: '100%', minHeight: '600px' }}
    >
      {/* 工具栏 */}
      <div className="graph-toolbar">
        <Space>
          {/* 面包屑导航 */}
          {drillDownContext && (
            <Breadcrumb>
              <Breadcrumb.Item>
                <Button type="link" onClick={handleReset} size="small">
                  全部
                </Button>
              </Breadcrumb.Item>
              {drillDownContext.path.map((item, index) => (
                <Breadcrumb.Item key={item.id}>
                  {index === drillDownContext.path.length - 1 ? (
                    <span>{item.name}</span>
                  ) : (
                    <Button
                      type="link"
                      size="small"
                      onClick={() => {
                        const newPath = drillDownContext.path.slice(0, index + 1);
                        const target = newPath[newPath.length - 1];
                        setDrillDownContext({
                          nodeId: target.id,
                          nodeName: target.name,
                          level: target.level,
                          path: newPath,
                        });
                      }}
                    >
                      {item.name}
                    </Button>
                  )}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          )}

          {/* 返回按钮 */}
          {drillDownContext && (
            <Button icon={<ArrowLeftOutlined />} onClick={handleBack} size="small">
              返回
            </Button>
          )}
        </Space>
      </div>

      {/* 图谱区域 */}
      <div className="graph-area" style={{ width: '100%', height: '100%', minHeight: '600px' }}>
        <ReactFlow
          nodes={reactFlowNodesState}
          edges={reactFlowEdgesState}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          onEdgeClick={handleEdgeClick}
          onInit={handleInit}
          nodeTypes={nodeTypes}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          minZoom={0.1}
          maxZoom={2}
          fitView
          fitViewOptions={{ padding: 0.1, maxZoom: 1 }}
          edgesUpdatable={false}
          edgesFocusable={true}
          nodesDraggable={!readonly}
          nodesConnectable={false}
          proOptions={{ hideAttribution: true }}
          defaultEdgeOptions={{
            type: 'bezier',
            animated: false,
            style: { strokeWidth: 3 },
          }}
        >
          {showBackground && <Background color="#667eea" gap={16} size={1} />}
          {showControls && <Controls />}
          {showMiniMap && <MiniMap nodeColor="#667eea" maskColor="rgba(0, 0, 0, 0.3)" />}
        </ReactFlow>
      </div>
    </div>
  );
};

import React, { useCallback, useMemo, useRef, useEffect } from 'react';
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
} from 'reactflow';
// @ts-ignore
import 'reactflow/dist/style.css';
import dagre from 'dagre';
import './KnowledgeGraph.less';

export interface KnowledgeGraphNode {
  id: string;
  name: string;
  code?: string;
  category?: string;
  level?: number;
}

export interface KnowledgeGraphEdge {
  id: string;
  source: string;
  target: string;
  type?: 'required' | 'recommended';
  label?: string;
}

export interface KnowledgeGraphProps {
  nodes: KnowledgeGraphNode[];
  edges: KnowledgeGraphEdge[];
  onNodeClick?: (node: KnowledgeGraphNode) => void;
  onEdgeClick?: (edge: KnowledgeGraphEdge) => void;
  readonly?: boolean;
  showControls?: boolean;
  showMiniMap?: boolean;
  showBackground?: boolean;
  layout?: 'hierarchical' | 'force';
}

/**
 * 自定义节点组件（使用 React.memo 优化性能）
 * 必须包含 Handle 组件来定义连接点
 */
const CustomNode = React.memo(({ data }: { data: KnowledgeGraphNode }) => {
  return (
    <div className="knowledge-graph-node">
      {/* 输入 Handle（左侧，用于接收连接） */}
      <Handle type="target" position={Position.Left} style={{ background: '#555' }} />

      <div className="node-header">{data.code && <div className="node-code">{data.code}</div>}</div>
      <div className="node-name">{data.name}</div>
      {data.category && <div className="node-category">{data.category}</div>}

      {/* 输出 Handle（右侧，用于发起连接） */}
      <Handle type="source" position={Position.Right} style={{ background: '#555' }} />
    </div>
  );
});

CustomNode.displayName = 'CustomNode';

// 节点类型定义（移到组件外部，避免每次渲染都创建新对象）
const nodeTypes = {
  custom: CustomNode,
};

/**
 * 通用知识图谱组件
 * 高性能优化：
 * 1. 使用 React.memo 包装节点组件
 * 2. 使用 useMemo 缓存计算结果
 * 3. 使用 useCallback 缓存回调函数
 * 4. nodeTypes 定义在组件外部
 */
export const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({
  nodes,
  edges,
  onNodeClick,
  onEdgeClick,
  readonly = false,
  showControls = true,
  showMiniMap = true,
  showBackground = true,
  layout = 'hierarchical',
}) => {
  const reactFlowInstanceRef = useRef<{
    fitView?: (options?: { padding?: number; duration?: number }) => void;
  } | null>(null);

  // 使用 dagre 计算自动布局
  const getLayoutedElements = useCallback(
    (direction: 'TB' | 'LR' = 'LR') => {
      const dagreGraph = new dagre.graphlib.Graph();
      dagreGraph.setDefaultEdgeLabel(() => ({}));

      // 节点尺寸（与 CSS 中的节点尺寸一致）
      const nodeWidth = 280;
      const nodeHeight = 180;

      // 设置图的方向和间距
      dagreGraph.setGraph({
        rankdir: direction, // LR = 从左到右，TB = 从上到下
        nodesep: 80, // 同一层级节点之间的间距
        ranksep: 150, // 不同层级之间的间距
        edgesep: 20, // 边之间的最小间距
      });

      // 添加节点到 dagre 图
      nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
      });

      // 添加边到 dagre 图
      edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
      });

      // 执行布局计算
      dagre.layout(dagreGraph);

      // 提取布局后的节点位置
      const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        return {
          id: node.id,
          type: 'custom' as const,
          position: {
            x: nodeWithPosition.x - nodeWidth / 2, // dagre 返回的是中心点，需要减去一半宽度
            y: nodeWithPosition.y - nodeHeight / 2, // dagre 返回的是中心点，需要减去一半高度
          },
          data: {
            ...node,
            level: 0, // dagre 会自动计算层级
          },
        };
      });

      return layoutedNodes;
    },
    [nodes, edges],
  );

  // 转换节点数据为 ReactFlow 格式（使用 useMemo 缓存）
  const reactFlowNodes: Node[] = useMemo(() => {
    if (nodes.length === 0) {
      return [];
    }

    // 使用 dagre 自动布局
    if (layout === 'hierarchical') {
      return getLayoutedElements('LR'); // 从左到右布局
    }

    // 备选：手动布局（如果 dagre 不可用）
    return nodes.map((node) => {
      const level = node.level ?? 0;
      return {
        id: node.id,
        type: 'custom' as const,
        position: {
          x: level * 400 + 200,
          y: Math.random() * 400 - 200, // 临时随机位置
        },
        data: {
          ...node,
          level,
        },
      };
    });
  }, [nodes, layout, getLayoutedElements]);

  // 转换边数据为 ReactFlow 格式（使用 useMemo 缓存）
  const reactFlowEdges: Edge[] = useMemo(() => {
    if (edges.length === 0 || nodes.length === 0) {
      return [];
    }

    const nodeIdSet = new Set(nodes.map((n) => n.id));

    const validEdges = edges.filter((edge) => {
      // 确保 source 和 target 都存在
      if (!edge.source || !edge.target) {
        console.warn('Edge missing source or target:', edge);
        return false;
      }
      const sourceExists = nodeIdSet.has(edge.source);
      const targetExists = nodeIdSet.has(edge.target);
      if (!sourceExists || !targetExists) {
        console.warn('Edge source or target not found:', {
          edge,
          sourceExists,
          targetExists,
          availableNodes: Array.from(nodeIdSet).slice(0, 5),
        });
        return false;
      }
      return true;
    });

    console.log('KnowledgeGraph - Processing edges:', {
      totalEdges: edges.length,
      validEdges: validEdges.length,
      nodeCount: nodes.length,
      nodeIds: Array.from(nodeIdSet),
      sampleEdges: validEdges.slice(0, 3),
      allEdges: validEdges.map((e) => ({ id: e.id, source: e.source, target: e.target })),
    });

    return validEdges.map((edge) => {
      const edgeColor = edge.type === 'required' ? '#ff6b6b' : '#69b7ff';
      // 使用 smoothstep 类型，自动处理曲线，减少交叉
      return {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: 'smoothstep',
        animated: edge.type === 'recommended',
        style: {
          stroke: edgeColor,
          strokeWidth: edge.type === 'required' ? 4 : 3,
          strokeOpacity: 0.9,
        },
        markerEnd: MarkerType.ArrowClosed,
        label: edge.label || (edge.type === 'required' ? '必需' : '推荐'),
        labelStyle: {
          fill: '#fff',
          fontWeight: 600,
          fontSize: 11,
        },
        labelBgStyle: {
          fill: 'rgba(15, 12, 41, 0.95)',
        },
        data: edge,
      };
    });
  }, [edges, nodes]);

  // 使用 ReactFlow 的 hooks 管理节点和边状态
  const [reactFlowNodesState, setNodes, onNodesChange] = useNodesState(reactFlowNodes);
  const [reactFlowEdgesState, setEdges, onEdgesChange] = useEdgesState(reactFlowEdges);

  // 当外部数据变化时，更新内部状态
  useEffect(() => {
    setNodes(reactFlowNodes);
    console.log('KnowledgeGraph - Nodes updated:', reactFlowNodes.length);
  }, [reactFlowNodes, setNodes]);

  useEffect(() => {
    setEdges(reactFlowEdges);
    console.log('KnowledgeGraph - Edges state updated:', {
      count: reactFlowEdges.length,
      edges: reactFlowEdges,
      nodesCount: reactFlowNodes.length,
      nodeIds: reactFlowNodes.map((n) => n.id),
      firstEdge: reactFlowEdges[0],
      reactFlowEdgesState: reactFlowEdgesState.length,
    });
  }, [reactFlowEdges, setEdges, reactFlowNodes.length, reactFlowEdgesState.length]);

  // 调试：输出最终传递给 ReactFlow 的数据
  useEffect(() => {
    console.log('KnowledgeGraph - Final ReactFlow data:', {
      nodesCount: reactFlowNodesState.length,
      edgesCount: reactFlowEdgesState.length,
      nodes: reactFlowNodesState.map((n) => ({ id: n.id, type: n.type, position: n.position })),
      edges: reactFlowEdgesState.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        type: e.type,
        style: e.style,
      })),
    });
  }, [reactFlowNodesState, reactFlowEdgesState]);

  // 处理 ReactFlow 初始化
  const handleInit = useCallback(
    (instance: { fitView?: (options?: { padding?: number; duration?: number }) => void }) => {
      reactFlowInstanceRef.current = instance;
      // 初始化后自动适应视图
      if (reactFlowNodes.length > 0 && instance) {
        setTimeout(() => {
          if (instance && typeof instance.fitView === 'function') {
            try {
              instance.fitView({ padding: 0.2, duration: 300 });
            } catch (error) {
              console.warn('Failed to fit view on init:', error);
            }
          }
        }, 300);
      }
    },
    [reactFlowNodes.length],
  );

  // 处理节点点击（使用 useCallback 缓存）
  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      if (onNodeClick) {
        const originalNode = nodes.find((n) => n.id === node.id);
        if (originalNode) {
          onNodeClick(originalNode);
        }
      }
    },
    [nodes, onNodeClick],
  );

  // 处理边点击（使用 useCallback 缓存）
  const handleEdgeClick = useCallback(
    (_event: React.MouseEvent, edge: Edge) => {
      if (onEdgeClick && edge.data) {
        onEdgeClick(edge.data as KnowledgeGraphEdge);
      }
    },
    [onEdgeClick],
  );

  // 当节点数据变化时，自动适应视图
  useEffect(() => {
    if (reactFlowNodes.length > 0 && reactFlowInstanceRef.current) {
      const timer = setTimeout(() => {
        if (
          reactFlowInstanceRef.current &&
          typeof reactFlowInstanceRef.current.fitView === 'function'
        ) {
          try {
            reactFlowInstanceRef.current.fitView({ padding: 0.2, duration: 300 });
          } catch (error) {
            console.warn('Failed to fit view:', error);
          }
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [reactFlowNodes.length]);

  return (
    <div className="knowledge-graph-container">
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
          type: 'smoothstep',
          animated: false,
          style: { strokeWidth: 4 },
        }}
      >
        {showBackground && <Background color="#667eea" gap={16} size={1} />}
        {showControls && <Controls />}
        {showMiniMap && <MiniMap nodeColor="#667eea" maskColor="rgba(0, 0, 0, 0.3)" />}
      </ReactFlow>
    </div>
  );
};

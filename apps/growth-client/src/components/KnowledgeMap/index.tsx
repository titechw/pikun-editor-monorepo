import React, { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
// @ts-ignore - reactflow 类型定义（等包安装后移除此注释）
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from 'reactflow';
// @ts-ignore
import 'reactflow/dist/style.css';
import type { KnowledgeMapNode, KnowledgeMapEdge } from '@/api/subject.api';
import './KnowledgeMap.less';

// ReactFlow类型定义（临时方案，等reactflow安装后可以删除）
interface Node<T = any> {
  id: string;
  type?: string;
  position: { x: number; y: number };
  data: T;
  style?: React.CSSProperties;
  className?: string;
  hidden?: boolean;
  selected?: boolean;
  dragging?: boolean;
}

interface Edge<T = any> {
  id: string;
  source: string;
  target: string;
  type?: string;
  animated?: boolean;
  style?: React.CSSProperties;
  label?: string;
  labelStyle?: React.CSSProperties;
  markerEnd?: MarkerType | { type: MarkerType; color?: string };
  data?: T;
  hidden?: boolean;
  selected?: boolean;
}

type NodeTypes = Record<string, React.ComponentType<any>>;

interface Connection {
  source: string | null;
  target: string | null;
  sourceHandle?: string | null;
  targetHandle?: string | null;
}

/**
 * 自定义节点组件
 */
const CustomNode = React.memo(({ data }: { data: KnowledgeMapNode & { label?: string } }): React.JSX.Element => {
  return (
    <div className="knowledge-map-node">
      <div className="node-header">
        <div className="node-code">{data.code}</div>
        {data.dependency_type && (
          <span className={`dependency-badge ${data.dependency_type}`}>
            {data.dependency_type === 'required' ? '必需' : '推荐'}
          </span>
        )}
      </div>
      <div className="node-name">{data.name || data.label}</div>
      {data.category_name && <div className="node-category">{data.category_name}</div>}
    </div>
  );
});

CustomNode.displayName = 'CustomNode';

// 将 nodeTypes 移到组件外部，避免每次渲染都创建新对象
const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

/**
 * 知识地图可视化组件
 */
interface KnowledgeMapProps {
  nodes: KnowledgeMapNode[];
  edges: KnowledgeMapEdge[];
  onNodeClick?: (node: KnowledgeMapNode) => void;
  onEdgeClick?: (edge: KnowledgeMapEdge) => void;
  onConnect?: (connection: Connection) => void;
  readonly?: boolean;
}

export const KnowledgeMap = observer(
  ({ nodes, edges, onNodeClick, onEdgeClick, onConnect, readonly = false }: KnowledgeMapProps): React.JSX.Element => {
    const reactFlowInstanceRef = React.useRef<any>(null);
    // 计算节点的层级（基于依赖关系）
    const calculateLevels = useCallback(() => {
      const nodeMap = new Map<string, KnowledgeMapNode>();
      const levelMap = new Map<string, number>();

      // 初始化节点映射
      nodes.forEach((node) => {
        nodeMap.set(node.subject_id, node);
        levelMap.set(node.subject_id, 0);
      });

      // 计算每个节点的层级（基于依赖关系）
      const calculateNodeLevel = (subjectId: string, visited: Set<string> = new Set()): number => {
        if (visited.has(subjectId)) {
          return levelMap.get(subjectId) || 0; // 避免循环依赖
        }
        visited.add(subjectId);

        // 找到所有指向当前节点的边（前置依赖）
        const prerequisites = edges.filter((edge) => edge.target === subjectId);
        if (prerequisites.length === 0) {
          levelMap.set(subjectId, 0);
          return 0;
        }

        // 当前节点的层级 = 所有前置依赖的最大层级 + 1
        const maxPrerequisiteLevel = Math.max(
          ...prerequisites.map((edge) => {
            const prereqLevel = calculateNodeLevel(edge.source, new Set(visited));
            return prereqLevel;
          })
        );
        const currentLevel = maxPrerequisiteLevel + 1;
        levelMap.set(subjectId, currentLevel);
        return currentLevel;
      };

      // 为所有节点计算层级
      nodes.forEach((node) => {
        calculateNodeLevel(node.subject_id);
      });

      return levelMap;
    }, [nodes, edges]);

    // 转换节点数据为ReactFlow格式
    // 使用 subject_id 作为节点 ID，确保与边的 source/target 匹配
    const reactFlowNodes: Node[] = useMemo(() => {
      if (nodes.length === 0) {
        return [];
      }

      const levelMap = calculateLevels();
      const levelGroups = new Map<number, KnowledgeMapNode[]>();

      // 按层级分组
      nodes.forEach((node) => {
        const level = levelMap.get(node.subject_id) || node.level || 0;
        if (!levelGroups.has(level)) {
          levelGroups.set(level, []);
        }
        levelGroups.get(level)!.push(node);
      });

      // 计算每个节点的位置
      return nodes.map((node) => {
        // 使用 subject_id 作为节点 ID，确保与边的 source/target 匹配
        const nodeId = node.subject_id;
        if (!nodeId) {
          console.warn('Node missing subject_id:', node);
          return null;
        }

        let x = node.x;
        let y = node.y;

        if (x === undefined || y === undefined) {
          // 使用层级布局算法
          const level = levelMap.get(node.subject_id) || node.level || 0;
          const nodesInLevel = levelGroups.get(level) || [];
          const indexInLevel = nodesInLevel.findIndex((n) => n.subject_id === node.subject_id);

          // 水平间距：层级 * 400px
          // 垂直间距：每个节点 200px，居中显示
          const levelWidth = 400;
          const nodeHeight = 200;
          const totalHeight = nodesInLevel.length * nodeHeight;
          const startY = -totalHeight / 2 + nodeHeight / 2;

          x = level * levelWidth + 200;
          y = startY + indexInLevel * nodeHeight;
        }

        return {
          id: nodeId,
          type: 'custom',
          position: { x, y },
          data: {
            ...node,
            label: node.name,
            level: levelMap.get(node.subject_id) || node.level || 0,
          },
        };
      }).filter((node): node is Node => node !== null);
    }, [nodes, calculateLevels]);

    // 转换边数据为ReactFlow格式
    // 服务器返回的节点 id 就是 subject_id，边的 source/target 也是 subject_id，直接匹配
    const reactFlowEdges: Edge[] = useMemo(() => {
      if (nodes.length === 0 || reactFlowNodes.length === 0 || edges.length === 0) {
        return [];
      }

      // 创建节点ID集合（节点 ID 就是 subject_id）
      const nodeIdSet = new Set(reactFlowNodes.map((n) => n.id));

      // 过滤并转换边，确保 source 和 target 都存在
      const validEdges = edges.filter((edge) => {
        // 确保 source 和 target 都存在且不为空
        if (!edge.source || !edge.target) {
          return false;
        }
        // 直接检查 source 和 target 是否在节点列表中（因为节点 ID 就是 subject_id）
        return nodeIdSet.has(edge.source) && nodeIdSet.has(edge.target);
      });

      // 转换边格式
      return validEdges.map((edge) => {
        const edgeColor = edge.dependency_type === 'required' ? '#ff4d4f' : '#1890ff';
        return {
          id: edge.id,
          source: edge.source, // 直接使用，因为节点 ID 就是 subject_id
          target: edge.target, // 直接使用，因为节点 ID 就是 subject_id
          type: 'smoothstep',
          animated: edge.dependency_type === 'recommended',
          style: {
            stroke: edgeColor,
            strokeWidth: edge.dependency_type === 'required' ? 4 : 3,
            opacity: 1,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: edgeColor,
            width: 30,
            height: 30,
          },
          label: edge.dependency_type === 'required' ? '必需' : '推荐',
          labelStyle: {
            fill: edgeColor,
            fontWeight: 600,
            fontSize: 12,
            background: '#fff',
            padding: '2px 6px',
            borderRadius: '4px',
          },
          labelBgStyle: {
            fill: '#fff',
            fillOpacity: 0.8,
          },
          data: edge,
        };
      });
    }, [edges, reactFlowNodes]);

    const [reactFlowNodesState, setNodes, onNodesChange] = useNodesState(reactFlowNodes);
    const [reactFlowEdgesState, setEdges, onEdgesChange] = useEdgesState(reactFlowEdges);

    // 当外部数据变化时，更新内部状态
    // 使用深度比较，避免不必要的更新
    React.useEffect(() => {
      if (reactFlowNodes.length > 0) {
        setNodes(reactFlowNodes);
      } else {
        setNodes([]);
      }
    }, [reactFlowNodes, setNodes]);

    React.useEffect(() => {
      setEdges(reactFlowEdges);
      // 调试：输出边的信息
      console.log('KnowledgeMap - Edges data:', {
        totalEdges: reactFlowEdges.length,
        sampleEdges: reactFlowEdges.slice(0, 3),
        totalNodes: reactFlowNodes.length,
        sampleNodeIds: reactFlowNodes.slice(0, 5).map(n => n.id),
      });
    }, [reactFlowEdges, setEdges, reactFlowNodes]);

    // 当节点数据变化时，自动适应视图
    React.useEffect(() => {
      if (reactFlowNodes.length > 0 && reactFlowInstanceRef.current) {
        // 延迟执行，确保节点已经渲染
        const timer = setTimeout(() => {
          if (reactFlowInstanceRef.current && typeof reactFlowInstanceRef.current.fitView === 'function') {
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

    // 处理节点点击
    const handleNodeClick = useCallback(
      (_event: React.MouseEvent, node: Node) => {
        if (onNodeClick) {
          const originalNode = nodes.find((n) => (n.id || n.subject_id) === node.id);
          if (originalNode) {
            onNodeClick(originalNode);
          }
        }
      },
      [nodes, onNodeClick]
    );

    // 处理边点击
    const handleEdgeClick = useCallback(
      (_event: React.MouseEvent, edge: Edge) => {
        if (onEdgeClick && edge.data) {
          onEdgeClick(edge.data as KnowledgeMapEdge);
        }
      },
      [onEdgeClick]
    );

    // 处理连接（创建新的依赖关系）
    const handleConnect = useCallback(
      (connection: Connection) => {
        if (onConnect) {
          onConnect(connection);
        } else if (!readonly) {
          // 如果没有提供onConnect回调，默认添加边
          setEdges((eds) => addEdge(connection, eds));
        }
      },
      [onConnect, readonly, setEdges]
    );

    // 处理 ReactFlow 初始化
    const handleInit = useCallback((instance: any) => {
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
    }, [reactFlowNodes.length]);

    return (
      <div className="knowledge-map-container">
        <ReactFlow
          nodes={reactFlowNodesState}
          edges={reactFlowEdgesState}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={readonly ? undefined : handleConnect}
          onNodeClick={handleNodeClick}
          onEdgeClick={handleEdgeClick}
          onInit={handleInit}
          nodeTypes={nodeTypes}
          connectionLineStyle={{ stroke: '#1890ff', strokeWidth: 2 }}
          connectionLineType="smoothstep"
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          edgesUpdatable={false}
          edgesFocusable={true}
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    );
  }
);


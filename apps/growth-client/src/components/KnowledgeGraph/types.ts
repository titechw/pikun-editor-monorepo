/**
 * 知识图谱多层级类型定义
 */

/**
 * 节点层级类型
 * 0: 学科（Subject）
 * 1: 主题/分类（Topic/Category）
 * 2: 子分类（Subcategory）
 * 3: 知识点（Knowledge Point）
 */
export type NodeLevel = 0 | 1 | 2 | 3;

/**
 * 学习状态
 */
export type LearningStatus = 'not_started' | 'in_progress' | 'completed' | 'locked';

/**
 * 多层级知识图谱节点
 */
export interface HierarchicalKnowledgeNode {
  id: string;
  name: string;
  code?: string;
  category?: string;
  level: NodeLevel; // 节点层级：0=学科, 1=主题, 2=知识点
  parentId?: string; // 父节点ID，用于构建层级关系
  children?: HierarchicalKnowledgeNode[]; // 子节点列表（可选，用于钻取）
  
  // 学习状态相关
  learningStatus?: LearningStatus;
  progress?: number; // 学习进度百分比 0-100
  masteryLevel?: number; // 掌握程度 0-100
  
  // 元数据
  description?: string;
  estimatedTime?: number; // 预计学习时间（分钟）
  difficulty?: 'easy' | 'medium' | 'hard';
  
  // 扩展数据
  metadata?: Record<string, unknown>;
}

/**
 * 知识图谱边
 */
export interface KnowledgeGraphEdge {
  id: string;
  source: string;
  target: string;
  type?: 'required' | 'recommended';
  label?: string;
}

/**
 * 知识图谱数据
 */
export interface HierarchicalKnowledgeGraphData {
  nodes: HierarchicalKnowledgeNode[];
  edges: KnowledgeGraphEdge[];
}

/**
 * 视图模式
 */
export type ViewMode = 'all' | 'level0' | 'level1' | 'level2' | 'drill-down';

/**
 * 钻取上下文（用于面包屑导航）
 */
export interface DrillDownContext {
  nodeId: string;
  nodeName: string;
  level: NodeLevel;
  path: Array<{ id: string; name: string; level: NodeLevel }>; // 从根到当前的路径
}


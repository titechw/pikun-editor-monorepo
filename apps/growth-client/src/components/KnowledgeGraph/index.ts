export { KnowledgeGraph } from './KnowledgeGraph';
export type {
  KnowledgeGraphNode,
  KnowledgeGraphEdge,
  KnowledgeGraphProps,
} from './KnowledgeGraph';
export {
  mockKnowledgeGraphData,
  generateKnowledgeGraphData,
  generateSimpleTestData,
} from './mockData';
export type { KnowledgeNode, KnowledgeEdge, KnowledgeGraphData } from './mockData';

// 多层级知识图谱
export { HierarchicalKnowledgeGraph } from './HierarchicalKnowledgeGraph';
export type {
  HierarchicalKnowledgeNode,
  KnowledgeGraphEdge as HierarchicalKnowledgeGraphEdge,
  HierarchicalKnowledgeGraphData,
  ViewMode,
  DrillDownContext,
  NodeLevel,
  LearningStatus,
} from './types';
export {
  mockHierarchicalData,
  generateHierarchicalMathData,
  generateHierarchicalPhysicsData,
} from './hierarchicalMockData';


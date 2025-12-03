/**
 * 知识图谱 Mock 数据
 * 用于测试和演示
 */

export interface KnowledgeNode {
  id: string;
  name: string;
  code?: string;
  category?: string;
  level?: number;
}

export interface KnowledgeEdge {
  id: string;
  source: string;
  target: string;
  type?: 'required' | 'recommended';
  label?: string;
}

export interface KnowledgeGraphData {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
}

/**
 * 生成最简单的测试数据：两个节点，一条边
 */
export const generateSimpleTestData = (): KnowledgeGraphData => {
  const nodes: KnowledgeNode[] = [
    {
      id: 'node1',
      name: '节点1',
      code: 'NODE1',
      category: '测试',
      level: 0,
    },
    {
      id: 'node2',
      name: '节点2',
      code: 'NODE2',
      category: '测试',
      level: 1,
    },
  ];

  const edges: KnowledgeEdge[] = [
    {
      id: 'edge1',
      source: 'node1',
      target: 'node2',
      type: 'required',
      label: '必需',
    },
  ];

  return { nodes, edges };
};

/**
 * 生成分叉知识图谱数据
 * 结构：根节点 -> 多个分支 -> 每个分支有多个子节点
 */
export const generateKnowledgeGraphData = (): KnowledgeGraphData => {
  const nodes: KnowledgeNode[] = [];
  const edges: KnowledgeEdge[] = [];

  // 根节点
  const rootNode: KnowledgeNode = {
    id: 'root',
    name: '数学基础',
    code: 'MATH_BASE',
    category: '数学',
    level: 0,
  };
  nodes.push(rootNode);

  // 第一层：3个主要分支
  const branch1: KnowledgeNode = {
    id: 'branch_1',
    name: '代数',
    code: 'ALGEBRA',
    category: '数学',
    level: 1,
  };
  const branch2: KnowledgeNode = {
    id: 'branch_2',
    name: '几何',
    code: 'GEOMETRY',
    category: '数学',
    level: 1,
  };
  const branch3: KnowledgeNode = {
    id: 'branch_3',
    name: '分析',
    code: 'ANALYSIS',
    category: '数学',
    level: 1,
  };
  nodes.push(branch1, branch2, branch3);

  // 根节点到分支的边
  edges.push(
    { id: 'e_root_1', source: 'root', target: 'branch_1', type: 'required', label: '必需' },
    { id: 'e_root_2', source: 'root', target: 'branch_2', type: 'required', label: '必需' },
    { id: 'e_root_3', source: 'root', target: 'branch_3', type: 'required', label: '必需' },
  );

  // 第二层：每个分支有多个子节点
  const branch1Children = [
    { id: 'b1_c1', name: '线性代数', code: 'LINEAR_ALGEBRA', level: 2 },
    { id: 'b1_c2', name: '抽象代数', code: 'ABSTRACT_ALGEBRA', level: 2 },
    { id: 'b1_c3', name: '群论', code: 'GROUP_THEORY', level: 2 },
  ];

  const branch2Children = [
    { id: 'b2_c1', name: '欧氏几何', code: 'EUCLIDEAN_GEOMETRY', level: 2 },
    { id: 'b2_c2', name: '解析几何', code: 'ANALYTIC_GEOMETRY', level: 2 },
    { id: 'b2_c3', name: '微分几何', code: 'DIFFERENTIAL_GEOMETRY', level: 2 },
    { id: 'b2_c4', name: '拓扑学', code: 'TOPOLOGY', level: 2 },
  ];

  const branch3Children = [
    { id: 'b3_c1', name: '微积分', code: 'CALCULUS', level: 2 },
    { id: 'b3_c2', name: '实分析', code: 'REAL_ANALYSIS', level: 2 },
    { id: 'b3_c3', name: '复分析', code: 'COMPLEX_ANALYSIS', level: 2 },
  ];

  // 添加子节点
  [...branch1Children, ...branch2Children, ...branch3Children].forEach((child) => {
    nodes.push({
      ...child,
      category: '数学',
    });
  });

  // 添加分支到子节点的边
  branch1Children.forEach((child) => {
    edges.push({
      id: `e_b1_${child.id}`,
      source: 'branch_1',
      target: child.id,
      type: 'required',
      label: '必需',
    });
  });

  branch2Children.forEach((child) => {
    edges.push({
      id: `e_b2_${child.id}`,
      source: 'branch_2',
      target: child.id,
      type: 'required',
      label: '必需',
    });
  });

  branch3Children.forEach((child) => {
    edges.push({
      id: `e_b3_${child.id}`,
      source: 'branch_3',
      target: child.id,
      type: 'required',
      label: '必需',
    });
  });

  // 第三层：一些子节点还有更深层的依赖
  const deepNodes = [
    { id: 'deep_1', name: '矩阵理论', code: 'MATRIX_THEORY', level: 3, parent: 'b1_c1' },
    { id: 'deep_2', name: '向量空间', code: 'VECTOR_SPACE', level: 3, parent: 'b1_c1' },
    { id: 'deep_3', name: '环论', code: 'RING_THEORY', level: 3, parent: 'b1_c2' },
    { id: 'deep_4', name: '流形', code: 'MANIFOLD', level: 3, parent: 'b2_c3' },
    { id: 'deep_5', name: '微分形式', code: 'DIFFERENTIAL_FORM', level: 3, parent: 'b2_c3' },
    { id: 'deep_6', name: '极限理论', code: 'LIMIT_THEORY', level: 3, parent: 'b3_c1' },
    { id: 'deep_7', name: '级数', code: 'SERIES', level: 3, parent: 'b3_c1' },
  ];

  deepNodes.forEach((node) => {
    nodes.push({
      id: node.id,
      name: node.name,
      code: node.code,
      category: '数学',
      level: node.level,
    });
    edges.push({
      id: `e_${node.parent}_${node.id}`,
      source: node.parent,
      target: node.id,
      type: 'required',
      label: '必需',
    });
  });

  // 添加一些跨分支的推荐依赖关系
  edges.push(
    {
      id: 'e_cross_1',
      source: 'b1_c1',
      target: 'b2_c2',
      type: 'recommended',
      label: '推荐',
    },
    {
      id: 'e_cross_2',
      source: 'b3_c1',
      target: 'b2_c3',
      type: 'recommended',
      label: '推荐',
    },
    {
      id: 'e_cross_3',
      source: 'b1_c2',
      target: 'deep_3',
      type: 'required',
      label: '必需',
    },
  );

  return { nodes, edges };
};

// 导出默认数据（使用完整的数学知识图谱数据）
export const mockKnowledgeGraphData = generateKnowledgeGraphData();

// 导出简单测试数据生成函数（用于调试）
export const generateSimpleTestDataForDebug = generateSimpleTestData;

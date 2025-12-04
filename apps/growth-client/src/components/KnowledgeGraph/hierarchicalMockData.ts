/**
 * 多层级知识图谱 Mock 数据
 * 按照学科标准划分，支持多层级细分到知识点
 * Level 0: 学科
 * Level 1: 主题/分类
 * Level 2: 子分类
 * Level 3: 知识点
 */

import type {
  HierarchicalKnowledgeNode,
  KnowledgeGraphEdge,
  HierarchicalKnowledgeGraphData,
} from './types';

/**
 * 生成完整的多层级数学知识图谱数据
 * 按照学科标准划分：数学 -> 代数/几何/分析 -> 子分类 -> 具体知识点
 */
export const generateHierarchicalMathData = (): HierarchicalKnowledgeGraphData => {
  const nodes: HierarchicalKnowledgeNode[] = [];
  const edges: KnowledgeGraphEdge[] = [];

  // ========== Level 0: 学科 ==========
  const subjectMath: HierarchicalKnowledgeNode = {
    id: 'subject_math',
    name: '数学',
    code: 'MATH',
    category: '学科',
    level: 0,
    learningStatus: 'in_progress',
    progress: 58,
    description: '数学学科整体学习路径',
  };
  nodes.push(subjectMath);

  // ========== Level 1: 主题/分类 ==========
  const topics: HierarchicalKnowledgeNode[] = [
    {
      id: 'topic_algebra',
      name: '代数',
      code: 'ALGEBRA',
      category: '数学',
      level: 1,
      parentId: 'subject_math',
      learningStatus: 'in_progress',
      progress: 65,
      difficulty: 'medium',
      description: '代数相关知识点',
    },
    {
      id: 'topic_geometry',
      name: '几何',
      code: 'GEOMETRY',
      category: '数学',
      level: 1,
      parentId: 'subject_math',
      learningStatus: 'in_progress',
      progress: 50,
      difficulty: 'medium',
      description: '几何相关知识点',
    },
    {
      id: 'topic_analysis',
      name: '分析',
      code: 'ANALYSIS',
      category: '数学',
      level: 1,
      parentId: 'subject_math',
      learningStatus: 'completed',
      progress: 100,
      masteryLevel: 85,
      difficulty: 'hard',
      description: '数学分析相关知识点',
    },
    {
      id: 'topic_arithmetic',
      name: '算术',
      code: 'ARITHMETIC',
      category: '数学',
      level: 1,
      parentId: 'subject_math',
      learningStatus: 'completed',
      progress: 100,
      masteryLevel: 95,
      difficulty: 'easy',
      description: '基础算术运算',
    },
  ];
  nodes.push(...topics);

  // 学科到主题的边
  topics.forEach((topic) => {
    edges.push({
      id: `e_${subjectMath.id}_${topic.id}`,
      source: subjectMath.id,
      target: topic.id,
      type: 'required',
      label: '必需',
    });
  });

  // ========== Level 2: 子分类 ==========

  // 代数的子分类
  const algebraSubcategories: HierarchicalKnowledgeNode[] = [
    {
      id: 'subcat_linear_algebra',
      name: '线性代数',
      code: 'LINEAR_ALGEBRA',
      category: '代数',
      level: 2,
      parentId: 'topic_algebra',
      learningStatus: 'completed',
      progress: 100,
      masteryLevel: 90,
      difficulty: 'medium',
    },
    {
      id: 'subcat_polynomial',
      name: '多项式',
      code: 'POLYNOMIAL',
      category: '代数',
      level: 2,
      parentId: 'topic_algebra',
      learningStatus: 'in_progress',
      progress: 60,
      difficulty: 'medium',
    },
    {
      id: 'subcat_abstract_algebra',
      name: '抽象代数',
      code: 'ABSTRACT_ALGEBRA',
      category: '代数',
      level: 2,
      parentId: 'topic_algebra',
      learningStatus: 'not_started',
      progress: 0,
      difficulty: 'hard',
    },
  ];
  nodes.push(...algebraSubcategories);

  // 几何的子分类
  const geometrySubcategories: HierarchicalKnowledgeNode[] = [
    {
      id: 'subcat_euclidean',
      name: '欧氏几何',
      code: 'EUCLIDEAN',
      category: '几何',
      level: 2,
      parentId: 'topic_geometry',
      learningStatus: 'completed',
      progress: 100,
      masteryLevel: 88,
      difficulty: 'medium',
    },
    {
      id: 'subcat_analytic',
      name: '解析几何',
      code: 'ANALYTIC',
      category: '几何',
      level: 2,
      parentId: 'topic_geometry',
      learningStatus: 'in_progress',
      progress: 45,
      difficulty: 'hard',
    },
    {
      id: 'subcat_differential_geometry',
      name: '微分几何',
      code: 'DIFF_GEOMETRY',
      category: '几何',
      level: 2,
      parentId: 'topic_geometry',
      learningStatus: 'locked',
      progress: 0,
      difficulty: 'hard',
    },
  ];
  nodes.push(...geometrySubcategories);

  // 分析的子分类
  const analysisSubcategories: HierarchicalKnowledgeNode[] = [
    {
      id: 'subcat_calculus',
      name: '微积分',
      code: 'CALCULUS',
      category: '分析',
      level: 2,
      parentId: 'topic_analysis',
      learningStatus: 'completed',
      progress: 100,
      masteryLevel: 92,
      difficulty: 'medium',
    },
    {
      id: 'subcat_real_analysis',
      name: '实分析',
      code: 'REAL_ANALYSIS',
      category: '分析',
      level: 2,
      parentId: 'topic_analysis',
      learningStatus: 'completed',
      progress: 100,
      masteryLevel: 80,
      difficulty: 'hard',
    },
    {
      id: 'subcat_complex_analysis',
      name: '复分析',
      code: 'COMPLEX_ANALYSIS',
      category: '分析',
      level: 2,
      parentId: 'topic_analysis',
      learningStatus: 'completed',
      progress: 100,
      masteryLevel: 75,
      difficulty: 'hard',
    },
  ];
  nodes.push(...analysisSubcategories);

  // 算术的子分类
  const arithmeticSubcategories: HierarchicalKnowledgeNode[] = [
    {
      id: 'subcat_basic_operations',
      name: '基本运算',
      code: 'BASIC_OPS',
      category: '算术',
      level: 2,
      parentId: 'topic_arithmetic',
      learningStatus: 'completed',
      progress: 100,
      masteryLevel: 98,
      difficulty: 'easy',
    },
    {
      id: 'subcat_fractions_decimals',
      name: '分数与小数',
      code: 'FRACTIONS_DECIMALS',
      category: '算术',
      level: 2,
      parentId: 'topic_arithmetic',
      learningStatus: 'completed',
      progress: 100,
      masteryLevel: 95,
      difficulty: 'easy',
    },
  ];
  nodes.push(...arithmeticSubcategories);

  // 主题到子分类的边
  [
    ...algebraSubcategories,
    ...geometrySubcategories,
    ...analysisSubcategories,
    ...arithmeticSubcategories,
  ].forEach((subcat) => {
    edges.push({
      id: `e_${subcat.parentId}_${subcat.id}`,
      source: subcat.parentId!,
      target: subcat.id,
      type: 'required',
      label: '必需',
    });
  });

  // ========== Level 3: 知识点 ==========

  // 基本运算的知识点
  const basicOpsPoints: HierarchicalKnowledgeNode[] = [
    {
      id: 'point_addition',
      name: '加法',
      code: 'ADDITION',
      category: '算术',
      level: 3,
      parentId: 'subcat_basic_operations',
      learningStatus: 'completed',
      progress: 100,
      masteryLevel: 100,
      difficulty: 'easy',
      estimatedTime: 30,
    },
    {
      id: 'point_subtraction',
      name: '减法',
      code: 'SUBTRACTION',
      category: '算术',
      level: 3,
      parentId: 'subcat_basic_operations',
      learningStatus: 'completed',
      progress: 100,
      masteryLevel: 100,
      difficulty: 'easy',
      estimatedTime: 30,
    },
    {
      id: 'point_multiplication',
      name: '乘法',
      code: 'MULTIPLICATION',
      category: '算术',
      level: 3,
      parentId: 'subcat_basic_operations',
      learningStatus: 'completed',
      progress: 100,
      masteryLevel: 98,
      difficulty: 'easy',
      estimatedTime: 45,
    },
    {
      id: 'point_division',
      name: '除法',
      code: 'DIVISION',
      category: '算术',
      level: 3,
      parentId: 'subcat_basic_operations',
      learningStatus: 'completed',
      progress: 100,
      masteryLevel: 95,
      difficulty: 'easy',
      estimatedTime: 45,
    },
  ];
  nodes.push(...basicOpsPoints);

  // 分数与小数的知识点
  const fractionsDecimalsPoints: HierarchicalKnowledgeNode[] = [
    {
      id: 'point_fractions',
      name: '分数',
      code: 'FRACTIONS',
      category: '算术',
      level: 3,
      parentId: 'subcat_fractions_decimals',
      learningStatus: 'completed',
      progress: 100,
      masteryLevel: 92,
      difficulty: 'medium',
      estimatedTime: 120,
    },
    {
      id: 'point_decimals',
      name: '小数',
      code: 'DECIMALS',
      category: '算术',
      level: 3,
      parentId: 'subcat_fractions_decimals',
      learningStatus: 'completed',
      progress: 100,
      masteryLevel: 93,
      difficulty: 'easy',
      estimatedTime: 80,
    },
  ];
  nodes.push(...fractionsDecimalsPoints);

  // 线性代数的知识点
  const linearAlgebraPoints: HierarchicalKnowledgeNode[] = [
    {
      id: 'point_matrix',
      name: '矩阵',
      code: 'MATRIX',
      category: '代数',
      level: 3,
      parentId: 'subcat_linear_algebra',
      learningStatus: 'completed',
      progress: 100,
      masteryLevel: 88,
      difficulty: 'medium',
      estimatedTime: 150,
    },
    {
      id: 'point_vector_space',
      name: '向量空间',
      code: 'VECTOR_SPACE',
      category: '代数',
      level: 3,
      parentId: 'subcat_linear_algebra',
      learningStatus: 'completed',
      progress: 100,
      masteryLevel: 85,
      difficulty: 'hard',
      estimatedTime: 180,
    },
    {
      id: 'point_determinant',
      name: '行列式',
      code: 'DETERMINANT',
      category: '代数',
      level: 3,
      parentId: 'subcat_linear_algebra',
      learningStatus: 'in_progress',
      progress: 50,
      difficulty: 'hard',
      estimatedTime: 120,
    },
  ];
  nodes.push(...linearAlgebraPoints);

  // 多项式的知识点
  const polynomialPoints: HierarchicalKnowledgeNode[] = [
    {
      id: 'point_polynomial_basic',
      name: '多项式基础',
      code: 'POLY_BASIC',
      category: '代数',
      level: 3,
      parentId: 'subcat_polynomial',
      learningStatus: 'completed',
      progress: 100,
      masteryLevel: 90,
      difficulty: 'medium',
      estimatedTime: 100,
    },
    {
      id: 'point_polynomial_division',
      name: '多项式除法',
      code: 'POLY_DIV',
      category: '代数',
      level: 3,
      parentId: 'subcat_polynomial',
      learningStatus: 'in_progress',
      progress: 40,
      difficulty: 'hard',
      estimatedTime: 120,
    },
  ];
  nodes.push(...polynomialPoints);

  // 欧氏几何的知识点
  const euclideanPoints: HierarchicalKnowledgeNode[] = [
    {
      id: 'point_triangle',
      name: '三角形',
      code: 'TRIANGLE',
      category: '几何',
      level: 3,
      parentId: 'subcat_euclidean',
      learningStatus: 'completed',
      progress: 100,
      masteryLevel: 87,
      difficulty: 'medium',
      estimatedTime: 140,
    },
    {
      id: 'point_circle',
      name: '圆',
      code: 'CIRCLE',
      category: '几何',
      level: 3,
      parentId: 'subcat_euclidean',
      learningStatus: 'completed',
      progress: 100,
      masteryLevel: 85,
      difficulty: 'medium',
      estimatedTime: 120,
    },
    {
      id: 'point_similarity',
      name: '相似',
      code: 'SIMILARITY',
      category: '几何',
      level: 3,
      parentId: 'subcat_euclidean',
      learningStatus: 'in_progress',
      progress: 60,
      difficulty: 'hard',
      estimatedTime: 160,
    },
  ];
  nodes.push(...euclideanPoints);

  // 解析几何的知识点
  const analyticPoints: HierarchicalKnowledgeNode[] = [
    {
      id: 'point_conic_sections',
      name: '圆锥曲线',
      code: 'CONIC_SECTIONS',
      category: '几何',
      level: 3,
      parentId: 'subcat_analytic',
      learningStatus: 'not_started',
      progress: 0,
      difficulty: 'hard',
      estimatedTime: 220,
    },
    {
      id: 'point_coordinate',
      name: '坐标系',
      code: 'COORDINATE',
      category: '几何',
      level: 3,
      parentId: 'subcat_analytic',
      learningStatus: 'in_progress',
      progress: 70,
      difficulty: 'medium',
      estimatedTime: 100,
    },
  ];
  nodes.push(...analyticPoints);

  // 微积分的知识点
  const calculusPoints: HierarchicalKnowledgeNode[] = [
    {
      id: 'point_derivative',
      name: '导数',
      code: 'DERIVATIVE',
      category: '分析',
      level: 3,
      parentId: 'subcat_calculus',
      learningStatus: 'completed',
      progress: 100,
      masteryLevel: 90,
      difficulty: 'hard',
      estimatedTime: 180,
    },
    {
      id: 'point_integral',
      name: '积分',
      code: 'INTEGRAL',
      category: '分析',
      level: 3,
      parentId: 'subcat_calculus',
      learningStatus: 'completed',
      progress: 100,
      masteryLevel: 88,
      difficulty: 'hard',
      estimatedTime: 200,
    },
    {
      id: 'point_limit',
      name: '极限',
      code: 'LIMIT',
      category: '分析',
      level: 3,
      parentId: 'subcat_calculus',
      learningStatus: 'completed',
      progress: 100,
      masteryLevel: 95,
      difficulty: 'medium',
      estimatedTime: 150,
    },
  ];
  nodes.push(...calculusPoints);

  // 实分析的知识点
  const realAnalysisPoints: HierarchicalKnowledgeNode[] = [
    {
      id: 'point_continuity',
      name: '连续性',
      code: 'CONTINUITY',
      category: '分析',
      level: 3,
      parentId: 'subcat_real_analysis',
      learningStatus: 'completed',
      progress: 100,
      masteryLevel: 82,
      difficulty: 'hard',
      estimatedTime: 160,
    },
    {
      id: 'point_series',
      name: '级数',
      code: 'SERIES',
      category: '分析',
      level: 3,
      parentId: 'subcat_real_analysis',
      learningStatus: 'completed',
      progress: 100,
      masteryLevel: 78,
      difficulty: 'hard',
      estimatedTime: 180,
    },
  ];
  nodes.push(...realAnalysisPoints);

  // 子分类到知识点的边
  [
    ...basicOpsPoints,
    ...fractionsDecimalsPoints,
    ...linearAlgebraPoints,
    ...polynomialPoints,
    ...euclideanPoints,
    ...analyticPoints,
    ...calculusPoints,
    ...realAnalysisPoints,
  ].forEach((point) => {
    edges.push({
      id: `e_${point.parentId}_${point.id}`,
      source: point.parentId!,
      target: point.id,
      type: 'required',
      label: '必需',
    });
  });

  // ========== 知识点之间的依赖关系 ==========

  // 基本运算内部依赖
  edges.push(
    {
      id: 'e_addition_subtraction',
      source: 'point_addition',
      target: 'point_subtraction',
      type: 'required',
      label: '必需',
    },
    {
      id: 'e_subtraction_multiplication',
      source: 'point_subtraction',
      target: 'point_multiplication',
      type: 'required',
      label: '必需',
    },
    {
      id: 'e_multiplication_division',
      source: 'point_multiplication',
      target: 'point_division',
      type: 'required',
      label: '必需',
    },
    {
      id: 'e_division_fractions',
      source: 'point_division',
      target: 'point_fractions',
      type: 'required',
      label: '必需',
    },
    {
      id: 'e_fractions_decimals',
      source: 'point_fractions',
      target: 'point_decimals',
      type: 'required',
      label: '必需',
    },
  );

  // 线性代数内部依赖
  edges.push(
    {
      id: 'e_matrix_vector',
      source: 'point_matrix',
      target: 'point_vector_space',
      type: 'required',
      label: '必需',
    },
    {
      id: 'e_matrix_determinant',
      source: 'point_matrix',
      target: 'point_determinant',
      type: 'required',
      label: '必需',
    },
  );

  // 微积分内部依赖
  edges.push(
    {
      id: 'e_limit_derivative',
      source: 'point_limit',
      target: 'point_derivative',
      type: 'required',
      label: '必需',
    },
    {
      id: 'e_derivative_integral',
      source: 'point_derivative',
      target: 'point_integral',
      type: 'required',
      label: '必需',
    },
  );

  // 跨分类的依赖关系
  edges.push(
    {
      id: 'e_matrix_coordinate',
      source: 'point_matrix',
      target: 'point_coordinate',
      type: 'recommended',
      label: '推荐',
    },
    {
      id: 'e_coordinate_conic',
      source: 'point_coordinate',
      target: 'point_conic_sections',
      type: 'required',
      label: '必需',
    },
    {
      id: 'e_integral_continuity',
      source: 'point_integral',
      target: 'point_continuity',
      type: 'required',
      label: '必需',
    },
    {
      id: 'e_continuity_series',
      source: 'point_continuity',
      target: 'point_series',
      type: 'required',
      label: '必需',
    },
  );

  return { nodes, edges };
};

/**
 * 生成多层级物理知识图谱数据
 */
export const generateHierarchicalPhysicsData = (): HierarchicalKnowledgeGraphData => {
  const nodes: HierarchicalKnowledgeNode[] = [];
  const edges: KnowledgeGraphEdge[] = [];

  // 学科
  const subjectPhysics: HierarchicalKnowledgeNode = {
    id: 'subject_physics',
    name: '物理学',
    code: 'PHYSICS',
    category: '学科',
    level: 0,
    learningStatus: 'not_started',
    progress: 0,
  };
  nodes.push(subjectPhysics);

  // 主题
  const topics: HierarchicalKnowledgeNode[] = [
    {
      id: 'topic_mechanics',
      name: '力学',
      code: 'MECHANICS',
      category: '物理',
      level: 1,
      parentId: 'subject_physics',
      learningStatus: 'not_started',
      progress: 0,
    },
    {
      id: 'topic_thermodynamics',
      name: '热力学',
      code: 'THERMODYNAMICS',
      category: '物理',
      level: 1,
      parentId: 'subject_physics',
      learningStatus: 'not_started',
      progress: 0,
    },
  ];
  nodes.push(...topics);

  topics.forEach((topic) => {
    edges.push({
      id: `e_${subjectPhysics.id}_${topic.id}`,
      source: subjectPhysics.id,
      target: topic.id,
      type: 'required',
      label: '必需',
    });
  });

  return { nodes, edges };
};

// 导出默认数据
export const mockHierarchicalData = generateHierarchicalMathData();

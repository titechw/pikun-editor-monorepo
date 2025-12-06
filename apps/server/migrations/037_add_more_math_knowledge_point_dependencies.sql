-- 为数学知识点添加更多依赖关系，形成完整的学习路径
-- 创建时间: 2025-01-XX
-- 目标：补充微积分、线性代数、概率统计等领域的知识点依赖关系

SET search_path TO pikun_db, public;

-- 禁用循环依赖检测
ALTER TABLE pikun_db.knowledge_dependencies DISABLE TRIGGER prevent_knowledge_dependency_cycle;

DO $$
DECLARE
    math_subject_id UUID := '46e71877-9bf9-4aeb-9d13-293f41b10ba2';
    
    -- 基础知识点
    number_recognition_id UUID;
    number_system_basics_id UUID;
    addition_subtraction_id UUID;
    multiplication_division_id UUID;
    fraction_basics_id UUID;
    decimal_basics_id UUID;
    rational_number_id UUID;
    
    -- 代数
    algebraic_expression_id UUID;
    linear_equation_one_id UUID;
    quadratic_equation_id UUID;
    linear_system_id UUID;
    inequality_id UUID;
    
    -- 函数
    set_basics_id UUID;
    function_basics_id UUID;
    function_id UUID;
    linear_function_id UUID;
    quadratic_function_id UUID;
    exponential_log_id UUID;
    trigonometric_basics_id UUID;
    trigonometric_id UUID;
    
    -- 几何
    geometric_shapes_id UUID;
    triangle_id UUID;
    quadrilateral_id UUID;
    circle_id UUID;
    area_perimeter_id UUID;
    solid_geometry_id UUID;
    analytic_geometry_id UUID;
    
    -- 微积分
    limit_id UUID;
    derivative_id UUID;
    integral_id UUID;
    
    -- 线性代数
    vector_id UUID;
    plane_vector_id UUID;
    matrix_id UUID;
    matrix_advanced_id UUID;
    linear_algebra_vector_space_id UUID;
    linear_algebra_matrix_id UUID;
    linear_algebra_system_id UUID;
    
    -- 概率统计
    probability_basics_id UUID;
    probability_theory_id UUID;
    probability_statistics_id UUID;
    statistics_basics_id UUID;
    mathematical_statistics_id UUID;
    
    -- 其他
    sequence_id UUID;
    permutation_combination_id UUID;
    topology_id UUID;
    real_analysis_id UUID;
    complex_analysis_id UUID;
    number_theory_id UUID;
    abstract_algebra_group_id UUID;
    abstract_algebra_ring_id UUID;
    differential_equation_id UUID;
BEGIN
    -- 获取基础知识点ID（使用LIMIT 1避免重复）
    SELECT node_id INTO number_recognition_id FROM pikun_db.knowledge_nodes WHERE name = '数的认识' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO number_system_basics_id FROM pikun_db.knowledge_nodes WHERE name = '数系基础' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO addition_subtraction_id FROM pikun_db.knowledge_nodes WHERE name = '加减法' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO multiplication_division_id FROM pikun_db.knowledge_nodes WHERE name = '乘除法' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO fraction_basics_id FROM pikun_db.knowledge_nodes WHERE name = '分数初步' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO decimal_basics_id FROM pikun_db.knowledge_nodes WHERE name = '小数初步' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO rational_number_id FROM pikun_db.knowledge_nodes WHERE name = '有理数' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    
    -- 获取代数和方程知识点ID
    SELECT node_id INTO algebraic_expression_id FROM pikun_db.knowledge_nodes WHERE name = '整式' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO linear_equation_one_id FROM pikun_db.knowledge_nodes WHERE name = '一元一次方程' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO quadratic_equation_id FROM pikun_db.knowledge_nodes WHERE name = '一元二次方程' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO linear_system_id FROM pikun_db.knowledge_nodes WHERE name = '线性方程组' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO inequality_id FROM pikun_db.knowledge_nodes WHERE name = '不等式' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    
    -- 获取函数知识点ID
    SELECT node_id INTO set_basics_id FROM pikun_db.knowledge_nodes WHERE name = '集合论基础' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO function_basics_id FROM pikun_db.knowledge_nodes WHERE name = '函数基础' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO function_id FROM pikun_db.knowledge_nodes WHERE name = '函数' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO linear_function_id FROM pikun_db.knowledge_nodes WHERE name = '一次函数' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO quadratic_function_id FROM pikun_db.knowledge_nodes WHERE name = '二次函数' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO exponential_log_id FROM pikun_db.knowledge_nodes WHERE name = '指数函数与对数函数' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO trigonometric_basics_id FROM pikun_db.knowledge_nodes WHERE name = '三角函数基础' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO trigonometric_id FROM pikun_db.knowledge_nodes WHERE name = '三角函数' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    
    -- 获取几何知识点ID
    SELECT node_id INTO geometric_shapes_id FROM pikun_db.knowledge_nodes WHERE name = '几何图形认识' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO triangle_id FROM pikun_db.knowledge_nodes WHERE name = '三角形' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO quadrilateral_id FROM pikun_db.knowledge_nodes WHERE name = '四边形' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO circle_id FROM pikun_db.knowledge_nodes WHERE name = '圆' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO area_perimeter_id FROM pikun_db.knowledge_nodes WHERE name = '面积和周长' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO solid_geometry_id FROM pikun_db.knowledge_nodes WHERE name = '立体几何' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO analytic_geometry_id FROM pikun_db.knowledge_nodes WHERE name = '解析几何' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    
    -- 获取微积分知识点ID
    SELECT node_id INTO limit_id FROM pikun_db.knowledge_nodes WHERE name = '微积分-极限' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO derivative_id FROM pikun_db.knowledge_nodes WHERE name = '导数' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO integral_id FROM pikun_db.knowledge_nodes WHERE name = '积分' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    
    -- 获取线性代数知识点ID
    SELECT node_id INTO vector_id FROM pikun_db.knowledge_nodes WHERE name = '向量' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO plane_vector_id FROM pikun_db.knowledge_nodes WHERE name = '平面向量' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO matrix_id FROM pikun_db.knowledge_nodes WHERE name = '矩阵' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO matrix_advanced_id FROM pikun_db.knowledge_nodes WHERE name = '矩阵运算进阶' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO linear_algebra_vector_space_id FROM pikun_db.knowledge_nodes WHERE name = '线性代数-向量空间' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO linear_algebra_matrix_id FROM pikun_db.knowledge_nodes WHERE name = '线性代数-矩阵' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO linear_algebra_system_id FROM pikun_db.knowledge_nodes WHERE name = '线性代数-线性方程组' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    
    -- 获取概率统计知识点ID
    SELECT node_id INTO probability_basics_id FROM pikun_db.knowledge_nodes WHERE name = '概率初步' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO probability_theory_id FROM pikun_db.knowledge_nodes WHERE name = '概率论' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO probability_statistics_id FROM pikun_db.knowledge_nodes WHERE name = '概率与统计' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO statistics_basics_id FROM pikun_db.knowledge_nodes WHERE name = '统计初步' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO mathematical_statistics_id FROM pikun_db.knowledge_nodes WHERE name = '数理统计' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    
    -- 获取其他知识点ID
    SELECT node_id INTO sequence_id FROM pikun_db.knowledge_nodes WHERE name = '数列' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO permutation_combination_id FROM pikun_db.knowledge_nodes WHERE name = '排列组合' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO topology_id FROM pikun_db.knowledge_nodes WHERE name = '拓扑学' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO real_analysis_id FROM pikun_db.knowledge_nodes WHERE name = '实分析' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO complex_analysis_id FROM pikun_db.knowledge_nodes WHERE name = '复分析' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO number_theory_id FROM pikun_db.knowledge_nodes WHERE name = '数论' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO abstract_algebra_group_id FROM pikun_db.knowledge_nodes WHERE name = '抽象代数-群论' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO abstract_algebra_ring_id FROM pikun_db.knowledge_nodes WHERE name = '抽象代数-环论' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO differential_equation_id FROM pikun_db.knowledge_nodes WHERE name = '微分方程' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    
    -- 1. 微积分路径：微积分-极限 → 导数 → 积分 → 微分方程
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT limit_id, derivative_id, 'required'
    WHERE limit_id IS NOT NULL AND derivative_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = limit_id AND target_node_id = derivative_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT derivative_id, integral_id, 'required'
    WHERE derivative_id IS NOT NULL AND integral_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = derivative_id AND target_node_id = integral_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT integral_id, differential_equation_id, 'required'
    WHERE integral_id IS NOT NULL AND differential_equation_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = integral_id AND target_node_id = differential_equation_id);
    
    -- 2. 线性代数路径：向量 → 平面向量 → 矩阵 → 矩阵运算进阶 → 线性代数系列
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT vector_id, plane_vector_id, 'required'
    WHERE vector_id IS NOT NULL AND plane_vector_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = vector_id AND target_node_id = plane_vector_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT matrix_id, linear_algebra_matrix_id, 'required'
    WHERE matrix_id IS NOT NULL AND linear_algebra_matrix_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = matrix_id AND target_node_id = linear_algebra_matrix_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT linear_system_id, linear_algebra_system_id, 'required'
    WHERE linear_system_id IS NOT NULL AND linear_algebra_system_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = linear_system_id AND target_node_id = linear_algebra_system_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT plane_vector_id, linear_algebra_vector_space_id, 'required'
    WHERE plane_vector_id IS NOT NULL AND linear_algebra_vector_space_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = plane_vector_id AND target_node_id = linear_algebra_vector_space_id);
    
    -- 3. 概率统计路径：概率初步 → 概率论 → 概率与统计 → 数理统计
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT probability_basics_id, probability_theory_id, 'required'
    WHERE probability_basics_id IS NOT NULL AND probability_theory_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = probability_basics_id AND target_node_id = probability_theory_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT probability_theory_id, probability_statistics_id, 'required'
    WHERE probability_theory_id IS NOT NULL AND probability_statistics_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = probability_theory_id AND target_node_id = probability_statistics_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT statistics_basics_id, mathematical_statistics_id, 'required'
    WHERE statistics_basics_id IS NOT NULL AND mathematical_statistics_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = statistics_basics_id AND target_node_id = mathematical_statistics_id);
    
    -- 4. 几何进阶路径：平面几何 → 立体几何 → 解析几何
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT circle_id, solid_geometry_id, 'required'
    WHERE circle_id IS NOT NULL AND solid_geometry_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = circle_id AND target_node_id = solid_geometry_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT solid_geometry_id, analytic_geometry_id, 'required'
    WHERE solid_geometry_id IS NOT NULL AND analytic_geometry_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = solid_geometry_id AND target_node_id = analytic_geometry_id);
    
    -- 5. 面积和周长依赖几何图形
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT geometric_shapes_id, area_perimeter_id, 'required'
    WHERE geometric_shapes_id IS NOT NULL AND area_perimeter_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = geometric_shapes_id AND target_node_id = area_perimeter_id);
    
    -- 6. 函数进阶：二次函数 → 指数函数与对数函数
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT quadratic_function_id, exponential_log_id, 'required'
    WHERE quadratic_function_id IS NOT NULL AND exponential_log_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = quadratic_function_id AND target_node_id = exponential_log_id);
    
    -- 7. 数列和排列组合
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT function_id, sequence_id, 'required'
    WHERE function_id IS NOT NULL AND sequence_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = function_id AND target_node_id = sequence_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT set_basics_id, permutation_combination_id, 'required'
    WHERE set_basics_id IS NOT NULL AND permutation_combination_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = set_basics_id AND target_node_id = permutation_combination_id);
    
    -- 8. 高级数学：实分析、复分析、数论、抽象代数
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT limit_id, real_analysis_id, 'required'
    WHERE limit_id IS NOT NULL AND real_analysis_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = limit_id AND target_node_id = real_analysis_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT real_analysis_id, complex_analysis_id, 'required'
    WHERE real_analysis_id IS NOT NULL AND complex_analysis_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = real_analysis_id AND target_node_id = complex_analysis_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT algebraic_expression_id, abstract_algebra_group_id, 'required'
    WHERE algebraic_expression_id IS NOT NULL AND abstract_algebra_group_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = algebraic_expression_id AND target_node_id = abstract_algebra_group_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT abstract_algebra_group_id, abstract_algebra_ring_id, 'required'
    WHERE abstract_algebra_group_id IS NOT NULL AND abstract_algebra_ring_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = abstract_algebra_group_id AND target_node_id = abstract_algebra_ring_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT number_system_basics_id, number_theory_id, 'required'
    WHERE number_system_basics_id IS NOT NULL AND number_theory_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = number_system_basics_id AND target_node_id = number_theory_id);
    
    RAISE NOTICE '已添加更多数学知识点之间的依赖关系';
END $$;

-- 重新启用循环依赖检测
ALTER TABLE pikun_db.knowledge_dependencies ENABLE TRIGGER prevent_knowledge_dependency_cycle;

-- 显示统计信息
SELECT 
    '知识点 → 知识点' as category,
    COUNT(*) as count
FROM pikun_db.knowledge_dependencies kd
JOIN pikun_db.knowledge_nodes kn1 ON kn1.node_id = kd.source_node_id
JOIN pikun_db.knowledge_nodes kn2 ON kn2.node_id = kd.target_node_id
WHERE kn1.parent_id = '46e71877-9bf9-4aeb-9d13-293f41b10ba2'
  AND kn2.parent_id = '46e71877-9bf9-4aeb-9d13-293f41b10ba2'
  AND kn1.node_type = 'knowledge_point'
  AND kn2.node_type = 'knowledge_point';


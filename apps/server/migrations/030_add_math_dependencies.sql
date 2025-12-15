-- 补充数学分类和知识点的依赖关系数据
-- 创建时间: 2025-01-XX
-- 目标：补充数学分类下的子分类之间和数学节点下的知识点之间的学习顺序依赖关系

SET search_path TO pikun_db, public;

-- ============================================
-- 第一部分：数学分类下的子分类之间的依赖关系
-- ============================================

-- 获取节点ID（使用变量方式，避免硬编码）
DO $$
DECLARE
    -- 基础学科
    algebra_id UUID;
    geometry_id UUID;
    function_theory_id UUID;
    math_analysis_id UUID;
    
    -- 进阶学科
    algebraic_geometry_id UUID;
    pde_id UUID;
    dynamical_systems_id UUID;
    topology_id UUID;
    number_theory_id UUID;
    probability_id UUID;
    statistics_id UUID;
    applied_math_id UUID;
BEGIN
    -- 获取基础学科ID
    SELECT node_id INTO algebra_id FROM pikun_db.knowledge_nodes WHERE name = '代数学' AND node_type = 'subject_category' AND parent_id = (SELECT node_id FROM pikun_db.knowledge_nodes WHERE name = '数学' AND node_type = 'subject_category' LIMIT 1);
    SELECT node_id INTO geometry_id FROM pikun_db.knowledge_nodes WHERE name = '几何学' AND node_type = 'subject_category' AND parent_id = (SELECT node_id FROM pikun_db.knowledge_nodes WHERE name = '数学' AND node_type = 'subject_category' LIMIT 1);
    SELECT node_id INTO function_theory_id FROM pikun_db.knowledge_nodes WHERE name = '函数论' AND node_type = 'subject_category' AND parent_id = (SELECT node_id FROM pikun_db.knowledge_nodes WHERE name = '数学' AND node_type = 'subject_category' LIMIT 1);
    SELECT node_id INTO math_analysis_id FROM pikun_db.knowledge_nodes WHERE name = '数学分析' AND node_type = 'subject_category' AND parent_id = (SELECT node_id FROM pikun_db.knowledge_nodes WHERE name = '数学' AND node_type = 'subject_category' LIMIT 1);
    
    -- 获取进阶学科ID
    SELECT node_id INTO algebraic_geometry_id FROM pikun_db.knowledge_nodes WHERE name = '代数几何学' AND node_type = 'subject_category' AND parent_id = (SELECT node_id FROM pikun_db.knowledge_nodes WHERE name = '数学' AND node_type = 'subject_category' LIMIT 1);
    SELECT node_id INTO pde_id FROM pikun_db.knowledge_nodes WHERE name = '偏微分方程' AND node_type = 'subject_category' AND parent_id = (SELECT node_id FROM pikun_db.knowledge_nodes WHERE name = '数学' AND node_type = 'subject_category' LIMIT 1);
    SELECT node_id INTO dynamical_systems_id FROM pikun_db.knowledge_nodes WHERE name = '动力系统' AND node_type = 'subject_category' AND parent_id = (SELECT node_id FROM pikun_db.knowledge_nodes WHERE name = '数学' AND node_type = 'subject_category' LIMIT 1);
    SELECT node_id INTO topology_id FROM pikun_db.knowledge_nodes WHERE name = '拓扑学' AND node_type = 'subject_category' AND parent_id = (SELECT node_id FROM pikun_db.knowledge_nodes WHERE name = '数学' AND node_type = 'subject_category' LIMIT 1);
    SELECT node_id INTO number_theory_id FROM pikun_db.knowledge_nodes WHERE name = '数论' AND node_type = 'subject_category' AND parent_id = (SELECT node_id FROM pikun_db.knowledge_nodes WHERE name = '数学' AND node_type = 'subject_category' LIMIT 1);
    SELECT node_id INTO probability_id FROM pikun_db.knowledge_nodes WHERE name = '概率论' AND node_type = 'subject_category' AND parent_id = (SELECT node_id FROM pikun_db.knowledge_nodes WHERE name = '数学' AND node_type = 'subject_category' LIMIT 1);
    SELECT node_id INTO statistics_id FROM pikun_db.knowledge_nodes WHERE name = '数理统计学' AND node_type = 'subject_category' AND parent_id = (SELECT node_id FROM pikun_db.knowledge_nodes WHERE name = '数学' AND node_type = 'subject_category' LIMIT 1);
    SELECT node_id INTO applied_math_id FROM pikun_db.knowledge_nodes WHERE name = '应用数学 具体应用入有关学科' AND node_type = 'subject_category' AND parent_id = (SELECT node_id FROM pikun_db.knowledge_nodes WHERE name = '数学' AND node_type = 'subject_category' LIMIT 1);
    
    -- 插入依赖关系（如果不存在）
    -- 代数学 → 代数几何学
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT algebra_id, algebraic_geometry_id, 'required'
    WHERE NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = algebra_id AND target_node_id = algebraic_geometry_id
    );
    
    -- 几何学 → 代数几何学
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT geometry_id, algebraic_geometry_id, 'required'
    WHERE NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = geometry_id AND target_node_id = algebraic_geometry_id
    );
    
    -- 函数论 → 偏微分方程
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT function_theory_id, pde_id, 'required'
    WHERE NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = function_theory_id AND target_node_id = pde_id
    );
    
    -- 数学分析 → 偏微分方程
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_analysis_id, pde_id, 'required'
    WHERE NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = math_analysis_id AND target_node_id = pde_id
    );
    
    -- 函数论 → 动力系统
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT function_theory_id, dynamical_systems_id, 'required'
    WHERE NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = function_theory_id AND target_node_id = dynamical_systems_id
    );
    
    -- 数学分析 → 动力系统
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_analysis_id, dynamical_systems_id, 'recommended'
    WHERE NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = math_analysis_id AND target_node_id = dynamical_systems_id
    );
    
    -- 函数论 → 数学分析
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT function_theory_id, math_analysis_id, 'required'
    WHERE NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = function_theory_id AND target_node_id = math_analysis_id
    );
    
    -- 代数学 → 数论
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT algebra_id, number_theory_id, 'required'
    WHERE NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = algebra_id AND target_node_id = number_theory_id
    );
    
    -- 概率论 → 数理统计学
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT probability_id, statistics_id, 'required'
    WHERE NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = probability_id AND target_node_id = statistics_id
    );
    
    -- 数学分析 → 应用数学
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_analysis_id, applied_math_id, 'recommended'
    WHERE NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = math_analysis_id AND target_node_id = applied_math_id
    );
    
    -- 几何学 → 拓扑学
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT geometry_id, topology_id, 'recommended'
    WHERE NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = geometry_id AND target_node_id = topology_id
    );
    
    RAISE NOTICE '数学分类依赖关系已添加';
END $$;

-- ============================================
-- 第二部分：数学节点下的知识点之间的依赖关系
-- ============================================

DO $$
DECLARE
    math_subject_id UUID := '46e71877-9bf9-4aeb-9d13-293f41b10ba2';
    
    -- 基础运算知识点
    number_recognition_id UUID;
    addition_subtraction_id UUID;
    multiplication_division_id UUID;
    fraction_basic_id UUID;
    decimal_basic_id UUID;
    
    -- 代数知识点
    set_theory_id UUID;
    function_basic_id UUID;
    linear_equation_id UUID;
    quadratic_equation_id UUID;
    rational_number_id UUID;
    polynomial_id UUID;
    
    -- 几何知识点
    geometry_basic_id UUID;
    triangle_id UUID;
    quadrilateral_id UUID;
    circle_id UUID;
    
    -- 函数知识点
    linear_function_id UUID;
    quadratic_function_id UUID;
    trigonometry_basic_id UUID;
    
    -- 高等数学知识点
    derivative_id UUID;
    integral_id UUID;
BEGIN
    -- 获取基础运算知识点ID
    SELECT node_id INTO number_recognition_id FROM pikun_db.knowledge_nodes WHERE name = '数的认识' AND node_type = 'knowledge_point' AND parent_id = math_subject_id LIMIT 1;
    SELECT node_id INTO addition_subtraction_id FROM pikun_db.knowledge_nodes WHERE name = '加减法' AND node_type = 'knowledge_point' AND parent_id = math_subject_id LIMIT 1;
    SELECT node_id INTO multiplication_division_id FROM pikun_db.knowledge_nodes WHERE name = '乘除法' AND node_type = 'knowledge_point' AND parent_id = math_subject_id LIMIT 1;
    SELECT node_id INTO fraction_basic_id FROM pikun_db.knowledge_nodes WHERE name = '分数初步' AND node_type = 'knowledge_point' AND parent_id = math_subject_id LIMIT 1;
    SELECT node_id INTO decimal_basic_id FROM pikun_db.knowledge_nodes WHERE name = '小数初步' AND node_type = 'knowledge_point' AND parent_id = math_subject_id LIMIT 1;
    
    -- 获取代数知识点ID
    SELECT node_id INTO set_theory_id FROM pikun_db.knowledge_nodes WHERE name = '集合论基础' AND node_type = 'knowledge_point' AND parent_id = math_subject_id LIMIT 1;
    SELECT node_id INTO function_basic_id FROM pikun_db.knowledge_nodes WHERE name = '函数基础' AND code = 'function-basic' AND node_type = 'knowledge_point' AND parent_id = math_subject_id LIMIT 1;
    SELECT node_id INTO linear_equation_id FROM pikun_db.knowledge_nodes WHERE name = '一元一次方程' AND code = 'middle-linear-equation' AND node_type = 'knowledge_point' AND parent_id = math_subject_id LIMIT 1;
    SELECT node_id INTO quadratic_equation_id FROM pikun_db.knowledge_nodes WHERE name = '一元二次方程' AND code = 'middle-quadratic-equation' AND node_type = 'knowledge_point' AND parent_id = math_subject_id LIMIT 1;
    SELECT node_id INTO rational_number_id FROM pikun_db.knowledge_nodes WHERE name = '有理数' AND node_type = 'knowledge_point' AND parent_id = math_subject_id LIMIT 1;
    SELECT node_id INTO polynomial_id FROM pikun_db.knowledge_nodes WHERE name = '整式' AND node_type = 'knowledge_point' AND parent_id = math_subject_id LIMIT 1;
    
    -- 获取几何知识点ID
    SELECT node_id INTO geometry_basic_id FROM pikun_db.knowledge_nodes WHERE name = '几何图形认识' AND node_type = 'knowledge_point' AND parent_id = math_subject_id LIMIT 1;
    SELECT node_id INTO triangle_id FROM pikun_db.knowledge_nodes WHERE name = '三角形' AND node_type = 'knowledge_point' AND parent_id = math_subject_id LIMIT 1;
    SELECT node_id INTO quadrilateral_id FROM pikun_db.knowledge_nodes WHERE name = '四边形' AND node_type = 'knowledge_point' AND parent_id = math_subject_id LIMIT 1;
    SELECT node_id INTO circle_id FROM pikun_db.knowledge_nodes WHERE name = '圆' AND node_type = 'knowledge_point' AND parent_id = math_subject_id LIMIT 1;
    
    -- 获取函数知识点ID
    SELECT node_id INTO linear_function_id FROM pikun_db.knowledge_nodes WHERE name = '一次函数' AND node_type = 'knowledge_point' AND parent_id = math_subject_id LIMIT 1;
    SELECT node_id INTO quadratic_function_id FROM pikun_db.knowledge_nodes WHERE name = '二次函数' AND node_type = 'knowledge_point' AND parent_id = math_subject_id LIMIT 1;
    SELECT node_id INTO trigonometry_basic_id FROM pikun_db.knowledge_nodes WHERE name = '三角函数基础' AND node_type = 'knowledge_point' AND parent_id = math_subject_id LIMIT 1;
    
    -- 获取高等数学知识点ID
    SELECT node_id INTO derivative_id FROM pikun_db.knowledge_nodes WHERE name = '导数' AND node_type = 'knowledge_point' AND parent_id = math_subject_id LIMIT 1;
    SELECT node_id INTO integral_id FROM pikun_db.knowledge_nodes WHERE name = '积分' AND node_type = 'knowledge_point' AND parent_id = math_subject_id LIMIT 1;
    
    -- 插入基础运算依赖关系
    -- 数的认识 → 加减法
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT number_recognition_id, addition_subtraction_id, 'required'
    WHERE number_recognition_id IS NOT NULL AND addition_subtraction_id IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = number_recognition_id AND target_node_id = addition_subtraction_id
    );
    
    -- 加减法 → 乘除法
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT addition_subtraction_id, multiplication_division_id, 'required'
    WHERE addition_subtraction_id IS NOT NULL AND multiplication_division_id IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = addition_subtraction_id AND target_node_id = multiplication_division_id
    );
    
    -- 乘除法 → 分数初步
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT multiplication_division_id, fraction_basic_id, 'required'
    WHERE multiplication_division_id IS NOT NULL AND fraction_basic_id IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = multiplication_division_id AND target_node_id = fraction_basic_id
    );
    
    -- 分数初步 → 小数初步
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT fraction_basic_id, decimal_basic_id, 'required'
    WHERE fraction_basic_id IS NOT NULL AND decimal_basic_id IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = fraction_basic_id AND target_node_id = decimal_basic_id
    );
    
    -- 插入代数依赖关系
    -- 集合论基础 → 函数基础
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT set_theory_id, function_basic_id, 'required'
    WHERE set_theory_id IS NOT NULL AND function_basic_id IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = set_theory_id AND target_node_id = function_basic_id
    );
    
    -- 有理数 → 整式
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT rational_number_id, polynomial_id, 'required'
    WHERE rational_number_id IS NOT NULL AND polynomial_id IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = rational_number_id AND target_node_id = polynomial_id
    );
    
    -- 整式 → 一元一次方程
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT polynomial_id, linear_equation_id, 'required'
    WHERE polynomial_id IS NOT NULL AND linear_equation_id IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = polynomial_id AND target_node_id = linear_equation_id
    );
    
    -- 一元一次方程 → 一元二次方程
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT linear_equation_id, quadratic_equation_id, 'required'
    WHERE linear_equation_id IS NOT NULL AND quadratic_equation_id IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = linear_equation_id AND target_node_id = quadratic_equation_id
    );
    
    -- 插入几何依赖关系
    -- 几何图形认识 → 三角形
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT geometry_basic_id, triangle_id, 'required'
    WHERE geometry_basic_id IS NOT NULL AND triangle_id IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = geometry_basic_id AND target_node_id = triangle_id
    );
    
    -- 三角形 → 四边形
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT triangle_id, quadrilateral_id, 'required'
    WHERE triangle_id IS NOT NULL AND quadrilateral_id IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = triangle_id AND target_node_id = quadrilateral_id
    );
    
    -- 四边形 → 圆
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT quadrilateral_id, circle_id, 'required'
    WHERE quadrilateral_id IS NOT NULL AND circle_id IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = quadrilateral_id AND target_node_id = circle_id
    );
    
    -- 插入函数依赖关系
    -- 函数基础 → 一次函数
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT function_basic_id, linear_function_id, 'required'
    WHERE function_basic_id IS NOT NULL AND linear_function_id IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = function_basic_id AND target_node_id = linear_function_id
    );
    
    -- 一次函数 → 二次函数
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT linear_function_id, quadratic_function_id, 'required'
    WHERE linear_function_id IS NOT NULL AND quadratic_function_id IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = linear_function_id AND target_node_id = quadratic_function_id
    );
    
    -- 函数基础 → 三角函数基础
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT function_basic_id, trigonometry_basic_id, 'required'
    WHERE function_basic_id IS NOT NULL AND trigonometry_basic_id IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = function_basic_id AND target_node_id = trigonometry_basic_id
    );
    
    -- 插入高等数学依赖关系
    -- 函数基础 → 导数
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT function_basic_id, derivative_id, 'required'
    WHERE function_basic_id IS NOT NULL AND derivative_id IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = function_basic_id AND target_node_id = derivative_id
    );
    
    -- 导数 → 积分
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT derivative_id, integral_id, 'required'
    WHERE derivative_id IS NOT NULL AND integral_id IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = derivative_id AND target_node_id = integral_id
    );
    
    RAISE NOTICE '数学知识点依赖关系已添加';
END $$;

-- 显示添加的依赖关系统计
SELECT 
    '数学分类依赖关系' as category,
    COUNT(*) as count
FROM pikun_db.knowledge_dependencies kd
JOIN pikun_db.knowledge_nodes kn1 ON kn1.node_id = kd.source_node_id
JOIN pikun_db.knowledge_nodes kn2 ON kn2.node_id = kd.target_node_id
WHERE kn1.parent_id = (SELECT node_id FROM pikun_db.knowledge_nodes WHERE name = '数学' AND node_type = 'subject_category' LIMIT 1)
  AND kn2.parent_id = (SELECT node_id FROM pikun_db.knowledge_nodes WHERE name = '数学' AND node_type = 'subject_category' LIMIT 1)
  AND kn1.node_type = 'subject_category'
  AND kn2.node_type = 'subject_category'

UNION ALL

SELECT 
    '数学知识点依赖关系' as category,
    COUNT(*) as count
FROM pikun_db.knowledge_dependencies kd
JOIN pikun_db.knowledge_nodes kn1 ON kn1.node_id = kd.source_node_id
JOIN pikun_db.knowledge_nodes kn2 ON kn2.node_id = kd.target_node_id
WHERE kn1.parent_id = '46e71877-9bf9-4aeb-9d13-293f41b10ba2'
  AND kn2.parent_id = '46e71877-9bf9-4aeb-9d13-293f41b10ba2'
  AND kn1.node_type = 'knowledge_point'
  AND kn2.node_type = 'knowledge_point';




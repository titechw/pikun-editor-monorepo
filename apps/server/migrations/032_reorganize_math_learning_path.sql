-- 重新组织数学学习的逻辑顺序
-- 创建时间: 2025-01-XX
-- 目标：按照教育学逻辑，建立清晰的数学学习路径
-- 思路：三岁小孩学数学 → 基础知识点 → 基础学科分类 → 进阶学科分类 → 应用学科分类

SET search_path TO pikun_db, public;

-- ============================================
-- 第一部分：清理现有的不合理的依赖关系
-- ============================================

-- 删除"数学"subject到分类的依赖（因为应该通过知识点来建立依赖）
DELETE FROM pikun_db.knowledge_dependencies
WHERE source_node_id = '46e71877-9bf9-4aeb-9d13-293f41b10ba2'
  AND target_node_id IN (
    SELECT node_id FROM pikun_db.knowledge_nodes 
    WHERE parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da' 
    AND node_type = 'subject_category'
  );

-- ============================================
-- 第二部分：建立基础知识点到基础学科分类的依赖关系
-- 逻辑：必须先掌握基础知识点，才能学习基础学科分类
-- ============================================

DO $$
DECLARE
    math_subject_id UUID := '46e71877-9bf9-4aeb-9d13-293f41b10ba2';
    
    -- 基础知识点（三岁小孩开始学的）
    number_recognition_id UUID;
    addition_subtraction_id UUID;
    multiplication_division_id UUID;
    geometry_basic_id UUID;
    function_basic_id UUID;
    set_theory_id UUID;
    
    -- 基础学科分类（需要基础知识点）
    algebra_id UUID;
    geometry_id UUID;
    function_theory_id UUID;
    math_analysis_id UUID;
    number_theory_id UUID;
    probability_id UUID;
    discrete_math_id UUID;
    logic_foundation_id UUID;
    
    -- 进阶学科分类（需要基础学科分类）
    algebraic_geometry_id UUID;
    pde_id UUID;
    ode_id UUID;
    dynamical_systems_id UUID;
    topology_id UUID;
    functional_analysis_id UUID;
    
    -- 应用学科分类（需要基础学科分类）
    applied_math_id UUID;
    computational_math_id UUID;
    operations_research_id UUID;
    statistics_id UUID;
BEGIN
    -- 获取基础知识点ID
    SELECT node_id INTO number_recognition_id FROM pikun_db.knowledge_nodes WHERE name = '数的认识' AND node_type = 'knowledge_point' AND parent_id = math_subject_id LIMIT 1;
    SELECT node_id INTO addition_subtraction_id FROM pikun_db.knowledge_nodes WHERE name = '加减法' AND node_type = 'knowledge_point' AND parent_id = math_subject_id LIMIT 1;
    SELECT node_id INTO multiplication_division_id FROM pikun_db.knowledge_nodes WHERE name = '乘除法' AND node_type = 'knowledge_point' AND parent_id = math_subject_id LIMIT 1;
    SELECT node_id INTO geometry_basic_id FROM pikun_db.knowledge_nodes WHERE name = '几何图形认识' AND node_type = 'knowledge_point' AND parent_id = math_subject_id LIMIT 1;
    SELECT node_id INTO function_basic_id FROM pikun_db.knowledge_nodes WHERE name = '函数基础' AND code = 'function-basic' AND node_type = 'knowledge_point' AND parent_id = math_subject_id LIMIT 1;
    SELECT node_id INTO set_theory_id FROM pikun_db.knowledge_nodes WHERE name = '集合论基础' AND node_type = 'knowledge_point' AND parent_id = math_subject_id LIMIT 1;
    
    -- 获取基础学科分类ID
    SELECT node_id INTO algebra_id FROM pikun_db.knowledge_nodes WHERE name = '代数学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO geometry_id FROM pikun_db.knowledge_nodes WHERE name = '几何学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO function_theory_id FROM pikun_db.knowledge_nodes WHERE name = '函数论' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO math_analysis_id FROM pikun_db.knowledge_nodes WHERE name = '数学分析' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO number_theory_id FROM pikun_db.knowledge_nodes WHERE name = '数论' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO probability_id FROM pikun_db.knowledge_nodes WHERE name = '概率论' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO discrete_math_id FROM pikun_db.knowledge_nodes WHERE name = '离散数学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO logic_foundation_id FROM pikun_db.knowledge_nodes WHERE name = '数理逻辑与数学基础' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    
    -- 获取进阶学科分类ID
    SELECT node_id INTO algebraic_geometry_id FROM pikun_db.knowledge_nodes WHERE name = '代数几何学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO pde_id FROM pikun_db.knowledge_nodes WHERE name = '偏微分方程' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO ode_id FROM pikun_db.knowledge_nodes WHERE name = '常微分方程' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO dynamical_systems_id FROM pikun_db.knowledge_nodes WHERE name = '动力系统' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO topology_id FROM pikun_db.knowledge_nodes WHERE name = '拓扑学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO functional_analysis_id FROM pikun_db.knowledge_nodes WHERE name = '泛函分析' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    
    -- 获取应用学科分类ID
    SELECT node_id INTO applied_math_id FROM pikun_db.knowledge_nodes WHERE name = '应用数学 具体应用入有关学科' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO computational_math_id FROM pikun_db.knowledge_nodes WHERE name = '计算数学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO operations_research_id FROM pikun_db.knowledge_nodes WHERE name = '运筹学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO statistics_id FROM pikun_db.knowledge_nodes WHERE name = '数理统计学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    
    -- ============================================
    -- 建立基础知识点到基础学科分类的依赖
    -- ============================================
    
    -- 代数学需要：数的认识、加减乘除、函数基础
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT number_recognition_id, algebra_id, 'required'
    WHERE number_recognition_id IS NOT NULL AND algebra_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = number_recognition_id AND target_node_id = algebra_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT addition_subtraction_id, algebra_id, 'required'
    WHERE addition_subtraction_id IS NOT NULL AND algebra_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = addition_subtraction_id AND target_node_id = algebra_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT multiplication_division_id, algebra_id, 'required'
    WHERE multiplication_division_id IS NOT NULL AND algebra_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = multiplication_division_id AND target_node_id = algebra_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT function_basic_id, algebra_id, 'recommended'
    WHERE function_basic_id IS NOT NULL AND algebra_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = function_basic_id AND target_node_id = algebra_id);
    
    -- 几何学需要：几何图形认识、基础运算
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT geometry_basic_id, geometry_id, 'required'
    WHERE geometry_basic_id IS NOT NULL AND geometry_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = geometry_basic_id AND target_node_id = geometry_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT addition_subtraction_id, geometry_id, 'required'
    WHERE addition_subtraction_id IS NOT NULL AND geometry_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = addition_subtraction_id AND target_node_id = geometry_id);
    
    -- 函数论需要：函数基础、集合论基础
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT function_basic_id, function_theory_id, 'required'
    WHERE function_basic_id IS NOT NULL AND function_theory_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = function_basic_id AND target_node_id = function_theory_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT set_theory_id, function_theory_id, 'required'
    WHERE set_theory_id IS NOT NULL AND function_theory_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = set_theory_id AND target_node_id = function_theory_id);
    
    -- 数学分析需要：函数基础、基础运算
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT function_basic_id, math_analysis_id, 'required'
    WHERE function_basic_id IS NOT NULL AND math_analysis_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = function_basic_id AND target_node_id = math_analysis_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT multiplication_division_id, math_analysis_id, 'required'
    WHERE multiplication_division_id IS NOT NULL AND math_analysis_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = multiplication_division_id AND target_node_id = math_analysis_id);
    
    -- 数论需要：基础运算、代数学基础（通过代数学来学习）
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT addition_subtraction_id, number_theory_id, 'required'
    WHERE addition_subtraction_id IS NOT NULL AND number_theory_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = addition_subtraction_id AND target_node_id = number_theory_id);
    
    -- 概率论需要：基础运算、函数基础
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT addition_subtraction_id, probability_id, 'required'
    WHERE addition_subtraction_id IS NOT NULL AND probability_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = addition_subtraction_id AND target_node_id = probability_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT function_basic_id, probability_id, 'recommended'
    WHERE function_basic_id IS NOT NULL AND probability_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = function_basic_id AND target_node_id = probability_id);
    
    -- 离散数学需要：集合论基础、基础运算
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT set_theory_id, discrete_math_id, 'required'
    WHERE set_theory_id IS NOT NULL AND discrete_math_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = set_theory_id AND target_node_id = discrete_math_id);
    
    -- 数理逻辑与数学基础需要：集合论基础
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT set_theory_id, logic_foundation_id, 'required'
    WHERE set_theory_id IS NOT NULL AND logic_foundation_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = set_theory_id AND target_node_id = logic_foundation_id);
    
    -- ============================================
    -- 建立基础学科分类到进阶学科分类的依赖（保持现有的）
    -- ============================================
    -- 这些依赖关系已经在之前的脚本中建立了，不需要重复添加
    
    -- ============================================
    -- 建立基础学科分类到应用学科分类的依赖
    -- ============================================
    
    -- 应用数学需要：数学分析、代数学
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_analysis_id, applied_math_id, 'required'
    WHERE math_analysis_id IS NOT NULL AND applied_math_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_analysis_id AND target_node_id = applied_math_id);
    
    -- 计算数学需要：数学分析、代数学
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_analysis_id, computational_math_id, 'required'
    WHERE math_analysis_id IS NOT NULL AND computational_math_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_analysis_id AND target_node_id = computational_math_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT algebra_id, computational_math_id, 'required'
    WHERE algebra_id IS NOT NULL AND computational_math_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = algebra_id AND target_node_id = computational_math_id);
    
    -- 运筹学需要：代数学、数学分析
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT algebra_id, operations_research_id, 'required'
    WHERE algebra_id IS NOT NULL AND operations_research_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = algebra_id AND target_node_id = operations_research_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_analysis_id, operations_research_id, 'required'
    WHERE math_analysis_id IS NOT NULL AND operations_research_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_analysis_id AND target_node_id = operations_research_id);
    
    -- 数理统计学需要：概率论（已存在）
    
    RAISE NOTICE '数学学习路径已重新组织：基础知识点 → 基础学科分类 → 进阶学科分类 → 应用学科分类';
END $$;

-- 显示统计信息
SELECT 
    '基础知识点 → 基础学科分类' as category,
    COUNT(*) as count
FROM pikun_db.knowledge_dependencies kd
JOIN pikun_db.knowledge_nodes kn1 ON kn1.node_id = kd.source_node_id
JOIN pikun_db.knowledge_nodes kn2 ON kn2.node_id = kd.target_node_id
WHERE kn1.parent_id = '46e71877-9bf9-4aeb-9d13-293f41b10ba2'
  AND kn1.node_type = 'knowledge_point'
  AND kn2.parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da'
  AND kn2.node_type = 'subject_category'

UNION ALL

SELECT 
    '基础学科分类 → 进阶学科分类' as category,
    COUNT(*) as count
FROM pikun_db.knowledge_dependencies kd
JOIN pikun_db.knowledge_nodes kn1 ON kn1.node_id = kd.source_node_id
JOIN pikun_db.knowledge_nodes kn2 ON kn2.node_id = kd.target_node_id
WHERE kn1.parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da'
  AND kn2.parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da'
  AND kn1.node_type = 'subject_category'
  AND kn2.node_type = 'subject_category'
  AND kn1.name IN ('代数学', '几何学', '函数论', '数学分析', '数论', '概率论', '离散数学', '数理逻辑与数学基础')
  AND kn2.name IN ('代数几何学', '偏微分方程', '常微分方程', '动力系统', '拓扑学', '泛函分析')

UNION ALL

SELECT 
    '基础学科分类 → 应用学科分类' as category,
    COUNT(*) as count
FROM pikun_db.knowledge_dependencies kd
JOIN pikun_db.knowledge_nodes kn1 ON kn1.node_id = kd.source_node_id
JOIN pikun_db.knowledge_nodes kn2 ON kn2.node_id = kd.target_node_id
WHERE kn1.parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da'
  AND kn2.parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da'
  AND kn1.node_type = 'subject_category'
  AND kn2.node_type = 'subject_category'
  AND kn1.name IN ('代数学', '几何学', '函数论', '数学分析', '数论', '概率论', '离散数学', '数理逻辑与数学基础')
  AND kn2.name IN ('应用数学 具体应用入有关学科', '计算数学', '运筹学', '数理统计学');


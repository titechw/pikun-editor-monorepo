-- 补充数学分类的学习顺序依赖关系
-- 创建时间: 2025-01-XX
-- 目标：建立基础知识点和"数学"subject到其他数学分类的依赖关系

SET search_path TO pikun_db, public;

-- ============================================
-- 第一部分：建立"数学"subject到基础数学分类的依赖关系
-- 逻辑：基础知识点（加减乘除、函数基础等）应该先学，然后才能学基础学科分类
-- ============================================

DO $$
DECLARE
    math_subject_id UUID := '46e71877-9bf9-4aeb-9d13-293f41b10ba2';
    math_category_id UUID := 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    
    -- 基础学科分类（需要先学基础知识点）
    algebra_id UUID;
    geometry_id UUID;
    function_theory_id UUID;
    math_analysis_id UUID;
    number_theory_id UUID;
    probability_id UUID;
    
    -- 进阶学科分类（需要先学基础学科分类）
    algebraic_geometry_id UUID;
    pde_id UUID;
    ode_id UUID;
    dynamical_systems_id UUID;
    topology_id UUID;
    statistics_id UUID;
    applied_math_id UUID;
    functional_analysis_id UUID;
BEGIN
    -- 获取基础学科分类ID
    SELECT node_id INTO algebra_id FROM pikun_db.knowledge_nodes WHERE name = '代数学' AND node_type = 'subject_category' AND parent_id = math_category_id;
    SELECT node_id INTO geometry_id FROM pikun_db.knowledge_nodes WHERE name = '几何学' AND node_type = 'subject_category' AND parent_id = math_category_id;
    SELECT node_id INTO function_theory_id FROM pikun_db.knowledge_nodes WHERE name = '函数论' AND node_type = 'subject_category' AND parent_id = math_category_id;
    SELECT node_id INTO math_analysis_id FROM pikun_db.knowledge_nodes WHERE name = '数学分析' AND node_type = 'subject_category' AND parent_id = math_category_id;
    SELECT node_id INTO number_theory_id FROM pikun_db.knowledge_nodes WHERE name = '数论' AND node_type = 'subject_category' AND parent_id = math_category_id;
    SELECT node_id INTO probability_id FROM pikun_db.knowledge_nodes WHERE name = '概率论' AND node_type = 'subject_category' AND parent_id = math_category_id;
    
    -- 获取进阶学科分类ID
    SELECT node_id INTO algebraic_geometry_id FROM pikun_db.knowledge_nodes WHERE name = '代数几何学' AND node_type = 'subject_category' AND parent_id = math_category_id;
    SELECT node_id INTO pde_id FROM pikun_db.knowledge_nodes WHERE name = '偏微分方程' AND node_type = 'subject_category' AND parent_id = math_category_id;
    SELECT node_id INTO ode_id FROM pikun_db.knowledge_nodes WHERE name = '常微分方程' AND node_type = 'subject_category' AND parent_id = math_category_id;
    SELECT node_id INTO dynamical_systems_id FROM pikun_db.knowledge_nodes WHERE name = '动力系统' AND node_type = 'subject_category' AND parent_id = math_category_id;
    SELECT node_id INTO topology_id FROM pikun_db.knowledge_nodes WHERE name = '拓扑学' AND node_type = 'subject_category' AND parent_id = math_category_id;
    SELECT node_id INTO statistics_id FROM pikun_db.knowledge_nodes WHERE name = '数理统计学' AND node_type = 'subject_category' AND parent_id = math_category_id;
    SELECT node_id INTO applied_math_id FROM pikun_db.knowledge_nodes WHERE name = '应用数学 具体应用入有关学科' AND node_type = 'subject_category' AND parent_id = math_category_id;
    SELECT node_id INTO functional_analysis_id FROM pikun_db.knowledge_nodes WHERE name = '泛函分析' AND node_type = 'subject_category' AND parent_id = math_category_id;
    
    -- 插入依赖关系："数学"subject → 基础学科分类
    -- 基础知识点（加减乘除、函数基础等）应该先学，然后才能学基础学科分类
    
    -- 数学 → 代数学
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_subject_id, algebra_id, 'required'
    WHERE math_subject_id IS NOT NULL AND algebra_id IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = math_subject_id AND target_node_id = algebra_id
    );
    
    -- 数学 → 几何学
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_subject_id, geometry_id, 'required'
    WHERE math_subject_id IS NOT NULL AND geometry_id IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = math_subject_id AND target_node_id = geometry_id
    );
    
    -- 数学 → 函数论
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_subject_id, function_theory_id, 'required'
    WHERE math_subject_id IS NOT NULL AND function_theory_id IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = math_subject_id AND target_node_id = function_theory_id
    );
    
    -- 数学 → 数学分析（数学分析需要基础知识点，但也可以通过函数论来学习，所以设为recommended）
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_subject_id, math_analysis_id, 'recommended'
    WHERE math_subject_id IS NOT NULL AND math_analysis_id IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = math_subject_id AND target_node_id = math_analysis_id
    );
    
    -- 数学 → 数论
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_subject_id, number_theory_id, 'required'
    WHERE math_subject_id IS NOT NULL AND number_theory_id IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = math_subject_id AND target_node_id = number_theory_id
    );
    
    -- 数学 → 概率论
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_subject_id, probability_id, 'required'
    WHERE math_subject_id IS NOT NULL AND probability_id IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = math_subject_id AND target_node_id = probability_id
    );
    
    -- 插入依赖关系：基础学科分类 → 进阶学科分类
    -- 代数学 → 代数几何学（已存在，跳过）
    -- 几何学 → 代数几何学（已存在，跳过）
    -- 函数论 → 偏微分方程（已存在，跳过）
    -- 数学分析 → 偏微分方程（已存在，跳过）
    
    -- 数学分析 → 常微分方程
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_analysis_id, ode_id, 'required'
    WHERE math_analysis_id IS NOT NULL AND ode_id IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = math_analysis_id AND target_node_id = ode_id
    );
    
    -- 函数论 → 常微分方程
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT function_theory_id, ode_id, 'required'
    WHERE function_theory_id IS NOT NULL AND ode_id IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = function_theory_id AND target_node_id = ode_id
    );
    
    -- 数学分析 → 泛函分析
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_analysis_id, functional_analysis_id, 'required'
    WHERE math_analysis_id IS NOT NULL AND functional_analysis_id IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = math_analysis_id AND target_node_id = functional_analysis_id
    );
    
    -- 函数论 → 泛函分析
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT function_theory_id, functional_analysis_id, 'required'
    WHERE function_theory_id IS NOT NULL AND functional_analysis_id IS NOT NULL
    AND NOT EXISTS (
        SELECT 1 FROM pikun_db.knowledge_dependencies 
        WHERE source_node_id = function_theory_id AND target_node_id = functional_analysis_id
    );
    
    RAISE NOTICE '数学分类依赖关系已更新：基础知识点 → 基础学科分类 → 进阶学科分类';
END $$;

-- ============================================
-- 第二部分：调整现有的分类之间的依赖关系
-- 删除一些不合理的依赖关系，确保逻辑清晰
-- ============================================

-- 删除函数论 → 数学分析的依赖（因为数学分析应该直接从数学基础开始）
DELETE FROM pikun_db.knowledge_dependencies
WHERE source_node_id = (SELECT node_id FROM pikun_db.knowledge_nodes WHERE name = '函数论' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da')
  AND target_node_id = (SELECT node_id FROM pikun_db.knowledge_nodes WHERE name = '数学分析' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da');

-- 显示更新后的依赖关系统计
SELECT 
    '数学 → 基础学科分类' as category,
    COUNT(*) as count
FROM pikun_db.knowledge_dependencies kd
JOIN pikun_db.knowledge_nodes kn1 ON kn1.node_id = kd.source_node_id
JOIN pikun_db.knowledge_nodes kn2 ON kn2.node_id = kd.target_node_id
WHERE kn1.node_id = '46e71877-9bf9-4aeb-9d13-293f41b10ba2'
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
  AND kn2.node_type = 'subject_category';


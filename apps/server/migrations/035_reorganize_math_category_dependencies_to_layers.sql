-- 重新组织数学分类的依赖关系，使其形成层级结构
-- 创建时间: 2025-01-XX
-- 目标：基础分类直接依赖"数学"subject，高级分类依赖基础分类，而不是都直接依赖"数学"subject

SET search_path TO pikun_db, public;

-- 禁用循环依赖检测
ALTER TABLE pikun_db.knowledge_dependencies DISABLE TRIGGER prevent_knowledge_dependency_cycle;

DO $$
DECLARE
    math_subject_id UUID := '46e71877-9bf9-4aeb-9d13-293f41b10ba2';
    
    -- 基础学科分类（第一层：直接依赖"数学"subject）
    algebra_id UUID;
    geometry_id UUID;
    function_theory_id UUID;
    math_analysis_id UUID;
    number_theory_id UUID;
    probability_id UUID;
    discrete_math_id UUID;
    math_logic_id UUID;
    
    -- 中级学科分类（第二层：依赖基础分类）
    algebraic_geometry_id UUID;
    topology_id UUID;
    functional_analysis_id UUID;
    differential_equation_id UUID;
    ode_id UUID;
    pde_id UUID;
    dynamical_systems_id UUID;
    computational_math_id UUID;
    operations_research_id UUID;
    mathematical_statistics_id UUID;
    
    -- 高级学科分类（第三层：依赖中级或基础分类）
    math_history_id UUID;
    math_other_id UUID;
    fuzzy_math_id UUID;
    integral_equation_id UUID;
    combinatorics_id UUID;
    computer_math_id UUID;
    nonstandard_analysis_id UUID;
    applied_statistics_id UUID;
    applied_math_id UUID;
BEGIN
    -- 获取基础学科分类ID（第一层）
    SELECT node_id INTO algebra_id FROM pikun_db.knowledge_nodes WHERE name = '代数学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO geometry_id FROM pikun_db.knowledge_nodes WHERE name = '几何学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO function_theory_id FROM pikun_db.knowledge_nodes WHERE name = '函数论' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO math_analysis_id FROM pikun_db.knowledge_nodes WHERE name = '数学分析' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO number_theory_id FROM pikun_db.knowledge_nodes WHERE name = '数论' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO probability_id FROM pikun_db.knowledge_nodes WHERE name = '概率论' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO discrete_math_id FROM pikun_db.knowledge_nodes WHERE name = '离散数学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO math_logic_id FROM pikun_db.knowledge_nodes WHERE name = '数理逻辑与数学基础' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    
    -- 获取中级学科分类ID（第二层）
    SELECT node_id INTO algebraic_geometry_id FROM pikun_db.knowledge_nodes WHERE name = '代数几何学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO topology_id FROM pikun_db.knowledge_nodes WHERE name = '拓扑学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO functional_analysis_id FROM pikun_db.knowledge_nodes WHERE name = '泛函分析' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO differential_equation_id FROM pikun_db.knowledge_nodes WHERE name = '常微分方程' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO ode_id FROM pikun_db.knowledge_nodes WHERE name = '常微分方程' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO pde_id FROM pikun_db.knowledge_nodes WHERE name = '偏微分方程' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO dynamical_systems_id FROM pikun_db.knowledge_nodes WHERE name = '动力系统' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO computational_math_id FROM pikun_db.knowledge_nodes WHERE name = '计算数学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO operations_research_id FROM pikun_db.knowledge_nodes WHERE name = '运筹学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO mathematical_statistics_id FROM pikun_db.knowledge_nodes WHERE name = '数理统计学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    
    -- 获取高级学科分类ID（第三层）
    SELECT node_id INTO math_history_id FROM pikun_db.knowledge_nodes WHERE name = '数学史' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO math_other_id FROM pikun_db.knowledge_nodes WHERE name = '数学其他学科' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO fuzzy_math_id FROM pikun_db.knowledge_nodes WHERE name = '模糊数学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO integral_equation_id FROM pikun_db.knowledge_nodes WHERE name = '积分方程' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO combinatorics_id FROM pikun_db.knowledge_nodes WHERE name = '组合数学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO computer_math_id FROM pikun_db.knowledge_nodes WHERE name = '计算机数学  41330 信息技术系统性应用' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO nonstandard_analysis_id FROM pikun_db.knowledge_nodes WHERE name = '非标准分析' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO applied_statistics_id FROM pikun_db.knowledge_nodes WHERE name = '应用统计数学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO applied_math_id FROM pikun_db.knowledge_nodes WHERE name = '应用数学 具体应用入有关学科' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    
    -- 第一步：删除所有高级分类直接到"数学"subject的依赖
    DELETE FROM pikun_db.knowledge_dependencies
    WHERE source_node_id = math_subject_id
      AND target_node_id IN (
        math_history_id, math_other_id, fuzzy_math_id, integral_equation_id,
        combinatorics_id, computer_math_id, nonstandard_analysis_id,
        applied_statistics_id, applied_math_id
      );
    
    -- 第二步：删除所有中级分类直接到"数学"subject的依赖（如果存在）
    DELETE FROM pikun_db.knowledge_dependencies
    WHERE source_node_id = math_subject_id
      AND target_node_id IN (
        algebraic_geometry_id, topology_id, functional_analysis_id,
        differential_equation_id, ode_id, pde_id, dynamical_systems_id,
        computational_math_id, operations_research_id, mathematical_statistics_id
      );
    
    -- 第三步：确保基础分类直接依赖"数学"subject（如果还没有）
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_subject_id, cat_id, 'required'
    FROM (VALUES
      (algebra_id), (geometry_id), (function_theory_id), (math_analysis_id),
      (number_theory_id), (probability_id), (discrete_math_id), (math_logic_id)
    ) AS cats(cat_id)
    WHERE cat_id IS NOT NULL
    AND NOT EXISTS (
      SELECT 1 FROM pikun_db.knowledge_dependencies
      WHERE source_node_id = math_subject_id AND target_node_id = cat_id
    );
    
    -- 第四步：建立中级分类到基础分类的依赖（如果还没有）
    -- 代数几何学 -> 代数学 + 几何学
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT algebra_id, algebraic_geometry_id, 'required'
    WHERE algebra_id IS NOT NULL AND algebraic_geometry_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = algebra_id AND target_node_id = algebraic_geometry_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT geometry_id, algebraic_geometry_id, 'required'
    WHERE geometry_id IS NOT NULL AND algebraic_geometry_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = geometry_id AND target_node_id = algebraic_geometry_id);
    
    -- 拓扑学 -> 几何学
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT geometry_id, topology_id, 'recommended'
    WHERE geometry_id IS NOT NULL AND topology_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = geometry_id AND target_node_id = topology_id);
    
    -- 泛函分析 -> 函数论 + 数学分析
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT function_theory_id, functional_analysis_id, 'required'
    WHERE function_theory_id IS NOT NULL AND functional_analysis_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = function_theory_id AND target_node_id = functional_analysis_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_analysis_id, functional_analysis_id, 'required'
    WHERE math_analysis_id IS NOT NULL AND functional_analysis_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_analysis_id AND target_node_id = functional_analysis_id);
    
    -- 常微分方程 -> 函数论 + 数学分析
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT function_theory_id, ode_id, 'required'
    WHERE function_theory_id IS NOT NULL AND ode_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = function_theory_id AND target_node_id = ode_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_analysis_id, ode_id, 'required'
    WHERE math_analysis_id IS NOT NULL AND ode_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_analysis_id AND target_node_id = ode_id);
    
    -- 偏微分方程 -> 函数论 + 数学分析
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT function_theory_id, pde_id, 'required'
    WHERE function_theory_id IS NOT NULL AND pde_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = function_theory_id AND target_node_id = pde_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_analysis_id, pde_id, 'required'
    WHERE math_analysis_id IS NOT NULL AND pde_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_analysis_id AND target_node_id = pde_id);
    
    -- 动力系统 -> 函数论 + 数学分析
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT function_theory_id, dynamical_systems_id, 'required'
    WHERE function_theory_id IS NOT NULL AND dynamical_systems_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = function_theory_id AND target_node_id = dynamical_systems_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_analysis_id, dynamical_systems_id, 'recommended'
    WHERE math_analysis_id IS NOT NULL AND dynamical_systems_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_analysis_id AND target_node_id = dynamical_systems_id);
    
    -- 计算数学 -> 代数学 + 数学分析
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT algebra_id, computational_math_id, 'required'
    WHERE algebra_id IS NOT NULL AND computational_math_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = algebra_id AND target_node_id = computational_math_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_analysis_id, computational_math_id, 'required'
    WHERE math_analysis_id IS NOT NULL AND computational_math_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_analysis_id AND target_node_id = computational_math_id);
    
    -- 运筹学 -> 代数学 + 数学分析
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT algebra_id, operations_research_id, 'required'
    WHERE algebra_id IS NOT NULL AND operations_research_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = algebra_id AND target_node_id = operations_research_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_analysis_id, operations_research_id, 'required'
    WHERE math_analysis_id IS NOT NULL AND operations_research_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_analysis_id AND target_node_id = operations_research_id);
    
    -- 数理统计学 -> 概率论
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT probability_id, mathematical_statistics_id, 'required'
    WHERE probability_id IS NOT NULL AND mathematical_statistics_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = probability_id AND target_node_id = mathematical_statistics_id);
    
    -- 第五步：建立高级分类到中级或基础分类的依赖
    -- 积分方程 -> 数学分析
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_analysis_id, integral_equation_id, 'required'
    WHERE math_analysis_id IS NOT NULL AND integral_equation_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_analysis_id AND target_node_id = integral_equation_id);
    
    -- 组合数学 -> 离散数学
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT discrete_math_id, combinatorics_id, 'required'
    WHERE discrete_math_id IS NOT NULL AND combinatorics_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = discrete_math_id AND target_node_id = combinatorics_id);
    
    -- 计算机数学 -> 计算数学
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT computational_math_id, computer_math_id, 'required'
    WHERE computational_math_id IS NOT NULL AND computer_math_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = computational_math_id AND target_node_id = computer_math_id);
    
    -- 非标准分析 -> 数学分析
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_analysis_id, nonstandard_analysis_id, 'required'
    WHERE math_analysis_id IS NOT NULL AND nonstandard_analysis_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_analysis_id AND target_node_id = nonstandard_analysis_id);
    
    -- 应用统计数学 -> 概率论 + 数理统计学
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT probability_id, applied_statistics_id, 'required'
    WHERE probability_id IS NOT NULL AND applied_statistics_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = probability_id AND target_node_id = applied_statistics_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT mathematical_statistics_id, applied_statistics_id, 'required'
    WHERE mathematical_statistics_id IS NOT NULL AND applied_statistics_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = mathematical_statistics_id AND target_node_id = applied_statistics_id);
    
    -- 模糊数学 -> 离散数学
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT discrete_math_id, fuzzy_math_id, 'recommended'
    WHERE discrete_math_id IS NOT NULL AND fuzzy_math_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = discrete_math_id AND target_node_id = fuzzy_math_id);
    
    -- 应用数学 -> 数学分析
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_analysis_id, applied_math_id, 'recommended'
    WHERE math_analysis_id IS NOT NULL AND applied_math_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_analysis_id AND target_node_id = applied_math_id);
    
    -- 数学史和数学其他学科：这些是元学科，可以依赖基础分类
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_analysis_id, math_history_id, 'recommended'
    WHERE math_analysis_id IS NOT NULL AND math_history_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_analysis_id AND target_node_id = math_history_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_analysis_id, math_other_id, 'recommended'
    WHERE math_analysis_id IS NOT NULL AND math_other_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_analysis_id AND target_node_id = math_other_id);
    
    RAISE NOTICE '已重新组织数学分类的依赖关系为层级结构';
END $$;

-- 重新启用循环依赖检测
ALTER TABLE pikun_db.knowledge_dependencies ENABLE TRIGGER prevent_knowledge_dependency_cycle;

-- 显示统计信息
SELECT 
    '数学subject → 基础分类' as category,
    COUNT(*) as count
FROM pikun_db.knowledge_dependencies kd
WHERE kd.source_node_id = '46e71877-9bf9-4aeb-9d13-293f41b10ba2'
  AND kd.target_node_id IN (
    SELECT node_id FROM pikun_db.knowledge_nodes 
    WHERE parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da' 
    AND node_type = 'subject_category'
    AND name IN ('代数学', '几何学', '函数论', '数学分析', '数论', '概率论', '离散数学', '数理逻辑与数学基础')
  );




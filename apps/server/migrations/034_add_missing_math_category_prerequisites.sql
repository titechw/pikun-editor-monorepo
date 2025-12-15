-- 补充缺失的数学分类前置学习条件
-- 创建时间: 2025-01-XX
-- 目标：确保所有学科分类都有合理的前置学习条件

SET search_path TO pikun_db, public;

-- 禁用循环依赖检测
ALTER TABLE pikun_db.knowledge_dependencies DISABLE TRIGGER prevent_knowledge_dependency_cycle;

DO $$
DECLARE
    math_subject_id UUID := '46e71877-9bf9-4aeb-9d13-293f41b10ba2';
    
    -- 基础学科分类（应该先学）
    algebra_id UUID;
    geometry_id UUID;
    function_theory_id UUID;
    math_analysis_id UUID;
    number_theory_id UUID;
    probability_id UUID;
    discrete_math_id UUID;
    
    -- 需要基础知识的分类
    math_history_id UUID;
    math_other_id UUID;
    fuzzy_math_id UUID;
    integral_equation_id UUID;
    combinatorics_id UUID;
    computer_math_id UUID;
    nonstandard_analysis_id UUID;
    applied_statistics_id UUID;
    operations_research_id UUID;
    computational_math_id UUID;
BEGIN
    -- 获取基础学科分类ID
    SELECT node_id INTO algebra_id FROM pikun_db.knowledge_nodes WHERE name = '代数学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO geometry_id FROM pikun_db.knowledge_nodes WHERE name = '几何学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO function_theory_id FROM pikun_db.knowledge_nodes WHERE name = '函数论' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO math_analysis_id FROM pikun_db.knowledge_nodes WHERE name = '数学分析' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO number_theory_id FROM pikun_db.knowledge_nodes WHERE name = '数论' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO probability_id FROM pikun_db.knowledge_nodes WHERE name = '概率论' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO discrete_math_id FROM pikun_db.knowledge_nodes WHERE name = '离散数学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    
    -- 获取需要基础知识的分类ID
    SELECT node_id INTO math_history_id FROM pikun_db.knowledge_nodes WHERE name = '数学史' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO math_other_id FROM pikun_db.knowledge_nodes WHERE name = '数学其他学科' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO fuzzy_math_id FROM pikun_db.knowledge_nodes WHERE name = '模糊数学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO integral_equation_id FROM pikun_db.knowledge_nodes WHERE name = '积分方程' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO combinatorics_id FROM pikun_db.knowledge_nodes WHERE name = '组合数学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO computer_math_id FROM pikun_db.knowledge_nodes WHERE name = '计算机数学  41330 信息技术系统性应用' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO nonstandard_analysis_id FROM pikun_db.knowledge_nodes WHERE name = '非标准分析' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO applied_statistics_id FROM pikun_db.knowledge_nodes WHERE name = '应用统计数学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO operations_research_id FROM pikun_db.knowledge_nodes WHERE name = '运筹学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO computational_math_id FROM pikun_db.knowledge_nodes WHERE name = '计算数学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    
    -- 所有分类都需要先学"数学"subject（基础知识点）
    -- 数学史：需要基础数学知识
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_subject_id, math_history_id, 'required'
    WHERE math_subject_id IS NOT NULL AND math_history_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_subject_id AND target_node_id = math_history_id);
    
    -- 数学其他学科：需要基础数学知识
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_subject_id, math_other_id, 'required'
    WHERE math_subject_id IS NOT NULL AND math_other_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_subject_id AND target_node_id = math_other_id);
    
    -- 模糊数学：需要基础数学知识、集合论
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_subject_id, fuzzy_math_id, 'required'
    WHERE math_subject_id IS NOT NULL AND fuzzy_math_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_subject_id AND target_node_id = fuzzy_math_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT discrete_math_id, fuzzy_math_id, 'recommended'
    WHERE discrete_math_id IS NOT NULL AND fuzzy_math_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = discrete_math_id AND target_node_id = fuzzy_math_id);
    
    -- 积分方程：需要数学分析
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_subject_id, integral_equation_id, 'required'
    WHERE math_subject_id IS NOT NULL AND integral_equation_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_subject_id AND target_node_id = integral_equation_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_analysis_id, integral_equation_id, 'required'
    WHERE math_analysis_id IS NOT NULL AND integral_equation_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_analysis_id AND target_node_id = integral_equation_id);
    
    -- 组合数学：需要基础数学知识、离散数学
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_subject_id, combinatorics_id, 'required'
    WHERE math_subject_id IS NOT NULL AND combinatorics_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_subject_id AND target_node_id = combinatorics_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT discrete_math_id, combinatorics_id, 'required'
    WHERE discrete_math_id IS NOT NULL AND combinatorics_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = discrete_math_id AND target_node_id = combinatorics_id);
    
    -- 计算机数学：需要基础数学知识、计算数学
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_subject_id, computer_math_id, 'required'
    WHERE math_subject_id IS NOT NULL AND computer_math_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_subject_id AND target_node_id = computer_math_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT computational_math_id, computer_math_id, 'required'
    WHERE computational_math_id IS NOT NULL AND computer_math_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = computational_math_id AND target_node_id = computer_math_id);
    
    -- 非标准分析：需要数学分析
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_subject_id, nonstandard_analysis_id, 'required'
    WHERE math_subject_id IS NOT NULL AND nonstandard_analysis_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_subject_id AND target_node_id = nonstandard_analysis_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_analysis_id, nonstandard_analysis_id, 'required'
    WHERE math_analysis_id IS NOT NULL AND nonstandard_analysis_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_analysis_id AND target_node_id = nonstandard_analysis_id);
    
    -- 应用统计数学：需要概率论、数理统计学
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_subject_id, applied_statistics_id, 'required'
    WHERE math_subject_id IS NOT NULL AND applied_statistics_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_subject_id AND target_node_id = applied_statistics_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT probability_id, applied_statistics_id, 'required'
    WHERE probability_id IS NOT NULL AND applied_statistics_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = probability_id AND target_node_id = applied_statistics_id);
    
    RAISE NOTICE '已添加所有分类的前置学习条件';
END $$;

-- 重新启用循环依赖检测
ALTER TABLE pikun_db.knowledge_dependencies ENABLE TRIGGER prevent_knowledge_dependency_cycle;

-- 显示统计信息
SELECT 
    '数学subject → 所有分类' as category,
    COUNT(*) as count
FROM pikun_db.knowledge_dependencies kd
WHERE kd.source_node_id = '46e71877-9bf9-4aeb-9d13-293f41b10ba2'
  AND kd.target_node_id IN (
    SELECT node_id FROM pikun_db.knowledge_nodes 
    WHERE parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da' 
    AND node_type = 'subject_category'
  );




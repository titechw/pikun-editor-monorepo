-- 添加"数学"subject到学科分类的依赖关系
-- 创建时间: 2025-01-XX
-- 目标：通过"数学"subject作为中间层，避免知识点直接指向分类导致的混乱

SET search_path TO pikun_db, public;

-- 删除知识点直接到分类的依赖关系（避免混乱）
DELETE FROM pikun_db.knowledge_dependencies
WHERE source_node_id IN (
  SELECT node_id FROM pikun_db.knowledge_nodes 
  WHERE parent_id = '46e71877-9bf9-4aeb-9d13-293f41b10ba2' 
  AND node_type = 'knowledge_point'
)
AND target_node_id IN (
  SELECT node_id FROM pikun_db.knowledge_nodes 
  WHERE parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da' 
  AND node_type = 'subject_category'
);

-- 添加"数学"subject到基础学科分类的依赖关系
-- 逻辑：必须先掌握基础知识点（通过"数学"subject），才能学习基础学科分类
DO $$
DECLARE
    math_subject_id UUID := '46e71877-9bf9-4aeb-9d13-293f41b10ba2';
    
    -- 基础学科分类
    algebra_id UUID;
    geometry_id UUID;
    function_theory_id UUID;
    math_analysis_id UUID;
    number_theory_id UUID;
    probability_id UUID;
    discrete_math_id UUID;
    logic_foundation_id UUID;
BEGIN
    -- 获取基础学科分类ID
    SELECT node_id INTO algebra_id FROM pikun_db.knowledge_nodes WHERE name = '代数学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO geometry_id FROM pikun_db.knowledge_nodes WHERE name = '几何学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO function_theory_id FROM pikun_db.knowledge_nodes WHERE name = '函数论' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO math_analysis_id FROM pikun_db.knowledge_nodes WHERE name = '数学分析' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO number_theory_id FROM pikun_db.knowledge_nodes WHERE name = '数论' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO probability_id FROM pikun_db.knowledge_nodes WHERE name = '概率论' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO discrete_math_id FROM pikun_db.knowledge_nodes WHERE name = '离散数学' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    SELECT node_id INTO logic_foundation_id FROM pikun_db.knowledge_nodes WHERE name = '数理逻辑与数学基础' AND node_type = 'subject_category' AND parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da';
    
    -- 插入依赖关系："数学"subject → 基础学科分类
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_subject_id, algebra_id, 'required'
    WHERE math_subject_id IS NOT NULL AND algebra_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_subject_id AND target_node_id = algebra_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_subject_id, geometry_id, 'required'
    WHERE math_subject_id IS NOT NULL AND geometry_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_subject_id AND target_node_id = geometry_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_subject_id, function_theory_id, 'required'
    WHERE math_subject_id IS NOT NULL AND function_theory_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_subject_id AND target_node_id = function_theory_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_subject_id, math_analysis_id, 'required'
    WHERE math_subject_id IS NOT NULL AND math_analysis_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_subject_id AND target_node_id = math_analysis_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_subject_id, number_theory_id, 'required'
    WHERE math_subject_id IS NOT NULL AND number_theory_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_subject_id AND target_node_id = number_theory_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_subject_id, probability_id, 'required'
    WHERE math_subject_id IS NOT NULL AND probability_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_subject_id AND target_node_id = probability_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_subject_id, discrete_math_id, 'required'
    WHERE math_subject_id IS NOT NULL AND discrete_math_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_subject_id AND target_node_id = discrete_math_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT math_subject_id, logic_foundation_id, 'required'
    WHERE math_subject_id IS NOT NULL AND logic_foundation_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = math_subject_id AND target_node_id = logic_foundation_id);
    
    RAISE NOTICE '已添加"数学"subject到基础学科分类的依赖关系，并删除知识点直接到分类的依赖关系';
END $$;

-- 显示统计信息
SELECT 
    '数学subject → 基础学科分类' as category,
    COUNT(*) as count
FROM pikun_db.knowledge_dependencies kd
WHERE kd.source_node_id = '46e71877-9bf9-4aeb-9d13-293f41b10ba2'
  AND kd.target_node_id IN (
    SELECT node_id FROM pikun_db.knowledge_nodes 
    WHERE parent_id = 'b4ed5821-8e44-4889-868e-bd0df57a00da' 
    AND node_type = 'subject_category'
  );




-- 为数学知识点添加依赖关系，形成学习路径
-- 创建时间: 2025-01-XX
-- 目标：让知识点之间形成合理的学习顺序，从基础到进阶

SET search_path TO pikun_db, public;

-- 禁用循环依赖检测
ALTER TABLE pikun_db.knowledge_dependencies DISABLE TRIGGER prevent_knowledge_dependency_cycle;

DO $$
DECLARE
    math_subject_id UUID := '46e71877-9bf9-4aeb-9d13-293f41b10ba2';
    
    -- 基础知识点
    number_recognition_id UUID;
    addition_subtraction_id UUID;
    multiplication_division_id UUID;
    fraction_basics_id UUID;
    
    -- 代数基础
    linear_equation_one_id UUID;
    linear_equation_two_id UUID;
    quadratic_equation_id UUID;
    linear_system_id UUID;
    
    -- 函数基础
    function_basics_id UUID;
    function_id UUID;
    linear_function_id UUID;
    quadratic_function_id UUID;
    trigonometric_basics_id UUID;
    trigonometric_id UUID;
    
    -- 几何基础
    geometric_shapes_id UUID;
    triangle_id UUID;
    quadrilateral_id UUID;
    circle_id UUID;
    
    -- 向量和矩阵
    vector_id UUID;
    matrix_id UUID;
    matrix_advanced_id UUID;
    
    -- 其他
    inequality_id UUID;
BEGIN
    -- 获取基础知识点ID
    SELECT node_id INTO number_recognition_id FROM pikun_db.knowledge_nodes WHERE name = '数的认识' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO addition_subtraction_id FROM pikun_db.knowledge_nodes WHERE name = '加减法' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO multiplication_division_id FROM pikun_db.knowledge_nodes WHERE name = '乘除法' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO fraction_basics_id FROM pikun_db.knowledge_nodes WHERE name = '分数初步' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    
    -- 获取代数基础知识点ID
    SELECT node_id INTO linear_equation_one_id FROM pikun_db.knowledge_nodes WHERE name = '一元一次方程' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO linear_equation_two_id FROM pikun_db.knowledge_nodes WHERE name = '一元一次方程' AND parent_id = math_subject_id AND node_type = 'knowledge_point' ORDER BY created_at LIMIT 1 OFFSET 1;
    SELECT node_id INTO quadratic_equation_id FROM pikun_db.knowledge_nodes WHERE name = '一元二次方程' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO linear_system_id FROM pikun_db.knowledge_nodes WHERE name = '线性方程组' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    
    -- 获取函数基础知识点ID
    SELECT node_id INTO function_basics_id FROM pikun_db.knowledge_nodes WHERE name = '函数基础' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO function_id FROM pikun_db.knowledge_nodes WHERE name = '函数' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO linear_function_id FROM pikun_db.knowledge_nodes WHERE name = '一次函数' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO quadratic_function_id FROM pikun_db.knowledge_nodes WHERE name = '二次函数' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO trigonometric_basics_id FROM pikun_db.knowledge_nodes WHERE name = '三角函数基础' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO trigonometric_id FROM pikun_db.knowledge_nodes WHERE name = '三角函数' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    
    -- 获取几何基础知识点ID
    SELECT node_id INTO geometric_shapes_id FROM pikun_db.knowledge_nodes WHERE name = '几何图形认识' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO triangle_id FROM pikun_db.knowledge_nodes WHERE name = '三角形' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO quadrilateral_id FROM pikun_db.knowledge_nodes WHERE name = '四边形' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO circle_id FROM pikun_db.knowledge_nodes WHERE name = '圆' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    
    -- 获取向量和矩阵知识点ID
    SELECT node_id INTO vector_id FROM pikun_db.knowledge_nodes WHERE name = '向量' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO matrix_id FROM pikun_db.knowledge_nodes WHERE name = '矩阵' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    SELECT node_id INTO matrix_advanced_id FROM pikun_db.knowledge_nodes WHERE name = '矩阵运算进阶' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    
    -- 获取其他知识点ID
    SELECT node_id INTO inequality_id FROM pikun_db.knowledge_nodes WHERE name = '不等式' AND parent_id = math_subject_id AND node_type = 'knowledge_point' LIMIT 1;
    
    -- 1. 基础运算的依赖关系：数的认识 → 加减法 → 乘除法 → 分数初步
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT number_recognition_id, addition_subtraction_id, 'required'
    WHERE number_recognition_id IS NOT NULL AND addition_subtraction_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = number_recognition_id AND target_node_id = addition_subtraction_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT addition_subtraction_id, multiplication_division_id, 'required'
    WHERE addition_subtraction_id IS NOT NULL AND multiplication_division_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = addition_subtraction_id AND target_node_id = multiplication_division_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT multiplication_division_id, fraction_basics_id, 'required'
    WHERE multiplication_division_id IS NOT NULL AND fraction_basics_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = multiplication_division_id AND target_node_id = fraction_basics_id);
    
    -- 2. 代数方程的依赖关系：加减法 → 一元一次方程 → 一元二次方程 → 线性方程组
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT addition_subtraction_id, linear_equation_one_id, 'required'
    WHERE addition_subtraction_id IS NOT NULL AND linear_equation_one_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = addition_subtraction_id AND target_node_id = linear_equation_one_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT linear_equation_one_id, quadratic_equation_id, 'required'
    WHERE linear_equation_one_id IS NOT NULL AND quadratic_equation_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = linear_equation_one_id AND target_node_id = quadratic_equation_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT linear_equation_one_id, linear_system_id, 'required'
    WHERE linear_equation_one_id IS NOT NULL AND linear_system_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = linear_equation_one_id AND target_node_id = linear_system_id);
    
    -- 3. 函数的依赖关系：函数基础 → 函数 → 一次函数 → 二次函数 → 三角函数
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT function_basics_id, function_id, 'required'
    WHERE function_basics_id IS NOT NULL AND function_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = function_basics_id AND target_node_id = function_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT function_id, linear_function_id, 'required'
    WHERE function_id IS NOT NULL AND linear_function_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = function_id AND target_node_id = linear_function_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT linear_function_id, quadratic_function_id, 'required'
    WHERE linear_function_id IS NOT NULL AND quadratic_function_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = linear_function_id AND target_node_id = quadratic_function_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT quadratic_function_id, trigonometric_basics_id, 'required'
    WHERE quadratic_function_id IS NOT NULL AND trigonometric_basics_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = quadratic_function_id AND target_node_id = trigonometric_basics_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT trigonometric_basics_id, trigonometric_id, 'required'
    WHERE trigonometric_basics_id IS NOT NULL AND trigonometric_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = trigonometric_basics_id AND target_node_id = trigonometric_id);
    
    -- 4. 几何的依赖关系：几何图形认识 → 三角形 → 四边形 → 圆
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT geometric_shapes_id, triangle_id, 'required'
    WHERE geometric_shapes_id IS NOT NULL AND triangle_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = geometric_shapes_id AND target_node_id = triangle_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT triangle_id, quadrilateral_id, 'required'
    WHERE triangle_id IS NOT NULL AND quadrilateral_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = triangle_id AND target_node_id = quadrilateral_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT quadrilateral_id, circle_id, 'required'
    WHERE quadrilateral_id IS NOT NULL AND circle_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = quadrilateral_id AND target_node_id = circle_id);
    
    -- 5. 向量和矩阵的依赖关系：向量 → 矩阵 → 矩阵运算进阶
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT vector_id, matrix_id, 'required'
    WHERE vector_id IS NOT NULL AND matrix_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = vector_id AND target_node_id = matrix_id);
    
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT matrix_id, matrix_advanced_id, 'required'
    WHERE matrix_id IS NOT NULL AND matrix_advanced_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = matrix_id AND target_node_id = matrix_advanced_id);
    
    -- 6. 跨领域的依赖关系
    -- 一元一次方程 → 一次函数
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT linear_equation_one_id, linear_function_id, 'required'
    WHERE linear_equation_one_id IS NOT NULL AND linear_function_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = linear_equation_one_id AND target_node_id = linear_function_id);
    
    -- 一元二次方程 → 二次函数
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT quadratic_equation_id, quadratic_function_id, 'required'
    WHERE quadratic_equation_id IS NOT NULL AND quadratic_function_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = quadratic_equation_id AND target_node_id = quadratic_function_id);
    
    -- 乘除法 → 不等式
    INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type)
    SELECT multiplication_division_id, inequality_id, 'required'
    WHERE multiplication_division_id IS NOT NULL AND inequality_id IS NOT NULL
    AND NOT EXISTS (SELECT 1 FROM pikun_db.knowledge_dependencies WHERE source_node_id = multiplication_division_id AND target_node_id = inequality_id);
    
    RAISE NOTICE '已添加数学知识点之间的依赖关系';
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




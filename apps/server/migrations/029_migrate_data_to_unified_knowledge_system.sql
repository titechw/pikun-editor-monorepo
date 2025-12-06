-- 数据迁移：将现有数据迁移到统一的知识节点系统
-- 创建时间: 2025-01-XX

SET search_path TO pikun_db, public;

-- ============================================
-- 第一步：迁移基础能力（foundational_abilities → knowledge_nodes）
-- ============================================

INSERT INTO pikun_db.knowledge_nodes (node_id, parent_id, node_type, code, name, description, sort_order, created_at, updated_at)
SELECT 
    ability_id AS node_id,
    NULL AS parent_id,
    'foundational_ability' AS node_type,
    code,
    name,
    description,
    COALESCE(sort_order, 0) AS sort_order,
    created_at,
    updated_at
FROM pikun_db.foundational_abilities
WHERE deleted_at IS NULL
ON CONFLICT DO NOTHING;

-- ============================================
-- 第二步：迁移学科门类（subject_domains → knowledge_nodes）
-- ============================================

INSERT INTO pikun_db.knowledge_nodes (node_id, parent_id, node_type, code, name, description, sort_order, created_at, updated_at)
SELECT 
    domain_id AS node_id,
    NULL AS parent_id,
    'subject_domain' AS node_type,
    code,
    name,
    description,
    COALESCE(sort_order, 0) AS sort_order,
    created_at,
    updated_at
FROM pikun_db.subject_domains
WHERE deleted_at IS NULL
ON CONFLICT DO NOTHING;

-- ============================================
-- 第三步：迁移学科分类（subject_categories → knowledge_nodes）
-- 注意：需要根据 domain_category_mappings 设置 parent_id
-- ============================================

INSERT INTO pikun_db.knowledge_nodes (node_id, parent_id, node_type, code, name, description, metadata, sort_order, created_at, updated_at)
SELECT 
    sc.category_id AS node_id,
    COALESCE(dcm.domain_id, sc.parent_id) AS parent_id, -- 优先使用 domain_id，如果没有则使用原来的 parent_id
    'subject_category' AS node_type,
    sc.code,
    sc.name,
    sc.description,
    jsonb_build_object(
        'icon_url', sc.icon_url,
        'level', sc.level,
        'path', sc.path
    ) AS metadata,
    COALESCE(sc.sort_order, 0) AS sort_order,
    sc.created_at,
    sc.updated_at
FROM pikun_db.subject_categories sc
LEFT JOIN pikun_db.domain_category_mappings dcm ON sc.category_id = dcm.category_id
WHERE sc.deleted_at IS NULL
ON CONFLICT DO NOTHING;

-- ============================================
-- 第四步：迁移学科（subjects → knowledge_nodes）
-- ============================================

INSERT INTO pikun_db.knowledge_nodes (node_id, parent_id, node_type, code, name, description, metadata, sort_order, created_at, updated_at)
SELECT 
    subject_id AS node_id,
    category_id AS parent_id,
    'subject' AS node_type,
    code,
    name,
    NULL AS description, -- subjects 表没有 description 字段
    jsonb_build_object(
        'category_id', category_id,
        'short_name', short_name,
        'icon_url', icon_url,
        'cover_image_url', cover_image_url,
        'is_published', is_published
    ) AS metadata,
    COALESCE(sort_order, 0) AS sort_order,
    created_at,
    updated_at
FROM pikun_db.subjects
WHERE deleted_at IS NULL
ON CONFLICT DO NOTHING;

-- ============================================
-- 第五步：迁移知识点（knowledge_points → knowledge_nodes）
-- 注意：parent_point_id 需要转换为对应的 node_id
-- ============================================

INSERT INTO pikun_db.knowledge_nodes (node_id, parent_id, node_type, code, name, description, metadata, sort_order, created_at, updated_at)
SELECT 
    point_id AS node_id,
    -- parent_point_id 如果存在，则使用它；否则使用 subject_id
    COALESCE(parent_point_id, subject_id) AS parent_id,
    'knowledge_point' AS node_type,
    code,
    name,
    description,
    jsonb_build_object(
        'subject_id', subject_id,
        'difficulty', difficulty,
        'estimated_time', estimated_time
    ) AS metadata,
    COALESCE(sort_order, 0) AS sort_order,
    created_at,
    updated_at
FROM pikun_db.knowledge_points
WHERE deleted_at IS NULL
ON CONFLICT DO NOTHING;

-- ============================================
-- 第六步：迁移依赖关系
-- ============================================

-- 6.1 迁移基础能力依赖关系（foundational_ability_dependencies → knowledge_dependencies）
INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type, created_at)
SELECT 
    prerequisite_ability_id AS source_node_id,
    ability_id AS target_node_id,
    dependency_type,
    created_at
FROM pikun_db.foundational_ability_dependencies
ON CONFLICT DO NOTHING;

-- 6.2 迁移学科依赖关系（subject_dependencies → knowledge_dependencies）
INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type, created_at)
SELECT 
    prerequisite_subject_id AS source_node_id,
    subject_id AS target_node_id,
    dependency_type,
    created_at
FROM pikun_db.subject_dependencies
ON CONFLICT DO NOTHING;

-- 6.3 迁移知识点依赖关系（knowledge_point_dependencies → knowledge_dependencies）
INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type, created_at)
SELECT 
    prerequisite_point_id AS source_node_id,
    point_id AS target_node_id,
    dependency_type,
    created_at
FROM pikun_db.knowledge_point_dependencies
ON CONFLICT DO NOTHING;

-- 6.4 迁移学科门类对基础能力的要求（domain_foundational_ability_requirements → knowledge_dependencies）
INSERT INTO pikun_db.knowledge_dependencies (source_node_id, target_node_id, dependency_type, created_at)
SELECT 
    ability_id AS source_node_id,
    domain_id AS target_node_id,
    requirement_type AS dependency_type,
    created_at
FROM pikun_db.domain_foundational_ability_requirements
ON CONFLICT DO NOTHING;

-- ============================================
-- 第七步：验证数据迁移
-- ============================================

-- 统计各类型节点数量
DO $$
DECLARE
    ability_count INTEGER;
    domain_count INTEGER;
    category_count INTEGER;
    subject_count INTEGER;
    point_count INTEGER;
    dependency_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO ability_count FROM pikun_db.knowledge_nodes WHERE node_type = 'foundational_ability';
    SELECT COUNT(*) INTO domain_count FROM pikun_db.knowledge_nodes WHERE node_type = 'subject_domain';
    SELECT COUNT(*) INTO category_count FROM pikun_db.knowledge_nodes WHERE node_type = 'subject_category';
    SELECT COUNT(*) INTO subject_count FROM pikun_db.knowledge_nodes WHERE node_type = 'subject';
    SELECT COUNT(*) INTO point_count FROM pikun_db.knowledge_nodes WHERE node_type = 'knowledge_point';
    SELECT COUNT(*) INTO dependency_count FROM pikun_db.knowledge_dependencies;
    
    RAISE NOTICE '数据迁移完成：';
    RAISE NOTICE '  基础能力: %', ability_count;
    RAISE NOTICE '  学科门类: %', domain_count;
    RAISE NOTICE '  学科分类: %', category_count;
    RAISE NOTICE '  学科: %', subject_count;
    RAISE NOTICE '  知识点: %', point_count;
    RAISE NOTICE '  依赖关系: %', dependency_count;
END $$;


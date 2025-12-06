-- 统一知识系统重构
-- 创建时间: 2025-01-XX
-- 目标：统一层级关系和学习顺序关系管理，消除硬编码 level 判断

SET search_path TO pikun_db, public;

-- ============================================
-- 第一步：创建统一的知识节点表
-- ============================================

CREATE TABLE IF NOT EXISTS pikun_db.knowledge_nodes (
    node_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID REFERENCES pikun_db.knowledge_nodes(node_id) ON DELETE CASCADE, -- 父节点ID，NULL表示顶级节点
    node_type VARCHAR(50) NOT NULL CHECK (node_type IN (
        'foundational_ability',  -- 基础能力
        'subject_domain',        -- 学科门类
        'subject_category',      -- 学科分类
        'subject',               -- 学科
        'knowledge_point'        -- 知识点
    )),
    code VARCHAR(50) NOT NULL, -- 节点代码
    name VARCHAR(200) NOT NULL,
    description TEXT,
    
    -- 节点类型特定的字段（使用 JSONB 存储）
    metadata JSONB DEFAULT '{}'::JSONB, -- 存储类型特定的字段
    
    -- 通用字段
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

-- 创建索引
CREATE INDEX idx_knowledge_nodes_parent_id ON pikun_db.knowledge_nodes(parent_id);
CREATE INDEX idx_knowledge_nodes_node_type ON pikun_db.knowledge_nodes(node_type);
CREATE INDEX idx_knowledge_nodes_code ON pikun_db.knowledge_nodes(code);
CREATE INDEX idx_knowledge_nodes_deleted_at ON pikun_db.knowledge_nodes(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX idx_knowledge_nodes_parent_type ON pikun_db.knowledge_nodes(parent_id, node_type) WHERE deleted_at IS NULL;

-- 创建唯一约束：同一父节点下，code 唯一（考虑软删除）
CREATE UNIQUE INDEX idx_knowledge_nodes_parent_code_unique 
ON pikun_db.knowledge_nodes(parent_id, code) 
WHERE deleted_at IS NULL;

-- 创建更新时间触发器
CREATE TRIGGER update_knowledge_nodes_updated_at
    BEFORE UPDATE ON pikun_db.knowledge_nodes
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

COMMENT ON TABLE pikun_db.knowledge_nodes IS '统一的知识节点表，包含所有类型的知识节点（基础能力、学科门类、分类、学科、知识点）';
COMMENT ON COLUMN pikun_db.knowledge_nodes.parent_id IS '父节点ID，NULL表示顶级节点，通过parent_id形成树形结构';
COMMENT ON COLUMN pikun_db.knowledge_nodes.node_type IS '节点类型：foundational_ability（基础能力）、subject_domain（学科门类）、subject_category（学科分类）、subject（学科）、knowledge_point（知识点）';
COMMENT ON COLUMN pikun_db.knowledge_nodes.metadata IS '节点类型特定的字段，使用JSONB存储';

-- ============================================
-- 第二步：创建统一的学习顺序依赖关系表
-- ============================================

CREATE TABLE IF NOT EXISTS pikun_db.knowledge_dependencies (
    dependency_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_node_id UUID NOT NULL REFERENCES pikun_db.knowledge_nodes(node_id) ON DELETE CASCADE, -- 前置节点（需要先学的）
    target_node_id UUID NOT NULL REFERENCES pikun_db.knowledge_nodes(node_id) ON DELETE CASCADE, -- 目标节点（需要后学的）
    dependency_type VARCHAR(20) NOT NULL DEFAULT 'required' CHECK (dependency_type IN ('required', 'recommended')), -- 依赖类型：必需或推荐
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- 唯一约束：每个节点对只能有一个依赖关系
    UNIQUE(source_node_id, target_node_id),
    
    -- 检查约束：不能依赖自己
    CHECK (source_node_id != target_node_id)
);

-- 创建索引
CREATE INDEX idx_knowledge_dependencies_source_node_id ON pikun_db.knowledge_dependencies(source_node_id);
CREATE INDEX idx_knowledge_dependencies_target_node_id ON pikun_db.knowledge_dependencies(target_node_id);
CREATE INDEX idx_knowledge_dependencies_dependency_type ON pikun_db.knowledge_dependencies(dependency_type);

-- 创建更新时间触发器
CREATE TRIGGER update_knowledge_dependencies_updated_at
    BEFORE UPDATE ON pikun_db.knowledge_dependencies
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

COMMENT ON TABLE pikun_db.knowledge_dependencies IS '统一的学习顺序依赖关系表，记录任何两个节点之间的学习顺序关系';
COMMENT ON COLUMN pikun_db.knowledge_dependencies.source_node_id IS '前置节点ID（需要先学的）';
COMMENT ON COLUMN pikun_db.knowledge_dependencies.target_node_id IS '目标节点ID（需要后学的）';
COMMENT ON COLUMN pikun_db.knowledge_dependencies.dependency_type IS '依赖类型：required（必需依赖）或 recommended（推荐依赖）';

-- ============================================
-- 第三步：创建防止循环依赖的函数和触发器
-- ============================================

-- 检查是否存在循环依赖的函数
CREATE OR REPLACE FUNCTION pikun_db.check_knowledge_dependency_cycle()
RETURNS TRIGGER AS $$
DECLARE
    cycle_found BOOLEAN;
BEGIN
    -- 检查是否存在从 target_node_id 到 source_node_id 的路径（会导致循环）
    WITH RECURSIVE dependency_path AS (
        -- 起始节点：target_node_id
        SELECT NEW.target_node_id AS node_id, 1 AS depth
        UNION ALL
        -- 递归查找依赖关系
        SELECT d.source_node_id, dp.depth + 1
        FROM pikun_db.knowledge_dependencies d
        JOIN dependency_path dp ON d.target_node_id = dp.node_id
        WHERE dp.depth < 100 -- 防止无限递归
    )
    SELECT EXISTS (
        SELECT 1 FROM dependency_path WHERE node_id = NEW.source_node_id
    ) INTO cycle_found;
    
    IF cycle_found THEN
        RAISE EXCEPTION 'Circular dependency detected: Cannot create dependency from node % to node %', NEW.source_node_id, NEW.target_node_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 创建触发器
CREATE TRIGGER prevent_knowledge_dependency_cycle
    BEFORE INSERT OR UPDATE ON pikun_db.knowledge_dependencies
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.check_knowledge_dependency_cycle();

COMMENT ON FUNCTION pikun_db.check_knowledge_dependency_cycle() IS '检查知识节点依赖关系是否存在循环依赖';


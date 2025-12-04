-- 知识点表
-- 创建时间: 2025-01-XX
-- 用于管理学科下的知识点，支持树形结构

SET search_path TO pikun_db, public;

-- 知识点表（支持树形结构，知识点可以属于学科，也可以属于其他知识点）
CREATE TABLE IF NOT EXISTS pikun_db.knowledge_points (
    point_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id UUID NOT NULL REFERENCES pikun_db.subjects(subject_id) ON DELETE CASCADE, -- 所属学科
    parent_point_id UUID REFERENCES pikun_db.knowledge_points(point_id) ON DELETE CASCADE, -- 父知识点ID，NULL表示顶级知识点
    code VARCHAR(50) NOT NULL, -- 知识点代码（在学科内唯一）
    name VARCHAR(200) NOT NULL,
    description TEXT, -- 知识点描述
    difficulty VARCHAR(20) DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')), -- 难度等级
    estimated_time INTEGER, -- 预计学习时间（分钟）
    sort_order INTEGER NOT NULL DEFAULT 0,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    UNIQUE(subject_id, code) -- 每个学科内的知识点代码唯一
);

CREATE INDEX idx_knowledge_points_subject_id ON pikun_db.knowledge_points(subject_id);
CREATE INDEX idx_knowledge_points_parent_point_id ON pikun_db.knowledge_points(parent_point_id);
CREATE INDEX idx_knowledge_points_code ON pikun_db.knowledge_points(code);
CREATE INDEX idx_knowledge_points_sort_order ON pikun_db.knowledge_points(sort_order);
CREATE INDEX idx_knowledge_points_deleted_at ON pikun_db.knowledge_points(deleted_at) WHERE deleted_at IS NULL;

CREATE TRIGGER update_knowledge_points_updated_at
    BEFORE UPDATE ON pikun_db.knowledge_points
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

COMMENT ON TABLE pikun_db.knowledge_points IS '知识点表，支持树形结构，知识点可以属于学科，也可以属于其他知识点';
COMMENT ON COLUMN pikun_db.knowledge_points.subject_id IS '所属学科ID';
COMMENT ON COLUMN pikun_db.knowledge_points.parent_point_id IS '父知识点ID，NULL表示顶级知识点';
COMMENT ON COLUMN pikun_db.knowledge_points.code IS '知识点代码（在学科内唯一）';
COMMENT ON COLUMN pikun_db.knowledge_points.difficulty IS '难度等级：easy（简单）、medium（中等）、hard（困难）';

-- 知识点依赖关系表（知识点之间的学习依赖）
CREATE TABLE IF NOT EXISTS pikun_db.knowledge_point_dependencies (
    dependency_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    point_id UUID NOT NULL REFERENCES pikun_db.knowledge_points(point_id) ON DELETE CASCADE, -- 当前知识点
    prerequisite_point_id UUID NOT NULL REFERENCES pikun_db.knowledge_points(point_id) ON DELETE CASCADE, -- 前置知识点
    dependency_type VARCHAR(20) NOT NULL DEFAULT 'required' CHECK (dependency_type IN ('required', 'recommended')), -- 依赖类型：必需或推荐
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(point_id, prerequisite_point_id) -- 每个知识点对只能有一个依赖关系
);

CREATE INDEX idx_knowledge_point_dependencies_point_id ON pikun_db.knowledge_point_dependencies(point_id);
CREATE INDEX idx_knowledge_point_dependencies_prerequisite_point_id ON pikun_db.knowledge_point_dependencies(prerequisite_point_id);
CREATE INDEX idx_knowledge_point_dependencies_dependency_type ON pikun_db.knowledge_point_dependencies(dependency_type);

CREATE TRIGGER update_knowledge_point_dependencies_updated_at
    BEFORE UPDATE ON pikun_db.knowledge_point_dependencies
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

COMMENT ON TABLE pikun_db.knowledge_point_dependencies IS '知识点依赖关系表，记录知识点之间的学习依赖关系';


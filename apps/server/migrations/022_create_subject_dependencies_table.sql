-- 学科依赖关系表
-- 创建时间: 2025-12-03
-- 用于管理学科之间的学习依赖关系

SET search_path TO pikun_db, public;

-- 学科依赖关系表
CREATE TABLE IF NOT EXISTS pikun_db.subject_dependencies (
    dependency_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id UUID NOT NULL REFERENCES pikun_db.subjects(subject_id) ON DELETE CASCADE, -- 当前学科
    prerequisite_subject_id UUID NOT NULL REFERENCES pikun_db.subjects(subject_id) ON DELETE CASCADE, -- 前置学科
    dependency_type VARCHAR(20) NOT NULL DEFAULT 'required' CHECK (dependency_type IN ('required', 'recommended')), -- 依赖类型：必需或推荐
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(subject_id, prerequisite_subject_id) -- 每个学科对只能有一个依赖关系
);

CREATE INDEX idx_subject_dependencies_subject_id ON pikun_db.subject_dependencies(subject_id);
CREATE INDEX idx_subject_dependencies_prerequisite_subject_id ON pikun_db.subject_dependencies(prerequisite_subject_id);
CREATE INDEX idx_subject_dependencies_dependency_type ON pikun_db.subject_dependencies(dependency_type);

CREATE TRIGGER update_subject_dependencies_updated_at
    BEFORE UPDATE ON pikun_db.subject_dependencies
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

COMMENT ON TABLE pikun_db.subject_dependencies IS '学科依赖关系表，记录学科之间的学习依赖关系';
COMMENT ON COLUMN pikun_db.subject_dependencies.subject_id IS '当前学科ID';
COMMENT ON COLUMN pikun_db.subject_dependencies.prerequisite_subject_id IS '前置学科ID';
COMMENT ON COLUMN pikun_db.subject_dependencies.dependency_type IS '依赖类型：required（必需依赖）或 recommended（推荐依赖）';




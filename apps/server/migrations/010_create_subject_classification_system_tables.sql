-- 学科分类系统相关表结构
-- 创建时间: 2024
-- 包含：学科分类（树形结构）、学科、学科详情、学科能力关联

SET search_path TO pikun_db, public;

-- 学科分类表（支持树形结构）
CREATE TABLE IF NOT EXISTS pikun_db.subject_categories (
    category_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID REFERENCES pikun_db.subject_categories(category_id) ON DELETE CASCADE, -- 父分类ID，NULL表示顶级分类
    code VARCHAR(50) NOT NULL UNIQUE, -- 分类代码，全局唯一
    name VARCHAR(200) NOT NULL,
    description TEXT,
    icon_url VARCHAR(500), -- 分类图标
    level INTEGER NOT NULL DEFAULT 1, -- 分类层级（1为顶级）
    path TEXT, -- 分类路径，如：/1/2/3，便于查询所有子分类
    sort_order INTEGER NOT NULL DEFAULT 0,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE INDEX idx_subject_categories_parent_id ON pikun_db.subject_categories(parent_id);
CREATE INDEX idx_subject_categories_code ON pikun_db.subject_categories(code);
CREATE INDEX idx_subject_categories_level ON pikun_db.subject_categories(level);
CREATE INDEX idx_subject_categories_path ON pikun_db.subject_categories(path);
CREATE INDEX idx_subject_categories_sort_order ON pikun_db.subject_categories(sort_order);
CREATE INDEX idx_subject_categories_deleted_at ON pikun_db.subject_categories(deleted_at) WHERE deleted_at IS NULL;

CREATE TRIGGER update_subject_categories_updated_at
    BEFORE UPDATE ON pikun_db.subject_categories
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

-- 学科表
CREATE TABLE IF NOT EXISTS pikun_db.subjects (
    subject_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES pikun_db.subject_categories(category_id) ON DELETE RESTRICT, -- 所属分类
    code VARCHAR(50) NOT NULL UNIQUE, -- 学科代码，全局唯一
    name VARCHAR(200) NOT NULL,
    short_name VARCHAR(50), -- 简称
    icon_url VARCHAR(500), -- 学科图标
    cover_image_url VARCHAR(500), -- 封面图
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT false,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE INDEX idx_subjects_category_id ON pikun_db.subjects(category_id);
CREATE INDEX idx_subjects_code ON pikun_db.subjects(code);
CREATE INDEX idx_subjects_sort_order ON pikun_db.subjects(sort_order);
CREATE INDEX idx_subjects_is_published ON pikun_db.subjects(is_published) WHERE is_published = true;
CREATE INDEX idx_subjects_deleted_at ON pikun_db.subjects(deleted_at) WHERE deleted_at IS NULL;

CREATE TRIGGER update_subjects_updated_at
    BEFORE UPDATE ON pikun_db.subjects
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

-- 学科详情表（存储学科的定义、描述、作用、价值、应用场景等）
CREATE TABLE IF NOT EXISTS pikun_db.subject_details (
    detail_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id UUID NOT NULL REFERENCES pikun_db.subjects(subject_id) ON DELETE CASCADE,
    definition TEXT, -- 定义
    description TEXT, -- 描述
    purpose TEXT, -- 作用
    value TEXT, -- 价值
    application_scenarios TEXT, -- 应用场景
    learning_objectives TEXT, -- 学习目标
    prerequisites TEXT, -- 前置要求
    related_subjects JSONB DEFAULT '[]'::JSONB, -- 相关学科ID列表
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(subject_id) -- 每个学科只有一个详情
);

CREATE INDEX idx_subject_details_subject_id ON pikun_db.subject_details(subject_id);

CREATE TRIGGER update_subject_details_updated_at
    BEFORE UPDATE ON pikun_db.subject_details
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

-- 学科能力关联表（关联学科和能力项，包含等级要求）
CREATE TABLE IF NOT EXISTS pikun_db.subject_ability_bindings (
    binding_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject_id UUID NOT NULL REFERENCES pikun_db.subjects(subject_id) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES pikun_db.ability_items(item_id) ON DELETE CASCADE,
    required_level INTEGER DEFAULT 1, -- 需要达到的能力等级（1-10）
    recommended_level INTEGER, -- 推荐达到的能力等级（可选）
    is_primary BOOLEAN NOT NULL DEFAULT false, -- 是否为主要关联能力
    importance_weight DECIMAL(5,2) DEFAULT 1.00, -- 重要性权重（0-10，用于排序和筛选）
    sort_order INTEGER NOT NULL DEFAULT 0,
    metadata JSONB DEFAULT '{}'::JSONB, -- 可存储能力在该学科中的具体作用说明
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(subject_id, item_id) -- 每个学科和能力项只能关联一次
);

CREATE INDEX idx_subject_ability_bindings_subject_id ON pikun_db.subject_ability_bindings(subject_id);
CREATE INDEX idx_subject_ability_bindings_item_id ON pikun_db.subject_ability_bindings(item_id);
CREATE INDEX idx_subject_ability_bindings_required_level ON pikun_db.subject_ability_bindings(required_level);
CREATE INDEX idx_subject_ability_bindings_is_primary ON pikun_db.subject_ability_bindings(is_primary) WHERE is_primary = true;


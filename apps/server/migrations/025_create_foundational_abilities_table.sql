-- 基础能力表
-- 创建时间: 2025-01-XX
-- 用于管理所有学科学习前需要的基础能力（如：识字、逻辑推理、基础数学等）

SET search_path TO pikun_db, public;

-- 基础能力表
CREATE TABLE IF NOT EXISTS pikun_db.foundational_abilities (
    ability_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE, -- 能力代码，全局唯一
    name VARCHAR(200) NOT NULL,
    description TEXT, -- 能力描述
    icon_url VARCHAR(500), -- 能力图标
    sort_order INTEGER NOT NULL DEFAULT 0,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE INDEX idx_foundational_abilities_code ON pikun_db.foundational_abilities(code);
CREATE INDEX idx_foundational_abilities_sort_order ON pikun_db.foundational_abilities(sort_order);
CREATE INDEX idx_foundational_abilities_deleted_at ON pikun_db.foundational_abilities(deleted_at) WHERE deleted_at IS NULL;

CREATE TRIGGER update_foundational_abilities_updated_at
    BEFORE UPDATE ON pikun_db.foundational_abilities
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

COMMENT ON TABLE pikun_db.foundational_abilities IS '基础能力表，存储所有学科学习前需要的基础能力';
COMMENT ON COLUMN pikun_db.foundational_abilities.code IS '能力代码，全局唯一';
COMMENT ON COLUMN pikun_db.foundational_abilities.name IS '能力名称，如：识字、逻辑推理、基础数学等';

-- 基础能力依赖关系表（基础能力之间可能有依赖关系）
CREATE TABLE IF NOT EXISTS pikun_db.foundational_ability_dependencies (
    dependency_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ability_id UUID NOT NULL REFERENCES pikun_db.foundational_abilities(ability_id) ON DELETE CASCADE, -- 当前能力
    prerequisite_ability_id UUID NOT NULL REFERENCES pikun_db.foundational_abilities(ability_id) ON DELETE CASCADE, -- 前置能力
    dependency_type VARCHAR(20) NOT NULL DEFAULT 'required' CHECK (dependency_type IN ('required', 'recommended')), -- 依赖类型
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(ability_id, prerequisite_ability_id)
);

CREATE INDEX idx_foundational_ability_dependencies_ability_id ON pikun_db.foundational_ability_dependencies(ability_id);
CREATE INDEX idx_foundational_ability_dependencies_prerequisite_ability_id ON pikun_db.foundational_ability_dependencies(prerequisite_ability_id);

CREATE TRIGGER update_foundational_ability_dependencies_updated_at
    BEFORE UPDATE ON pikun_db.foundational_ability_dependencies
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

COMMENT ON TABLE pikun_db.foundational_ability_dependencies IS '基础能力依赖关系表，记录基础能力之间的学习依赖关系';

-- 学科门类表（将一级学科分类进行更高层级的归类）
-- 注意：这个表可以复用 subject_categories，但需要增加一个层级标识
-- 或者创建一个新表专门用于学科门类
-- 这里我们使用 subject_categories，但增加一个 type 字段来区分

-- 添加学科门类类型字段（可选方案，如果不想修改现有表结构，可以创建新表）
-- ALTER TABLE pikun_db.subject_categories ADD COLUMN IF NOT EXISTS category_type VARCHAR(20) DEFAULT 'subject_category' CHECK (category_type IN ('domain', 'subject_category', 'sub_category'));
-- COMMENT ON COLUMN pikun_db.subject_categories.category_type IS '分类类型：domain（学科门类）、subject_category（学科分类）、sub_category（子分类）';

-- 或者创建独立的学科门类表
CREATE TABLE IF NOT EXISTS pikun_db.subject_domains (
    domain_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE, -- 门类代码，全局唯一
    name VARCHAR(200) NOT NULL,
    description TEXT, -- 门类描述
    icon_url VARCHAR(500), -- 门类图标
    sort_order INTEGER NOT NULL DEFAULT 0,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE INDEX idx_subject_domains_code ON pikun_db.subject_domains(code);
CREATE INDEX idx_subject_domains_sort_order ON pikun_db.subject_domains(sort_order);
CREATE INDEX idx_subject_domains_deleted_at ON pikun_db.subject_domains(deleted_at) WHERE deleted_at IS NULL;

CREATE TRIGGER update_subject_domains_updated_at
    BEFORE UPDATE ON pikun_db.subject_domains
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

COMMENT ON TABLE pikun_db.subject_domains IS '学科门类表，将一级学科分类进行更高层级的归类（如：自然科学、社会科学、人文科学等）';

-- 学科门类与一级学科分类的关联表
CREATE TABLE IF NOT EXISTS pikun_db.domain_category_mappings (
    mapping_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    domain_id UUID NOT NULL REFERENCES pikun_db.subject_domains(domain_id) ON DELETE CASCADE, -- 学科门类ID
    category_id UUID NOT NULL REFERENCES pikun_db.subject_categories(category_id) ON DELETE CASCADE, -- 一级学科分类ID
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(domain_id, category_id)
);

CREATE INDEX idx_domain_category_mappings_domain_id ON pikun_db.domain_category_mappings(domain_id);
CREATE INDEX idx_domain_category_mappings_category_id ON pikun_db.domain_category_mappings(category_id);

COMMENT ON TABLE pikun_db.domain_category_mappings IS '学科门类与一级学科分类的关联表';

-- 基础能力到学科门类的依赖关系表
CREATE TABLE IF NOT EXISTS pikun_db.domain_foundational_ability_requirements (
    requirement_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    domain_id UUID NOT NULL REFERENCES pikun_db.subject_domains(domain_id) ON DELETE CASCADE, -- 学科门类ID
    ability_id UUID NOT NULL REFERENCES pikun_db.foundational_abilities(ability_id) ON DELETE CASCADE, -- 基础能力ID
    requirement_type VARCHAR(20) NOT NULL DEFAULT 'required' CHECK (requirement_type IN ('required', 'recommended')), -- 要求类型
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(domain_id, ability_id)
);

CREATE INDEX idx_domain_foundational_ability_requirements_domain_id ON pikun_db.domain_foundational_ability_requirements(domain_id);
CREATE INDEX idx_domain_foundational_ability_requirements_ability_id ON pikun_db.domain_foundational_ability_requirements(ability_id);

CREATE TRIGGER update_domain_foundational_ability_requirements_updated_at
    BEFORE UPDATE ON pikun_db.domain_foundational_ability_requirements
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

COMMENT ON TABLE pikun_db.domain_foundational_ability_requirements IS '学科门类对基础能力的要求表';



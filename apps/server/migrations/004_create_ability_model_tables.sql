-- 能力模型相关表结构
-- 创建时间: 2024
-- 包含：能力类别、能力维度、能力项、能力项等级配置、用户能力等级、用户经验获得记录

SET search_path TO pikun_db, public;

-- 能力类别表
CREATE TABLE IF NOT EXISTS pikun_db.ability_categories (
    category_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE INDEX idx_ability_categories_code ON pikun_db.ability_categories(code);
CREATE INDEX idx_ability_categories_sort_order ON pikun_db.ability_categories(sort_order);
CREATE INDEX idx_ability_categories_deleted_at ON pikun_db.ability_categories(deleted_at) WHERE deleted_at IS NULL;

CREATE TRIGGER update_ability_categories_updated_at
    BEFORE UPDATE ON pikun_db.ability_categories
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

-- 能力维度表
CREATE TABLE IF NOT EXISTS pikun_db.ability_dimensions (
    dimension_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES pikun_db.ability_categories(category_id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    UNIQUE(category_id, code)
);

CREATE INDEX idx_ability_dimensions_category_id ON pikun_db.ability_dimensions(category_id);
CREATE INDEX idx_ability_dimensions_code ON pikun_db.ability_dimensions(code);
CREATE INDEX idx_ability_dimensions_sort_order ON pikun_db.ability_dimensions(sort_order);
CREATE INDEX idx_ability_dimensions_deleted_at ON pikun_db.ability_dimensions(deleted_at) WHERE deleted_at IS NULL;

CREATE TRIGGER update_ability_dimensions_updated_at
    BEFORE UPDATE ON pikun_db.ability_dimensions
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

-- 能力项表
CREATE TABLE IF NOT EXISTS pikun_db.ability_items (
    item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dimension_id UUID NOT NULL REFERENCES pikun_db.ability_dimensions(dimension_id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    definition TEXT,
    performance_description TEXT,
    evaluation_points TEXT,
    training_strategies TEXT,
    theoretical_basis TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    UNIQUE(dimension_id, code)
);

CREATE INDEX idx_ability_items_dimension_id ON pikun_db.ability_items(dimension_id);
CREATE INDEX idx_ability_items_code ON pikun_db.ability_items(code);
CREATE INDEX idx_ability_items_sort_order ON pikun_db.ability_items(sort_order);
CREATE INDEX idx_ability_items_deleted_at ON pikun_db.ability_items(deleted_at) WHERE deleted_at IS NULL;

CREATE TRIGGER update_ability_items_updated_at
    BEFORE UPDATE ON pikun_db.ability_items
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

-- 能力项等级配置表
CREATE TABLE IF NOT EXISTS pikun_db.ability_item_level_configs (
    config_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_id UUID REFERENCES pikun_db.ability_items(item_id) ON DELETE CASCADE,
    level INTEGER NOT NULL,
    required_exp BIGINT NOT NULL,
    requires_assessment BOOLEAN NOT NULL DEFAULT false,
    level_name VARCHAR(50),
    level_description TEXT,
    is_template BOOLEAN NOT NULL DEFAULT false,
    sort_order INTEGER NOT NULL DEFAULT 0,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CHECK ((item_id IS NULL AND is_template = true) OR (item_id IS NOT NULL AND is_template = false))
);

CREATE INDEX idx_ability_item_level_configs_item_id ON pikun_db.ability_item_level_configs(item_id);
CREATE INDEX idx_ability_item_level_configs_is_template ON pikun_db.ability_item_level_configs(is_template);
CREATE INDEX idx_ability_item_level_configs_level ON pikun_db.ability_item_level_configs(level);
CREATE INDEX idx_ability_item_level_configs_sort_order ON pikun_db.ability_item_level_configs(sort_order);
-- 确保每个能力项或模板的等级唯一
CREATE UNIQUE INDEX idx_ability_item_level_configs_unique ON pikun_db.ability_item_level_configs(COALESCE(item_id::text, 'template'), level);

CREATE TRIGGER update_ability_item_level_configs_updated_at
    BEFORE UPDATE ON pikun_db.ability_item_level_configs
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

-- 用户能力等级表
CREATE TABLE IF NOT EXISTS pikun_db.user_ability_levels (
    user_level_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    uid BIGINT NOT NULL REFERENCES pikun_db.users(uid) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES pikun_db.ability_items(item_id) ON DELETE CASCADE,
    current_level INTEGER NOT NULL DEFAULT 1,
    current_exp BIGINT NOT NULL DEFAULT 0,
    total_exp BIGINT NOT NULL DEFAULT 0,
    level_up_count INTEGER NOT NULL DEFAULT 0,
    last_level_up_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(uid, item_id)
);

CREATE INDEX idx_user_ability_levels_uid ON pikun_db.user_ability_levels(uid);
CREATE INDEX idx_user_ability_levels_item_id ON pikun_db.user_ability_levels(item_id);
CREATE INDEX idx_user_ability_levels_level ON pikun_db.user_ability_levels(current_level);

CREATE TRIGGER update_user_ability_levels_updated_at
    BEFORE UPDATE ON pikun_db.user_ability_levels
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

-- 用户经验获得记录表
CREATE TABLE IF NOT EXISTS pikun_db.user_ability_experience_logs (
    log_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    uid BIGINT NOT NULL REFERENCES pikun_db.users(uid) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES pikun_db.ability_items(item_id) ON DELETE CASCADE,
    exp_amount BIGINT NOT NULL,
    exp_type VARCHAR(50) NOT NULL,
    source_id VARCHAR(100),
    source_type VARCHAR(50),
    before_level INTEGER NOT NULL,
    after_level INTEGER NOT NULL,
    before_exp BIGINT NOT NULL,
    after_exp BIGINT NOT NULL,
    is_level_up BOOLEAN NOT NULL DEFAULT false,
    notes TEXT,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_ability_experience_logs_uid ON pikun_db.user_ability_experience_logs(uid);
CREATE INDEX idx_user_ability_experience_logs_item_id ON pikun_db.user_ability_experience_logs(item_id);
CREATE INDEX idx_user_ability_experience_logs_created_at ON pikun_db.user_ability_experience_logs(created_at DESC);
CREATE INDEX idx_user_ability_experience_logs_exp_type ON pikun_db.user_ability_experience_logs(exp_type);


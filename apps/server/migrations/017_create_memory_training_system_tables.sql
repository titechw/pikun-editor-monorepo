-- 记忆训练系统相关表结构
-- 创建时间: 2024
-- 包含：记忆训练游戏、游戏关卡、用户关卡进度

SET search_path TO pikun_db, public;

-- 记忆训练游戏表
CREATE TABLE IF NOT EXISTS pikun_db.memory_training_games (
    game_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE, -- 'number_sequence', 'color_memory', 'shape_position' 等
    name VARCHAR(100) NOT NULL, -- '数字序列记忆', '颜色记忆' 等
    description TEXT, -- 游戏描述
    icon VARCHAR(100), -- 游戏图标（emoji 或图标名称）
    game_type VARCHAR(50) NOT NULL, -- 游戏类型分类
    ability_item_id UUID REFERENCES pikun_db.ability_items(item_id) ON DELETE SET NULL, -- 关联的能力项（记忆力）
    min_ability_level INTEGER DEFAULT 1, -- 最低能力等级要求
    max_ability_level INTEGER DEFAULT 10, -- 最高能力等级
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT false,
    metadata JSONB DEFAULT '{}'::JSONB, -- 游戏配置、规则说明等
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE INDEX idx_memory_training_games_code ON pikun_db.memory_training_games(code);
CREATE INDEX idx_memory_training_games_game_type ON pikun_db.memory_training_games(game_type);
CREATE INDEX idx_memory_training_games_ability_item_id ON pikun_db.memory_training_games(ability_item_id);
CREATE INDEX idx_memory_training_games_is_published ON pikun_db.memory_training_games(is_published) WHERE is_published = true;
CREATE INDEX idx_memory_training_games_sort_order ON pikun_db.memory_training_games(sort_order);
CREATE INDEX idx_memory_training_games_deleted_at ON pikun_db.memory_training_games(deleted_at) WHERE deleted_at IS NULL;

CREATE TRIGGER update_memory_training_games_updated_at
    BEFORE UPDATE ON pikun_db.memory_training_games
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

-- 游戏关卡表
CREATE TABLE IF NOT EXISTS pikun_db.memory_training_levels (
    level_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    game_id UUID NOT NULL REFERENCES pikun_db.memory_training_games(game_id) ON DELETE CASCADE,
    level_number INTEGER NOT NULL, -- 关卡编号（1, 2, 3...）
    name VARCHAR(100), -- 关卡名称（如：'初级挑战'、'中级挑战'）
    description TEXT, -- 关卡描述
    difficulty_config JSONB NOT NULL, -- 难度配置（序列长度、显示时间等）
    required_ability_level INTEGER DEFAULT 1, -- 推荐的能力等级
    base_exp_reward INTEGER DEFAULT 10, -- 基础经验值奖励
    unlock_condition JSONB DEFAULT '{}'::JSONB, -- 解锁条件（如：需要完成前置关卡）
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT false,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    UNIQUE(game_id, level_number)
);

CREATE INDEX idx_memory_training_levels_game_id ON pikun_db.memory_training_levels(game_id);
CREATE INDEX idx_memory_training_levels_level_number ON pikun_db.memory_training_levels(level_number);
CREATE INDEX idx_memory_training_levels_is_published ON pikun_db.memory_training_levels(is_published) WHERE is_published = true;
CREATE INDEX idx_memory_training_levels_sort_order ON pikun_db.memory_training_levels(sort_order);
CREATE INDEX idx_memory_training_levels_deleted_at ON pikun_db.memory_training_levels(deleted_at) WHERE deleted_at IS NULL;

CREATE TRIGGER update_memory_training_levels_updated_at
    BEFORE UPDATE ON pikun_db.memory_training_levels
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

-- 用户关卡进度表
CREATE TABLE IF NOT EXISTS pikun_db.user_memory_level_progress (
    progress_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    uid BIGINT NOT NULL REFERENCES pikun_db.users(uid) ON DELETE CASCADE,
    level_id UUID NOT NULL REFERENCES pikun_db.memory_training_levels(level_id) ON DELETE CASCADE,
    is_unlocked BOOLEAN NOT NULL DEFAULT false, -- 是否已解锁
    is_completed BOOLEAN NOT NULL DEFAULT false, -- 是否已完成
    best_score INTEGER DEFAULT 0, -- 最佳得分
    best_correct_rate DECIMAL(5,2) DEFAULT 0, -- 最佳正确率（0-100）
    best_time_spent INTEGER, -- 最佳用时（毫秒）
    completion_count INTEGER DEFAULT 0, -- 完成次数
    total_exp_earned BIGINT DEFAULT 0, -- 累计获得经验值
    first_completed_at TIMESTAMP WITH TIME ZONE, -- 首次完成时间
    last_played_at TIMESTAMP WITH TIME ZONE, -- 最后游玩时间
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(uid, level_id)
);

CREATE INDEX idx_user_memory_level_progress_uid ON pikun_db.user_memory_level_progress(uid);
CREATE INDEX idx_user_memory_level_progress_level_id ON pikun_db.user_memory_level_progress(level_id);
CREATE INDEX idx_user_memory_level_progress_is_unlocked ON pikun_db.user_memory_level_progress(is_unlocked) WHERE is_unlocked = true;
CREATE INDEX idx_user_memory_level_progress_is_completed ON pikun_db.user_memory_level_progress(is_completed) WHERE is_completed = true;

CREATE TRIGGER update_user_memory_level_progress_updated_at
    BEFORE UPDATE ON pikun_db.user_memory_level_progress
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();






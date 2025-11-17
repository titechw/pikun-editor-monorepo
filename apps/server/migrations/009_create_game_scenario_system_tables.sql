-- 游戏场景系统相关表结构
-- 创建时间: 2024
-- 包含：游戏场景、场景课程绑定、NPC、任务、游戏会话、用户任务记录

SET search_path TO pikun_db, public;

-- 游戏场景表
CREATE TABLE IF NOT EXISTS pikun_db.game_scenarios (
    scenario_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    scenario_type VARCHAR(50) NOT NULL DEFAULT 'training', -- 'training'、'assessment'、'mixed'、'story'
    cover_image_url VARCHAR(500),
    background_image_url VARCHAR(500),
    difficulty_level INTEGER DEFAULT 1 CHECK (difficulty_level >= 1 AND difficulty_level <= 10),
    estimated_duration INTEGER, -- 预计时长（分钟）
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT false,
    metadata JSONB DEFAULT '{}'::JSONB, -- 存储场景配置、游戏规则等
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE INDEX idx_game_scenarios_code ON pikun_db.game_scenarios(code);
CREATE INDEX idx_game_scenarios_scenario_type ON pikun_db.game_scenarios(scenario_type);
CREATE INDEX idx_game_scenarios_is_published ON pikun_db.game_scenarios(is_published) WHERE is_published = true;
CREATE INDEX idx_game_scenarios_sort_order ON pikun_db.game_scenarios(sort_order);
CREATE INDEX idx_game_scenarios_deleted_at ON pikun_db.game_scenarios(deleted_at) WHERE deleted_at IS NULL;

CREATE TRIGGER update_game_scenarios_updated_at
    BEFORE UPDATE ON pikun_db.game_scenarios
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

-- 场景课程绑定表
CREATE TABLE IF NOT EXISTS pikun_db.scenario_course_bindings (
    binding_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scenario_id UUID NOT NULL REFERENCES pikun_db.game_scenarios(scenario_id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES pikun_db.courses(course_id) ON DELETE CASCADE,
    is_primary BOOLEAN NOT NULL DEFAULT false, -- 是否为主要关联课程
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(scenario_id, course_id)
);

CREATE INDEX idx_scenario_course_bindings_scenario_id ON pikun_db.scenario_course_bindings(scenario_id);
CREATE INDEX idx_scenario_course_bindings_course_id ON pikun_db.scenario_course_bindings(course_id);

-- NPC 表
CREATE TABLE IF NOT EXISTS pikun_db.npcs (
    npc_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    avatar_url VARCHAR(500),
    scenario_id UUID REFERENCES pikun_db.game_scenarios(scenario_id) ON DELETE SET NULL, -- NPC 所属场景
    position_x DECIMAL(10,2), -- NPC 在场景中的位置 X
    position_y DECIMAL(10,2), -- NPC 在场景中的位置 Y
    dialogue_data JSONB DEFAULT '{}'::JSONB, -- NPC 对话数据
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE INDEX idx_npcs_code ON pikun_db.npcs(code);
CREATE INDEX idx_npcs_scenario_id ON pikun_db.npcs(scenario_id);
CREATE INDEX idx_npcs_deleted_at ON pikun_db.npcs(deleted_at) WHERE deleted_at IS NULL;

CREATE TRIGGER update_npcs_updated_at
    BEFORE UPDATE ON pikun_db.npcs
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

-- 任务表
CREATE TABLE IF NOT EXISTS pikun_db.quests (
    quest_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    npc_id UUID NOT NULL REFERENCES pikun_db.npcs(npc_id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    quest_type VARCHAR(50) NOT NULL, -- 'training'、'assessment'、'daily'、'main'
    course_id UUID REFERENCES pikun_db.courses(course_id) ON DELETE SET NULL, -- 关联的课程
    assessment_id UUID REFERENCES pikun_db.assessments(assessment_id) ON DELETE SET NULL, -- 如果是考核任务，关联考试
    prerequisite_quest_ids JSONB DEFAULT '[]'::JSONB, -- 前置任务 ID 列表
    exp_reward BIGINT DEFAULT 0, -- 完成任务获得的经验值
    item_rewards JSONB DEFAULT '[]'::JSONB, -- 物品奖励（如金币、道具等）
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT false,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE INDEX idx_quests_code ON pikun_db.quests(code);
CREATE INDEX idx_quests_npc_id ON pikun_db.quests(npc_id);
CREATE INDEX idx_quests_course_id ON pikun_db.quests(course_id);
CREATE INDEX idx_quests_assessment_id ON pikun_db.quests(assessment_id);
CREATE INDEX idx_quests_quest_type ON pikun_db.quests(quest_type);
CREATE INDEX idx_quests_is_published ON pikun_db.quests(is_published) WHERE is_published = true;
CREATE INDEX idx_quests_deleted_at ON pikun_db.quests(deleted_at) WHERE deleted_at IS NULL;

CREATE TRIGGER update_quests_updated_at
    BEFORE UPDATE ON pikun_db.quests
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

-- 游戏会话表
CREATE TABLE IF NOT EXISTS pikun_db.game_sessions (
    session_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    uid BIGINT NOT NULL REFERENCES pikun_db.users(uid) ON DELETE CASCADE,
    scenario_id UUID NOT NULL REFERENCES pikun_db.game_scenarios(scenario_id) ON DELETE CASCADE,
    quest_id UUID REFERENCES pikun_db.quests(quest_id) ON DELETE SET NULL, -- 当前进行的任务
    session_key VARCHAR(64) NOT NULL UNIQUE, -- 会话密钥，用于结果提交验证
    status VARCHAR(50) NOT NULL DEFAULT 'active', -- 'active'、'completed'、'abandoned'、'expired'
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE, -- 会话过期时间（默认 2 小时）
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_game_sessions_uid ON pikun_db.game_sessions(uid);
CREATE INDEX idx_game_sessions_scenario_id ON pikun_db.game_sessions(scenario_id);
CREATE INDEX idx_game_sessions_quest_id ON pikun_db.game_sessions(quest_id);
CREATE INDEX idx_game_sessions_session_key ON pikun_db.game_sessions(session_key);
CREATE INDEX idx_game_sessions_status ON pikun_db.game_sessions(status);
CREATE INDEX idx_game_sessions_expires_at ON pikun_db.game_sessions(expires_at) WHERE expires_at IS NOT NULL;

CREATE TRIGGER update_game_sessions_updated_at
    BEFORE UPDATE ON pikun_db.game_sessions
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

-- 用户任务记录表
CREATE TABLE IF NOT EXISTS pikun_db.user_quest_records (
    record_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    uid BIGINT NOT NULL REFERENCES pikun_db.users(uid) ON DELETE CASCADE,
    quest_id UUID NOT NULL REFERENCES pikun_db.quests(quest_id) ON DELETE CASCADE,
    session_id UUID REFERENCES pikun_db.game_sessions(session_id) ON DELETE SET NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'in_progress', -- 'in_progress'、'completed'、'failed'、'abandoned'
    result_data JSONB DEFAULT '{}'::JSONB, -- 任务结果数据
    exp_earned BIGINT DEFAULT 0, -- 获得的经验值
    completed_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_quest_records_uid ON pikun_db.user_quest_records(uid);
CREATE INDEX idx_user_quest_records_quest_id ON pikun_db.user_quest_records(quest_id);
CREATE INDEX idx_user_quest_records_session_id ON pikun_db.user_quest_records(session_id);
CREATE INDEX idx_user_quest_records_status ON pikun_db.user_quest_records(status);
CREATE INDEX idx_user_quest_records_created_at ON pikun_db.user_quest_records(created_at DESC);

CREATE TRIGGER update_user_quest_records_updated_at
    BEFORE UPDATE ON pikun_db.user_quest_records
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();


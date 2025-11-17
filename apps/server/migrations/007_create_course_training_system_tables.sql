-- 课程训练系统相关表结构
-- 创建时间: 2024
-- 包含：课程、课程内容、考试、课程能力绑定、用户学习记录、考试记录、训练记录

SET search_path TO pikun_db, public;

-- 课程表
CREATE TABLE IF NOT EXISTS pikun_db.courses (
    course_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    cover_image_url VARCHAR(500),
    course_type VARCHAR(50) NOT NULL DEFAULT 'mixed', -- 'learning'（学习型）、'training'（训练型）、'mixed'（混合型）
    difficulty_level INTEGER DEFAULT 1 CHECK (difficulty_level >= 1 AND difficulty_level <= 10),
    estimated_duration INTEGER, -- 预计时长（分钟）
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT false,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE INDEX idx_courses_code ON pikun_db.courses(code);
CREATE INDEX idx_courses_course_type ON pikun_db.courses(course_type);
CREATE INDEX idx_courses_is_published ON pikun_db.courses(is_published) WHERE is_published = true;
CREATE INDEX idx_courses_sort_order ON pikun_db.courses(sort_order);
CREATE INDEX idx_courses_deleted_at ON pikun_db.courses(deleted_at) WHERE deleted_at IS NULL;

CREATE TRIGGER update_courses_updated_at
    BEFORE UPDATE ON pikun_db.courses
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

-- 课程内容表
CREATE TABLE IF NOT EXISTS pikun_db.course_contents (
    content_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES pikun_db.courses(course_id) ON DELETE CASCADE,
    content_type VARCHAR(50) NOT NULL, -- 'video'、'article'、'game'、'training'、'interactive'
    title VARCHAR(200) NOT NULL,
    description TEXT,
    content_url VARCHAR(500), -- 内容资源 URL
    content_data JSONB DEFAULT '{}'::JSONB, -- 存储游戏配置、训练参数等结构化数据
    duration INTEGER, -- 内容时长（秒）
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_required BOOLEAN NOT NULL DEFAULT true, -- 是否必学
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE INDEX idx_course_contents_course_id ON pikun_db.course_contents(course_id);
CREATE INDEX idx_course_contents_content_type ON pikun_db.course_contents(content_type);
CREATE INDEX idx_course_contents_sort_order ON pikun_db.course_contents(course_id, sort_order);
CREATE INDEX idx_course_contents_deleted_at ON pikun_db.course_contents(deleted_at) WHERE deleted_at IS NULL;

CREATE TRIGGER update_course_contents_updated_at
    BEFORE UPDATE ON pikun_db.course_contents
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

-- 考试表
CREATE TABLE IF NOT EXISTS pikun_db.assessments (
    assessment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    assessment_type VARCHAR(50) NOT NULL, -- 'exam'（试卷）、'project'（项目）、'game'（游戏）、'performance'（表现评估）
    item_id UUID REFERENCES pikun_db.ability_items(item_id) ON DELETE SET NULL, -- 关联的能力项
    level_requirement INTEGER, -- 需要达到的等级（用于判断是否通过）
    passing_criteria JSONB DEFAULT '{}'::JSONB, -- 通过标准（如：{"reactionTime": {"max": 200, "unit": "ms"}}、{"score": {"min": 80}} 等）
    assessment_config JSONB DEFAULT '{}'::JSONB, -- 考试配置（题目数量、时间限制、游戏规则等）
    exp_reward BIGINT DEFAULT 0, -- 通过后获得的经验值
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT false,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE INDEX idx_assessments_code ON pikun_db.assessments(code);
CREATE INDEX idx_assessments_item_id ON pikun_db.assessments(item_id);
CREATE INDEX idx_assessments_assessment_type ON pikun_db.assessments(assessment_type);
CREATE INDEX idx_assessments_is_published ON pikun_db.assessments(is_published) WHERE is_published = true;
CREATE INDEX idx_assessments_deleted_at ON pikun_db.assessments(deleted_at) WHERE deleted_at IS NULL;

CREATE TRIGGER update_assessments_updated_at
    BEFORE UPDATE ON pikun_db.assessments
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

-- 课程与能力绑定表
CREATE TABLE IF NOT EXISTS pikun_db.course_ability_bindings (
    binding_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES pikun_db.courses(course_id) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES pikun_db.ability_items(item_id) ON DELETE CASCADE,
    exp_reward BIGINT DEFAULT 0, -- 完成课程后获得的经验值
    is_primary BOOLEAN NOT NULL DEFAULT false, -- 是否为主要关联能力
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(course_id, item_id)
);

CREATE INDEX idx_course_ability_bindings_course_id ON pikun_db.course_ability_bindings(course_id);
CREATE INDEX idx_course_ability_bindings_item_id ON pikun_db.course_ability_bindings(item_id);

-- 用户课程学习记录表
CREATE TABLE IF NOT EXISTS pikun_db.user_course_progress (
    progress_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    uid BIGINT NOT NULL REFERENCES pikun_db.users(uid) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES pikun_db.courses(course_id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL DEFAULT 'not_started', -- 'not_started'、'in_progress'、'completed'、'abandoned'
    progress_percentage DECIMAL(5,2) DEFAULT 0.00 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    completed_contents JSONB DEFAULT '[]'::JSONB, -- 已完成的课程内容 ID 列表
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    last_accessed_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(uid, course_id)
);

CREATE INDEX idx_user_course_progress_uid ON pikun_db.user_course_progress(uid);
CREATE INDEX idx_user_course_progress_course_id ON pikun_db.user_course_progress(course_id);
CREATE INDEX idx_user_course_progress_status ON pikun_db.user_course_progress(status);

CREATE TRIGGER update_user_course_progress_updated_at
    BEFORE UPDATE ON pikun_db.user_course_progress
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

-- 用户考试记录表
CREATE TABLE IF NOT EXISTS pikun_db.user_assessment_records (
    record_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    uid BIGINT NOT NULL REFERENCES pikun_db.users(uid) ON DELETE CASCADE,
    assessment_id UUID NOT NULL REFERENCES pikun_db.assessments(assessment_id) ON DELETE CASCADE,
    item_id UUID REFERENCES pikun_db.ability_items(item_id) ON DELETE SET NULL,
    score DECIMAL(10,2), -- 分数
    result_data JSONB DEFAULT '{}'::JSONB, -- 详细结果数据（如：反应时间、正确率、游戏得分等）
    is_passed BOOLEAN NOT NULL DEFAULT false, -- 是否通过
    exp_earned BIGINT DEFAULT 0, -- 获得的经验值
    duration_seconds INTEGER, -- 考试耗时（秒）
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_assessment_records_uid ON pikun_db.user_assessment_records(uid);
CREATE INDEX idx_user_assessment_records_assessment_id ON pikun_db.user_assessment_records(assessment_id);
CREATE INDEX idx_user_assessment_records_item_id ON pikun_db.user_assessment_records(item_id);
CREATE INDEX idx_user_assessment_records_created_at ON pikun_db.user_assessment_records(created_at DESC);

-- 训练记录表
CREATE TABLE IF NOT EXISTS pikun_db.user_training_records (
    record_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    uid BIGINT NOT NULL REFERENCES pikun_db.users(uid) ON DELETE CASCADE,
    item_id UUID NOT NULL REFERENCES pikun_db.ability_items(item_id) ON DELETE CASCADE,
    course_content_id UUID REFERENCES pikun_db.course_contents(content_id) ON DELETE SET NULL,
    training_type VARCHAR(50) NOT NULL, -- 'game'、'practice'、'exercise'
    result_data JSONB NOT NULL DEFAULT '{}'::JSONB, -- 训练结果数据（如：反应时间、得分、完成情况等）
    exp_earned BIGINT DEFAULT 0, -- 获得的经验值
    duration_seconds INTEGER, -- 训练耗时（秒）
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_training_records_uid ON pikun_db.user_training_records(uid);
CREATE INDEX idx_user_training_records_item_id ON pikun_db.user_training_records(item_id);
CREATE INDEX idx_user_training_records_course_content_id ON pikun_db.user_training_records(course_content_id);
CREATE INDEX idx_user_training_records_created_at ON pikun_db.user_training_records(created_at DESC);


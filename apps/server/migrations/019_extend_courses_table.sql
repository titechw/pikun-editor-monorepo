-- 扩展课程表，添加课程管理所需字段
-- 创建时间: 2024

SET search_path TO pikun_db, public;

-- 添加新字段到课程表
ALTER TABLE pikun_db.courses
ADD COLUMN IF NOT EXISTS course_url VARCHAR(500), -- 课程 URL（游戏 URL 等）
ADD COLUMN IF NOT EXISTS course_source VARCHAR(50) DEFAULT 'official', -- 'official'（官方课程）、'third_party'（三方作者）
ADD COLUMN IF NOT EXISTS author_name VARCHAR(200), -- 作者名（官方 or 三方作者的名字）
ADD COLUMN IF NOT EXISTS secret_id VARCHAR(64) UNIQUE, -- secretId（用于游戏调用升级接口的验证）
ADD COLUMN IF NOT EXISTS primary_item_id UUID REFERENCES pikun_db.ability_items(item_id) ON DELETE SET NULL; -- 主要关联的能力项

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_courses_course_source ON pikun_db.courses(course_source);
CREATE INDEX IF NOT EXISTS idx_courses_secret_id ON pikun_db.courses(secret_id);
CREATE INDEX IF NOT EXISTS idx_courses_primary_item_id ON pikun_db.courses(primary_item_id);

-- 更新课程类型枚举值（如果需要）
-- 注意：PostgreSQL 不支持直接修改 ENUM，如果需要修改，需要创建新的 ENUM 类型
-- 这里我们使用 VARCHAR，所以可以直接使用新的值

-- 添加注释
COMMENT ON COLUMN pikun_db.courses.course_url IS '课程 URL（游戏 URL 等）';
COMMENT ON COLUMN pikun_db.courses.course_source IS '课程来源：official（官方课程）、third_party（三方作者）';
COMMENT ON COLUMN pikun_db.courses.author_name IS '作者名（官方 or 三方作者的名字）';
COMMENT ON COLUMN pikun_db.courses.secret_id IS 'secretId（用于游戏调用升级接口的验证）';
COMMENT ON COLUMN pikun_db.courses.primary_item_id IS '主要关联的能力项';






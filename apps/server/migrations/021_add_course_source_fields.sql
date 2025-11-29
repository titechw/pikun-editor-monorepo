-- 20241124_add_course_source_fields.sql
SET search_path TO pikun_db, public;

-- 添加课程来源、作者、URL 和关联能力项字段
ALTER TABLE pikun_db.courses 
ADD COLUMN IF NOT EXISTS course_source VARCHAR(50) DEFAULT 'official',
ADD COLUMN IF NOT EXISTS author_name VARCHAR(100),
ADD COLUMN IF NOT EXISTS course_url VARCHAR(500),
ADD COLUMN IF NOT EXISTS primary_item_id UUID REFERENCES pikun_db.ability_items(item_id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS secret_id VARCHAR(100);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_courses_course_source ON pikun_db.courses(course_source);
CREATE INDEX IF NOT EXISTS idx_courses_primary_item_id ON pikun_db.courses(primary_item_id);
CREATE INDEX IF NOT EXISTS idx_courses_secret_id ON pikun_db.courses(secret_id);






-- 导出表: courses
-- 数据行数: 1
-- 导出时间: 2025-11-17T00:31:21.325Z

SET search_path TO pikun_db, public;

BEGIN;

INSERT INTO pikun_db.courses (course_id, code, name, description, cover_image_url, course_type, difficulty_level, estimated_duration, sort_order, is_published, metadata, created_at, updated_at, deleted_at) VALUES ('05f7be01-7a71-414b-981d-a460201c9628', 'reaction_training', '反应力训练课程', '通过多种训练游戏和练习，提升你的反应速度和反应准确性', NULL, 'training', 1, 30, 1, TRUE, '{}'::jsonb, '2025-11-16T05:58:15.210Z', '2025-11-16T05:58:15.210Z', NULL) ON CONFLICT DO NOTHING;

COMMIT;

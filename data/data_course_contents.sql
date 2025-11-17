-- 导出表: course_contents
-- 数据行数: 1
-- 导出时间: 2025-11-17T00:31:21.317Z

SET search_path TO pikun_db, public;

BEGIN;

INSERT INTO pikun_db.course_contents (content_id, course_id, content_type, title, description, content_url, content_data, duration, sort_order, is_required, metadata, created_at, updated_at, deleted_at) VALUES ('e9c17bd2-1c49-47a8-8131-1bf23e8df508', '05f7be01-7a71-414b-981d-a460201c9628', 'game', '颜色反应测试', '快速点击屏幕上变化的颜色，测试你的反应速度', NULL, '{"rules":{"rounds":10,"timeLimit":null,"targetColor":"random"},"scoring":{"baseExp":10,"bonusExp":5},"gameType":"color_reaction"}'::jsonb, 300, 1, TRUE, '{}'::jsonb, '2025-11-16T05:58:15.210Z', '2025-11-16T05:58:15.210Z', NULL) ON CONFLICT DO NOTHING;

COMMIT;

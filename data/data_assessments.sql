-- 导出表: assessments
-- 数据行数: 1
-- 导出时间: 2025-11-17T00:31:21.302Z

SET search_path TO pikun_db, public;

BEGIN;

INSERT INTO pikun_db.assessments (assessment_id, code, name, description, assessment_type, item_id, level_requirement, passing_criteria, assessment_config, exp_reward, sort_order, is_published, metadata, created_at, updated_at, deleted_at) VALUES ('b896e199-b012-4862-a425-826af9383a2a', 'reaction_speed_test', '反应速度测试', '通过连续10次反应测试，评估你的反应速度等级', 'game', 'daf466c3-ec8c-4a8e-9fcd-4d18fd8d51e3', NULL, '{"reactionTime":{"unit":"ms","rounds":10,"measurement":"average"}}'::jsonb, '{"rounds":10,"gameType":"reaction_speed_test","instructions":"当屏幕颜色变化时，立即点击。系统将记录你的平均反应时间。"}'::jsonb, '200', 1, TRUE, '{}'::jsonb, '2025-11-16T05:58:15.210Z', '2025-11-16T05:58:15.210Z', NULL) ON CONFLICT DO NOTHING;

COMMIT;

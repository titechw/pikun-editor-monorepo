-- 导出表: course_ability_bindings
-- 数据行数: 1
-- 导出时间: 2025-11-17T00:31:21.309Z

SET search_path TO pikun_db, public;

BEGIN;

INSERT INTO pikun_db.course_ability_bindings (binding_id, course_id, item_id, exp_reward, is_primary, created_at) VALUES ('9b0fe0c7-8935-4940-a983-48b285488b3d', '05f7be01-7a71-414b-981d-a460201c9628', 'daf466c3-ec8c-4a8e-9fcd-4d18fd8d51e3', '100', TRUE, '2025-11-16T05:58:15.210Z') ON CONFLICT DO NOTHING;

COMMIT;

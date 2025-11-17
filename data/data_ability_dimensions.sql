-- 导出表: ability_dimensions
-- 数据行数: 8
-- 导出时间: 2025-11-17T00:31:21.273Z

SET search_path TO pikun_db, public;

BEGIN;

INSERT INTO pikun_db.ability_dimensions (dimension_id, category_id, code, name, description, sort_order, metadata, created_at, updated_at, deleted_at) VALUES ('462a4646-d4a6-4ac6-8424-21401d753e75', 'cab2ec19-33ef-46dd-8e62-3acfa485bddc', 'worldview', '三观', '世界观、人生观、价值观', 1, '{}'::jsonb, '2025-11-16T03:17:16.023Z', '2025-11-16T03:17:16.023Z', NULL) ON CONFLICT DO NOTHING;
INSERT INTO pikun_db.ability_dimensions (dimension_id, category_id, code, name, description, sort_order, metadata, created_at, updated_at, deleted_at) VALUES ('5369122b-2518-4c3f-b53c-644654d5a670', 'cab2ec19-33ef-46dd-8e62-3acfa485bddc', 'personality', '人格特质', '性格和动机', 2, '{}'::jsonb, '2025-11-16T03:17:16.026Z', '2025-11-16T03:17:16.026Z', NULL) ON CONFLICT DO NOTHING;
INSERT INTO pikun_db.ability_dimensions (dimension_id, category_id, code, name, description, sort_order, metadata, created_at, updated_at, deleted_at) VALUES ('0b49d6a0-a6ef-42c5-b55a-d561111064d9', '98ea2edb-35dd-4901-ace0-294f73c0378f', 'cognitive', '认知力', '认知能力', 1, '{}'::jsonb, '2025-11-16T03:17:16.027Z', '2025-11-16T03:17:16.027Z', NULL) ON CONFLICT DO NOTHING;
INSERT INTO pikun_db.ability_dimensions (dimension_id, category_id, code, name, description, sort_order, metadata, created_at, updated_at, deleted_at) VALUES ('010a533c-24a0-41e6-a976-0ef6f45c5300', '98ea2edb-35dd-4901-ace0-294f73c0378f', 'emotional_willpower', '情绪与意志能力', '情绪管理和意志力', 2, '{}'::jsonb, '2025-11-16T03:17:16.029Z', '2025-11-16T03:17:16.029Z', NULL) ON CONFLICT DO NOTHING;
INSERT INTO pikun_db.ability_dimensions (dimension_id, category_id, code, name, description, sort_order, metadata, created_at, updated_at, deleted_at) VALUES ('98d03994-b349-4114-824d-eb20d8391060', '98ea2edb-35dd-4901-ace0-294f73c0378f', 'meta', '元能力', '元认知和自我管理能力', 3, '{}'::jsonb, '2025-11-16T03:17:16.031Z', '2025-11-16T03:17:16.031Z', NULL) ON CONFLICT DO NOTHING;
INSERT INTO pikun_db.ability_dimensions (dimension_id, category_id, code, name, description, sort_order, metadata, created_at, updated_at, deleted_at) VALUES ('910eb559-5f88-4d2e-a51b-cd57a40ea7c4', '8aa8c6bf-79bf-480c-92fa-06aa7a68f1fa', 'professional_skills', '专业知识与技能', '专业知识与技能', 1, '{}'::jsonb, '2025-11-16T03:17:16.033Z', '2025-11-16T03:17:16.033Z', NULL) ON CONFLICT DO NOTHING;
INSERT INTO pikun_db.ability_dimensions (dimension_id, category_id, code, name, description, sort_order, metadata, created_at, updated_at, deleted_at) VALUES ('7dc43dc6-a7fc-4694-8e01-32331c72d2b2', '8aa8c6bf-79bf-480c-92fa-06aa7a68f1fa', 'practical_strategy', '实践与策略能力', '实践与策略能力', 2, '{}'::jsonb, '2025-11-16T03:17:16.035Z', '2025-11-16T03:17:16.035Z', NULL) ON CONFLICT DO NOTHING;
INSERT INTO pikun_db.ability_dimensions (dimension_id, category_id, code, name, description, sort_order, metadata, created_at, updated_at, deleted_at) VALUES ('a77b60ec-f54b-400a-bcad-a6dffb304338', '8aa8c6bf-79bf-480c-92fa-06aa7a68f1fa', 'scenario_adaptation', '场景适配能力', '场景适配能力', 3, '{}'::jsonb, '2025-11-16T03:17:16.037Z', '2025-11-16T03:17:16.037Z', NULL) ON CONFLICT DO NOTHING;

COMMIT;

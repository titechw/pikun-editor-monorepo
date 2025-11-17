-- 导出表: ability_categories
-- 数据行数: 3
-- 导出时间: 2025-11-17T00:31:21.263Z

SET search_path TO pikun_db, public;

BEGIN;

INSERT INTO pikun_db.ability_categories (category_id, code, name, description, sort_order, metadata, created_at, updated_at, deleted_at) VALUES ('cab2ec19-33ef-46dd-8e62-3acfa485bddc', 'meta_system', '元系统层', '个人最底层的认知和价值体系', 1, '{}'::jsonb, '2025-11-16T03:17:16.021Z', '2025-11-16T03:17:16.021Z', NULL) ON CONFLICT DO NOTHING;
INSERT INTO pikun_db.ability_categories (category_id, code, name, description, sort_order, metadata, created_at, updated_at, deleted_at) VALUES ('98ea2edb-35dd-4901-ace0-294f73c0378f', 'core', '核心底层能力', '所有活动都需具备的通用能力，决定个人能力的成长上限', 2, '{}'::jsonb, '2025-11-16T03:17:16.027Z', '2025-11-16T03:17:16.027Z', NULL) ON CONFLICT DO NOTHING;
INSERT INTO pikun_db.ability_categories (category_id, code, name, description, sort_order, metadata, created_at, updated_at, deleted_at) VALUES ('8aa8c6bf-79bf-480c-92fa-06aa7a68f1fa', 'specialized', '专项应用能力', '在特定领域或场景中应用的能力', 3, '{}'::jsonb, '2025-11-16T03:17:16.033Z', '2025-11-16T03:17:16.033Z', NULL) ON CONFLICT DO NOTHING;

COMMIT;

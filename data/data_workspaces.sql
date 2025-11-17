-- 导出表: workspaces
-- 数据行数: 2
-- 导出时间: 2025-11-17T00:31:21.469Z

SET search_path TO pikun_db, public;

BEGIN;

INSERT INTO pikun_db.workspaces (workspace_id, name, owner_uid, icon, metadata, deleted_at, created_at, updated_at) VALUES ('ebecac23-0832-4646-b8ba-14657c205e71', '我的工作空间', '1', NULL, '{}'::jsonb, NULL, '2025-11-16T02:56:34.167Z', '2025-11-16T02:56:34.167Z') ON CONFLICT DO NOTHING;
INSERT INTO pikun_db.workspaces (workspace_id, name, owner_uid, icon, metadata, deleted_at, created_at, updated_at) VALUES ('4fc38dca-98e9-42c2-9733-db40f0e8c0e3', '我的工作空间', '2', NULL, '{}'::jsonb, NULL, '2025-11-16T03:00:34.610Z', '2025-11-16T03:00:34.610Z') ON CONFLICT DO NOTHING;

COMMIT;

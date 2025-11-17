-- 导出表: users
-- 数据行数: 2
-- 导出时间: 2025-11-17T00:31:21.464Z

SET search_path TO pikun_db, public;

BEGIN;

INSERT INTO pikun_db.users (uid, uuid, email, password, name, metadata, deleted_at, created_at, updated_at, type) VALUES ('1', '96bf84c3-4076-4566-8fc0-af762a91c4d5', '1457431899@qq.com', '$2a$10$ssTiMxGsJ55OIQHvfplcDeTvRvchrUg1srhuDYxN33x6fj/1v6Nxi', 'pikun', '{}'::jsonb, NULL, '2025-11-16T02:56:34.158Z', '2025-11-16T02:56:34.158Z', 'user') ON CONFLICT DO NOTHING;
INSERT INTO pikun_db.users (uid, uuid, email, password, name, metadata, deleted_at, created_at, updated_at, type) VALUES ('2', '12f6531b-e73b-4d3c-bc17-45bcfc0e11ab', 'admin@test.com', '$2a$10$DEvFv2PZ8Ua1QdSEqH3g9O/ZzHaVJG0P65O4Zy4unsG/Jx4Cf5Y7q', '测试管理员', '{}'::jsonb, NULL, '2025-11-16T03:00:24.733Z', '2025-11-16T03:00:24.733Z', 'admin') ON CONFLICT DO NOTHING;

COMMIT;

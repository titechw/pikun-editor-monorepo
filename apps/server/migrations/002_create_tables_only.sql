-- 数据库迁移脚本（需要超级用户权限）
-- 使用方法：
-- 1. 使用超级用户创建 schema 和扩展：
--    psql -U postgres -h localhost -d postgres -c "CREATE SCHEMA IF NOT EXISTS pikun_db;"
--    psql -U postgres -h localhost -d postgres -c "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";"
--    psql -U postgres -h localhost -d postgres -c "GRANT ALL ON SCHEMA pikun_db TO pikun;"
--    psql -U postgres -h localhost -d postgres -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA pikun_db TO pikun;"
--    psql -U postgres -h localhost -d postgres -c "ALTER DEFAULT PRIVILEGES IN SCHEMA pikun_db GRANT ALL ON TABLES TO pikun;"
--
-- 2. 然后使用普通用户 pikun 执行表创建：
--    psql -U pikun -h localhost -d postgres -f migrations/002_create_tables_only.sql

-- 创建更新时间触发器函数（在 pikun_db schema 中）
CREATE OR REPLACE FUNCTION pikun_db.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 用户表
CREATE TABLE IF NOT EXISTS pikun_db.users (
    uid BIGSERIAL PRIMARY KEY,
    uuid UUID NOT NULL DEFAULT uuid_generate_v4() UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT NOT NULL DEFAULT '',
    metadata JSONB DEFAULT '{}'::JSONB,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 为 users 表添加更新时间触发器
DROP TRIGGER IF EXISTS update_users_updated_at ON pikun_db.users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON pikun_db.users
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

-- 工作空间表
CREATE TABLE IF NOT EXISTS pikun_db.workspaces (
    workspace_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    owner_uid BIGINT NOT NULL REFERENCES pikun_db.users(uid) ON DELETE CASCADE,
    icon TEXT,
    metadata JSONB DEFAULT '{}'::JSONB,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

DROP TRIGGER IF EXISTS update_workspaces_updated_at ON pikun_db.workspaces;
CREATE TRIGGER update_workspaces_updated_at
    BEFORE UPDATE ON pikun_db.workspaces
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

-- 文档表（协作对象）
CREATE TABLE IF NOT EXISTS pikun_db.documents (
    object_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES pikun_db.workspaces(workspace_id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT '',
    content BYTEA NOT NULL,
    content_length INTEGER NOT NULL,
    owner_uid BIGINT NOT NULL REFERENCES pikun_db.users(uid) ON DELETE CASCADE,
    metadata JSONB DEFAULT '{}'::JSONB,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_documents_workspace_id ON pikun_db.documents(workspace_id);
CREATE INDEX IF NOT EXISTS idx_documents_owner_uid ON pikun_db.documents(owner_uid);
CREATE INDEX IF NOT EXISTS idx_documents_created_at ON pikun_db.documents(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_documents_updated_at ON pikun_db.documents(updated_at DESC);

DROP TRIGGER IF EXISTS update_documents_updated_at ON pikun_db.documents;
CREATE TRIGGER update_documents_updated_at
    BEFORE UPDATE ON pikun_db.documents
    FOR EACH ROW
    EXECUTE FUNCTION pikun_db.update_updated_at_column();

-- 文档快照表（历史记录）
CREATE TABLE IF NOT EXISTS pikun_db.document_snapshots (
    snapshot_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    object_id UUID NOT NULL REFERENCES pikun_db.documents(object_id) ON DELETE CASCADE,
    workspace_id UUID NOT NULL REFERENCES pikun_db.workspaces(workspace_id) ON DELETE CASCADE,
    snapshot_data BYTEA NOT NULL,
    snapshot_version INTEGER NOT NULL DEFAULT 1,
    doc_state BYTEA,
    doc_state_version INTEGER DEFAULT 1,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT * 1000
);

CREATE INDEX IF NOT EXISTS idx_document_snapshots_object_id ON pikun_db.document_snapshots(object_id);
CREATE INDEX IF NOT EXISTS idx_document_snapshots_created_at ON pikun_db.document_snapshots(created_at DESC);

-- 文档嵌入表（用于搜索）
CREATE TABLE IF NOT EXISTS pikun_db.document_embeddings (
    id BIGSERIAL PRIMARY KEY,
    object_id UUID NOT NULL REFERENCES pikun_db.documents(object_id) ON DELETE CASCADE,
    workspace_id UUID NOT NULL REFERENCES pikun_db.workspaces(workspace_id) ON DELETE CASCADE,
    embedding BYTEA,
    text_content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::JSONB,
    indexed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_document_embeddings_object_id ON pikun_db.document_embeddings(object_id);
CREATE INDEX IF NOT EXISTS idx_document_embeddings_workspace_id ON pikun_db.document_embeddings(workspace_id);

-- 工作空间成员表
CREATE TABLE IF NOT EXISTS pikun_db.workspace_members (
    workspace_id UUID NOT NULL REFERENCES pikun_db.workspaces(workspace_id) ON DELETE CASCADE,
    uid BIGINT NOT NULL REFERENCES pikun_db.users(uid) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'member',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (workspace_id, uid)
);

CREATE INDEX IF NOT EXISTS idx_workspace_members_uid ON pikun_db.workspace_members(uid);

-- 刷新令牌表
CREATE TABLE IF NOT EXISTS pikun_db.refresh_tokens (
    id BIGSERIAL PRIMARY KEY,
    uid BIGINT NOT NULL REFERENCES pikun_db.users(uid) ON DELETE CASCADE,
    token TEXT NOT NULL UNIQUE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token ON pikun_db.refresh_tokens(token);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_uid ON pikun_db.refresh_tokens(uid);


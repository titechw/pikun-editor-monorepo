-- 启用 UUID 扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 用户表
CREATE TABLE IF NOT EXISTS users (
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

-- 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 为 users 表添加更新时间触发器
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 工作空间表
CREATE TABLE IF NOT EXISTS workspaces (
    workspace_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    owner_uid BIGINT NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
    icon TEXT,
    metadata JSONB DEFAULT '{}'::JSONB,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_workspaces_updated_at
    BEFORE UPDATE ON workspaces
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 文档表（协作对象）
CREATE TABLE IF NOT EXISTS documents (
    object_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES workspaces(workspace_id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT '',
    content BYTEA NOT NULL,
    content_length INTEGER NOT NULL,
    owner_uid BIGINT NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
    metadata JSONB DEFAULT '{}'::JSONB,
    deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_documents_workspace_id ON documents(workspace_id);
CREATE INDEX idx_documents_owner_uid ON documents(owner_uid);
CREATE INDEX idx_documents_created_at ON documents(created_at DESC);
CREATE INDEX idx_documents_updated_at ON documents(updated_at DESC);

CREATE TRIGGER update_documents_updated_at
    BEFORE UPDATE ON documents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 文档快照表（历史记录）
CREATE TABLE IF NOT EXISTS document_snapshots (
    snapshot_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    object_id UUID NOT NULL REFERENCES documents(object_id) ON DELETE CASCADE,
    workspace_id UUID NOT NULL REFERENCES workspaces(workspace_id) ON DELETE CASCADE,
    snapshot_data BYTEA NOT NULL,
    snapshot_version INTEGER NOT NULL DEFAULT 1,
    doc_state BYTEA,
    doc_state_version INTEGER DEFAULT 1,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT * 1000
);

CREATE INDEX idx_document_snapshots_object_id ON document_snapshots(object_id);
CREATE INDEX idx_document_snapshots_created_at ON document_snapshots(created_at DESC);

-- 文档嵌入表（用于搜索）
CREATE TABLE IF NOT EXISTS document_embeddings (
    id BIGSERIAL PRIMARY KEY,
    object_id UUID NOT NULL REFERENCES documents(object_id) ON DELETE CASCADE,
    workspace_id UUID NOT NULL REFERENCES workspaces(workspace_id) ON DELETE CASCADE,
    embedding VECTOR(1536), -- OpenAI embedding 维度
    text_content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::JSONB,
    indexed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_document_embeddings_object_id ON document_embeddings(object_id);
CREATE INDEX idx_document_embeddings_workspace_id ON document_embeddings(workspace_id);

-- 工作空间成员表
CREATE TABLE IF NOT EXISTS workspace_members (
    workspace_id UUID NOT NULL REFERENCES workspaces(workspace_id) ON DELETE CASCADE,
    uid BIGINT NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'member', -- owner, admin, member, viewer
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (workspace_id, uid)
);

CREATE INDEX idx_workspace_members_uid ON workspace_members(uid);

-- 刷新令牌表
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id BIGSERIAL PRIMARY KEY,
    uid BIGINT NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
    token TEXT NOT NULL UNIQUE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);
CREATE INDEX idx_refresh_tokens_uid ON refresh_tokens(uid);





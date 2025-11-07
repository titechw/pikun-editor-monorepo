-- 文档变更日志表（小版本记录）
-- 每次保存都记录一次变更，用于快照之间的增量还原
CREATE TABLE IF NOT EXISTS pikun_db.document_changes (
    change_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    object_id UUID NOT NULL REFERENCES pikun_db.documents(object_id) ON DELETE CASCADE,
    workspace_id UUID NOT NULL REFERENCES pikun_db.workspaces(workspace_id) ON DELETE CASCADE,
    snapshot_id UUID REFERENCES pikun_db.document_snapshots(snapshot_id) ON DELETE SET NULL,
    -- 变更类型：auto_save（自动保存）、manual_save（手动保存）
    change_type TEXT NOT NULL DEFAULT 'auto_save',
    -- 变更数据：Yjs Update（增量更新）
    change_data BYTEA NOT NULL,
    -- 变更前的状态向量（用于验证）
    before_state_vector BYTEA,
    -- 变更后的状态向量
    after_state_vector BYTEA,
    -- 变更大小
    change_size INTEGER NOT NULL,
    -- 元数据
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW())::BIGINT * 1000
);

CREATE INDEX IF NOT EXISTS idx_document_changes_object_id ON pikun_db.document_changes(object_id);
CREATE INDEX IF NOT EXISTS idx_document_changes_snapshot_id ON pikun_db.document_changes(snapshot_id);
CREATE INDEX IF NOT EXISTS idx_document_changes_created_at ON pikun_db.document_changes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_document_changes_object_created ON pikun_db.document_changes(object_id, created_at DESC);

-- 更新 document_snapshots 表，添加版本类型字段
ALTER TABLE pikun_db.document_snapshots 
ADD COLUMN IF NOT EXISTS version_type TEXT DEFAULT 'major' CHECK (version_type IN ('major', 'minor'));
-- major: 大版本快照（定期创建）
-- minor: 小版本快照（手动保存时创建）

COMMENT ON COLUMN pikun_db.document_snapshots.version_type IS '版本类型：major（大版本快照）或 minor（小版本快照）';
COMMENT ON TABLE pikun_db.document_changes IS '文档变更日志表，记录每次保存的增量变更，用于快照之间的还原';


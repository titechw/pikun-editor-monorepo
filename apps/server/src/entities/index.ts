/**
 * 用户实体
 */
export interface User {
  uid: number;
  uuid: string;
  email: string;
  password: string;
  name: string;
  metadata: Record<string, any>;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

/**
 * 工作空间实体
 */
export interface Workspace {
  workspace_id: string;
  name: string;
  owner_uid: number;
  icon: string | null;
  metadata: Record<string, any>;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

/**
 * 文档实体
 */
export interface Document {
  object_id: string;
  workspace_id: string;
  title: string;
  content: Buffer;
  content_length: number;
  owner_uid: number;
  metadata: Record<string, any>;
  deleted_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

/**
 * 文档快照实体
 */
export interface DocumentSnapshot {
  snapshot_id: string;
  object_id: string;
  workspace_id: string;
  snapshot_data: Buffer;
  snapshot_version: number;
  doc_state: Buffer | null;
  doc_state_version: number;
  metadata: Record<string, any>;
  created_at: number;
}

/**
 * 文档嵌入实体
 */
export interface DocumentEmbedding {
  id: number;
  object_id: string;
  workspace_id: string;
  embedding: number[] | null;
  text_content: string;
  metadata: Record<string, any>;
  indexed_at: Date;
}

/**
 * 工作空间成员实体
 */
export interface WorkspaceMember {
  workspace_id: string;
  uid: number;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  created_at: Date;
}

/**
 * 刷新令牌实体
 */
export interface RefreshToken {
  id: number;
  uid: number;
  token: string;
  expires_at: Date;
  created_at: Date;
}





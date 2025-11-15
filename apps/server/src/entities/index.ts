/**
 * 用户类型
 * 用于区分管理员和普通用户，后续 role 字段可用于管理端内部角色（如：超级管理员、普通管理员等）
 */
export type UserType = 'admin' | 'user';

/**
 * 用户实体
 */
export interface User {
  uid: number;
  uuid: string;
  email: string;
  password: string;
  name: string;
  type: UserType;
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
  version_type: 'major' | 'minor'; // 版本类型：major（大版本）或 minor（小版本）
  metadata: Record<string, any>;
  created_at: number;
}

/**
 * 文档变更日志实体
 */
export interface DocumentChange {
  change_id: string;
  object_id: string;
  workspace_id: string;
  snapshot_id: string | null;
  change_type: 'auto_save' | 'manual_save';
  change_data: Buffer;
  before_state_vector: Buffer | null;
  after_state_vector: Buffer | null;
  change_size: number;
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

/**
 * 能力类别实体
 */
export interface AbilityCategory {
  category_id: string;
  code: string;
  name: string;
  description: string | null;
  sort_order: number;
  metadata: Record<string, any>;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

/**
 * 能力维度实体
 */
export interface AbilityDimension {
  dimension_id: string;
  category_id: string;
  code: string;
  name: string;
  description: string | null;
  sort_order: number;
  metadata: Record<string, any>;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

/**
 * 能力项实体
 */
export interface AbilityItem {
  item_id: string;
  dimension_id: string;
  code: string;
  name: string;
  description: string | null;
  definition: string | null;
  performance_description: string | null;
  evaluation_points: string | null;
  training_strategies: string | null;
  theoretical_basis: string | null;
  talent_ratio: number; // 天赋占比（0-100）
  acquired_training_ratio: number; // 后天训练占比（0-100）
  sort_order: number;
  metadata: Record<string, any>;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

/**
 * 能力项等级配置实体
 */
export interface AbilityItemLevelConfig {
  config_id: string;
  item_id: string | null;
  level: number;
  required_exp: number;
  requires_assessment: boolean;
  level_name: string | null;
  level_description: string | null;
  is_template: boolean;
  sort_order: number;
  metadata: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

/**
 * 用户能力等级实体
 */
export interface UserAbilityLevel {
  user_level_id: string;
  uid: number;
  item_id: string;
  current_level: number;
  current_exp: number;
  total_exp: number;
  level_up_count: number;
  last_level_up_at: Date | null;
  metadata: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

/**
 * 用户经验获得记录实体
 */
export interface UserAbilityExperienceLog {
  log_id: string;
  uid: number;
  item_id: string;
  exp_amount: number;
  exp_type: string;
  source_id: string | null;
  source_type: string | null;
  before_level: number;
  after_level: number;
  before_exp: number;
  after_exp: number;
  is_level_up: boolean;
  notes: string | null;
  metadata: Record<string, any>;
  created_at: Date;
}





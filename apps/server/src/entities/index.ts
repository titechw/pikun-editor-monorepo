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

/**
 * 课程实体
 */
export interface Course {
  course_id: string;
  code: string;
  name: string;
  description: string | null;
  cover_image_url: string | null;
  course_type: 'learning' | 'training' | 'mixed' | 'ability_training' | 'skill_knowledge';
  difficulty_level: number;
  estimated_duration: number | null;
  sort_order: number;
  is_published: boolean;
  course_url: string | null; // 课程 URL（游戏 URL 等）
  course_source: 'official' | 'third_party'; // 课程来源
  author_name: string | null; // 作者名
  secret_id: string | null; // secretId（用于游戏调用升级接口的验证）
  primary_item_id: string | null; // 主要关联的能力项
  metadata: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

/**
 * 课程内容实体
 */
export interface CourseContent {
  content_id: string;
  course_id: string;
  content_type: 'video' | 'article' | 'game' | 'training' | 'interactive';
  title: string;
  description: string | null;
  content_url: string | null;
  content_data: Record<string, unknown>;
  duration: number | null;
  sort_order: number;
  is_required: boolean;
  metadata: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

/**
 * 考试实体
 */
export interface Assessment {
  assessment_id: string;
  code: string;
  name: string;
  description: string | null;
  assessment_type: 'exam' | 'project' | 'game' | 'performance';
  item_id: string | null;
  level_requirement: number | null;
  passing_criteria: Record<string, unknown>;
  assessment_config: Record<string, unknown>;
  exp_reward: number;
  sort_order: number;
  is_published: boolean;
  metadata: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

/**
 * 课程能力绑定实体
 */
export interface CourseAbilityBinding {
  binding_id: string;
  course_id: string;
  item_id: string;
  exp_reward: number;
  is_primary: boolean;
  created_at: Date;
}

/**
 * 用户课程学习记录实体
 */
export interface UserCourseProgress {
  progress_id: string;
  uid: number;
  course_id: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'abandoned';
  progress_percentage: number;
  completed_contents: string[];
  started_at: Date | null;
  completed_at: Date | null;
  last_accessed_at: Date | null;
  metadata: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
}

/**
 * 用户考试记录实体
 */
export interface UserAssessmentRecord {
  record_id: string;
  uid: number;
  assessment_id: string;
  item_id: string | null;
  score: number | null;
  result_data: Record<string, unknown>;
  is_passed: boolean;
  exp_earned: number;
  duration_seconds: number | null;
  metadata: Record<string, unknown>;
  created_at: Date;
}

/**
 * 用户训练记录实体
 */
export interface UserTrainingRecord {
  record_id: string;
  uid: number;
  item_id: string;
  course_content_id: string | null;
  training_type: 'game' | 'practice' | 'exercise';
  result_data: Record<string, unknown>;
  exp_earned: number;
  duration_seconds: number | null;
  metadata: Record<string, unknown>;
  created_at: Date;
}

/**
 * 游戏场景实体
 */
export interface GameScenario {
  scenario_id: string;
  code: string;
  name: string;
  description: string | null;
  scenario_type: 'training' | 'assessment' | 'mixed' | 'story';
  cover_image_url: string | null;
  background_image_url: string | null;
  difficulty_level: number;
  estimated_duration: number | null;
  sort_order: number;
  is_published: boolean;
  metadata: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

/**
 * 场景课程绑定实体
 */
export interface ScenarioCourseBinding {
  binding_id: string;
  scenario_id: string;
  course_id: string;
  is_primary: boolean;
  sort_order: number;
  created_at: Date;
}

/**
 * NPC 实体
 */
export interface NPC {
  npc_id: string;
  code: string;
  name: string;
  description: string | null;
  avatar_url: string | null;
  scenario_id: string | null;
  position_x: number | null;
  position_y: number | null;
  dialogue_data: Record<string, unknown>;
  metadata: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

/**
 * 任务实体
 */
export interface Quest {
  quest_id: string;
  npc_id: string;
  code: string;
  name: string;
  description: string | null;
  quest_type: 'training' | 'assessment' | 'daily' | 'main';
  course_id: string | null;
  assessment_id: string | null;
  prerequisite_quest_ids: string[];
  exp_reward: number;
  item_rewards: unknown[];
  sort_order: number;
  is_published: boolean;
  metadata: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

/**
 * 游戏会话实体
 */
export interface GameSession {
  session_id: string;
  uid: number;
  scenario_id: string;
  quest_id: string | null;
  session_key: string;
  status: 'active' | 'completed' | 'abandoned' | 'expired';
  started_at: Date;
  completed_at: Date | null;
  expires_at: Date | null;
  metadata: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
}

/**
 * 用户任务记录实体
 */
export interface UserQuestRecord {
  record_id: string;
  uid: number;
  quest_id: string;
  session_id: string | null;
  status: 'in_progress' | 'completed' | 'failed' | 'abandoned';
  result_data: Record<string, unknown>;
  exp_earned: number;
  completed_at: Date | null;
  metadata: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
}

/**
 * 学科分类实体（支持树形结构）
 */
export interface SubjectCategory {
  category_id: string;
  parent_id: string | null;
  code: string;
  name: string;
  description: string | null;
  icon_url: string | null;
  level: number;
  path: string | null;
  sort_order: number;
  metadata: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

/**
 * 学科实体
 */
export interface Subject {
  subject_id: string;
  category_id: string;
  code: string;
  name: string;
  short_name: string | null;
  icon_url: string | null;
  cover_image_url: string | null;
  sort_order: number;
  is_published: boolean;
  metadata: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

/**
 * 学科详情实体
 */
export interface SubjectDetail {
  detail_id: string;
  subject_id: string;
  definition: string | null;
  description: string | null;
  purpose: string | null;
  value: string | null;
  application_scenarios: string | null;
  learning_objectives: string | null;
  prerequisites: string | null;
  related_subjects: string[];
  metadata: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
}

/**
 * 记忆训练游戏实体
 */
export interface MemoryTrainingGame {
  game_id: string;
  code: string;
  name: string;
  description: string | null;
  icon: string | null;
  game_type: string;
  ability_item_id: string | null;
  min_ability_level: number;
  max_ability_level: number;
  sort_order: number;
  is_published: boolean;
  metadata: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

/**
 * 记忆训练关卡实体
 */
export interface MemoryTrainingLevel {
  level_id: string;
  game_id: string;
  level_number: number;
  name: string | null;
  description: string | null;
  difficulty_config: Record<string, unknown>;
  required_ability_level: number;
  base_exp_reward: number;
  unlock_condition: Record<string, unknown>;
  sort_order: number;
  is_published: boolean;
  metadata: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

/**
 * 用户关卡进度实体
 */
export interface UserMemoryLevelProgress {
  progress_id: string;
  uid: number;
  level_id: string;
  is_unlocked: boolean;
  is_completed: boolean;
  best_score: number;
  best_correct_rate: number;
  best_time_spent: number | null;
  completion_count: number;
  total_exp_earned: number;
  first_completed_at: Date | null;
  last_played_at: Date | null;
  metadata: Record<string, unknown>;
  created_at: Date;
  updated_at: Date;
}

export interface SubjectAbilityBinding {
  binding_id: string;
  subject_id: string;
  item_id: string;
  required_level: number;
  recommended_level: number | null;
  is_primary: boolean;
  importance_weight: number;
  sort_order: number;
  metadata: Record<string, unknown>;
  created_at: Date;
}


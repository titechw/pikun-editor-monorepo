import { apiClient } from '@/utils/apiClient';

/**
 * 资源类型
 */
export type ResourceType = 'pdf' | 'document' | 'video' | 'game' | 'experiment' | 'book';

/**
 * 资源状态
 */
export type ResourceStatus = 'draft' | 'pending' | 'published' | 'deleted';

/**
 * 创建者类型
 */
export type CreatorType = 'official' | 'third_party';

/**
 * 学习资源
 */
export interface LearningResource {
  resource_id: string;
  name: string;
  type: ResourceType;
  introduction: string | null;
  content_url: string | null;
  creator_id: string | null;
  creator_name: string | null;
  creator_type: CreatorType;
  status: ResourceStatus;
  sort_order: number;
  duration_minutes: number | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

/**
 * 知识点
 */
export interface KnowledgePoint {
  point_id: string;
  subject_id: string;
  code: string;
  name: string;
  description: string | null;
  difficulty_level: number;
  estimated_hours: number | null;
  required_abilities: string[]; // 能力项 ID 列表
  resources: LearningResource[]; // 关联的学习资源
  sort_order: number;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

/**
 * 学习单元详情
 */
export interface LearningUnitDetail {
  unit_id: string;
  point_id: string;
  knowledge_point: KnowledgePoint;
  unit_type: 'course' | 'exercise' | 'exam' | 'project';
  title: string;
  content_url: string | null;
  duration_minutes: number | null;
  difficulty_level: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

/**
 * 学习笔记
 */
export interface LearningNote {
  note_id: string;
  point_id: string;
  user_id: string;
  content: string;
  related_abilities: string[]; // 关联的能力项 ID 列表
  created_at: string;
  updated_at: string;
}

/**
 * 评论
 */
export interface Comment {
  comment_id: string;
  resource_id: string | null;
  point_id: string | null;
  user_id: string;
  user_name: string;
  content: string;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * 学习工作台数据
 */
export interface LearningWorkspaceData {
  knowledge_point: KnowledgePoint;
  current_resource: LearningResource | null;
  resources: LearningResource[];
  notes: LearningNote[];
  comments: Comment[];
  related_resources: LearningResource[];
}

/**
 * 学习 API
 */
export const learningApi = {
  /**
   * 获取学习工作台数据
   * TODO: 移除 mock，恢复真实 API 调用
   */
  async getWorkspace(pointId: string): Promise<LearningWorkspaceData> {
    // Mock 数据 - 后续需要恢复真实 API 调用
    // const response = await apiClient.get<LearningWorkspaceData>(`/learning/workspace/${pointId}`);
    // return response.data;

    // Mock 数据
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          knowledge_point: {
            point_id: pointId,
            subject_id: 'math-subject-001',
            code: 'math-algebra-linear-equation',
            name: '一元一次方程',
            description: '学习一元一次方程的基本概念、解法和应用',
            difficulty_level: 2,
            estimated_hours: 3,
            required_abilities: ['logic-thinking', 'calculation'],
            resources: [
              {
                resource_id: 'res-001',
                name: '一元一次方程基础视频',
                type: 'video',
                introduction: '通过动画和实例讲解一元一次方程的基本概念',
                content_url: 'https://example.com/video/linear-equation-basic.mp4',
                creator_id: 'creator-001',
                creator_name: '官方教学团队',
                creator_type: 'official',
                status: 'published',
                sort_order: 1,
                duration_minutes: 25,
                metadata: {},
                created_at: '2024-01-01T00:00:00Z',
                updated_at: '2024-01-01T00:00:00Z',
              },
              {
                resource_id: 'res-002',
                name: '一元一次方程练习题',
                type: 'document',
                introduction: '包含20道一元一次方程练习题，附详细解答',
                content_url: 'https://example.com/docs/linear-equation-exercises.pdf',
                creator_id: 'creator-001',
                creator_name: '官方教学团队',
                creator_type: 'official',
                status: 'published',
                sort_order: 2,
                duration_minutes: 45,
                metadata: {},
                created_at: '2024-01-01T00:00:00Z',
                updated_at: '2024-01-01T00:00:00Z',
              },
              {
                resource_id: 'res-003',
                name: '方程求解游戏',
                type: 'game',
                introduction: '通过游戏方式练习解一元一次方程',
                content_url: 'https://example.com/games/equation-solver',
                creator_id: 'creator-002',
                creator_name: '第三方开发者',
                creator_type: 'third_party',
                status: 'published',
                sort_order: 3,
                duration_minutes: 30,
                metadata: {},
                created_at: '2024-01-01T00:00:00Z',
                updated_at: '2024-01-01T00:00:00Z',
              },
            ],
            sort_order: 1,
            metadata: {},
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          },
          current_resource: {
            resource_id: 'res-001',
            name: '一元一次方程基础视频',
            type: 'video',
            introduction: '通过动画和实例讲解一元一次方程的基本概念',
            content_url: 'https://example.com/video/linear-equation-basic.mp4',
            creator_id: 'creator-001',
            creator_name: '官方教学团队',
            creator_type: 'official',
            status: 'published',
            sort_order: 1,
            duration_minutes: 25,
            metadata: {},
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          },
          resources: [
            {
              resource_id: 'res-001',
              name: '一元一次方程基础视频',
              type: 'video',
              introduction: '通过动画和实例讲解一元一次方程的基本概念',
              content_url: 'https://example.com/video/linear-equation-basic.mp4',
              creator_id: 'creator-001',
              creator_name: '官方教学团队',
              creator_type: 'official',
              status: 'published',
              sort_order: 1,
              duration_minutes: 25,
              metadata: {},
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z',
            },
            {
              resource_id: 'res-002',
              name: '一元一次方程练习题',
              type: 'document',
              introduction: '包含20道一元一次方程练习题，附详细解答',
              content_url: 'https://example.com/docs/linear-equation-exercises.pdf',
              creator_id: 'creator-001',
              creator_name: '官方教学团队',
              creator_type: 'official',
              status: 'published',
              sort_order: 2,
              duration_minutes: 45,
              metadata: {},
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z',
            },
            {
              resource_id: 'res-003',
              name: '方程求解游戏',
              type: 'game',
              introduction: '通过游戏方式练习解一元一次方程',
              content_url: 'https://example.com/games/equation-solver',
              creator_id: 'creator-002',
              creator_name: '第三方开发者',
              creator_type: 'third_party',
              status: 'published',
              sort_order: 3,
              duration_minutes: 30,
              metadata: {},
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z',
            },
          ],
          notes: [
            {
              note_id: 'note-001',
              point_id: pointId,
              user_id: 'user-001',
              content: '一元一次方程的核心是找到未知数的值，通过移项和合并同类项来求解。',
              related_abilities: ['logic-thinking'],
              created_at: '2024-01-02T10:00:00Z',
              updated_at: '2024-01-02T10:00:00Z',
            },
          ],
          comments: [
            {
              comment_id: 'comment-001',
              resource_id: 'res-001',
              point_id: null,
              user_id: 'user-002',
              user_name: '学习者A',
              content: '这个视频讲解得很清楚，特别是移项的部分！',
              parent_id: null,
              created_at: '2024-01-03T14:00:00Z',
              updated_at: '2024-01-03T14:00:00Z',
            },
            {
              comment_id: 'comment-002',
              resource_id: 'res-001',
              point_id: null,
              user_id: 'user-003',
              user_name: '学习者B',
              content: '有没有更多的练习题推荐？',
              parent_id: null,
              created_at: '2024-01-03T15:00:00Z',
              updated_at: '2024-01-03T15:00:00Z',
            },
          ],
          related_resources: [
            {
              resource_id: 'res-004',
              name: '二元一次方程组',
              type: 'video',
              introduction: '学习二元一次方程组的解法',
              content_url: 'https://example.com/video/binary-equation.mp4',
              creator_id: 'creator-001',
              creator_name: '官方教学团队',
              creator_type: 'official',
              status: 'published',
              sort_order: 1,
              duration_minutes: 30,
              metadata: {},
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z',
            },
          ],
        });
      }, 300);
    });
  },

  /**
   * 切换当前学习资源
   * TODO: 移除 mock，恢复真实 API 调用
   */
  async switchResource(pointId: string, resourceId: string): Promise<LearningResource> {
    // Mock 数据 - 后续需要恢复真实 API 调用
    // const response = await apiClient.post<LearningResource>(`/learning/workspace/${pointId}/switch-resource`, { resourceId });
    // return response.data;

    // Mock 数据
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          resource_id: resourceId,
          name: '切换后的资源',
          type: 'document',
          introduction: '这是切换后的资源',
          content_url: 'https://example.com/resource.pdf',
          creator_id: 'creator-001',
          creator_name: '官方教学团队',
          creator_type: 'official',
          status: 'published',
          sort_order: 1,
          duration_minutes: 30,
          metadata: {},
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        });
      }, 200);
    });
  },

  /**
   * 保存学习笔记
   * TODO: 移除 mock，恢复真实 API 调用
   */
  async saveNote(pointId: string, content: string, relatedAbilities: string[]): Promise<LearningNote> {
    // Mock 数据 - 后续需要恢复真实 API 调用
    // const response = await apiClient.post<LearningNote>(`/learning/notes`, { pointId, content, relatedAbilities });
    // return response.data;

    // Mock 数据
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          note_id: `note-${Date.now()}`,
          point_id: pointId,
          user_id: 'user-001',
          content,
          related_abilities: relatedAbilities,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }, 200);
    });
  },

  /**
   * 获取学习笔记列表
   * TODO: 移除 mock，恢复真实 API 调用
   */
  async getNotes(pointId: string): Promise<LearningNote[]> {
    // Mock 数据 - 后续需要恢复真实 API 调用
    // const response = await apiClient.get<LearningNote[]>(`/learning/notes?pointId=${pointId}`);
    // return response.data;

    // Mock 数据
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 200);
    });
  },
};



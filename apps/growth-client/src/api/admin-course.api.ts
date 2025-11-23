import { adminApiClient } from '@/utils/adminApiClient';

/**
 * 课程
 */
export interface Course {
  course_id: string;
  code: string;
  name: string;
  description: string | null;
  cover_image_url: string | null;
  course_type: 'ability_training' | 'skill_knowledge' | 'learning' | 'training' | 'mixed';
  difficulty_level: number;
  estimated_duration: number | null;
  sort_order: number;
  is_published: boolean;
  course_url: string | null;
  course_source: 'official' | 'third_party';
  author_name: string | null;
  secret_id: string | null;
  primary_item_id: string | null;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

/**
 * 课程列表响应
 */
export interface CourseListResponse {
  courses: Course[];
  total: number;
}

/**
 * 课程管理 API
 */
export const adminCourseApi = {
  /**
   * 获取课程列表
   */
  async getCourses(params?: {
    current?: number;
    pageSize?: number;
    keyword?: string;
    courseType?: string;
    courseSource?: string;
  }): Promise<CourseListResponse> {
    const searchParams = new URLSearchParams();
    if (params?.current) searchParams.set('current', params.current.toString());
    if (params?.pageSize) searchParams.set('pageSize', params.pageSize.toString());
    if (params?.keyword) searchParams.set('keyword', params.keyword);
    if (params?.courseType) searchParams.set('courseType', params.courseType);
    if (params?.courseSource) searchParams.set('courseSource', params.courseSource);

    const response = await adminApiClient.get<CourseListResponse>(
      `/admin/course/courses?${searchParams.toString()}`
    );
    return response.data || { courses: [], total: 0 };
  },

  /**
   * 获取课程详情
   */
  async getCourse(courseId: string): Promise<Course | null> {
    const response = await adminApiClient.get<Course>(`/admin/course/courses/${courseId}`);
    return response.data || null;
  },

  /**
   * 创建课程
   */
  async createCourse(course: {
    code: string;
    name: string;
    description?: string | null;
    cover_image_url?: string | null;
    course_type: 'ability_training' | 'skill_knowledge' | 'learning' | 'training' | 'mixed';
    difficulty_level?: number;
    estimated_duration?: number | null;
    sort_order?: number;
    is_published?: boolean;
    course_url?: string | null;
    course_source?: 'official' | 'third_party';
    author_name?: string | null;
    secret_id?: string | null;
    primary_item_id?: string | null;
    metadata?: Record<string, any>;
  }): Promise<Course> {
    const response = await adminApiClient.post<Course>('/admin/course/courses', course);
    if (!response.data) {
      throw new Error('创建课程失败');
    }
    return response.data;
  },

  /**
   * 更新课程
   */
  async updateCourse(
    courseId: string,
    updates: {
      name?: string;
      description?: string | null;
      cover_image_url?: string | null;
      course_type?: 'ability_training' | 'skill_knowledge' | 'learning' | 'training' | 'mixed';
      difficulty_level?: number;
      estimated_duration?: number | null;
      sort_order?: number;
      is_published?: boolean;
      course_url?: string | null;
      course_source?: 'official' | 'third_party';
      author_name?: string | null;
      secret_id?: string | null;
      primary_item_id?: string | null;
      metadata?: Record<string, any>;
    }
  ): Promise<Course> {
    const response = await adminApiClient.put<Course>(`/admin/course/courses/${courseId}`, updates);
    if (!response.data) {
      throw new Error('更新课程失败');
    }
    return response.data;
  },

  /**
   * 删除课程
   */
  async deleteCourse(courseId: string): Promise<void> {
    await adminApiClient.delete(`/admin/course/courses/${courseId}`);
  },
};


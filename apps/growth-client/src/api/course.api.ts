import { apiClient } from '@/utils/apiClient';

/**
 * 课程（C端）
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
  course_url: string | null;
  course_source: 'official' | 'third_party';
  author_name: string | null;
  primary_item_id: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * 课程列表响应
 */
export interface CourseListResponse {
  courses: Course[];
  total: number;
}

/**
 * C端课程 API
 */
export const courseApi = {
  /**
   * 获取已发布的课程列表
   */
  async getCourses(params?: {
    current?: number;
    pageSize?: number;
    keyword?: string;
    courseType?: string;
  }): Promise<CourseListResponse> {
    const searchParams = new URLSearchParams();
    if (params?.current) searchParams.set('current', params.current.toString());
    if (params?.pageSize) searchParams.set('pageSize', params.pageSize.toString());
    if (params?.keyword) searchParams.set('keyword', params.keyword);
    if (params?.courseType) searchParams.set('courseType', params.courseType);

    const response = await apiClient.get<CourseListResponse>(
      `/course/courses?${searchParams.toString()}`
    );
    return response.data || { courses: [], total: 0 };
  },

  /**
   * 获取课程详情
   */
  async getCourse(courseId: string): Promise<Course | null> {
    const response = await apiClient.get<Course>(`/course/courses/${courseId}`);
    return response.data || null;
  },
};






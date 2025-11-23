import {
  BaseListStore,
  BaseListItem,
  BaseListParams,
  BaseListResponse,
} from '@/stores/base/BaseListStore';
import { makeObservable } from 'mobx';
import { adminCourseApi, type Course } from '@/api/admin-course.api';
import { message } from 'antd';

/**
 * 课程列表项
 */
export interface CourseListItem extends BaseListItem {
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
}

/**
 * 操作类型
 */
export enum CourseOperationType {
  View = 'view',
  Edit = 'edit',
  Delete = 'delete',
}

/**
 * 课程列表 Store
 */
export class CourseListStore extends BaseListStore<
  CourseListItem,
  CourseOperationType,
  never
> {
  constructor() {
    super();
    makeObservable(this);
    this.loadColumnSettings();
  }

  /**
   * 实现抽象方法：查询数据
   */
  protected async queryData(params: BaseListParams): Promise<BaseListResponse<CourseListItem>> {
    const response = await adminCourseApi.getCourses({
      current: params.current,
      pageSize: params.pageSize,
      keyword: params.filter?.keyword as string | undefined,
      courseType: params.filter?.courseType as string | undefined,
      courseSource: params.filter?.courseSource as string | undefined,
    });

    return {
      data: response.courses.map(this.mapCourseToListItem),
      pagination: {
        current: params.current,
        pageSize: params.pageSize,
        total: response.total,
      },
    };
  }

  /**
   * 实现抽象方法：获取数据
   */
  async fetchData(params?: Partial<BaseListParams>): Promise<void> {
    this.setLoading(true);
    try {
      const queryParams: BaseListParams = {
        current: this.pagination.current,
        pageSize: this.pagination.pageSize,
        filter: this.filter,
        ...params,
      };

      const result = await this.queryData(queryParams);

      this.setData(result.data);
      this.setPagination(result.pagination);
    } catch (error) {
      console.error('获取数据失败:', error);
    } finally {
      this.setLoading(false);
    }
  }

  /**
   * 实现抽象方法：处理单个操作
   */
  async handleOperation(type: CourseOperationType, record: CourseListItem): Promise<void> {
    await this.processOperation(type, record);
  }

  /**
   * 实现抽象方法：处理批量操作
   */
  async handleBatchOperation(): Promise<void> {
    // 暂不支持批量操作
  }

  /**
   * 实现抽象方法：处理具体操作逻辑
   */
  protected async processOperation(
    type: CourseOperationType,
    record: CourseListItem
  ): Promise<void> {
    switch (type) {
      case CourseOperationType.View:
        // 查看详情逻辑
        break;
      case CourseOperationType.Edit:
        // 编辑逻辑
        break;
      case CourseOperationType.Delete:
        await adminCourseApi.deleteCourse(record.course_id);
        message.success('删除成功');
        await this.fetchData();
        break;
    }
  }

  /**
   * 实现抽象方法：获取列配置存储键
   */
  getColumnStorageKey(): string {
    return 'course_list_column_settings';
  }

  /**
   * 实现抽象方法：加载列配置
   */
  loadColumnSettings(): void {
    const storageKey = this.getColumnStorageKey();
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        this.columnSettings = JSON.parse(saved);
      } catch (error) {
        console.error('加载列配置失败:', error);
      }
    }
  }

  /**
   * 映射 Course 到 CourseListItem
   */
  private mapCourseToListItem = (course: Course): CourseListItem => {
    return {
      id: course.course_id,
      course_id: course.course_id,
      code: course.code,
      name: course.name,
      description: course.description,
      cover_image_url: course.cover_image_url,
      course_type: course.course_type,
      difficulty_level: course.difficulty_level,
      estimated_duration: course.estimated_duration,
      sort_order: course.sort_order,
      is_published: course.is_published,
      course_url: course.course_url,
      course_source: course.course_source,
      author_name: course.author_name,
      secret_id: course.secret_id,
      primary_item_id: course.primary_item_id,
    };
  };
}

export const courseListStore = new CourseListStore();






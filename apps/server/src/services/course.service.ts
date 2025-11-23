import { injectable, inject } from 'tsyringe';
import type { Course } from '@/entities';
import { CourseDAO } from '@/dao/course.dao';
import { ExperienceService } from './experience.service';

/**
 * 课程服务
 */
@injectable()
export class CourseService {
  constructor(
    @inject('CourseDAO') private courseDAO: CourseDAO,
    @inject(ExperienceService) private experienceService: ExperienceService
  ) {}

  /**
   * 获取课程列表
   */
  async getCourses(options?: {
    current?: number;
    pageSize?: number;
    keyword?: string;
    courseType?: string;
    courseSource?: string;
  }): Promise<{ courses: Course[]; total: number }> {
    return await this.courseDAO.findAll(options);
  }

  /**
   * 获取课程详情
   */
  async getCourse(courseId: string): Promise<Course | null> {
    return await this.courseDAO.findById(courseId);
  }

  /**
   * 创建课程
   */
  async createCourse(course: {
    code: string;
    name: string;
    description?: string | null;
    cover_image_url?: string | null;
    course_type: string;
    difficulty_level?: number;
    estimated_duration?: number | null;
    sort_order?: number;
    is_published?: boolean;
    course_url?: string | null;
    course_source?: 'official' | 'third_party';
    author_name?: string | null;
    secret_id?: string | null; // 允许手动设置 secretId
    primary_item_id?: string | null;
    metadata?: Record<string, any>;
  }): Promise<Course> {
    return await this.courseDAO.create(course);
  }

  /**
   * 更新课程
   */
  async updateCourse(
    courseId: string,
    updates: {
      name?: string;
      description?: string | null;
      cover_image_url?: string | null;
      course_type?: string;
      difficulty_level?: number;
      estimated_duration?: number | null;
      sort_order?: number;
      is_published?: boolean;
      course_url?: string | null;
      course_source?: 'official' | 'third_party';
      author_name?: string | null;
      primary_item_id?: string | null;
      secret_id?: string | null; // 允许更新 secretId
      metadata?: Record<string, any>;
    }
  ): Promise<Course> {
    return await this.courseDAO.update(courseId, updates);
  }

  /**
   * 删除课程
   */
  async deleteCourse(courseId: string): Promise<void> {
    await this.courseDAO.delete(courseId);
  }

  /**
   * 提交游戏结果（通过 secretId 验证）
   */
  async submitGameResult(
    secretId: string,
    courseId: string,
    uid: number,
    resultData: {
      correct: boolean;
      correctRate: number;
      score: number;
      timeSpent: number;
      userAnswer: any;
    }
  ): Promise<{
    expEarned: number;
    levelUp: boolean;
    newLevel?: number;
    message?: string;
  }> {
    // 验证 secretId 和 courseId
    const course = await this.courseDAO.findBySecretId(secretId);
    if (!course || course.course_id !== courseId) {
      throw new Error('无效的 secretId 或 courseId');
    }

    if (!course.primary_item_id) {
      throw new Error('课程未关联能力项');
    }

    // 计算经验值
    const baseExp = 10; // 基础经验值，可以根据课程配置调整
    const expEarned = Math.round(baseExp * resultData.correctRate);

    // 添加经验值
    const expResult = await this.experienceService.addExperience(
      uid,
      course.primary_item_id,
      expEarned,
      {
        expType: 'course_game',
        sourceType: 'course',
        sourceId: courseId,
        notes: `课程游戏 - ${course.name}`,
        metadata: {
          courseId,
          courseName: course.name,
          resultData,
        },
      }
    );

    return {
      expEarned,
      levelUp: expResult.levelUp,
      newLevel: expResult.newLevel,
      message: expResult.levelUp
        ? `恭喜升级到 ${expResult.newLevel} 级！`
        : undefined,
    };
  }
}


import { makeAutoObservable, runInAction } from 'mobx';
import { message } from 'antd';
import {
  learningApi,
  type LearningWorkspaceData,
  type LearningResource,
  type LearningNote,
  type Comment,
} from '@/api/learning.api';

/**
 * 学习 Store
 * 管理学习工作台的状态和操作
 */
export class LearningStore {
  // 工作台数据
  workspaceData: LearningWorkspaceData | null = null;
  currentResource: LearningResource | null = null;
  resources: LearningResource[] = [];
  notes: LearningNote[] = [];
  comments: Comment[] = [];
  relatedResources: LearningResource[] = [];

  // 页面状态
  loading = false;
  currentPointId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * 加载学习工作台数据
   */
  async loadWorkspace(pointId: string): Promise<void> {
    this.loading = true;
    this.currentPointId = pointId;

    try {
      const data = await learningApi.getWorkspace(pointId);

      runInAction(() => {
        this.workspaceData = data;
        this.currentResource = data.current_resource;
        this.resources = data.resources;
        this.notes = data.notes;
        this.comments = data.comments;
        this.relatedResources = data.related_resources;
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '加载学习工作台失败';
      message.error(errorMessage);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  /**
   * 切换当前学习资源
   */
  async switchResource(resourceId: string): Promise<void> {
    if (!this.currentPointId) {
      message.error('请先选择知识点');
      return;
    }

    try {
      const resource = await learningApi.switchResource(this.currentPointId, resourceId);

      runInAction(() => {
        this.currentResource = resource;
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '切换资源失败';
      message.error(errorMessage);
    }
  }

  /**
   * 保存学习笔记
   */
  async saveNote(content: string, relatedAbilities: string[]): Promise<void> {
    if (!this.currentPointId) {
      message.error('请先选择知识点');
      return;
    }

    try {
      const note = await learningApi.saveNote(this.currentPointId, content, relatedAbilities);

      runInAction(() => {
        this.notes = [...this.notes, note];
      });

      message.success('笔记保存成功');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '保存笔记失败';
      message.error(errorMessage);
    }
  }

  /**
   * 刷新笔记列表
   */
  async refreshNotes(): Promise<void> {
    if (!this.currentPointId) {
      return;
    }

    try {
      const notes = await learningApi.getNotes(this.currentPointId);

      runInAction(() => {
        this.notes = notes;
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '加载笔记失败';
      message.error(errorMessage);
    }
  }

  /**
   * 重置状态
   */
  reset(): void {
    runInAction(() => {
      this.workspaceData = null;
      this.currentResource = null;
      this.resources = [];
      this.notes = [];
      this.comments = [];
      this.relatedResources = [];
      this.currentPointId = null;
    });
  }
}

export const learningStore = new LearningStore();


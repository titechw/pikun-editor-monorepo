import { makeObservable, runInAction, observable, action, computed } from 'mobx';
import { message } from 'antd';
import {
  knowledgeMapApi,
  type KnowledgeMapData,
  type KnowledgeMapNode,
  type KnowledgeMapEdge,
  type SubjectDependency,
} from '@/api/subject.api';
import { subjectApi, type Subject, type SubjectCategory } from '@/api/subject.api';

/**
 * 知识地图 Store
 */
export class KnowledgeMapStore {
  loading: boolean = false;
  mapData: KnowledgeMapData = { nodes: [], edges: [] };
  selectedCategoryId: string | null = null;
  selectedSubjectId: string | null = null;
  subjects: Subject[] = []; // 所有学科列表（用于选择）
  categories: SubjectCategory[] = []; // 分类列表（用于筛选）

  constructor() {
    makeObservable(this, {
      loading: observable,
      mapData: observable,
      selectedCategoryId: observable,
      selectedSubjectId: observable,
      subjects: observable,
      categories: observable,
      loadKnowledgeMap: action,
      loadSubjects: action,
      setSelectedCategoryId: action,
      setSelectedSubjectId: action,
      addDependency: action,
      removeDependency: action,
      nodes: computed,
      edges: computed,
    });
  }

  /**
   * 获取节点列表
   */
  get nodes(): KnowledgeMapNode[] {
    return this.mapData.nodes || [];
  }

  /**
   * 获取边列表
   */
  get edges(): KnowledgeMapEdge[] {
    return this.mapData.edges || [];
  }

  /**
   * 设置选中的分类ID
   */
  setSelectedCategoryId(categoryId: string | null): void {
    this.selectedCategoryId = categoryId;
  }

  /**
   * 设置选中的学科ID
   */
  setSelectedSubjectId(subjectId: string | null): void {
    this.selectedSubjectId = subjectId;
  }

  /**
   * 加载知识地图数据
   */
  async loadKnowledgeMap(categoryId?: string | null): Promise<void> {
    this.loading = true;
    try {
      const data = await knowledgeMapApi.getKnowledgeMap(categoryId || this.selectedCategoryId || null);
      runInAction(() => {
        this.mapData = data;
        // 如果没有节点，初始化一个空数组
        if (!this.mapData.nodes) {
          this.mapData.nodes = [];
        }
        if (!this.mapData.edges) {
          this.mapData.edges = [];
        }
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '加载知识地图失败';
      message.error(errorMessage);
      runInAction(() => {
        this.mapData = { nodes: [], edges: [] };
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  /**
   * 加载学科列表（用于选择）
   */
  async loadSubjects(categoryId?: string | null): Promise<void> {
    try {
      const result = await subjectApi.getSubjects(categoryId || null, {
        current: 1,
        pageSize: 1000, // 获取足够多的学科
      });
      runInAction(() => {
        this.subjects = result.data;
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '加载学科列表失败';
      message.error(errorMessage);
    }
  }

  /**
   * 加载分类列表（用于筛选）
   */
  async loadCategories(): Promise<void> {
    try {
      const result = await subjectApi.getCategories(null, {
        current: 1,
        pageSize: 1000, // 获取足够多的分类
      });
      runInAction(() => {
        this.categories = result.data;
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '加载分类列表失败';
      message.error(errorMessage);
    }
  }

  /**
   * 添加依赖关系
   */
  async addDependency(
    subjectId: string,
    prerequisiteSubjectId: string,
    dependencyType: 'required' | 'recommended' = 'required'
  ): Promise<void> {
    try {
      await knowledgeMapApi.createDependency({
        subject_id: subjectId,
        prerequisite_subject_id: prerequisiteSubjectId,
        dependency_type: dependencyType,
      });
      message.success('添加依赖关系成功');
      // 重新加载知识地图
      await this.loadKnowledgeMap();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '添加依赖关系失败';
      message.error(errorMessage);
      throw error;
    }
  }

  /**
   * 删除依赖关系
   */
  async removeDependency(dependencyId: string): Promise<void> {
    try {
      await knowledgeMapApi.deleteDependency(dependencyId);
      message.success('删除依赖关系成功');
      // 重新加载知识地图
      await this.loadKnowledgeMap();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '删除依赖关系失败';
      message.error(errorMessage);
      throw error;
    }
  }

  /**
   * 根据学科ID获取节点
   */
  getNodeBySubjectId(subjectId: string): KnowledgeMapNode | undefined {
    return this.nodes.find((node) => node.subject_id === subjectId);
  }

  /**
   * 获取学科的所有前置依赖
   */
  getPrerequisites(subjectId: string): KnowledgeMapNode[] {
    const edges = this.edges.filter((edge) => edge.target === subjectId);
    return edges
      .map((edge) => this.getNodeBySubjectId(edge.source))
      .filter((node): node is KnowledgeMapNode => node !== undefined);
  }

  /**
   * 获取学科的所有后续学科
   */
  getDependents(subjectId: string): KnowledgeMapNode[] {
    const edges = this.edges.filter((edge) => edge.source === subjectId);
    return edges
      .map((edge) => this.getNodeBySubjectId(edge.target))
      .filter((node): node is KnowledgeMapNode => node !== undefined);
  }
}

export const knowledgeMapStore = new KnowledgeMapStore();


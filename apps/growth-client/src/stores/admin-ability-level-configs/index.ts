import { makeAutoObservable, runInAction } from 'mobx';
import { message } from 'antd';
import { adminAbilityApi } from '@/api/admin-ability.api';
import type { AbilityItemLevelConfig, AbilityItem } from '@/api/ability.api';

/**
 * 能力项等级配置 Store
 * 非列表类型，使用 makeAutoObservable
 */
export class AbilityLevelConfigStore {
  // 配置数据
  configs: AbilityItemLevelConfig[] = [];
  templateConfigs: AbilityItemLevelConfig[] = [];
  items: AbilityItem[] = [];

  // 页面状态
  loading = false;
  selectedItemId = '';
  activeTab = 'template';

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * 设置激活的 Tab
   */
  setActiveTab = (tab: string): void => {
    this.activeTab = tab;
  };

  /**
   * 设置选中的能力项 ID
   */
  setSelectedItemId = (itemId: string): void => {
    this.selectedItemId = itemId;
  };

  /**
   * 加载能力项列表
   */
  async loadItems(): Promise<void> {
    try {
      const data = await adminAbilityApi.getItems();
      runInAction(() => {
        this.items = data;
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '加载能力项失败，请重试';
      message.error(errorMessage);
      throw error;
    }
  }

  /**
   * 加载全局模板配置
   */
  async loadTemplateConfigs(): Promise<void> {
    this.loading = true;
    try {
      const data = await adminAbilityApi.getTemplateConfigs();
      runInAction(() => {
        this.templateConfigs = data;
        this.loading = false;
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '加载失败，请重试';
      message.error(errorMessage);
      runInAction(() => {
        this.loading = false;
      });
      throw error;
    }
  }

  /**
   * 加载能力项配置
   */
  async loadConfigs(itemId?: string): Promise<void> {
    this.loading = true;
    try {
      const data = await adminAbilityApi.getLevelConfigs(itemId);
      runInAction(() => {
        this.configs = data;
        this.loading = false;
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '加载失败，请重试';
      message.error(errorMessage);
      runInAction(() => {
        this.loading = false;
      });
      throw error;
    }
  }

  /**
   * 创建等级配置
   */
  async createConfig(data: {
    level: number;
    required_exp: number;
    requires_assessment?: boolean;
    level_name?: string;
    level_description?: string;
    item_id?: string | null;
    is_template?: boolean;
  }): Promise<void> {
    try {
      await adminAbilityApi.createLevelConfig({
        ...data,
        requires_assessment: data.requires_assessment ?? false,
      });
      message.success('创建成功');
      if (this.activeTab === 'template') {
        await this.loadTemplateConfigs();
      } else {
        await this.loadConfigs(this.selectedItemId);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '创建失败，请重试';
      message.error(errorMessage);
      throw error;
    }
  }

  /**
   * 更新等级配置
   */
  async updateConfig(configId: string, data: {
    level?: number;
    required_exp?: number;
    requires_assessment?: boolean;
    level_name?: string;
    level_description?: string;
  }): Promise<void> {
    try {
      await adminAbilityApi.updateLevelConfig(configId, data);
      message.success('更新成功');
      if (this.activeTab === 'template') {
        await this.loadTemplateConfigs();
      } else {
        await this.loadConfigs(this.selectedItemId);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '更新失败，请重试';
      message.error(errorMessage);
      throw error;
    }
  }

  /**
   * 删除等级配置
   */
  async deleteConfig(configId: string): Promise<void> {
    try {
      await adminAbilityApi.deleteLevelConfig(configId);
      message.success('删除成功');
      if (this.activeTab === 'template') {
        await this.loadTemplateConfigs();
      } else {
        await this.loadConfigs(this.selectedItemId);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '删除失败，请重试';
      message.error(errorMessage);
      throw error;
    }
  }

  /**
   * 从模板复制到能力项
   */
  async copyTemplateToItem(itemId: string): Promise<void> {
    this.loading = true;
    try {
      await adminAbilityApi.copyTemplateToItem(itemId);
      await this.loadConfigs(itemId);
      message.success('复制成功');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '复制失败，请重试';
      message.error(errorMessage);
      throw error;
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export const abilityLevelConfigStore = new AbilityLevelConfigStore();


import { injectable, inject } from 'tsyringe';
import { AbilityItemLevelConfigDAO } from '@/dao/ability-item-level-config.dao';
import type { AbilityItemLevelConfig } from '@/entities';

/**
 * 能力项等级配置服务
 */
@injectable()
export class AbilityLevelConfigService {
  constructor(
    @inject('AbilityItemLevelConfigDAO') private levelConfigDAO: AbilityItemLevelConfigDAO
  ) {}

  /**
   * 获取等级配置列表
   */
  async getConfigs(itemId?: string): Promise<AbilityItemLevelConfig[]> {
    return this.levelConfigDAO.findAll(itemId);
  }

  /**
   * 获取全局模板配置
   */
  async getTemplate(): Promise<AbilityItemLevelConfig[]> {
    return this.levelConfigDAO.findTemplate();
  }

  /**
   * 获取等级配置详情
   */
  async getConfigById(configId: string): Promise<AbilityItemLevelConfig | null> {
    return this.levelConfigDAO.findById(configId);
  }

  /**
   * 创建等级配置
   */
  async createConfig(data: {
    item_id?: string | null;
    level: number;
    required_exp: number;
    requires_assessment?: boolean;
    level_name?: string;
    level_description?: string;
    is_template?: boolean;
    sort_order?: number;
    metadata?: Record<string, any>;
  }): Promise<AbilityItemLevelConfig> {
    return this.levelConfigDAO.create(data);
  }

  /**
   * 批量创建等级配置
   */
  async createConfigsBatch(
    configs: Array<{
      item_id?: string | null;
      level: number;
      required_exp: number;
      requires_assessment?: boolean;
      level_name?: string;
      level_description?: string;
      is_template?: boolean;
      sort_order?: number;
      metadata?: Record<string, any>;
    }>
  ): Promise<AbilityItemLevelConfig[]> {
    return this.levelConfigDAO.createBatch(configs);
  }

  /**
   * 更新等级配置
   */
  async updateConfig(
    configId: string,
    updates: {
      level?: number;
      required_exp?: number;
      requires_assessment?: boolean;
      level_name?: string;
      level_description?: string;
      sort_order?: number;
      metadata?: Record<string, any>;
    }
  ): Promise<AbilityItemLevelConfig> {
    return this.levelConfigDAO.update(configId, updates);
  }

  /**
   * 删除等级配置
   */
  async deleteConfig(configId: string): Promise<void> {
    return this.levelConfigDAO.delete(configId);
  }

  /**
   * 将模板复制到指定能力项
   */
  async copyTemplateToItem(itemId: string): Promise<AbilityItemLevelConfig[]> {
    return this.levelConfigDAO.copyTemplateToItem(itemId);
  }
}


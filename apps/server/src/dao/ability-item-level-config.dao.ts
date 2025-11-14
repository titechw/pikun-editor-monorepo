import { Database } from '@/core/database';
import { Injectable } from '@/decorators/injectable.decorator';
import type { AbilityItemLevelConfig } from '@/entities';

/**
 * 能力项等级配置 DAO
 * 负责能力项等级配置相关的数据库操作，使用参数化查询防止 SQL 注入
 */
@Injectable('AbilityItemLevelConfigDAO')
export class AbilityItemLevelConfigDAO {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  /**
   * 获取所有等级配置
   */
  async findAll(itemId?: string): Promise<AbilityItemLevelConfig[]> {
    if (itemId) {
      const result = await this.db.query<AbilityItemLevelConfig>(
        'SELECT * FROM pikun_db.ability_item_level_configs WHERE item_id = $1 ORDER BY level ASC',
        [itemId]
      );
      return result.rows;
    }
    const result = await this.db.query<AbilityItemLevelConfig>(
      'SELECT * FROM pikun_db.ability_item_level_configs ORDER BY level ASC',
      []
    );
    return result.rows;
  }

  /**
   * 获取全局模板配置
   */
  async findTemplate(): Promise<AbilityItemLevelConfig[]> {
    const result = await this.db.query<AbilityItemLevelConfig>(
      'SELECT * FROM pikun_db.ability_item_level_configs WHERE is_template = true ORDER BY level ASC',
      []
    );
    return result.rows;
  }

  /**
   * 根据 ID 查找等级配置
   */
  async findById(configId: string): Promise<AbilityItemLevelConfig | null> {
    const result = await this.db.query<AbilityItemLevelConfig>(
      'SELECT * FROM pikun_db.ability_item_level_configs WHERE config_id = $1',
      [configId]
    );
    return result.rows[0] || null;
  }

  /**
   * 根据能力项ID和等级查找配置
   */
  async findByItemAndLevel(itemId: string | null, level: number): Promise<AbilityItemLevelConfig | null> {
    if (itemId === null) {
      const result = await this.db.query<AbilityItemLevelConfig>(
        'SELECT * FROM pikun_db.ability_item_level_configs WHERE item_id IS NULL AND level = $1 AND is_template = true',
        [level]
      );
      return result.rows[0] || null;
    }
    const result = await this.db.query<AbilityItemLevelConfig>(
      'SELECT * FROM pikun_db.ability_item_level_configs WHERE item_id = $1 AND level = $2',
      [itemId, level]
    );
    return result.rows[0] || null;
  }

  /**
   * 获取能力项的等级配置（优先返回独立配置，否则返回模板）
   */
  async getConfigForItem(itemId: string, level: number): Promise<AbilityItemLevelConfig | null> {
    // 先查找独立配置
    const itemConfig = await this.findByItemAndLevel(itemId, level);
    if (itemConfig) {
      return itemConfig;
    }
    // 如果没有独立配置，返回模板
    return this.findByItemAndLevel(null, level);
  }

  /**
   * 创建等级配置
   * 数据库约束：如果 item_id IS NULL，则 is_template 必须是 true
   *           如果 item_id IS NOT NULL，则 is_template 必须是 false
   */
  async create(data: {
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
    // 确定 item_id 的值（null 或具体值）
    const itemId = data.item_id || null;
    
    // 根据 item_id 确定 is_template 的值
    // 如果 item_id 为 null，则必须是模板（is_template = true）
    // 如果 item_id 有值，则不是模板（is_template = false）
    const isTemplate = itemId === null;
    
    const result = await this.db.query<AbilityItemLevelConfig>(
      `INSERT INTO pikun_db.ability_item_level_configs (
        item_id, level, required_exp, requires_assessment, level_name, level_description,
        is_template, sort_order, metadata
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        itemId,
        data.level,
        data.required_exp,
        data.requires_assessment || false,
        data.level_name || null,
        data.level_description || null,
        isTemplate,
        data.sort_order || data.level,
        JSON.stringify(data.metadata || {}),
      ]
    );
    return result.rows[0];
  }

  /**
   * 批量创建等级配置
   */
  async createBatch(configs: Array<{
    item_id?: string | null;
    level: number;
    required_exp: number;
    requires_assessment?: boolean;
    level_name?: string;
    level_description?: string;
    is_template?: boolean;
    sort_order?: number;
    metadata?: Record<string, any>;
  }>): Promise<AbilityItemLevelConfig[]> {
    const results: AbilityItemLevelConfig[] = [];
    for (const config of configs) {
      const result = await this.create(config);
      results.push(result);
    }
    return results;
  }

  /**
   * 更新等级配置
   */
  async update(
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
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (updates.level !== undefined) {
      fields.push(`level = $${paramIndex++}`);
      values.push(updates.level);
    }
    if (updates.required_exp !== undefined) {
      fields.push(`required_exp = $${paramIndex++}`);
      values.push(updates.required_exp);
    }
    if (updates.requires_assessment !== undefined) {
      fields.push(`requires_assessment = $${paramIndex++}`);
      values.push(updates.requires_assessment);
    }
    if (updates.level_name !== undefined) {
      fields.push(`level_name = $${paramIndex++}`);
      values.push(updates.level_name);
    }
    if (updates.level_description !== undefined) {
      fields.push(`level_description = $${paramIndex++}`);
      values.push(updates.level_description);
    }
    if (updates.sort_order !== undefined) {
      fields.push(`sort_order = $${paramIndex++}`);
      values.push(updates.sort_order);
    }
    if (updates.metadata !== undefined) {
      fields.push(`metadata = $${paramIndex++}`);
      values.push(JSON.stringify(updates.metadata));
    }

    if (fields.length === 0) {
      return this.findById(configId) as Promise<AbilityItemLevelConfig>;
    }

    values.push(configId);
    const result = await this.db.query<AbilityItemLevelConfig>(
      `UPDATE pikun_db.ability_item_level_configs SET ${fields.join(', ')} WHERE config_id = $${paramIndex}
       RETURNING *`,
      values
    );
    return result.rows[0];
  }

  /**
   * 删除等级配置
   */
  async delete(configId: string): Promise<void> {
    await this.db.query(
      'DELETE FROM pikun_db.ability_item_level_configs WHERE config_id = $1',
      [configId]
    );
  }

  /**
   * 将模板配置复制到指定能力项
   * 如果能力项已有该等级的配置，则跳过（不覆盖）
   * @returns 返回创建的配置数组，如果所有配置都已存在则返回空数组
   */
  async copyTemplateToItem(itemId: string): Promise<AbilityItemLevelConfig[]> {
    const templateConfigs = await this.findTemplate();
    if (templateConfigs.length === 0) {
      throw new Error('全局模板不存在，请先创建全局模板');
    }
    const results: AbilityItemLevelConfig[] = [];
    for (const template of templateConfigs) {
      // 检查是否已存在该等级的配置
      const existing = await this.findByItemAndLevel(itemId, template.level);
      if (existing) {
        // 如果已存在，跳过（不覆盖）
        continue;
      }
      // 创建新配置
      const result = await this.create({
        item_id: itemId,
        level: template.level,
        required_exp: template.required_exp,
        requires_assessment: template.requires_assessment,
        level_name: template.level_name,
        level_description: template.level_description,
        is_template: false,
        sort_order: template.sort_order,
        metadata: template.metadata,
      });
      results.push(result);
    }
    return results;
  }
}


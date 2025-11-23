import { makeAutoObservable, runInAction } from 'mobx';
import { message } from 'antd';
import { abilityApi, type AbilityCategory, type AbilityDimension, type AbilityItem, type UserAbilityLevel } from '@/api/ability.api';

/**
 * 训练类型
 */
export enum TrainingType {
  Memory = 'memory', // 记忆力训练
  Logic = 'logic', // 逻辑训练
  Reaction = 'reaction', // 反应速度训练
  Reasoning = 'reasoning', // 逻辑推理训练
}

/**
 * 训练场配置
 */
export interface TrainingConfig {
  type: TrainingType;
  name: string;
  description: string;
  icon: string;
  relatedAbilityItems: string[]; // 关联的能力项 ID
}

/**
 * 个人成长平台 Store
 */
export class GrowthStore {
  // 基础数据
  categories: AbilityCategory[] = [];
  dimensions: AbilityDimension[] = [];
  items: AbilityItem[] = [];
  userLevels: UserAbilityLevel[] = [];
  loading = false;
  activeCategory: string | null = null;

  // 训练场配置
  trainingConfigs: TrainingConfig[] = [
    {
      type: TrainingType.Memory,
      name: '记忆力训练',
      description: '通过记忆游戏提升记忆能力',
      icon: '🧠',
      relatedAbilityItems: [], // 将在加载数据后填充
    },
    {
      type: TrainingType.Logic,
      name: '逻辑训练',
      description: '通过逻辑推理题目提升逻辑思维能力',
      icon: '🧩',
      relatedAbilityItems: [],
    },
    {
      type: TrainingType.Reaction,
      name: '反应速度训练',
      description: '通过快速反应游戏提升反应速度',
      icon: '⚡',
      relatedAbilityItems: [],
    },
    {
      type: TrainingType.Reasoning,
      name: '逻辑推理训练',
      description: '通过推理题目提升推理能力',
      icon: '🔍',
      relatedAbilityItems: [],
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * 加载所有数据
   */
  async loadData(): Promise<void> {
    this.loading = true;
    try {
      const [categoriesData, dimensionsData, itemsData, levelsData] = await Promise.all([
        abilityApi.getCategories(),
        abilityApi.getDimensions(),
        abilityApi.getItems(),
        abilityApi.getMyLevels(),
      ]);

      runInAction(() => {
        this.categories = categoriesData;
        this.dimensions = dimensionsData;
        this.items = itemsData;
        this.userLevels = levelsData.map((level) => ({
          ...level,
          current_level: Number(level.current_level),
          current_exp: Number(level.current_exp),
          total_exp: Number(level.total_exp),
          level_up_count: Number(level.level_up_count),
          next_level: level.next_level,
          next_level_required_exp: level.next_level_required_exp ? Number(level.next_level_required_exp) : undefined,
          exp_needed: level.exp_needed ? Number(level.exp_needed) : undefined,
          requires_assessment: level.requires_assessment,
          next_level_name: level.next_level_name,
          is_max_level: level.is_max_level,
        }));

        // 根据能力项名称匹配训练场
        this.updateTrainingConfigs();
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '加载数据失败';
      message.error(errorMessage);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  /**
   * 更新训练场配置，关联相关能力项
   */
  private updateTrainingConfigs(): void {
    this.trainingConfigs = this.trainingConfigs.map((config) => {
      const relatedItems: string[] = [];
      
      // 根据能力项名称匹配
      this.items.forEach((item) => {
        const itemName = item.name.toLowerCase();
        if (config.type === TrainingType.Memory && (itemName.includes('记忆') || itemName.includes('memory'))) {
          relatedItems.push(item.item_id);
        } else if (config.type === TrainingType.Logic && (itemName.includes('逻辑') || itemName.includes('logic'))) {
          relatedItems.push(item.item_id);
        } else if (config.type === TrainingType.Reaction && (itemName.includes('反应') || itemName.includes('reaction'))) {
          relatedItems.push(item.item_id);
        } else if (config.type === TrainingType.Reasoning && (itemName.includes('推理') || itemName.includes('reasoning'))) {
          relatedItems.push(item.item_id);
        }
      });

      return {
        ...config,
        relatedAbilityItems: relatedItems,
      };
    });
  }

  /**
   * 获取用户某个能力项的等级数据
   */
  getUserLevel(itemId: string): UserAbilityLevel | null {
    return this.userLevels.find((level) => level.item_id === itemId) || null;
  }

  /**
   * 获取能力树形结构
   */
  getAbilityTree(): Array<{
    category: AbilityCategory;
    dimensions: Array<{
      dimension: AbilityDimension;
      items: Array<{
        item: AbilityItem;
        userLevel: UserAbilityLevel | null;
      }>;
    }>;
  }> {
    return this.categories.map((category) => {
      const categoryDimensions = this.dimensions
        .filter((dim) => dim.category_id === category.category_id)
        .sort((a, b) => a.sort_order - b.sort_order);

      const dimensions = categoryDimensions.map((dimension) => {
        const dimensionItems = this.items
          .filter((item) => item.dimension_id === dimension.dimension_id)
          .sort((a, b) => a.sort_order - b.sort_order);

        const items = dimensionItems.map((item) => ({
          item,
          userLevel: this.getUserLevel(item.item_id),
        }));

        return {
          dimension,
          items,
        };
      });

      return {
        category,
        dimensions,
      };
    });
  }

  /**
   * 设置激活的分类
   */
  setActiveCategory = (categoryId: string): void => {
    this.activeCategory = categoryId;
  };

  /**
   * 获取能力统计数据
   */
  getAbilityStats(): {
    totalExp: number;
    avgLevel: number;
    maxLevel: number;
    totalAbilities: number;
    leveledAbilities: number;
  } {
    const totalExp = this.userLevels.reduce((sum, level) => sum + level.total_exp, 0);
    const avgLevel = this.userLevels.length > 0
      ? this.userLevels.reduce((sum, level) => sum + level.current_level, 0) / this.userLevels.length
      : 0;
    const maxLevel = this.userLevels.length > 0
      ? Math.max(...this.userLevels.map((level) => level.current_level))
      : 0;
    const totalAbilities = this.items.length;
    const leveledAbilities = this.userLevels.length;

    return {
      totalExp,
      avgLevel,
      maxLevel,
      totalAbilities,
      leveledAbilities,
    };
  }
}

export const growthStore = new GrowthStore();


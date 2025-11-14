import { makeAutoObservable, runInAction } from 'mobx';
import { abilityApi, type AbilityItem, type UserAbilityLevel, type AbilityCategory, type AbilityDimension } from '@/api/ability.api';
import { message } from 'antd';

/**
 * 经验测试 Store
 * 管理经验测试页面的状态和操作
 */
export class ExperienceTestStore {
  // 基础数据
  categories: AbilityCategory[] = [];
  dimensions: AbilityDimension[] = [];
  items: AbilityItem[] = [];
  userLevels: UserAbilityLevel[] = [];

  // 页面状态
  loading = false;
  activeTab = '';

  // 自定义经验输入
  customExpInputs: Record<string, number> = {};

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * 加载所有数据
   * 优化：不再查询 level-configs，后端已整合下一级信息到 getUserLevels 中
   */
  async loadData(): Promise<void> {
    this.loading = true;
    try {
      const [categoriesData, dimensionsData, itemsData, levelsData] = await Promise.all([
        abilityApi.getCategories(),
        abilityApi.getDimensions(),
        abilityApi.getItems(),
        abilityApi.getMyLevels(), // 后端已整合下一级信息
      ]);

      runInAction(() => {
        this.categories = categoriesData;
        this.dimensions = dimensionsData;
        this.items = itemsData;
        // 确保 userLevels 中的数字字段是数字类型
        this.userLevels = levelsData.map((level) => ({
          ...level,
          current_level: Number(level.current_level),
          current_exp: Number(level.current_exp),
          total_exp: Number(level.total_exp),
          level_up_count: Number(level.level_up_count),
          // 下一级信息（后端已计算好）
          next_level: level.next_level,
          next_level_required_exp: level.next_level_required_exp ? Number(level.next_level_required_exp) : undefined,
          exp_needed: level.exp_needed ? Number(level.exp_needed) : undefined,
          requires_assessment: level.requires_assessment,
          next_level_name: level.next_level_name,
          is_max_level: level.is_max_level,
        }));
        // 设置默认激活的 Tab
        if (categoriesData.length > 0 && !this.activeTab) {
          this.activeTab = categoriesData[0].category_id;
        }
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
   * 设置激活的 Tab
   */
  setActiveTab = (tabKey: string): void => {
    this.activeTab = tabKey;
  };

  /**
   * 设置自定义经验输入
   */
  setCustomExpInput = (itemId: string, value: number): void => {
    this.customExpInputs[itemId] = value;
  };

  /**
   * 获取用户某个能力项的等级数据
   */
  getUserLevel(itemId: string): UserAbilityLevel | null {
    return this.userLevels.find((level) => level.item_id === itemId) || null;
  }

  /**
   * 获取下一级所需经验（从后端返回的数据中获取）
   */
  getNextLevelExp(itemId: string): number {
    const userLevel = this.getUserLevel(itemId);
    return userLevel?.next_level_required_exp || 0;
  }

  /**
   * 计算升级所需经验（从后端返回的数据中获取）
   */
  getExpToNextLevel(itemId: string): number {
    const userLevel = this.getUserLevel(itemId);
    return userLevel?.exp_needed || 0;
  }


  /**
   * 更新用户等级数据（局部更新）
   * 确保数字字段类型正确
   */
  updateUserLevel = (updatedLevel: UserAbilityLevel): void => {
    // 确保数字字段是数字类型（防止字符串拼接问题）
    const normalizedLevel: UserAbilityLevel = {
      ...updatedLevel,
      current_level: Number(updatedLevel.current_level),
      current_exp: Number(updatedLevel.current_exp),
      total_exp: Number(updatedLevel.total_exp),
      level_up_count: Number(updatedLevel.level_up_count),
    };

    const index = this.userLevels.findIndex((level) => level.item_id === normalizedLevel.item_id);
    if (index >= 0) {
      this.userLevels[index] = normalizedLevel;
    } else {
      this.userLevels.push(normalizedLevel);
    }
  };

  /**
   * 添加经验值
   */
  async addExperience(itemId: string, expAmount: number, notes?: string): Promise<void> {
    try {
      const result = await abilityApi.addExperience(itemId, expAmount, {
        expType: 'test',
        notes: notes || '测试增加经验',
      });

      // 只更新对应的那一个 userLevel，不重新加载所有数据
      runInAction(() => {
        this.updateUserLevel(result.userLevel);
      });

      message.success(
        result.levelUp
          ? `升级成功！当前等级：${result.newLevel}，经验：${result.userLevel.current_exp}`
          : `经验增加成功！当前经验：${result.userLevel.current_exp}`
      );
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '添加经验失败，请重试';
      message.error(errorMessage);
      throw error; // 重新抛出错误，让 AsyncButton 能够正确处理 loading 状态
    }
  }

  /**
   * 添加 100 经验
   */
  async add100(itemId: string): Promise<void> {
    await this.addExperience(itemId, 100, '添加 100 经验');
  }

  /**
   * 添加 1000 经验
   */
  async add1000(itemId: string): Promise<void> {
    await this.addExperience(itemId, 1000, '添加 1000 经验');
  }

  /**
   * 自定义添加经验
   */
  async customAdd(itemId: string): Promise<void> {
    const expAmount = this.customExpInputs[itemId] || 0;
    if (expAmount <= 0) {
      message.warning('请输入大于 0 的经验值');
      return;
    }
    await this.addExperience(itemId, expAmount, `自定义添加 ${expAmount} 经验`);
    this.setCustomExpInput(itemId, 0);
  }

  /**
   * 升级指定等级数（自动完成过程中需要的考试）
   */
  async levelUpBy(itemId: string, levels: number): Promise<void> {
    try {
      // 不需要检查 userLevel 是否存在，后端会自动创建
      // 调用后端 API，自动完成升级和考试
      const result = await abilityApi.levelUpBy(itemId, levels);

      // 更新用户等级数据
      runInAction(() => {
        this.updateUserLevel(result.userLevel);
      });

      message.success(
        result.levelUp
          ? `升级成功！当前等级：${result.newLevel}，经验：${result.userLevel.current_exp}`
          : '升级失败，请重试'
      );
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '升级失败，请重试';
      message.error(errorMessage);
      throw error; // 重新抛出错误，让 AsyncButton 能够正确处理 loading 状态
    }
  }

  /**
   * 升级+1
   */
  async levelUp(itemId: string): Promise<void> {
    await this.levelUpBy(itemId, 1);
  }

  /**
   * 完成考试（标记考试通过并升级）
   * 注意：如果用户还没有该能力项的等级记录，后端会自动创建（等级1，经验0）
   */
  async completeExam(itemId: string): Promise<void> {
    try {
      // 获取用户等级，如果不存在则使用默认值（等级1，经验0）
      const userLevel = this.getUserLevel(itemId);
      const nextLevel = userLevel?.next_level;

      // 从后端返回的数据中获取下一级信息
      if (userLevel?.is_max_level || !nextLevel) {
        message.warning('已达到最高等级');
        return;
      }

      if (!userLevel?.requires_assessment) {
        // 不需要考试，直接升级
        await this.levelUp(itemId);
        return;
      }

      // 需要考试，检查经验是否足够
      const expNeeded = userLevel.exp_needed || 0;
      if (expNeeded > 0) {
        message.warning(`经验不足，还需要 ${expNeeded} 经验才能完成考试`);
        return;
      }

      // 经验够了，标记考试通过并升级
      // 通过添加 0 经验值来触发升级检查，但需要先标记考试通过
      const result = await abilityApi.completeAssessment(itemId, nextLevel);

      // 更新用户等级数据
      runInAction(() => {
        this.updateUserLevel(result.userLevel);
      });

      message.success(
        result.levelUp
          ? `考试通过！升级成功！当前等级：${result.newLevel}`
          : '考试通过，但升级失败，请重试'
      );
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '完成考试失败，请重试';
      message.error(errorMessage);
      throw error; // 重新抛出错误，让 AsyncButton 能够正确处理 loading 状态
    }
  }
}

export const experienceTestStore = new ExperienceTestStore();


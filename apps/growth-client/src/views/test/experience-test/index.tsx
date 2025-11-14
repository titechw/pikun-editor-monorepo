import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, InputNumber, message, Spin, Tabs } from 'antd';
import { abilityApi, type AbilityItem, type UserAbilityLevel, type AbilityItemLevelConfig, type AbilityCategory, type AbilityDimension } from '@/api/ability.api';
import { authStore } from '@/stores/auth';
import './ExperienceTest.less';

/**
 * 经验值测试页面
 */
export const ExperienceTest = observer((): React.JSX.Element => {
  const [categories, setCategories] = useState<AbilityCategory[]>([]);
  const [dimensions, setDimensions] = useState<AbilityDimension[]>([]);
  const [items, setItems] = useState<AbilityItem[]>([]);
  const [userLevels, setUserLevels] = useState<UserAbilityLevel[]>([]);
  const [levelConfigs, setLevelConfigs] = useState<AbilityItemLevelConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});
  const [customExpInputs, setCustomExpInputs] = useState<Record<string, number>>({});
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    if (authStore.isAuthenticated) {
      loadData();
    }
  }, [authStore.isAuthenticated]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [categoriesData, dimensionsData, itemsData, levelsData, configsData] = await Promise.all([
        abilityApi.getCategories(),
        abilityApi.getDimensions(),
        abilityApi.getItems(),
        abilityApi.getMyLevels(),
        abilityApi.getLevelConfigs(),
      ]);
      setCategories(categoriesData);
      setDimensions(dimensionsData);
      setItems(itemsData);
      setUserLevels(levelsData);
      setLevelConfigs(configsData);
      // 设置默认激活的 Tab
      if (categoriesData.length > 0 && !activeTab) {
        setActiveTab(categoriesData[0].category_id);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '加载数据失败';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 获取用户某个能力项的等级数据
  const getUserLevel = (itemId: string): UserAbilityLevel | null => {
    return userLevels.find((level) => level.item_id === itemId) || null;
  };

  // 获取下一级所需经验
  const getNextLevelExp = (itemId: string, currentLevel: number): number => {
    const config = levelConfigs.find(
      (c) => (c.item_id === itemId || c.is_template) && c.level === currentLevel + 1
    );
    return config?.required_exp || 0;
  };

  // 计算升级所需经验（当前经验到下一级所需经验）
  const getExpToNextLevel = (itemId: string, currentExp: number, currentLevel: number): number => {
    const nextExp = getNextLevelExp(itemId, currentLevel);
    if (nextExp === 0) return 0; // 已满级
    const needed = nextExp - currentExp;
    return needed > 0 ? needed : 0;
  };

  // 设置操作加载状态
  const setActionLoadingState = (itemId: string, loading: boolean) => {
    setActionLoading((prev) => ({ ...prev, [itemId]: loading }));
  };

  // 执行添加经验操作
  const handleAddExperience = async (itemId: string, expAmount: number, notes?: string) => {
    setActionLoadingState(itemId, true);
    try {
      const result = await abilityApi.addExperience(itemId, expAmount, {
        expType: 'test',
        notes: notes || '测试增加经验',
      });
      message.success(
        result.levelUp
          ? `升级成功！当前等级：${result.newLevel}，经验：${result.userLevel.current_exp}`
          : `经验增加成功！当前经验：${result.userLevel.current_exp}`
      );
      await loadData();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '增加经验失败';
      message.error(errorMessage);
    } finally {
      setActionLoadingState(itemId, false);
    }
  };

  // 添加 100 经验
  const handleAdd100 = async (itemId: string) => {
    await handleAddExperience(itemId, 100, '添加 100 经验');
  };

  // 添加 1000 经验
  const handleAdd1000 = async (itemId: string) => {
    await handleAddExperience(itemId, 1000, '添加 1000 经验');
  };

  // 自定义添加经验
  const handleCustomAdd = async (itemId: string) => {
    const expAmount = customExpInputs[itemId] || 0;
    if (expAmount <= 0) {
      message.warning('请输入大于 0 的经验值');
      return;
    }
    await handleAddExperience(itemId, expAmount, `自定义添加 ${expAmount} 经验`);
    setCustomExpInputs((prev) => ({ ...prev, [itemId]: 0 }));
  };

  // 升级指定等级数
  const handleLevelUpBy = async (itemId: string, levels: number) => {
    const userLevel = getUserLevel(itemId);
    if (!userLevel) {
      message.warning('未找到该能力项的等级信息');
      return;
    }

    let totalExpNeeded = 0;
    let currentLevel = userLevel.current_level;
    let currentExp = userLevel.current_exp;

    // 计算升级指定等级数所需的总经验
    for (let i = 0; i < levels; i++) {
      const expNeeded = getExpToNextLevel(itemId, currentExp, currentLevel);
      if (expNeeded === 0) {
        break; // 已达到最高等级
      }
      totalExpNeeded += expNeeded;
      currentLevel += 1;
      currentExp = 0; // 升级后经验归零
    }

    if (totalExpNeeded === 0) {
      message.warning('已达到最高等级或无法升级');
      return;
    }

    // 添加足够升级的经验值
    await handleAddExperience(itemId, totalExpNeeded, `升级+${levels}`);
  };

  // 升级+1
  const handleLevelUp = async (itemId: string) => {
    await handleLevelUpBy(itemId, 1);
  };

  // 完成考试（添加足够经验并标记考试通过）
  const handleCompleteExam = async (itemId: string) => {
    const userLevel = getUserLevel(itemId);
    if (!userLevel) {
      message.warning('未找到该能力项的等级信息');
      return;
    }

    // 获取下一级配置，检查是否需要考试
    const nextLevel = userLevel.current_level + 1;
    const nextConfig = levelConfigs.find(
      (c) => (c.item_id === itemId || c.is_template) && c.level === nextLevel
    );

    if (!nextConfig) {
      message.warning('已达到最高等级');
      return;
    }

    if (nextConfig.requires_assessment) {
      // 需要考试，先标记考试通过，然后添加经验
      const expNeeded = getExpToNextLevel(itemId, userLevel.current_exp, userLevel.current_level);
      if (expNeeded > 0) {
        // 通过 metadata 标记考试通过（这里简化处理，直接添加足够经验）
        await handleAddExperience(itemId, expNeeded, '完成考试并升级');
      } else {
        message.info('经验已足够，无需额外操作');
      }
    } else {
      // 不需要考试，直接添加经验升级
      await handleLevelUp(itemId);
    }
  };

  if (loading) {
    return (
      <div className="experience-test-loading">
        <Spin size="large" />
      </div>
    );
  }

  // 准备 Tab 数据
  const tabItems = categories
    .map((category) => {
      const categoryDimensions = dimensions.filter((d) => d.category_id === category.category_id);
      const categoryItems = items.filter((item) =>
        categoryDimensions.some((d) => d.dimension_id === item.dimension_id)
      );

      if (categoryItems.length === 0) return null;

      return {
        key: category.category_id,
        label: category.name,
        children: (
          <div className="items-grid">
            {categoryItems.map((item) => {
              const userLevel = getUserLevel(item.item_id);
              const level = userLevel?.current_level || 1;
              const exp = userLevel?.current_exp || 0;
              const nextExp = getNextLevelExp(item.item_id, level);
              const expNeeded = getExpToNextLevel(item.item_id, exp, level);
              const isLoading = actionLoading[item.item_id] || false;
              const customExp = customExpInputs[item.item_id] || 0;

              return (
                <div key={item.item_id} className="item-card">
                  <div className="card-header">
                    <span className="item-name">{item.name}</span>
                    <span className="item-level">Lv.{level}</span>
                  </div>
                  <div className="card-body">
                    <div className="card-stats">
                      <div className="stat-item">
                        <span className="stat-label">当前:</span>
                        <span className="stat-value">{exp.toLocaleString()}</span>
                      </div>
                      {nextExp > 0 && (
                        <div className="stat-item">
                          <span className="stat-label">下一级:</span>
                          <span className="stat-value">{nextExp.toLocaleString()}</span>
                        </div>
                      )}
                      {expNeeded > 0 && (
                        <div className="stat-item highlight">
                          <span className="stat-label">还需:</span>
                          <span className="stat-value">{expNeeded.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    <div className="card-actions">
                      <div className="action-group quick-actions">
                        <Button
                          size="small"
                          type="primary"
                          loading={isLoading}
                          onClick={() => handleAdd100(item.item_id)}
                        >
                          +100
                        </Button>
                        <Button
                          size="small"
                          type="primary"
                          loading={isLoading}
                          onClick={() => handleAdd1000(item.item_id)}
                        >
                          +1000
                        </Button>
                      </div>
                      <div className="action-group custom-action">
                        <InputNumber
                          size="small"
                          min={1}
                          max={1000000}
                          value={customExp}
                          onChange={(val) =>
                            setCustomExpInputs((prev) => ({ ...prev, [item.item_id]: val || 0 }))
                          }
                          placeholder="自定义"
                        />
                        <Button
                          size="small"
                          type="default"
                          loading={isLoading}
                          onClick={() => handleCustomAdd(item.item_id)}
                        >
                          添加
                        </Button>
                      </div>
                      <div className="action-group level-actions">
                        <Button
                          size="small"
                          type="default"
                          loading={isLoading}
                          onClick={() => handleLevelUp(item.item_id)}
                          disabled={expNeeded === 0}
                        >
                          升级+1
                        </Button>
                        <Button
                          size="small"
                          type="default"
                          loading={isLoading}
                          onClick={() => handleLevelUpBy(item.item_id, 5)}
                          disabled={expNeeded === 0}
                        >
                          升级+5
                        </Button>
                        <Button
                          size="small"
                          type="default"
                          loading={isLoading}
                          onClick={() => handleLevelUpBy(item.item_id, 10)}
                          disabled={expNeeded === 0}
                        >
                          升级+10
                        </Button>
                        <Button
                          size="small"
                          type="default"
                          loading={isLoading}
                          onClick={() => handleCompleteExam(item.item_id)}
                          disabled={expNeeded === 0}
                        >
                          完成考试
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ),
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <div className="experience-test">
      <div className="test-container">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          className="category-tabs"
        />
      </div>
    </div>
  );
});

import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Spin, message } from 'antd';
import { abilityApi, type AbilityCategory, type AbilityDimension, type AbilityItem, type UserAbilityLevel } from '@/api/ability.api';
import { authStore } from '@/stores/auth';
import './AbilityProfile.less';

/**
 * 游戏风格的能力展示页面（守望先锋风格）
 */
export const AbilityProfile = observer((): React.JSX.Element => {
  const [categories, setCategories] = useState<AbilityCategory[]>([]);
  const [dimensions, setDimensions] = useState<AbilityDimension[]>([]);
  const [items, setItems] = useState<AbilityItem[]>([]);
  const [userLevels, setUserLevels] = useState<UserAbilityLevel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authStore.isAuthenticated) {
      loadData();
    }
  }, [authStore.isAuthenticated]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [categoriesData, dimensionsData, itemsData, levelsData] = await Promise.all([
        abilityApi.getCategories(),
        abilityApi.getDimensions(),
        abilityApi.getItems(),
        abilityApi.getMyLevels(), // 后端已整合下一级信息
      ]);

      setCategories(categoriesData);
      setDimensions(dimensionsData);
      setItems(itemsData);
      setUserLevels(levelsData);
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

  // 获取下一级所需经验（从后端返回的数据中获取）
  const getNextLevelExp = (itemId: string): number => {
    const userLevel = getUserLevel(itemId);
    return userLevel?.next_level_required_exp || 0;
  };

  // 计算经验进度百分比
  const getExpProgress = (itemId: string, currentExp: number): number => {
    const nextExp = getNextLevelExp(itemId);
    if (nextExp === 0) return 100; // 已满级
    return Math.min((currentExp / nextExp) * 100, 100);
  };

  if (loading) {
    return (
      <div className="ability-profile-loading">
        <Spin size="large" />
      </div>
    );
  }

  const user = authStore.user;

  // 计算统计数据
  const totalExp = userLevels.reduce((sum, level) => sum + level.total_exp, 0);
  const avgLevel = userLevels.length > 0
    ? (userLevels.reduce((sum, level) => sum + level.current_level, 0) / userLevels.length).toFixed(1)
    : '0.0';
  const maxLevel = userLevels.length > 0
    ? Math.max(...userLevels.map((level) => level.current_level))
    : 0;

  return (
    <div className="ability-profile">
      <div className="profile-container">
        {/* 左侧：用户能力信息整合 */}
        <div className="profile-left">
          {/* 用户基本信息卡片 */}
          <div className="user-card">
            <div className="user-avatar">
          <div className="avatar-circle">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
        </div>
            <div className="user-info">
              <h2 className="user-name">{user?.name || '未命名用户'}</h2>
              <div className="user-stats">
                <div className="stat-row">
              <span className="stat-label">总经验</span>
                  <span className="stat-value">{totalExp.toLocaleString()}</span>
            </div>
                <div className="stat-row">
              <span className="stat-label">能力项</span>
              <span className="stat-value">{items.length}</span>
            </div>
                <div className="stat-row">
              <span className="stat-label">平均等级</span>
                  <span className="stat-value">{avgLevel}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">最高等级</span>
                  <span className="stat-value">Lv.{maxLevel}</span>
            </div>
          </div>
        </div>
      </div>

          {/* 能力分类概览 */}
          <div className="ability-overview">
            {categories.map((category) => {
              const categoryDimensions = dimensions.filter((d) => d.category_id === category.category_id);
              const categoryItems = items.filter((item) =>
                categoryDimensions.some((d) => d.dimension_id === item.dimension_id)
              );
              const categoryLevels = categoryItems
                .map((item) => getUserLevel(item.item_id))
                .filter((level): level is UserAbilityLevel => level !== null);
              const categoryAvgLevel = categoryLevels.length > 0
                ? (categoryLevels.reduce((sum, level) => sum + level.current_level, 0) / categoryLevels.length).toFixed(1)
                : '0.0';
              const categoryTotalExp = categoryLevels.reduce((sum, level) => sum + level.total_exp, 0);

              return (
                <div key={category.category_id} className="category-summary">
                  <div className="category-header">
                    <h3 className="category-title">{category.name}</h3>
                    <span className="category-badge">{categoryItems.length}项</span>
                  </div>
                  <div className="category-stats">
                    <div className="category-stat">
                      <span className="category-stat-label">平均等级</span>
                      <span className="category-stat-value">{categoryAvgLevel}</span>
                    </div>
                    <div className="category-stat">
                      <span className="category-stat-label">总经验</span>
                      <span className="category-stat-value">{categoryTotalExp.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="category-dimensions">
                    {categoryDimensions.map((dimension) => {
                      const dimensionItems = items.filter((item) => item.dimension_id === dimension.dimension_id);
                      const dimensionLevels = dimensionItems
                        .map((item) => getUserLevel(item.item_id))
                        .filter((level): level is UserAbilityLevel => level !== null);
                      const dimensionAvgLevel = dimensionLevels.length > 0
                        ? (dimensionLevels.reduce((sum, level) => sum + level.current_level, 0) / dimensionLevels.length).toFixed(1)
                        : '0.0';

                      return (
                        <div key={dimension.dimension_id} className="dimension-summary">
                          <span className="dimension-name">{dimension.name}</span>
                          <span className="dimension-level">Lv.{dimensionAvgLevel}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 右侧：详细能力数据 */}
        <div className="profile-right">
          <div className="detail-header">
            <h2 className="detail-title">能力详情</h2>
          </div>
          <div className="detail-content">
        {categories.map((category) => {
          const categoryDimensions = dimensions.filter((d) => d.category_id === category.category_id);
          return (
                <div key={category.category_id} className="detail-section">
              <div className="section-header">
                    <h3 className="section-title">{category.name}</h3>
                <p className="section-description">{category.description}</p>
              </div>

                  <div className="dimensions-list">
                {categoryDimensions.map((dimension) => {
                  const dimensionItems = items.filter((item) => item.dimension_id === dimension.dimension_id);
                  return (
                        <div key={dimension.dimension_id} className="dimension-detail">
                      <div className="dimension-header">
                            <h4 className="dimension-title">{dimension.name}</h4>
                      </div>
                          <div className="items-grid">
                        {dimensionItems.map((item) => {
                          const userLevel = getUserLevel(item.item_id);
                          const level = userLevel?.current_level || 1;
                          const exp = userLevel?.current_exp || 0;
                          const totalExp = userLevel?.total_exp || 0;
                          const progress = getExpProgress(item.item_id, exp);
                          const nextExp = getNextLevelExp(item.item_id);

                          return (
                                <div key={item.item_id} className="item-card">
                              <div className="item-header">
                                <span className="item-name">{item.name}</span>
                                <span className="item-level">Lv.{level}</span>
                              </div>
                              <div className="item-progress">
                                <div className="progress-bar">
                                  <div
                                    className="progress-fill"
                                    style={{ width: `${progress}%` }}
                                  />
                                </div>
                                <div className="exp-info">
                                  <span className="current-exp">{exp.toLocaleString()}</span>
                                  {nextExp > 0 && (
                                    <>
                                      <span className="exp-separator">/</span>
                                      <span className="next-exp">{nextExp.toLocaleString()}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="item-stats">
                                <span className="stat">总经验: {totalExp.toLocaleString()}</span>
                                    {userLevel && userLevel.level_up_count && userLevel.level_up_count > 0 && (
                                  <span className="stat">升级: {userLevel.level_up_count}次</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
          </div>
        </div>
      </div>
    </div>
  );
});


import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { InputNumber, Spin, Tabs } from 'antd';
import { authStore } from '@/stores/auth';
import { experienceTestStore } from '@/stores/experience-test';
import { AsyncButton } from '@/components/AsyncButton';
import './ExperienceTest.less';

/**
 * 经验值测试页面
 */
export const ExperienceTest = observer((): React.JSX.Element => {
  const store = experienceTestStore;

  useEffect(() => {
    if (authStore.isAuthenticated) {
      store.loadData();
    }
  }, [authStore.isAuthenticated]);

  if (store.loading) {
    return (
      <div className="experience-test-loading">
        <Spin size="large" />
      </div>
    );
  }

  // 渲染能力卡片
  const renderItemCard = (item: typeof store.items[0]) => {
    const userLevel = store.getUserLevel(item.item_id);
    const level = userLevel?.current_level || 1;
    const exp = userLevel?.current_exp || 0;
    const nextExp = store.getNextLevelExp(item.item_id);
    const expNeeded = store.getExpToNextLevel(item.item_id);
    const customExp = store.customExpInputs[item.item_id] || 0;
    
    const requiresExam = userLevel?.requires_assessment === true;
    const canCompleteExam = requiresExam && (expNeeded <= 0);

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
              <AsyncButton
                size="small"
                type="primary"
                onClick={() => store.add100(item.item_id)}
              >
                +100
              </AsyncButton>
              <AsyncButton
                size="small"
                type="primary"
                onClick={() => store.add1000(item.item_id)}
              >
                +1000
              </AsyncButton>
            </div>
            <div className="action-group custom-action">
              <InputNumber
                size="small"
                min={1}
                max={1000000}
                value={customExp}
                onChange={(val) => store.setCustomExpInput(item.item_id, val || 0)}
                placeholder="自定义"
              />
              <AsyncButton
                size="small"
                type="default"
                onClick={() => store.customAdd(item.item_id)}
              >
                添加
              </AsyncButton>
            </div>
            <div className="action-group level-actions">
              <AsyncButton
                size="small"
                type="default"
                onClick={() => store.levelUp(item.item_id)}
              >
                升级+1
              </AsyncButton>
              <AsyncButton
                size="small"
                type="default"
                onClick={() => store.levelUpBy(item.item_id, 5)}
              >
                升级+5
              </AsyncButton>
              <AsyncButton
                size="small"
                type="default"
                onClick={() => store.levelUpBy(item.item_id, 10)}
              >
                升级+10
              </AsyncButton>
              <AsyncButton
                size="small"
                type="default"
                onClick={() => store.completeExam(item.item_id)}
                disabled={!canCompleteExam}
              >
                完成考试
              </AsyncButton>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 准备 Tab 数据
  const tabItems = store.categories
    .map((category) => {
      const categoryDimensions = store.dimensions
        .filter((d) => d.category_id === category.category_id)
        .sort((a, b) => a.sort_order - b.sort_order);
      
      // 判断是否需要按维度分组（所有类别都按维度分组，如果维度数量大于1）
      const needGrouping = categoryDimensions.length > 1;

      if (needGrouping) {
        // 按维度分组展示
        return {
          key: category.category_id,
          label: category.name,
          children: (
            <div className="category-content">
              {categoryDimensions.map((dimension) => {
                const dimensionItems = store.items
                  .filter((item) => item.dimension_id === dimension.dimension_id)
                  .sort((a, b) => a.sort_order - b.sort_order);

                if (dimensionItems.length === 0) return null;

                return (
                  <div key={dimension.dimension_id} className="dimension-section">
                    <h3 className="dimension-title">{dimension.name}</h3>
                    <div className="items-grid">
                      {dimensionItems.map((item) => renderItemCard(item))}
                    </div>
                  </div>
                );
              })}
            </div>
          ),
        };
      } else {
        // 其他类别直接平铺展示（如元系统层）
        const categoryItems = store.items.filter((item) =>
          categoryDimensions.some((d) => d.dimension_id === item.dimension_id)
        );

        if (categoryItems.length === 0) return null;

        return {
          key: category.category_id,
          label: category.name,
          children: (
            <div className="items-grid">
              {categoryItems.map((item) => renderItemCard(item))}
            </div>
          ),
        };
      }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <div className="experience-test">
      <div className="test-container">
        <Tabs
          activeKey={store.activeTab}
          onChange={store.setActiveTab}
          items={tabItems}
          className="category-tabs"
            />
          </div>
    </div>
  );
});

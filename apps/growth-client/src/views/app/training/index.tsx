import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Spin, Typography, Button, Tabs, Empty } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { growthStore } from '@/stores/growth';
import { authStore } from '@/stores/auth';
import { type AbilityItem } from '@/api/ability.api';
import { TrainingCard } from './TrainingCard';
import './Training.less';

const { Title, Text } = Typography;

/**
 * 能力训练页面
 * 展示能力项列表（Tab 方式：按分类展示，每个分类下按维度分组）
 */
export const Training = observer((): React.JSX.Element => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    if (authStore.isAuthenticated) {
      growthStore.loadData();
    }
  }, [authStore.isAuthenticated]);

  // 设置默认激活的 Tab
  useEffect(() => {
    if (growthStore.categories.length > 0 && !activeTab) {
      setActiveTab(growthStore.categories[0].category_id);
    }
  }, [growthStore.categories, activeTab]);

  const handleStartTraining = (item: AbilityItem): void => {
    // 根据能力项的 code 或名称判断跳转路径
    const itemCode = item.code?.toLowerCase() || '';
    const itemName = item.name.toLowerCase();

    if (itemCode.includes('memory') || itemName.includes('记忆')) {
      navigate(`/training/memory/${item.item_id}`);
    } else {
      // 默认跳转到记忆力训练，并传递能力项ID
      navigate(`/training/memory/${item.item_id}`);
    }
  };

  // 准备 Tab 数据
  const tabItems = growthStore.categories
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((category) => {
      const categoryDimensions = growthStore.dimensions
        .filter((d) => d.category_id === category.category_id)
        .slice()
        .sort((a, b) => a.sort_order - b.sort_order);

      return {
        key: category.category_id,
        label: category.name,
        children: (
          <div className="category-content">
            {categoryDimensions.map((dimension) => {
              const dimensionItems = growthStore.items
                .filter((item) => item.dimension_id === dimension.dimension_id)
                .slice()
                .sort((a, b) => a.sort_order - b.sort_order);

              if (dimensionItems.length === 0) return null;

              return (
                <div key={dimension.dimension_id} className="dimension-section">
                  <h3 className="dimension-title">{dimension.name}</h3>
                  <div className="training-grid">
                    {dimensionItems.map((item) => (
                      <TrainingCard
                        key={item.item_id}
                        item={item}
                        onStart={handleStartTraining}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
            {categoryDimensions.length === 0 && (
              <Empty description="该分类下暂无能力项" />
            )}
          </div>
        ),
    };
    });

  if (growthStore.loading) {
    return (
      <div className="training-loading">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="training">
      <div className="training-container">
        {/* 页面头部 */}
        <div className="training-header">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/dashboard')}
            className="back-button"
          >
            返回
          </Button>
          <div className="header-content">
            <Title level={2} className="page-title">
              能力训练场
            </Title>
            <Text className="page-subtitle">
              通过游戏化训练提升你的核心能力，每次训练都会获得经验值
            </Text>
          </div>
        </div>

        {/* Tab 分类展示 */}
        <div className="category-tabs">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            className="training-tabs"
          />
                  </div>

        {/* 提示信息 */}
        <div className="training-tips-card">
          <Title level={5} className="tips-title">
            💡 训练提示
          </Title>
          <ul className="tips-list">
            <li>每次训练完成后会根据表现获得经验值</li>
            <li>持续训练可以提升相关能力的等级</li>
            <li>建议每天进行 15-30 分钟的训练</li>
            <li>训练难度会随着能力等级提升而增加</li>
          </ul>
        </div>
      </div>
    </div>
  );
});


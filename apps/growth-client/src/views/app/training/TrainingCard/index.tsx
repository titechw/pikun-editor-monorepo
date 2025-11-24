import React from 'react';
import { Typography, Button } from 'antd';
import { PlayCircleOutlined, TrophyOutlined, FireOutlined } from '@ant-design/icons';
import { growthStore } from '@/stores/growth';
import { type AbilityItem } from '@/api/ability.api';
import './TrainingCard.less';

const { Title, Text } = Typography;

interface TrainingCardProps {
  item: AbilityItem;
  onStart: (item: AbilityItem) => void;
}

export const TrainingCard: React.FC<TrainingCardProps> = ({
  item,
  onStart,
}) => {
  const userLevel = growthStore.getUserLevel(item.item_id);
  const dimension = growthStore.dimensions.find(d => d.dimension_id === item.dimension_id);
  const category = dimension 
    ? growthStore.categories.find(c => c.category_id === dimension.category_id)
    : null;

  const handleClick = (): void => {
    onStart(item);
  };

  const handleButtonClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    onStart(item);
  };

  return (
    <div className="training-card" onClick={handleClick}>
      <div className="training-card-content">
        {/* 图标 */}
        <div className="training-icon-wrapper">
          <div className="training-icon">🎯</div>
        </div>

        {/* 标题 */}
        <Title level={5} className="training-name" ellipsis={{ tooltip: item.name }}>
          {item.name}
        </Title>

        {/* 分类和维度信息 */}
        {(category || dimension) && (
          <div className="category-info">
            {category && (
              <Text className="category-text">{category.name}</Text>
            )}
            {dimension && (
              <Text className="dimension-text">· {dimension.name}</Text>
            )}
          </div>
        )}

        {/* 统计数据 */}
        {userLevel ? (
          <div className="training-stats">
            <div className="stat-item">
              <TrophyOutlined className="stat-icon" />
              <Text className="stat-text">等级: {userLevel.current_level}</Text>
            </div>
            <div className="stat-item">
              <FireOutlined className="stat-icon" />
              <Text className="stat-text">经验: {userLevel.total_exp.toLocaleString()}</Text>
            </div>
          </div>
        ) : (
          <div className="training-stats">
            <Text className="stat-text-new">尚未开始训练</Text>
          </div>
        )}

        {/* 开始训练按钮 */}
        <Button
          type="primary"
          icon={<PlayCircleOutlined />}
          className="start-training-button"
          onClick={handleButtonClick}
          block
        >
          开始训练
        </Button>
      </div>
    </div>
  );
};


import React from 'react';
import { Typography, Button, Tag } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import { type Course } from '@/api/course.api';
import { growthStore } from '@/stores/growth';
import './GameCard.less';

const { Title, Text } = Typography;

interface GameCardProps {
  course: Course;
  onClick: (course: Course) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ course, onClick }) => {
  const handleClick = (): void => {
    onClick(course);
  };

  const handleButtonClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    onClick(course);
  };

  return (
    <div className="game-card" onClick={handleClick}>
      <div className="game-card-header">
        {course.cover_image_url ? (
          <img alt={course.name} src={course.cover_image_url} className="game-cover" />
        ) : (
          <div className="game-icon">🎮</div>
        )}
      </div>
      
      <div className="game-card-body">
        <Title level={5} className="game-name" ellipsis={{ tooltip: course.name }}>
          {course.name}
        </Title>
        <Text className="game-description" ellipsis={{ tooltip: course.description }}>
          {course.description || '暂无描述'}
        </Text>
        
        <div className="game-meta">
          <div className="meta-item">
            <Text className="meta-label">难度:</Text>
            <Text className="meta-value">Lv.{course.difficulty_level}</Text>
          </div>
          {course.primary_item_id && (
            <div className="meta-item">
              <Text className="meta-label">能力:</Text>
              <Text className="meta-value">
                {growthStore.items.find(i => i.item_id === course.primary_item_id)?.name || '未知'}
              </Text>
            </div>
          )}
        </div>

        <div className="game-card-footer">
          <Tag 
            color={course.course_source === 'official' ? 'blue' : 'orange'} 
            className="source-tag"
          >
            {course.course_source === 'official' ? '官方' : '三方'}
          </Tag>
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            className="play-button"
            onClick={handleButtonClick}
            size="small"
          >
            开始训练
          </Button>
        </div>
      </div>
    </div>
  );
};


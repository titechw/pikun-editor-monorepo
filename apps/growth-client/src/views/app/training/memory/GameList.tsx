import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Row, Col, Spin, Typography, Button } from 'antd';
import { PlayCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { memoryTrainingGameStore } from '@/stores/memory-training-game';
import { growthStore } from '@/stores/growth';
import './MemoryTraining.less';

const { Title, Text } = Typography;

/**
 * 记忆训练游戏列表页面
 */
export const GameList = observer((): React.JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {
    memoryTrainingGameStore.loadGames();
    if (growthStore.items.length === 0) {
      growthStore.loadData();
    }
  }, []);

  const handleGameClick = (gameId: string): void => {
    navigate(`/training/memory/${gameId}`);
  };

  const handleBack = (): void => {
    navigate('/training');
  };

  const getMemoryLevel = (): number => {
    const memoryItem = growthStore.items.find((item) => item.code === 'memory');
    if (memoryItem) {
      const userLevel = growthStore.getUserLevel(memoryItem.item_id);
      return userLevel?.current_level || 1;
    }
    return 1;
  };

  const memoryLevel = getMemoryLevel();

  if (memoryTrainingGameStore.gamesLoading) {
    return (
      <div className="game-list-loading">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="memory-training">
      <div className="memory-training-container">
        {/* 页面头部 */}
        <div className="memory-training-header">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
            className="back-button"
          >
            返回
          </Button>
          <div className="header-content">
            <Title level={2} className="page-title">
              记忆力训练
            </Title>
            <Text className="page-subtitle">
              选择一种游戏类型开始训练，每种游戏都有多个关卡，难度逐步提升
            </Text>
            <div className="level-info">
              <Text className="level-text">
                当前记忆能力等级：Lv.{memoryLevel}
              </Text>
            </div>
          </div>
        </div>

        {/* 游戏列表 */}
        <Row gutter={[24, 24]} className="game-list-grid">
          {memoryTrainingGameStore.games.map((game) => {
            const canPlay = memoryLevel >= game.min_ability_level;

            return (
              <Col xs={24} sm={12} lg={8} key={game.game_id}>
                <Card
                  className={`game-card ${!canPlay ? 'locked' : ''}`}
                  hoverable={canPlay}
                  onClick={() => canPlay && handleGameClick(game.game_id)}
                >
                  <div className="game-card-content">
                    <div className="game-icon">{game.icon || '🎮'}</div>
                    <Title level={4} className="game-name">
                      {game.name}
                    </Title>
                    <Text className="game-description">{game.description}</Text>
                    <div className="game-info">
                      <Text className="game-level-range">
                        适合等级：Lv.{game.min_ability_level} - Lv.{game.max_ability_level}
                      </Text>
                    </div>
                    {!canPlay && (
                      <div className="game-locked-overlay">
                        <Text className="locked-text">
                          需要记忆能力等级 Lv.{game.min_ability_level}
                        </Text>
                      </div>
                    )}
                    {canPlay && (
                      <Button
                        type="primary"
                        icon={<PlayCircleOutlined />}
                        className="play-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGameClick(game.game_id);
                        }}
                        block
                      >
                        开始训练
                      </Button>
                    )}
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>

        {memoryTrainingGameStore.games.length === 0 && (
          <Card className="empty-card">
            <Text className="empty-text">暂无可用游戏</Text>
          </Card>
        )}
      </div>
    </div>
  );
});






import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Row, Col, Spin, Typography, Button, Tag, Progress } from 'antd';
import {
  PlayCircleOutlined,
  ArrowLeftOutlined,
  LockOutlined,
  CheckCircleOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { memoryTrainingGameStore } from '@/stores/memory-training-game';
import { growthStore } from '@/stores/growth';
import './MemoryTraining.less';

const { Title, Text } = Typography;

/**
 * 关卡选择页面
 */
export const LevelList = observer((): React.JSX.Element => {
  const navigate = useNavigate();
  const { gameId } = useParams<{ gameId: string }>();

  useEffect(() => {
    if (gameId) {
      // 加载游戏详情
      const game = memoryTrainingGameStore.games.find((g) => g.game_id === gameId);
      if (game) {
        memoryTrainingGameStore.setCurrentGame(game);
      } else {
        // 如果游戏列表未加载，先加载游戏列表
        memoryTrainingGameStore.loadGames().then(() => {
          const foundGame = memoryTrainingGameStore.games.find((g) => g.game_id === gameId);
          if (foundGame) {
            memoryTrainingGameStore.setCurrentGame(foundGame);
          }
        });
      }
    }

    if (growthStore.items.length === 0) {
      growthStore.loadData();
    }
  }, [gameId]);

  const handleLevelClick = (levelId: string): void => {
    navigate(`/training/memory/${gameId}/${levelId}`);
  };

  const handleBack = (): void => {
    navigate('/training/memory');
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
  const { currentGame, levels, levelsLoading } = memoryTrainingGameStore;

  if (levelsLoading) {
    return (
      <div className="level-list-loading">
        <Spin size="large" />
      </div>
    );
  }

  if (!currentGame) {
    return (
      <div className="memory-training">
        <div className="memory-training-container">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
            className="back-button"
          >
            返回
          </Button>
          <Card>
            <Text>游戏不存在</Text>
          </Card>
        </div>
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
              {currentGame.name}
            </Title>
            <Text className="page-subtitle">{currentGame.description}</Text>
            <div className="level-info">
              <Text className="level-text">
                当前记忆能力等级：Lv.{memoryLevel}
              </Text>
            </div>
          </div>
        </div>

        {/* 关卡列表 */}
        <Row gutter={[16, 16]} className="level-list-grid">
          {levels.map((level) => {
            const progress = memoryTrainingGameStore.getLevelProgress(level.level_id);
            const isUnlocked = memoryTrainingGameStore.isLevelUnlocked(level, memoryLevel);
            const isCompleted = progress?.is_completed || false;

            // 获取难度参数描述
            const difficultyDesc = getDifficultyDescription(level.difficulty_config);

            return (
              <Col xs={24} sm={12} lg={8} key={level.level_id}>
                <Card
                  className={`level-card ${!isUnlocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}`}
                  hoverable={isUnlocked}
                  onClick={() => isUnlocked && handleLevelClick(level.level_id)}
                >
                  <div className="level-card-content">
                    <div className="level-header">
                      <div className="level-number">关卡 {level.level_number}</div>
                      {isCompleted && (
                        <Tag icon={<CheckCircleOutlined />} color="success">
                          已完成
                        </Tag>
                      )}
                      {!isUnlocked && (
                        <Tag icon={<LockOutlined />} color="default">
                          未解锁
                        </Tag>
                      )}
                    </div>
                    {level.name && (
                      <Title level={5} className="level-name">
                        {level.name}
                      </Title>
                    )}
                    {level.description && (
                      <Text className="level-description">{level.description}</Text>
                    )}
                    <div className="level-difficulty">
                      <Text className="difficulty-label">难度参数：</Text>
                      <Text className="difficulty-value">{difficultyDesc}</Text>
                    </div>
                    {progress && (
                      <div className="level-stats">
                        {progress.best_score > 0 && (
                          <div className="stat-item">
                            <TrophyOutlined className="stat-icon" />
                            <Text className="stat-text">最佳得分：{progress.best_score}</Text>
                          </div>
                        )}
                        {progress.best_correct_rate > 0 && (
                          <div className="stat-item">
                            <Text className="stat-text">
                              最佳正确率：{Math.round(progress.best_correct_rate)}%
                            </Text>
                          </div>
                        )}
                        {progress.completion_count > 0 && (
                          <div className="stat-item">
                            <Text className="stat-text">完成次数：{progress.completion_count}</Text>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="level-reward">
                      <Text className="reward-text">基础经验：{level.base_exp_reward} EXP</Text>
                    </div>
                    {isUnlocked && (
                      <Button
                        type="primary"
                        icon={<PlayCircleOutlined />}
                        className="play-level-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLevelClick(level.level_id);
                        }}
                        block
                      >
                        {isCompleted ? '再次挑战' : '开始挑战'}
                      </Button>
                    )}
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>

        {levels.length === 0 && (
          <Card className="empty-card">
            <Text className="empty-text">暂无可用关卡</Text>
          </Card>
        )}
      </div>
    </div>
  );
});

/**
 * 获取难度参数描述
 */
function getDifficultyDescription(config: Record<string, any>): string {
  const parts: string[] = [];
  if (config.sequenceLength) {
    parts.push(`${config.sequenceLength}位`);
  }
  if (config.gridSize) {
    parts.push(`${config.gridSize}x${config.gridSize}网格`);
  }
  if (config.shapeCount) {
    parts.push(`${config.shapeCount}个图形`);
  }
  if (config.positionCount) {
    parts.push(`${config.positionCount}个位置`);
  }
  if (config.colorCount) {
    parts.push(`${config.colorCount}种颜色`);
  }
  if (config.displayTime) {
    parts.push(`显示${config.displayTime}秒`);
  }
  return parts.join('，') || '标准难度';
}






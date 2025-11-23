import React, { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Button, Typography, Space, Spin, message } from 'antd';
import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { memoryTrainingGameStore } from '@/stores/memory-training-game';
import { growthStore } from '@/stores/growth';
import { NumberSequenceGame } from './games/NumberSequenceGame';
import { ColorMemoryGame } from './games/ColorMemoryGame';
import { ShapePositionGame } from './games/ShapePositionGame';
import { Space3DGame } from './games/Space3DGame';
import type { MemoryTrainingLevel } from '@/api/memory-training.api';
import './MemoryTraining.less';

const { Title, Text } = Typography;

/**
 * 游戏游玩页面
 */
export const GamePlay = observer((): React.JSX.Element => {
  const navigate = useNavigate();
  const { gameId, levelId } = useParams<{ gameId: string; levelId: string }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      setLoading(true);
      try {
        // 确保游戏列表已加载
        if (memoryTrainingGameStore.games.length === 0) {
          await memoryTrainingGameStore.loadGames();
        }

        // 确保能力数据已加载
        if (growthStore.items.length === 0) {
          await growthStore.loadData();
        }

        // 加载关卡数据
        if (gameId && levelId) {
          const game = memoryTrainingGameStore.games.find((g) => g.game_id === gameId);
          if (game) {
            memoryTrainingGameStore.setCurrentGame(game);
            await memoryTrainingGameStore.loadLevels(gameId);
            const level = memoryTrainingGameStore.levels.find((l) => l.level_id === levelId);
            if (level) {
              memoryTrainingGameStore.setCurrentLevel(level);
            } else {
              message.error('关卡不存在');
              navigate(`/training/memory/${gameId}`);
            }
          } else {
            message.error('游戏不存在');
            navigate('/training/memory');
          }
        }
      } catch (error) {
        console.error('加载数据失败:', error);
        message.error('加载数据失败');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [gameId, levelId, navigate]);

  const handleBack = (): void => {
    if (gameId) {
      navigate(`/training/memory/${gameId}`);
    } else {
      navigate('/training/memory');
    }
  };

  const renderGame = (): React.ReactNode => {
    const { currentGame, currentLevel } = memoryTrainingGameStore;

    if (!currentGame || !currentLevel) {
      return (
        <Card>
          <Text>加载中...</Text>
        </Card>
      );
    }

    // 根据游戏 code 渲染对应的游戏组件
    switch (currentGame.code) {
      case 'number_sequence':
        return <NumberSequenceGame level={currentLevel} />;
      case 'color_memory':
        return <ColorMemoryGame level={currentLevel} />;
      case 'shape_position':
        return <ShapePositionGame level={currentLevel} />;
      case 'space_3d':
        return <Space3DGame level={currentLevel} />;
      default:
        return (
          <Card>
            <Text>暂不支持此游戏类型：{currentGame.code}</Text>
          </Card>
        );
    }
  };

  if (loading) {
    return (
      <div className="memory-training">
        <div className="memory-training-container">
          <div className="game-loading">
            <Spin size="large" />
            <Text className="loading-text">加载中...</Text>
          </div>
        </div>
      </div>
    );
  }

  const { currentGame, currentLevel } = memoryTrainingGameStore;

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
            {currentGame && currentLevel && (
              <>
                <Title level={2} className="page-title">
                  {currentGame.name} - {currentLevel.name || `关卡 ${currentLevel.level_number}`}
                </Title>
                <Text className="page-subtitle">{currentLevel.description || currentGame.description}</Text>
              </>
            )}
          </div>
        </div>

        {/* 游戏区域 */}
        <div className="game-area">{renderGame()}</div>
      </div>
    </div>
  );
});






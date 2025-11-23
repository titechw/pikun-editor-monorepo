import React, { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Button, Typography, Space, message } from 'antd';
import { CheckOutlined, CloseOutlined, ReloadOutlined } from '@ant-design/icons';
import { memoryTrainingGameStore } from '@/stores/memory-training-game';
import type { MemoryTrainingLevel } from '@/api/memory-training.api';
import './GameCommon.less';

const { Title, Text } = Typography;

interface ShapePositionGameProps {
  level: MemoryTrainingLevel;
}

/**
 * 图形位置记忆游戏
 */
export const ShapePositionGame = observer(({ level }: ShapePositionGameProps): React.JSX.Element => {
  const [gameState, setGameState] = useState<'ready' | 'memorizing' | 'recalling' | 'result'>('ready');
  const [gameData, setGameData] = useState<{ positions: number[]; gridSize: number } | null>(null);
  const [userAnswer, setUserAnswer] = useState<{ positions: number[] } | null>(null);
  const [gameResult, setGameResult] = useState<{
    correct: boolean;
    correctRate: number;
    score: number;
    timeSpent: number;
    expEarned: number;
  } | null>(null);
  const difficultyConfig = level.difficulty_config;
  const [selectedPositions, setSelectedPositions] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (gameState === GameState.Ready) {
      const timer = setTimeout(() => {
        memoryTrainingStore.startMemorizing();
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (gameState === GameState.Memorizing && gameData?.positions) {
      timerRef.current = setTimeout(() => {
        memoryTrainingStore.startRecalling();
        setStartTime(Date.now());
      }, (currentDifficulty?.displayTime || 3) * 1000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [gameState, gameData]);

  const gridSize = gameData?.gridSize || 3;
  const totalCells = gridSize * gridSize;
  const positions = gameData?.positions || [];

  const handleCellClick = (index: number): void => {
    if (selectedPositions.includes(index)) {
      setSelectedPositions(selectedPositions.filter((pos) => pos !== index));
    } else {
      setSelectedPositions([...selectedPositions, index]);
    }
  };

  const handleSubmit = (): void => {
    if (selectedPositions.length === 0) {
      message.warning('请选择位置');
      return;
    }

    const answer = { positions: selectedPositions };
    const timeSpent = Date.now() - startTime;
    memoryTrainingStore.submitAnswer(answer, timeSpent);
  };

  const handleNextRound = async (): Promise<void> => {
    if (gameResult) {
      await memoryTrainingStore.submitResult();
    }
    memoryTrainingStore.nextRound();
    setSelectedPositions([]);
  };

  const handleRestart = (): void => {
    memoryTrainingStore.resetGame();
    setSelectedPositions([]);
  };

  if (gameState === GameState.Ready) {
    return (
      <Card className="game-card">
        <div className="game-ready">
          <Title level={3} className="ready-title">
            准备开始
          </Title>
          <Text className="ready-text">游戏即将开始，请集中注意力...</Text>
        </div>
      </Card>
    );
  }

  if (gameState === GameState.Memorizing) {
    return (
      <Card className="game-card">
        <div className="game-memorizing">
          <Title level={4} className="memorize-title">
            记住图形的位置
          </Title>
          <div
            className="shape-grid"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            }}
          >
            {Array.from({ length: totalCells }, (_, index) => {
              const hasShape = positions.includes(index);
              return (
                <div
                  key={index}
                  className={`grid-cell ${hasShape ? 'has-shape' : ''}`}
                >
                  {hasShape && <div className="shape-circle" />}
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    );
  }

  if (gameState === GameState.Recalling) {
    return (
      <Card className="game-card">
        <div className="game-recalling">
          <Title level={4} className="recall-title">
            请点击刚才显示图形的位置
          </Title>
          <div
            className="shape-grid"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            }}
          >
            {Array.from({ length: totalCells }, (_, index) => {
              const isSelected = selectedPositions.includes(index);
              return (
                <button
                  key={index}
                  className={`grid-cell clickable ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleCellClick(index)}
                >
                  {isSelected && <div className="shape-circle" />}
                </button>
              );
            })}
          </div>
          <div className="selected-info">
            <Text className="selected-label">
              已选择：{selectedPositions.length} / {positions.length}
            </Text>
          </div>
          <Button
            type="primary"
            size="large"
            onClick={handleSubmit}
            className="submit-button"
            disabled={selectedPositions.length === 0}
          >
            提交答案
          </Button>
        </div>
      </Card>
    );
  }

  if (gameState === GameState.Result && gameResult) {
    const isCorrect = gameResult.correct;
    const expectedPositions = (gameData?.positions || []).sort((a, b) => a - b);
    const actualPositions = (memoryTrainingStore.userAnswer?.positions || []).sort((a, b) => a - b);

    return (
      <Card className="game-card">
        <div className="game-result">
          <div className={`result-icon ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? <CheckOutlined /> : <CloseOutlined />}
          </div>
          <Title level={3} className={`result-title ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? '回答正确！' : '回答错误'}
          </Title>
          <div className="result-details">
            <div className="detail-item">
              <Text className="detail-label">正确率：</Text>
              <Text className="detail-value">
                {Math.round(gameResult.correctRate * 100)}%
              </Text>
            </div>
            <div className="detail-item">
              <Text className="detail-label">用时：</Text>
              <Text className="detail-value">{(gameResult.timeSpent / 1000).toFixed(2)} 秒</Text>
            </div>
            <div className="detail-item">
              <Text className="detail-label">得分：</Text>
              <Text className="detail-value">{gameResult.score} 分</Text>
            </div>
            <div className="detail-item">
              <Text className="detail-label">获得经验：</Text>
              <Text className="detail-value exp-value">+{gameResult.expEarned} EXP</Text>
            </div>
          </div>
          <Space size="middle" className="result-actions">
            <Button
              type="primary"
              size="large"
              onClick={handleNextRound}
              loading={memoryTrainingStore.loading}
            >
              下一轮
            </Button>
            <Button size="large" icon={<ReloadOutlined />} onClick={handleRestart}>
              重新开始
            </Button>
          </Space>
        </div>
      </Card>
    );
  }

  return null;
});


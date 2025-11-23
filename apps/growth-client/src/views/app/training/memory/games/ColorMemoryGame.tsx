import React, { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Button, Typography, Space, message } from 'antd';
import { CheckOutlined, CloseOutlined, ReloadOutlined } from '@ant-design/icons';
import { memoryTrainingGameStore } from '@/stores/memory-training-game';
import type { MemoryTrainingLevel } from '@/api/memory-training.api';
import './GameCommon.less';

const { Title, Text } = Typography;

interface ColorMemoryGameProps {
  level: MemoryTrainingLevel;
}

const COLOR_MAP: Record<string, { name: string; bg: string; text: string }> = {
  red: { name: '红色', bg: '#ff4d4f', text: '#fff' },
  blue: { name: '蓝色', bg: '#1890ff', text: '#fff' },
  green: { name: '绿色', bg: '#52c41a', text: '#fff' },
  yellow: { name: '黄色', bg: '#faad14', text: '#fff' },
  purple: { name: '紫色', bg: '#722ed1', text: '#fff' },
  orange: { name: '橙色', bg: '#fa8c16', text: '#fff' },
};

/**
 * 颜色记忆游戏
 */
export const ColorMemoryGame = observer(({ level }: ColorMemoryGameProps): React.JSX.Element => {
  const [gameState, setGameState] = useState<'ready' | 'memorizing' | 'recalling' | 'result'>('ready');
  const [gameData, setGameData] = useState<{ sequence: string[] } | null>(null);
  const [userAnswer, setUserAnswer] = useState<{ sequence: string[] } | null>(null);
  const [gameResult, setGameResult] = useState<{
    correct: boolean;
    correctRate: number;
    score: number;
    timeSpent: number;
    expEarned: number;
  } | null>(null);
  const difficultyConfig = level.difficulty_config;
  const [displayIndex, setDisplayIndex] = useState(0);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (gameState === GameState.Ready) {
      const timer = setTimeout(() => {
        memoryTrainingStore.startMemorizing();
        setDisplayIndex(0);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (gameState === GameState.Memorizing && gameData?.sequence) {
      const sequence = gameData.sequence;
      if (displayIndex < sequence.length) {
        timerRef.current = setTimeout(() => {
          if (displayIndex < sequence.length - 1) {
            setDisplayIndex(displayIndex + 1);
          } else {
            setTimeout(() => {
              memoryTrainingStore.startRecalling();
              setStartTime(Date.now());
            }, 500);
          }
        }, (currentDifficulty?.displayTime || 2) * 1000 / sequence.length);
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [gameState, displayIndex, gameData]);

  const handleColorClick = (color: string): void => {
    setSelectedColors([...selectedColors, color]);
  };

  const handleSubmit = (): void => {
    if (selectedColors.length === 0) {
      message.warning('请选择颜色');
      return;
    }

    const answer = { sequence: selectedColors };
    const timeSpent = Date.now() - startTime;
    memoryTrainingStore.submitAnswer(answer, timeSpent);
  };

  const handleNextRound = async (): Promise<void> => {
    if (gameResult) {
      await memoryTrainingStore.submitResult();
    }
    memoryTrainingStore.nextRound();
    setSelectedColors([]);
    setDisplayIndex(0);
  };

  const handleRestart = (): void => {
    memoryTrainingStore.resetGame();
    setSelectedColors([]);
    setDisplayIndex(0);
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

  if (gameState === GameState.Memorizing && gameData?.sequence) {
    const currentColor = gameData.sequence[displayIndex];
    const colorInfo = COLOR_MAP[currentColor] || COLOR_MAP.red;

    return (
      <Card className="game-card">
        <div className="game-memorizing">
          <div
            className="color-display"
            style={{
              backgroundColor: colorInfo.bg,
              color: colorInfo.text,
            }}
          >
            {colorInfo.name}
          </div>
          <Text className="progress-text">
            {displayIndex + 1} / {gameData.sequence.length}
          </Text>
        </div>
      </Card>
    );
  }

  if (gameState === GameState.Recalling) {
    const availableColors = Object.keys(COLOR_MAP);

    return (
      <Card className="game-card">
        <div className="game-recalling">
          <Title level={4} className="recall-title">
            请按顺序点击刚才看到的颜色
          </Title>
          <div className="color-selector">
            {availableColors.map((color) => {
              const colorInfo = COLOR_MAP[color];
              const isSelected = selectedColors.includes(color);
              return (
                <button
                  key={color}
                  className={`color-button ${isSelected ? 'selected' : ''}`}
                  style={{
                    backgroundColor: colorInfo.bg,
                    color: colorInfo.text,
                  }}
                  onClick={() => handleColorClick(color)}
                  disabled={isSelected}
                >
                  {colorInfo.name}
                </button>
              );
            })}
          </div>
          <div className="selected-sequence">
            <Text className="selected-label">已选择：</Text>
            <Space>
              {selectedColors.map((color, index) => {
                const colorInfo = COLOR_MAP[color];
                return (
                  <span
                    key={index}
                    className="selected-color-tag"
                    style={{
                      backgroundColor: colorInfo.bg,
                      color: colorInfo.text,
                    }}
                  >
                    {colorInfo.name}
                  </span>
                );
              })}
            </Space>
          </div>
          <Button
            type="primary"
            size="large"
            onClick={handleSubmit}
            className="submit-button"
            disabled={selectedColors.length === 0}
          >
            提交答案
          </Button>
        </div>
      </Card>
    );
  }

  if (gameState === GameState.Result && gameResult) {
    const isCorrect = gameResult.correct;
    const expectedSequence = gameData?.sequence || [];
    const actualSequence = memoryTrainingStore.userAnswer?.sequence || [];

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
              <Text className="detail-label">正确答案：</Text>
              <Space>
                {expectedSequence.map((color, index) => {
                  const colorInfo = COLOR_MAP[color];
                  return (
                    <span
                      key={index}
                      className="color-tag"
                      style={{
                        backgroundColor: colorInfo.bg,
                        color: colorInfo.text,
                      }}
                    >
                      {colorInfo.name}
                    </span>
                  );
                })}
              </Space>
            </div>
            <div className="detail-item">
              <Text className="detail-label">你的答案：</Text>
              <Space>
                {actualSequence.length > 0 ? (
                  actualSequence.map((color, index) => {
                    const colorInfo = COLOR_MAP[color];
                    return (
                      <span
                        key={index}
                        className="color-tag"
                        style={{
                          backgroundColor: colorInfo.bg,
                          color: colorInfo.text,
                        }}
                      >
                        {colorInfo.name}
                      </span>
                    );
                  })
                ) : (
                  <Text>未选择</Text>
                )}
              </Space>
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


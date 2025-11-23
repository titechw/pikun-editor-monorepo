import React, { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Button, Input, Typography, Space, message } from 'antd';
import { CheckOutlined, CloseOutlined, ReloadOutlined } from '@ant-design/icons';
import { memoryTrainingGameStore } from '@/stores/memory-training-game';
import type { MemoryTrainingLevel } from '@/api/memory-training.api';
import './GameCommon.less';

const { Title, Text } = Typography;

interface NumberSequenceGameProps {
  level: MemoryTrainingLevel;
}

/**
 * 数字序列记忆游戏
 */
export const NumberSequenceGame = observer(({ level }: NumberSequenceGameProps): React.JSX.Element => {
  const [gameState, setGameState] = useState<'ready' | 'memorizing' | 'recalling' | 'result'>('ready');
  const [gameData, setGameData] = useState<{ sequence: number[] } | null>(null);
  const [userAnswer, setUserAnswer] = useState<{ sequence: number[] } | null>(null);
  const [gameResult, setGameResult] = useState<{
    correct: boolean;
    correctRate: number;
    score: number;
    timeSpent: number;
    expEarned: number;
  } | null>(null);
  const difficultyConfig = level.difficulty_config;
  const [displayIndex, setDisplayIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 生成游戏数据
  useEffect(() => {
    if (gameState === 'ready' && !gameData) {
      const sequenceLength = difficultyConfig.sequenceLength || 3;
      const sequence = Array.from({ length: sequenceLength }, () =>
        Math.floor(Math.random() * 10)
      );
      setGameData({ sequence });
    }
  }, [gameState, gameData, difficultyConfig]);

  useEffect(() => {
    if (gameState === 'ready' && gameData) {
      // 延迟1秒后开始记忆阶段
      const timer = setTimeout(() => {
        setGameState('memorizing');
        setDisplayIndex(0);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (gameState === 'memorizing' && gameData?.sequence) {
      // 依次显示数字
      const sequence = gameData.sequence;
      const displayTime = (difficultyConfig.displayTime || 2) * 1000;
      const timePerNumber = displayTime / sequence.length;

      if (displayIndex < sequence.length) {
        timerRef.current = setTimeout(() => {
          if (displayIndex < sequence.length - 1) {
            setDisplayIndex(displayIndex + 1);
          } else {
            // 显示完毕，进入回忆阶段
            setTimeout(() => {
              setGameState('recalling');
              setStartTime(Date.now());
            }, 500);
          }
        }, timePerNumber);
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [gameState, displayIndex, gameData, difficultyConfig]);

  const handleSubmit = async (): Promise<void> => {
    if (!userInput.trim()) {
      message.warning('请输入答案');
      return;
    }

    const answer = {
      sequence: userInput.split('').map((char) => parseInt(char, 10)).filter((num) => !isNaN(num)),
    };

    const timeSpent = Date.now() - startTime;
    const expected = gameData?.sequence || [];
    const actual = answer.sequence;
    const correct = JSON.stringify(expected) === JSON.stringify(actual);
    const correctRate = correct ? 1 : 0;
    const score = correct ? 100 : 0;

    // 计算经验值（简化版，实际应该在后端计算）
    const baseExp = level.base_exp_reward;
    const expEarned = Math.round(baseExp * correctRate);

    setUserAnswer(answer);
    setGameResult({
      correct,
      correctRate,
      score,
      timeSpent,
      expEarned,
    });
    setGameState('result');

    // 提交结果到后端
    try {
      await memoryTrainingGameStore.submitResult(level.level_id, {
        correct,
        correctRate,
        score,
        timeSpent,
        userAnswer: answer,
      });
    } catch (error) {
      console.error('提交结果失败:', error);
    }
  };

  const handleNextRound = (): void => {
    // 重新开始游戏
    setGameState('ready');
    setGameData(null);
    setUserAnswer(null);
    setGameResult(null);
    setUserInput('');
    setDisplayIndex(0);
  };

  const handleRestart = (): void => {
    setGameState('ready');
    setGameData(null);
    setUserAnswer(null);
    setGameResult(null);
    setUserInput('');
    setDisplayIndex(0);
  };

  if (gameState === 'ready') {
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

  if (gameState === 'memorizing' && gameData?.sequence) {
    const currentNumber = gameData.sequence[displayIndex];
    return (
      <Card className="game-card">
        <div className="game-memorizing">
          <Title level={1} className="number-display">
            {currentNumber}
          </Title>
          <Text className="progress-text">
            {displayIndex + 1} / {gameData.sequence.length}
          </Text>
        </div>
      </Card>
    );
  }

  if (gameState === 'recalling') {
    return (
      <Card className="game-card">
        <div className="game-recalling">
          <Title level={4} className="recall-title">
            请按顺序输入刚才看到的数字
          </Title>
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value.replace(/\D/g, ''))}
            placeholder="输入数字序列"
            size="large"
            className="answer-input"
            maxLength={gameData?.sequence?.length || 10}
            autoFocus
            onPressEnter={handleSubmit}
          />
          <Button
            type="primary"
            size="large"
            onClick={handleSubmit}
            className="submit-button"
          >
            提交答案
          </Button>
        </div>
      </Card>
    );
  }

  if (gameState === 'result' && gameResult) {
    const isCorrect = gameResult.correct;
    const expectedSequence = gameData?.sequence || [];
    const actualSequence = userAnswer?.sequence || [];

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
              <Text className="detail-value">{expectedSequence.join(' ')}</Text>
            </div>
            <div className="detail-item">
              <Text className="detail-label">你的答案：</Text>
              <Text className="detail-value">{actualSequence.join(' ') || '未输入'}</Text>
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
              loading={memoryTrainingGameStore.loading}
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


import React, { useEffect, useState, useRef } from 'react';
import './GameCommon.css';

interface DifficultyConfig {
  colorCount?: number;
  sequenceLength?: number;
  displayTime?: number;
}

interface ColorMemoryGameProps {
  difficultyConfig: DifficultyConfig;
  onComplete: (resultData: {
    correct: boolean;
    correctRate: number;
    score: number;
    timeSpent: number;
    userAnswer: any;
  }) => void;
  loading: boolean;
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
export const ColorMemoryGame: React.FC<ColorMemoryGameProps> = ({
  difficultyConfig,
  onComplete,
  loading,
}) => {
  const [gameState, setGameState] = useState<'ready' | 'memorizing' | 'recalling' | 'result'>('ready');
  const [gameData, setGameData] = useState<{ sequence: string[] } | null>(null);
  const [userAnswer, setUserAnswer] = useState<{ sequence: string[] } | null>(null);
  const [gameResult, setGameResult] = useState<{
    correct: boolean;
    correctRate: number;
    score: number;
    timeSpent: number;
  } | null>(null);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 生成游戏数据
  useEffect(() => {
    if (gameState === 'ready' && !gameData) {
      const sequenceLength = difficultyConfig.sequenceLength || 4;
      const colorCount = difficultyConfig.colorCount || 4;
      const availableColors = Object.keys(COLOR_MAP).slice(0, colorCount);
      const sequence = Array.from({ length: sequenceLength }, () => {
        const index = Math.floor(Math.random() * availableColors.length);
        return availableColors[index];
      });
      setGameData({ sequence });
    }
  }, [gameState, gameData, difficultyConfig]);

  useEffect(() => {
    if (gameState === 'ready' && gameData) {
      const timer = setTimeout(() => {
        setGameState('memorizing');
        setDisplayIndex(0);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (gameState === 'memorizing' && gameData?.sequence) {
      const sequence = gameData.sequence;
      const displayTime = (difficultyConfig.displayTime || 2) * 1000;
      const timePerColor = displayTime / sequence.length;

      if (displayIndex < sequence.length) {
        timerRef.current = setTimeout(() => {
          if (displayIndex < sequence.length - 1) {
            setDisplayIndex(displayIndex + 1);
          } else {
            setTimeout(() => {
              setGameState('recalling');
              setStartTime(Date.now());
            }, 500);
          }
        }, timePerColor);
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [gameState, displayIndex, gameData, difficultyConfig]);

  const handleColorClick = (color: string): void => {
    if (!selectedColors.includes(color)) {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleRemoveColor = (index: number): void => {
    setSelectedColors(selectedColors.filter((_, i) => i !== index));
  };

  const handleSubmit = async (): Promise<void> => {
    if (selectedColors.length === 0) {
      alert('请选择颜色');
      return;
    }

    const answer = { sequence: selectedColors };
    const timeSpent = Date.now() - startTime;
    const expected = gameData?.sequence || [];
    const actual = answer.sequence;
    
    // 计算正确率（按位置匹配）
    let correctCount = 0;
    const minLength = Math.min(expected.length, actual.length);
    for (let i = 0; i < minLength; i++) {
      if (expected[i] === actual[i]) {
        correctCount++;
      }
    }
    const correctRate = expected.length > 0 ? correctCount / expected.length : 0;
    const correct = correctRate >= 0.8; // 80% 以上算正确
    const score = Math.round(correctRate * 100);

    setUserAnswer(answer);
    setGameResult({
      correct,
      correctRate,
      score,
      timeSpent,
    });
    setGameState('result');

    // 调用完成回调
    onComplete({
      correct,
      correctRate,
      score,
      timeSpent,
      userAnswer: answer,
    });
  };

  const handleNextRound = (): void => {
    setGameState('ready');
    setGameData(null);
    setUserAnswer(null);
    setGameResult(null);
    setSelectedColors([]);
    setDisplayIndex(0);
  };

  const handleRestart = (): void => {
    setGameState('ready');
    setGameData(null);
    setUserAnswer(null);
    setGameResult(null);
    setSelectedColors([]);
    setDisplayIndex(0);
  };

  if (gameState === 'ready') {
    return (
      <div className="game-card">
        <div className="game-ready">
          <h3 className="ready-title">准备开始</h3>
          <p className="ready-text">游戏即将开始，请集中注意力...</p>
        </div>
      </div>
    );
  }

  if (gameState === 'memorizing' && gameData?.sequence) {
    const currentColor = gameData.sequence[displayIndex];
    const colorInfo = COLOR_MAP[currentColor] || COLOR_MAP.red;

    return (
      <div className="game-card">
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
          <p className="progress-text">
            {displayIndex + 1} / {gameData.sequence.length}
          </p>
        </div>
      </div>
    );
  }

  if (gameState === 'recalling') {
    const availableColors = Object.keys(COLOR_MAP).slice(0, difficultyConfig.colorCount || 6);

    return (
      <div className="game-card">
        <div className="game-recalling">
          <h4 className="recall-title">请按顺序点击刚才看到的颜色</h4>
          <div className="color-selector">
            {availableColors.map((color) => {
              const colorInfo = COLOR_MAP[color];
              const isSelected = selectedColors.includes(color);
              return (
                <button
                  key={color}
                  type="button"
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
          {selectedColors.length > 0 && (
            <div className="selected-sequence">
              <span className="selected-label">已选择：</span>
              <div className="selected-colors">
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
                      <button
                        type="button"
                        className="remove-color"
                        onClick={() => handleRemoveColor(index)}
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
          <button
            type="button"
            className="submit-button"
            onClick={handleSubmit}
            disabled={selectedColors.length === 0}
          >
            提交答案
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'result' && gameResult) {
    const isCorrect = gameResult.correct;
    const expectedSequence = gameData?.sequence || [];
    const actualSequence = userAnswer?.sequence || [];

    return (
      <div className="game-card">
        <div className="game-result">
          <div className={`result-icon ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? '✓' : '✗'}
          </div>
          <h3 className={`result-title ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? '回答正确！' : '回答错误'}
          </h3>
          <div className="result-details">
            <div className="detail-item">
              <span className="detail-label">正确答案：</span>
              <span className="detail-value">
                {expectedSequence.map((c) => COLOR_MAP[c]?.name).join(' → ')}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">你的答案：</span>
              <span className="detail-value">
                {actualSequence.map((c) => COLOR_MAP[c]?.name).join(' → ') || '未输入'}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">用时：</span>
              <span className="detail-value">{(gameResult.timeSpent / 1000).toFixed(2)} 秒</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">得分：</span>
              <span className="detail-value">{gameResult.score} 分</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">正确率：</span>
              <span className="detail-value">{Math.round(gameResult.correctRate * 100)}%</span>
            </div>
          </div>
          <div className="result-actions">
            <button
              type="button"
              className="action-button primary"
              onClick={handleNextRound}
              disabled={loading}
            >
              {loading ? '提交中...' : '下一轮'}
            </button>
            <button type="button" className="action-button" onClick={handleRestart}>
              重新开始
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};






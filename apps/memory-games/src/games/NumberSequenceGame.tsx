import React, { useEffect, useState, useRef } from 'react';
import './GameCommon.css';

interface DifficultyConfig {
  sequenceLength?: number;
  displayTime?: number;
}

interface NumberSequenceGameProps {
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

/**
 * 数字序列记忆游戏
 */
export const NumberSequenceGame: React.FC<NumberSequenceGameProps> = ({
  difficultyConfig,
  onComplete,
  loading,
}) => {
  const [gameState, setGameState] = useState<'ready' | 'memorizing' | 'recalling' | 'result'>('ready');
  const [gameData, setGameData] = useState<{ sequence: number[] } | null>(null);
  const [userAnswer, setUserAnswer] = useState<{ sequence: number[] } | null>(null);
  const [gameResult, setGameResult] = useState<{
    correct: boolean;
    correctRate: number;
    score: number;
    timeSpent: number;
  } | null>(null);
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
      alert('请输入答案');
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
      <div className="game-card">
        <div className="game-ready">
          <h3 className="ready-title">准备开始</h3>
          <p className="ready-text">游戏即将开始，请集中注意力...</p>
        </div>
      </div>
    );
  }

  if (gameState === 'memorizing' && gameData?.sequence) {
    const currentNumber = gameData.sequence[displayIndex];
    return (
      <div className="game-card">
        <div className="game-memorizing">
          <h1 className="number-display">{currentNumber}</h1>
          <p className="progress-text">
            {displayIndex + 1} / {gameData.sequence.length}
          </p>
        </div>
      </div>
    );
  }

  if (gameState === 'recalling') {
    return (
      <div className="game-card">
        <div className="game-recalling">
          <h4 className="recall-title">请按顺序输入刚才看到的数字</h4>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value.replace(/\D/g, ''))}
            placeholder="输入数字序列"
            className="answer-input"
            maxLength={gameData?.sequence?.length || 10}
            autoFocus
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
          />
          <button type="button" className="submit-button" onClick={handleSubmit}>
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
              <span className="detail-value">{expectedSequence.join(' ')}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">你的答案：</span>
              <span className="detail-value">{actualSequence.join(' ') || '未输入'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">用时：</span>
              <span className="detail-value">{(gameResult.timeSpent / 1000).toFixed(2)} 秒</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">得分：</span>
              <span className="detail-value">{gameResult.score} 分</span>
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






import React, { useEffect, useState, useRef } from 'react';
import './GameCommon.css';

interface DifficultyConfig {
  gridSize?: number;
  shapeCount?: number;
  displayTime?: number;
}

interface ShapePositionGameProps {
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
 * 图形位置记忆游戏
 */
export const ShapePositionGame: React.FC<ShapePositionGameProps> = ({
  difficultyConfig,
  onComplete,
  loading,
}) => {
  const [gameState, setGameState] = useState<'ready' | 'memorizing' | 'recalling' | 'result'>('ready');
  const [gameData, setGameData] = useState<{ positions: number[]; gridSize: number } | null>(null);
  const [userAnswer, setUserAnswer] = useState<{ positions: number[] } | null>(null);
  const [gameResult, setGameResult] = useState<{
    correct: boolean;
    correctRate: number;
    score: number;
    timeSpent: number;
  } | null>(null);
  const [selectedPositions, setSelectedPositions] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 生成游戏数据
  useEffect(() => {
    if (gameState === 'ready' && !gameData) {
      const gridSize = difficultyConfig.gridSize || 3;
      const shapeCount = difficultyConfig.shapeCount || 3;
      const totalCells = gridSize * gridSize;
      const positions: number[] = [];

      while (positions.length < shapeCount) {
        const pos = Math.floor(Math.random() * totalCells);
        if (!positions.includes(pos)) {
          positions.push(pos);
        }
      }

      setGameData({ positions: positions.sort((a, b) => a - b), gridSize });
    }
  }, [gameState, gameData, difficultyConfig]);

  useEffect(() => {
    if (gameState === 'ready' && gameData) {
      const timer = setTimeout(() => {
        setGameState('memorizing');
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (gameState === 'memorizing' && gameData?.positions) {
      timerRef.current = setTimeout(() => {
        setGameState('recalling');
        setStartTime(Date.now());
      }, (difficultyConfig.displayTime || 3) * 1000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [gameState, gameData, difficultyConfig]);

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

  const handleSubmit = async (): Promise<void> => {
    if (selectedPositions.length === 0) {
      alert('请选择位置');
      return;
    }

    const answer = { positions: selectedPositions.sort((a, b) => a - b) };
    const timeSpent = Date.now() - startTime;
    const expected = positions;
    const actual = answer.positions;
    
    // 计算正确率
    const correctPositions = actual.filter((pos) => expected.includes(pos));
    const correctRate = expected.length > 0 ? correctPositions.length / expected.length : 0;
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
    setSelectedPositions([]);
  };

  const handleRestart = (): void => {
    setGameState('ready');
    setGameData(null);
    setUserAnswer(null);
    setGameResult(null);
    setSelectedPositions([]);
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

  if (gameState === 'memorizing') {
    return (
      <div className="game-card">
        <div className="game-memorizing">
          <h4 className="memorize-title">记住图形的位置</h4>
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
      </div>
    );
  }

  if (gameState === 'recalling') {
    return (
      <div className="game-card">
        <div className="game-recalling">
          <h4 className="recall-title">请点击刚才显示图形的位置</h4>
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
                  type="button"
                  className={`grid-cell clickable ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleCellClick(index)}
                >
                  {isSelected && <div className="shape-circle" />}
                </button>
              );
            })}
          </div>
          <div className="selected-info">
            <span className="selected-label">
              已选择：{selectedPositions.length} / {positions.length}
            </span>
          </div>
          <button
            type="button"
            className="submit-button"
            onClick={handleSubmit}
            disabled={selectedPositions.length === 0}
          >
            提交答案
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'result' && gameResult) {
    const isCorrect = gameResult.correct;
    const expectedPositions = positions;
    const actualPositions = userAnswer?.positions || [];

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
              <span className="detail-label">正确位置数：</span>
              <span className="detail-value">
                {actualPositions.filter((p) => expectedPositions.includes(p)).length} /{' '}
                {expectedPositions.length}
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






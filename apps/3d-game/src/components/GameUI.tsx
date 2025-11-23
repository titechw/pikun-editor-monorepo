import React from 'react';
import './GameUI.css';

interface GameUIProps {
  gameState: 'ready' | 'playing' | 'result';
  score: number;
  level: number;
  onStart: () => void;
  onRestart: () => void;
  loading: boolean;
}

/**
 * 游戏 UI 组件
 */
export const GameUI: React.FC<GameUIProps> = ({
  gameState,
  score,
  level,
  onStart,
  onRestart,
  loading,
}) => {
  if (gameState === 'ready') {
    return (
      <div className="game-ui ready">
        <div className="ui-content">
          <h1 className="title">3D 空间记忆训练</h1>
          <p className="description">记住空间中物体的位置，然后点击对应的位置</p>
          <button className="start-button" onClick={onStart}>
            开始游戏
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'result') {
    return (
      <div className="game-ui result">
        <div className="ui-content">
          <h2 className="result-title">游戏完成！</h2>
          <div className="score-display">
            <div className="score-label">得分</div>
            <div className="score-value">{score}</div>
          </div>
          {loading ? (
            <div className="loading-text">提交结果中...</div>
          ) : (
            <button className="restart-button" onClick={onRestart}>
              再来一次
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="game-ui playing">
      <div className="hud">
        <div className="hud-item">
          <span className="hud-label">等级</span>
          <span className="hud-value">{level}</span>
        </div>
        <div className="hud-item">
          <span className="hud-label">得分</span>
          <span className="hud-value">{score}</span>
        </div>
      </div>
    </div>
  );
};






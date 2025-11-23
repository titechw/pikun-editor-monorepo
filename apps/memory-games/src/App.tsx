import React, { useEffect, useState } from 'react';
import { NumberSequenceGame } from './games/NumberSequenceGame';
import { ColorMemoryGame } from './games/ColorMemoryGame';
import { ShapePositionGame } from './games/ShapePositionGame';
import { useGameAPI } from './hooks/useGameAPI';
import './App.css';

/**
 * 游戏类型
 */
type GameType = 'number_sequence' | 'color_memory' | 'shape_position';

/**
 * 难度配置
 */
interface DifficultyConfig {
  sequenceLength?: number;
  displayTime?: number;
  gridSize?: number;
  shapeCount?: number;
  colorCount?: number;
  positionCount?: number;
}

/**
 * 记忆训练游戏主应用
 */
const App: React.FC = () => {
  const [gameType, setGameType] = useState<GameType | null>(null);
  const [difficultyConfig, setDifficultyConfig] = useState<DifficultyConfig | null>(null);
  const [levelId, setLevelId] = useState<string | null>(null);
  const { submitResult, loading } = useGameAPI();

  // 从 URL 参数获取配置
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('gameType') as GameType | null;
    const secretId = params.get('secretId');
    const courseId = params.get('courseId');
    const levelIdParam = params.get('levelId');

    // 解析难度配置（从 URL 参数或 JSON）
    let config: DifficultyConfig | null = null;
    const configStr = params.get('config');
    if (configStr) {
      try {
        config = JSON.parse(decodeURIComponent(configStr));
      } catch (error) {
        console.error('解析难度配置失败:', error);
      }
    }

    if (!type || !secretId || !courseId) {
      console.error('缺少必要参数：gameType、secretId 或 courseId');
      return;
    }

    setGameType(type);
    setDifficultyConfig(config || {});
    setLevelId(levelIdParam);
  }, []);

  const handleGameComplete = async (
    resultData: {
      correct: boolean;
      correctRate: number;
      score: number;
      timeSpent: number;
      userAnswer: any;
    }
  ): Promise<void> => {
    const params = new URLSearchParams(window.location.search);
    const secretId = params.get('secretId');
    const courseId = params.get('courseId');

    if (secretId && courseId) {
      try {
        await submitResult({
          secretId,
          courseId,
          resultData,
        });
      } catch (error) {
        console.error('提交结果失败:', error);
      }
    }
  };

  if (!gameType || !difficultyConfig) {
    return (
      <div className="app-loading">
        <div className="loading-content">
          <h2>加载中...</h2>
          <p>正在初始化游戏...</p>
        </div>
      </div>
    );
  }

  // 根据游戏类型渲染对应的游戏组件
  const renderGame = (): React.ReactNode => {
    switch (gameType) {
      case 'number_sequence':
        return (
          <NumberSequenceGame
            difficultyConfig={difficultyConfig}
            onComplete={handleGameComplete}
            loading={loading}
          />
        );
      case 'color_memory':
        return (
          <ColorMemoryGame
            difficultyConfig={difficultyConfig}
            onComplete={handleGameComplete}
            loading={loading}
          />
        );
      case 'shape_position':
        return (
          <ShapePositionGame
            difficultyConfig={difficultyConfig}
            onComplete={handleGameComplete}
            loading={loading}
          />
        );
      default:
        return (
          <div className="error-message">
            <h2>不支持的游戏类型：{gameType}</h2>
          </div>
        );
    }
  };

  return <div className="app">{renderGame()}</div>;
};

export default App;






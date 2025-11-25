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
 * 游戏类型配置
 */
const GAME_TYPES: Array<{ value: GameType; label: string; description: string }> = [
  { value: 'number_sequence', label: '数字序列记忆', description: '记住并复述数字序列' },
  { value: 'color_memory', label: '颜色记忆', description: '记住并复述颜色序列' },
  { value: 'shape_position', label: '图形位置记忆', description: '记住图形在网格中的位置' },
];

/**
 * 记忆训练游戏主应用
 */
const App: React.FC = () => {
  const [gameType, setGameType] = useState<GameType | null>(null);
  const [difficultyConfig, setDifficultyConfig] = useState<DifficultyConfig | null>(null);
  const { submitResult, loading } = useGameAPI();

  // 从 URL 参数获取配置（如果存在则直接进入游戏）
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('gameType') as GameType | null;
    const secretId = params.get('secretId');
    const courseId = params.get('courseId');

    // 如果 URL 中有 gameType 参数，直接进入游戏（保持向后兼容）
    if (type && secretId && courseId) {
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

      setGameType(type);
      setDifficultyConfig(config || {});
    }
    // 如果没有 URL 参数，则显示游戏选择界面（gameType 保持为 null）
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

  // 如果没有选择游戏类型，显示游戏选择界面
  if (!gameType) {
    return (
      <div className="app-game-selector">
        <div className="selector-content">
          <h1>记忆训练游戏</h1>
          <p className="selector-description">请选择要训练的游戏类型</p>
          <div className="game-type-list">
            {GAME_TYPES.map((game) => (
              <div
                key={game.value}
                className="game-type-card"
                onClick={() => {
                  setGameType(game.value);
                  setDifficultyConfig({}); // 使用默认配置
                }}
              >
                <h3>{game.label}</h3>
                <p>{game.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 如果选择了游戏类型但还没有配置，显示加载中
  if (!difficultyConfig) {
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








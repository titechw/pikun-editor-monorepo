import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { GameScene } from './components/GameScene';
import { GameUI } from './components/GameUI';
import { useGameAPI } from './hooks/useGameAPI';
import './App.css';

/**
 * 3D 记忆训练游戏主应用
 */
const App: React.FC = () => {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'result'>('ready');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const { submitResult, loading } = useGameAPI();

  // 从 URL 参数获取 secretId 和 courseId
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const secretId = params.get('secretId');
    const courseId = params.get('courseId');

    if (!secretId || !courseId) {
      console.error('缺少必要参数：secretId 或 courseId');
    }
  }, []);

  const handleGameStart = (): void => {
    setGameState('playing');
    setScore(0);
  };

  const handleGameComplete = async (finalScore: number, correctRate: number): Promise<void> => {
    setScore(finalScore);
    setGameState('result');

    // 提交结果到后端
    const params = new URLSearchParams(window.location.search);
    const secretId = params.get('secretId');
    const courseId = params.get('courseId');

    if (secretId && courseId) {
      try {
        await submitResult({
          secretId,
          courseId,
          resultData: {
            correct: correctRate >= 0.8,
            correctRate,
            score: finalScore,
            timeSpent: 0, // TODO: 计算实际用时
            userAnswer: {},
          },
        });
      } catch (error) {
        console.error('提交结果失败:', error);
      }
    }
  };

  const handleRestart = (): void => {
    setGameState('ready');
    setScore(0);
  };

  return (
    <div className="app">
      <GameUI
        gameState={gameState}
        score={score}
        level={level}
        onStart={handleGameStart}
        onRestart={handleRestart}
        loading={loading}
      />
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {gameState === 'playing' && (
          <GameScene onComplete={handleGameComplete} level={level} />
        )}
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default App;






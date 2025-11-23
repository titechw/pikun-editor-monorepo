import React, { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import { Box, Sphere } from '@react-three/drei';

interface GameSceneProps {
  onComplete: (score: number, correctRate: number) => void;
  level: number;
}

/**
 * 3D 游戏场景
 * 显示多个物体，玩家需要记住它们的位置
 */
export const GameScene: React.FC<GameSceneProps> = ({ onComplete, level }) => {
  const [positions, setPositions] = useState<Vector3[]>([]);
  const [showObjects, setShowObjects] = useState(true);
  const [selectedPositions, setSelectedPositions] = useState<number[]>([]);
  const [phase, setPhase] = useState<'memorizing' | 'recalling'>('memorizing');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 根据等级生成位置
  useEffect(() => {
    const objectCount = Math.min(3 + level, 10); // 3-10 个物体
    const newPositions: Vector3[] = [];

    for (let i = 0; i < objectCount; i++) {
      const angle = (i / objectCount) * Math.PI * 2;
      const radius = 3 + level * 0.5;
      const height = (Math.random() - 0.5) * 4;
      newPositions.push(
        new Vector3(
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        )
      );
    }

    setPositions(newPositions);

    // 显示 3 秒后隐藏
    timerRef.current = setTimeout(() => {
      setShowObjects(false);
      setPhase('recalling');
    }, 3000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [level]);

  const handleObjectClick = (index: number): void => {
    if (phase !== 'recalling') return;

    if (selectedPositions.includes(index)) {
      setSelectedPositions(selectedPositions.filter((i) => i !== index));
    } else {
      setSelectedPositions([...selectedPositions, index]);
    }
  };

  const handleSubmit = (): void => {
    if (selectedPositions.length === 0) return;

    // 计算正确率
    const correctCount = selectedPositions.filter((pos) =>
      positions.some((_, idx) => idx === pos)
    ).length;
    const correctRate = correctCount / positions.length;
    const score = Math.round(correctRate * 100);

    onComplete(score, correctRate);
  };

  return (
    <>
      {/* 显示物体 */}
      {showObjects &&
        positions.map((pos, index) => (
          <Box
            key={index}
            position={[pos.x, pos.y, pos.z]}
            args={[0.5, 0.5, 0.5]}
            onClick={() => handleObjectClick(index)}
          >
            <meshStandardMaterial color="#ff6b6b" />
          </Box>
        ))}

      {/* 回忆阶段显示可点击的位置 */}
      {!showObjects && phase === 'recalling' && (
        <>
          {positions.map((pos, index) => (
            <Sphere
              key={index}
              position={[pos.x, pos.y, pos.z]}
              args={[0.3, 16, 16]}
              onClick={() => handleObjectClick(index)}
            >
              <meshStandardMaterial
                color={selectedPositions.includes(index) ? '#4ecdc4' : '#95a5a6'}
                transparent
                opacity={0.7}
              />
            </Sphere>
          ))}
        </>
      )}

      {/* UI 提示 */}
      {phase === 'recalling' && (
        <mesh position={[0, 4, 0]}>
          <boxGeometry args={[4, 0.5, 0.1]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
      )}
    </>
  );
};






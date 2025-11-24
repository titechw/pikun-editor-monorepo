import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { GameList } from './GameList';
import { LevelList } from './LevelList';
import { GamePlay } from './GamePlay';

/**
 * 记忆训练路由容器
 */
export const MemoryTraining = (): React.JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<GameList />} />
      <Route path="/:abilityId" element={<GameList />} />
      <Route path="/game/:gameId" element={<LevelList />} />
      <Route path="/game/:gameId/:levelId" element={<GamePlay />} />
      <Route path="*" element={<Navigate to="/training/memory" replace />} />
    </Routes>
  );
};

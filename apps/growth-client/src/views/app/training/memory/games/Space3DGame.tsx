import React from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Typography } from 'antd';
import type { MemoryTrainingLevel } from '@/api/memory-training.api';
import './GameCommon.less';

const { Title, Text } = Typography;

interface Space3DGameProps {
  level: MemoryTrainingLevel;
}

/**
 * 3D空间记忆游戏（待实现，需要 Three.js）
 */
export const Space3DGame = observer(({ level }: Space3DGameProps): React.JSX.Element => {
  return (
    <Card className="game-card">
      <div className="game-ready">
        <Title level={3} className="ready-title">
          3D空间记忆游戏
        </Title>
        <Text className="ready-text">
          此功能需要 Three.js 支持，正在开发中...
        </Text>
      </div>
    </Card>
  );
});


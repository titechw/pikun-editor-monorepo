import React, { useEffect, useState } from 'react';
import { Card, Table, Progress, message } from 'antd';
import { abilityApi, type AbilityItem, type UserAbilityLevel } from '@/api/ability.api';
import './AbilityLevels.less';

/**
 * 我的能力等级页面
 */
export const AbilityLevels = (): React.JSX.Element => {
  const [items, setItems] = useState<AbilityItem[]>([]);
  const [userLevels, setUserLevels] = useState<UserAbilityLevel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [itemsData, levelsData] = await Promise.all([
        abilityApi.getItems(),
        abilityApi.getMyLevels(),
      ]);
      setItems(itemsData);
      setUserLevels(levelsData);
    } catch (error: any) {
      message.error(error.message || '加载失败');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: '能力项',
      key: 'item',
      render: (_: any, record: UserAbilityLevel) => {
        const item = items.find((i) => i.item_id === record.item_id);
        return item?.name || record.item_id;
      },
    },
    {
      title: '当前等级',
      dataIndex: 'current_level',
      key: 'current_level',
    },
    {
      title: '当前经验',
      dataIndex: 'current_exp',
      key: 'current_exp',
    },
    {
      title: '总经验',
      dataIndex: 'total_exp',
      key: 'total_exp',
    },
    {
      title: '进度',
      key: 'progress',
      render: (_: any, record: UserAbilityLevel) => {
        // TODO: 获取下一级所需经验
        const nextLevelExp = 1000; // 临时值
        const progress = (record.current_exp / nextLevelExp) * 100;
        return <Progress percent={Math.min(progress, 100)} />;
      },
    },
  ];

  return (
    <div className="ability-levels">
      <Card title="我的能力等级">
        <Table
          columns={columns}
          dataSource={userLevels}
          loading={loading}
          rowKey="user_level_id"
        />
      </Card>
    </div>
  );
};


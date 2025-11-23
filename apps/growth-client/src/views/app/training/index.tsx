import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Row, Col, Spin, Typography, Button, Tag, Progress, Space } from 'antd';
import {
  PlayCircleOutlined,
  TrophyOutlined,
  FireOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { growthStore, TrainingType } from '@/stores/growth';
import { authStore } from '@/stores/auth';
import './Training.less';

const { Title, Text } = Typography;

/**
 * 能力训练页面
 * 展示各种训练场入口
 */
export const Training = observer((): React.JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {
    if (authStore.isAuthenticated) {
      growthStore.loadData();
    }
  }, [authStore.isAuthenticated]);

  const handleStartTraining = (type: TrainingType): void => {
    if (type === TrainingType.Memory) {
      navigate('/training/memory');
    } else {
      // TODO: 其他训练类型的页面
      console.log('开始训练:', type);
    }
  };

  const getTrainingStats = (relatedItems: string[]) => {
    const levels = relatedItems
      .map((itemId) => growthStore.getUserLevel(itemId))
      .filter((level): level is NonNullable<typeof level> => level !== null);

    if (levels.length === 0) {
      return {
        avgLevel: 0,
        totalExp: 0,
        maxLevel: 0,
      };
    }

    const avgLevel = levels.reduce((sum, level) => sum + level.current_level, 0) / levels.length;
    const totalExp = levels.reduce((sum, level) => sum + level.total_exp, 0);
    const maxLevel = Math.max(...levels.map((level) => level.current_level));

    return {
      avgLevel,
      totalExp,
      maxLevel,
    };
  };

  if (growthStore.loading) {
    return (
      <div className="training-loading">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="training">
      <div className="training-container">
        {/* 页面头部 */}
        <div className="training-header">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/dashboard')}
            className="back-button"
          >
            返回
          </Button>
          <div className="header-content">
            <Title level={2} className="page-title">
              能力训练场
            </Title>
            <Text className="page-subtitle">
              通过游戏化训练提升你的核心能力，每次训练都会获得经验值
            </Text>
          </div>
        </div>

        {/* 训练场列表 */}
        <Row gutter={[24, 24]} className="training-grid">
          {growthStore.trainingConfigs.map((config) => {
            const stats = getTrainingStats(config.relatedAbilityItems);
            const relatedItems = config.relatedAbilityItems
              .map((itemId) => {
                const item = growthStore.items.find((i) => i.item_id === itemId);
                const level = growthStore.getUserLevel(itemId);
                return { item, level };
              })
              .filter(({ item }) => item !== undefined);

            return (
              <Col xs={24} sm={12} lg={8} key={config.type}>
                <Card className="training-card" hoverable>
                  <div className="training-card-content">
                    <div className="training-icon-wrapper">
                      <div className="training-icon">{config.icon}</div>
                    </div>
                    <Title level={4} className="training-name">
                      {config.name}
                    </Title>
                    <Text className="training-description">{config.description}</Text>

                    {/* 关联能力 */}
                    {relatedItems.length > 0 && (
                      <div className="related-abilities">
                        <Text className="related-abilities-label">提升能力：</Text>
                        <div className="ability-tags">
                          {relatedItems.slice(0, 3).map(({ item, level }) => (
                            <Tag key={item?.item_id} className="ability-tag">
                              {item?.name} Lv.{level?.current_level || 0}
                            </Tag>
                          ))}
                          {relatedItems.length > 3 && (
                            <Tag className="ability-tag">+{relatedItems.length - 3}</Tag>
                          )}
                        </div>
                      </div>
                    )}

                    {/* 统计数据 */}
                    {stats.avgLevel > 0 && (
                      <div className="training-stats">
                        <div className="stat-item">
                          <TrophyOutlined className="stat-icon" />
                          <Text className="stat-text">平均等级: {stats.avgLevel.toFixed(1)}</Text>
                        </div>
                        <div className="stat-item">
                          <FireOutlined className="stat-icon" />
                          <Text className="stat-text">总经验: {stats.totalExp.toLocaleString()}</Text>
                        </div>
                      </div>
                    )}

                    {/* 开始训练按钮 */}
                    <Button
                      type="primary"
                      icon={<PlayCircleOutlined />}
                      className="start-training-button"
                      onClick={() => handleStartTraining(config.type)}
                      block
                    >
                      开始训练
                    </Button>
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>

        {/* 提示信息 */}
        <Card className="training-tips-card">
          <Title level={5} className="tips-title">
            💡 训练提示
          </Title>
          <ul className="tips-list">
            <li>每次训练完成后会根据表现获得经验值</li>
            <li>持续训练可以提升相关能力的等级</li>
            <li>建议每天进行 15-30 分钟的训练</li>
            <li>训练难度会随着能力等级提升而增加</li>
          </ul>
        </Card>
      </div>
    </div>
  );
});


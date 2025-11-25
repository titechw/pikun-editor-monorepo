import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Row, Col, Statistic, Spin, Progress, Typography, Button, Space } from 'antd';
import {
  TrophyOutlined,
  RocketOutlined,
  FireOutlined,
  BookOutlined,
  PlayCircleOutlined,
  ExperimentOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { growthStore } from '@/stores/growth';
import { authStore } from '@/stores/auth';
import './Dashboard.less';

const { Title, Text } = Typography;

/**
 * Dashboard 主页面
 * 展示个人能力概览、训练入口、知识学习入口
 */
export const Dashboard = observer((): React.JSX.Element => {
  const navigate = useNavigate();

  useEffect(() => {
    if (authStore.isAuthenticated) {
      growthStore.loadData();
    }
  }, [authStore.isAuthenticated]);

  const stats = growthStore.getAbilityStats();
  const abilityTree = growthStore.getAbilityTree();

  // 获取前 5 个最高等级的能力
  const topAbilities = [...growthStore.userLevels]
    .sort((a, b) => b.current_level - a.current_level)
    .slice(0, 5)
    .map((level) => {
      const item = growthStore.items.find((i) => i.item_id === level.item_id);
      return { level, item };
    })
    .filter(({ item }) => item !== undefined);

  if (growthStore.loading) {
    return (
      <div className="dashboard-loading">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* 欢迎区域 */}
        <div className="dashboard-header">
          <div className="welcome-section">
            <Title level={2} className="welcome-title">
              欢迎回来，{authStore.user?.name || '用户'} 👋
            </Title>
            <Text className="welcome-subtitle">
              继续你的成长之旅，提升各项能力，探索无限可能
            </Text>
          </div>
        </div>

        {/* 统计数据卡片 */}
        <Row gutter={[16, 16]} className="stats-row">
          <Col xs={24} sm={12} lg={6}>
            <Card className="stat-card">
              <Statistic
                title="总经验值"
                value={stats.totalExp}
                prefix={<FireOutlined />}
                valueStyle={{ color: '#ff6b6b' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="stat-card">
              <Statistic
                title="平均等级"
                value={stats.avgLevel.toFixed(1)}
                prefix={<TrophyOutlined />}
                valueStyle={{ color: '#ffd93d' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="stat-card">
              <Statistic
                title="最高等级"
                value={stats.maxLevel}
                prefix={<RocketOutlined />}
                suffix="级"
                valueStyle={{ color: '#6bcf7f' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="stat-card">
              <Statistic
                title="已解锁能力"
                value={stats.leveledAbilities}
                suffix={`/ ${stats.totalAbilities}`}
                prefix={<BookOutlined />}
                valueStyle={{ color: '#4d96ff' }}
              />
            </Card>
          </Col>
        </Row>

        {/* 快速入口 */}
        <Row gutter={[16, 16]} className="quick-actions-row">
          <Col xs={24} md={12}>
            <Card className="action-card training-card" hoverable onClick={() => navigate('/training')}>
              <div className="action-card-content">
                <div className="action-icon training-icon">
                  <PlayCircleOutlined />
                </div>
                <div className="action-info">
                  <Title level={4} className="action-title">
                    能力训练场
                  </Title>
                  <Text className="action-description">
                    通过游戏化训练提升记忆力、逻辑推理、反应速度等核心能力
                  </Text>
                  <Button type="primary" className="action-button" onClick={(e) => {
                    e.stopPropagation();
                    navigate('/training');
                  }}>
                    开始训练
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card className="action-card knowledge-card" hoverable onClick={() => navigate('/knowledge')}>
              <div className="action-card-content">
                <div className="action-icon knowledge-icon">
                  <ExperimentOutlined />
                </div>
                <div className="action-info">
                  <Title level={4} className="action-title">
                    技能知识库
                  </Title>
                  <Text className="action-description">
                    学习数学、音乐、化学等人类知识，全面提升技能水平
                  </Text>
                  <Button type="primary" className="action-button" onClick={(e) => {
                    e.stopPropagation();
                    navigate('/knowledge');
                  }}>
                    开始学习
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* 能力概览 */}
        <Card className="ability-overview-card" title="能力概览">
          {abilityTree.length === 0 ? (
            <div className="empty-state">
              <Text>暂无能力数据</Text>
            </div>
          ) : (
            <div className="ability-categories">
              {abilityTree.map(({ category, dimensions }) => {
                const categoryItems = dimensions.flatMap((d) => d.items);
                const categoryLevels = categoryItems
                  .map(({ userLevel }) => userLevel)
                  .filter((level): level is NonNullable<typeof level> => level !== null);
                const categoryAvgLevel = categoryLevels.length > 0
                  ? categoryLevels.reduce((sum, level) => sum + level.current_level, 0) / categoryLevels.length
                  : 0;
                const categoryTotalExp = categoryLevels.reduce((sum, level) => sum + level.total_exp, 0);

                return (
                  <Card key={category.category_id} className="category-card" size="small">
                    <div className="category-header">
                      <Title level={5} className="category-title">
                        {category.name}
                      </Title>
                      <Space>
                        <Text className="category-stat">平均等级: {categoryAvgLevel.toFixed(1)}</Text>
                        <Text className="category-stat">总经验: {categoryTotalExp.toLocaleString()}</Text>
                      </Space>
                    </div>
                    <div className="category-items">
                      {categoryItems.slice(0, 6).map(({ item, userLevel }) => {
                        const progress = userLevel
                          ? userLevel.next_level_required_exp
                            ? (userLevel.current_exp / userLevel.next_level_required_exp) * 100
                            : 100
                          : 0;

                        return (
                          <div key={item.item_id} className="ability-item">
                            <div className="ability-item-header">
                              <Text className="ability-item-name">{item.name}</Text>
                              <Text className="ability-item-level">
                                Lv.{userLevel?.current_level || 0}
                              </Text>
                            </div>
                            <Progress
                              percent={Math.min(progress, 100)}
                              showInfo={false}
                              strokeColor={{
                                '0%': '#667eea',
                                '100%': '#764ba2',
                              }}
                              className="ability-progress"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </Card>

        {/* 顶级能力 */}
        {topAbilities.length > 0 && (
          <Card className="top-abilities-card" title="我的顶级能力">
            <Row gutter={[16, 16]}>
              {topAbilities.map(({ level, item }, index) => {
                const progress = level.next_level_required_exp
                  ? (level.current_exp / level.next_level_required_exp) * 100
                  : 100;

                return (
                  <Col xs={24} sm={12} lg={8} key={level.item_id}>
                    <Card className="top-ability-card" size="small">
                      <div className="top-ability-header">
                        <div className="rank-badge">#{index + 1}</div>
                        <div className="top-ability-info">
                          <Text className="top-ability-name">{item?.name}</Text>
                          <Text className="top-ability-level">Lv.{level.current_level}</Text>
                        </div>
                      </div>
                      <Progress
                        percent={Math.min(progress, 100)}
                        strokeColor={{
                          '0%': '#667eea',
                          '100%': '#764ba2',
                        }}
                        format={() => `${level.current_exp} / ${level.next_level_required_exp || 0} EXP`}
                      />
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Card>
        )}
      </div>
    </div>
  );
});








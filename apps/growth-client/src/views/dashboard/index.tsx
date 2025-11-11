import React from 'react';
import { Card, Typography, Space, Row, Col, Statistic } from 'antd';
import { observer } from 'mobx-react-lite';
import {
  TrophyOutlined,
  BookOutlined,
  CheckCircleOutlined,
  FireOutlined,
} from '@ant-design/icons';
import { authStore } from '@/stores/auth';
import './Dashboard.less';

const { Title, Text } = Typography;

export const Dashboard = observer((): React.JSX.Element => {
  return (
    <div className="dashboard-container">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div className="dashboard-header">
          <Title level={2} className="dashboard-title">
            欢迎回来，{authStore.user?.name || '用户'}！
          </Title>
          <Text type="secondary" className="dashboard-subtitle">
            开始您的成长之旅
          </Text>
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="今日任务"
                value={0}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="进行中的 OKR"
                value={0}
                prefix={<TrophyOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="学习时长"
                value={0}
                suffix="分钟"
                prefix={<BookOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="连续学习"
                value={0}
                suffix="天"
                prefix={<FireOutlined />}
                valueStyle={{ color: '#fa541c' }}
              />
            </Card>
          </Col>
        </Row>

        <Card>
          <Title level={4}>快速开始</Title>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Text type="secondary">
              创建您的第一个 OKR 目标，开始规划您的成长路径。
            </Text>
          </Space>
        </Card>
      </Space>
    </div>
  );
});


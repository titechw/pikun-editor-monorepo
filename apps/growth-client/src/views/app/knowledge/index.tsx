import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Row, Col, Spin, Typography, Button, Tag, Empty } from 'antd';
import {
  BookOutlined,
  ExperimentOutlined,
  ArrowLeftOutlined,
  RocketOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { authStore } from '@/stores/auth';
import './Knowledge.less';

const { Title, Text } = Typography;

/**
 * 技能知识页面
 * 展示各种知识学习入口
 */
export const Knowledge = observer((): React.JSX.Element => {
  const navigate = useNavigate();

  // 知识分类（示例数据，后续可以从后端获取）
  const knowledgeCategories = [
    {
      id: 'math',
      name: '数学',
      icon: '🔢',
      description: '学习数学基础知识，提升逻辑思维和计算能力',
      color: '#667eea',
      subjects: ['代数', '几何', '微积分', '概率统计'],
    },
    {
      id: 'music',
      name: '音乐',
      icon: '🎵',
      description: '学习音乐理论，培养音乐素养和艺术感知',
      color: '#f093fb',
      subjects: ['乐理', '和声', '作曲', '音乐史'],
    },
    {
      id: 'chemistry',
      name: '化学',
      icon: '⚗️',
      description: '探索化学世界，理解物质变化和反应原理',
      color: '#4facfe',
      subjects: ['有机化学', '无机化学', '物理化学', '分析化学'],
    },
    {
      id: 'physics',
      name: '物理',
      icon: '⚛️',
      description: '学习物理规律，理解自然现象和科学原理',
      color: '#43e97b',
      subjects: ['力学', '电磁学', '热力学', '量子物理'],
    },
    {
      id: 'biology',
      name: '生物',
      icon: '🧬',
      description: '了解生命科学，探索生物多样性和生命机制',
      color: '#fa709a',
      subjects: ['细胞生物学', '遗传学', '生态学', '进化论'],
    },
    {
      id: 'literature',
      name: '文学',
      icon: '📚',
      description: '阅读经典文学，提升语言表达和人文素养',
      color: '#fee140',
      subjects: ['古典文学', '现代文学', '诗歌', '小说'],
    },
  ];

  const handleStartLearning = (categoryId: string): void => {
    // TODO: 跳转到具体的知识学习页面
    console.log('开始学习:', categoryId);
  };

  return (
    <div className="knowledge">
      <div className="knowledge-container">
        {/* 页面头部 */}
        <div className="knowledge-header">
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
              技能知识库
            </Title>
            <Text className="page-subtitle">
              学习人类知识，全面提升技能水平，每完成一个知识点都会获得经验值
            </Text>
          </div>
        </div>

        {/* 知识分类列表 */}
        <Row gutter={[24, 24]} className="knowledge-grid">
          {knowledgeCategories.map((category) => (
            <Col xs={24} sm={12} lg={8} key={category.id}>
              <Card className="knowledge-card" hoverable>
                <div className="knowledge-card-content">
                  <div className="knowledge-icon-wrapper">
                    <div
                      className="knowledge-icon"
                      style={{
                        background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 100%)`,
                      }}
                    >
                      {category.icon}
                    </div>
                  </div>
                  <Title level={4} className="knowledge-name">
                    {category.name}
                  </Title>
                  <Text className="knowledge-description">{category.description}</Text>

                  {/* 学科标签 */}
                  <div className="subject-tags">
                    {category.subjects.slice(0, 4).map((subject) => (
                      <Tag key={subject} className="subject-tag">
                        {subject}
                      </Tag>
                    ))}
                  </div>

                  {/* 开始学习按钮 */}
                  <Button
                    type="primary"
                    icon={<BookOutlined />}
                    className="start-learning-button"
                    onClick={() => handleStartLearning(category.id)}
                    block
                    style={{
                      background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 100%)`,
                      border: 'none',
                    }}
                  >
                    开始学习
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* 提示信息 */}
        <Card className="knowledge-tips-card">
          <Title level={5} className="tips-title">
            💡 学习提示
          </Title>
          <ul className="tips-list">
            <li>完成课程学习可以获得经验值，提升相关能力等级</li>
            <li>建议按照课程顺序系统学习，循序渐进</li>
            <li>完成练习和考试可以获得额外经验值奖励</li>
            <li>学习进度会自动保存，可以随时继续学习</li>
          </ul>
        </Card>
      </div>
    </div>
  );
});






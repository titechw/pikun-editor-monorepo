import React from 'react';
import { Layout, Typography, Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { useNavigate, useLocation } from 'react-router-dom';
import { authStore } from '@/stores/auth';
import './TestLayout.less';

const { Header, Content } = Layout;
const { Title } = Typography;

interface TestLayoutProps {
  children: React.ReactNode;
}

export const TestLayout = observer(({ children }: TestLayoutProps): React.JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    authStore.logout();
    navigate('/login');
  };

  return (
    <Layout className="test-layout">
      <Header className="test-header">
        <Title level={4} style={{ color: '#fff', margin: 0 }}>
          能力升级测试
        </Title>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Button 
            type="link" 
            onClick={() => navigate('/')} 
            style={{ color: '#fff', fontWeight: 500 }}
          >
            {authStore.user?.name || '用户'}
          </Button>
          <Button type="link" onClick={() => navigate('/experience')} style={{ color: '#fff' }}>
            经验测试
          </Button>
          <Button type="link" onClick={handleLogout} style={{ color: '#fff' }}>
            退出
          </Button>
        </div>
      </Header>
      <Content className="test-content">{children}</Content>
    </Layout>
  );
});


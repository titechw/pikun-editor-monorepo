import React, { useState } from 'react';
import { Layout, Menu, Button, Space, Avatar, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import {
  AppstoreOutlined,
  BarsOutlined,
  FileTextOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { adminAuthStore } from '@/stores/admin-auth';
import './AdminLayout.less';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = observer(({ children }: AdminLayoutProps): React.JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: '/categories',
      icon: <AppstoreOutlined />,
      label: '能力类别',
    },
    {
      key: '/dimensions',
      icon: <BarsOutlined />,
      label: '能力维度',
    },
    {
      key: '/items',
      icon: <FileTextOutlined />,
      label: '能力项',
    },
    {
      key: '/level-configs',
      icon: <SettingOutlined />,
      label: '等级配置',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const handleLogout = (): void => {
    adminAuthStore.logout();
    navigate('/login');
  };

  return (
    <Layout className="admin-layout">
      <Sider trigger={null} collapsible collapsed={collapsed} className="admin-sider">
        <div className="admin-logo">
          {!collapsed && <Text strong>能力模型管理</Text>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header className="admin-header">
          <Button
            type="text"
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 16, width: 64, height: 64 }}
          >
            {collapsed ? '☰' : '☰'}
          </Button>
          <div className="admin-header-right">
            <Space>
              <Avatar icon={<UserOutlined />} size="small" />
              <Text>{adminAuthStore.user?.name || '管理员'}</Text>
              <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout}>
                退出
              </Button>
            </Space>
          </div>
        </Header>
        <Content className="admin-content">{children}</Content>
      </Layout>
    </Layout>
  );
});


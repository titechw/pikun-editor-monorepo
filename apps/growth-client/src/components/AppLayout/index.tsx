import React from 'react';
import { Layout, Button, Space, Dropdown, Avatar, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import {
  MoonOutlined,
  SunOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { themeStore, ThemeMode } from '@/stores/theme';
import { authStore } from '@/stores/auth';
import { useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import './AppLayout.less';

const { Header, Content } = Layout;
const { Text } = Typography;

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = observer(({ children }: AppLayoutProps): React.JSX.Element => {
  const navigate = useNavigate();

  const handleToggleTheme = (): void => {
    const next = themeStore.mode === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark;
    themeStore.setMode(next);
  };

  const handleLogout = (): void => {
    authStore.logout();
    navigate('/login');
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: '个人资料',
      icon: <UserOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <div className="app-header-left">
          <Typography.Title level={4} className="app-title">
            成长规划平台
          </Typography.Title>
        </div>
        <div className="app-header-right">
          <Space size="middle">
            <Button
              type="text"
              icon={themeStore.mode === ThemeMode.Dark ? <SunOutlined /> : <MoonOutlined />}
              onClick={handleToggleTheme}
              className="app-theme-button"
            />
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space className="app-user-info" style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} size="small" />
                <Text className="app-user-name">{authStore.user?.name || '用户'}</Text>
              </Space>
            </Dropdown>
          </Space>
        </div>
      </Header>
      <Content className="app-content">{children}</Content>
    </Layout>
  );
});

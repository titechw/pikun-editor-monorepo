import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ConfigProvider, Spin } from 'antd';
import { theme } from 'antd';
import { authStore } from '@/stores/auth';
import { themeStore, ThemeMode } from '@/stores/theme';
import { Login } from '@/views/auth/Login';
import { Register } from '@/views/auth/Register';
import { Dashboard } from '@/views/dashboard';
import { AppLayout } from '@/components/AppLayout';

/**
 * 受保护的路由组件
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = observer(
  ({ children }) => {
    if (authStore.loading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spin size="large" />
        </div>
      );
    }

    if (!authStore.isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
  }
);

/**
 * 公共路由组件（已登录用户重定向到仪表盘）
 */
const PublicRoute: React.FC<{ children: React.ReactNode }> = observer(
  ({ children }) => {
    if (authStore.loading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spin size="large" />
        </div>
      );
    }

    if (authStore.isAuthenticated) {
      return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
  }
);


/**
 * 应用路由配置
 */
export const AppRouter = observer((): React.JSX.Element => {
  const algorithm =
    themeStore.mode === ThemeMode.Dark
      ? theme.darkAlgorithm
      : theme.defaultAlgorithm;

  return (
    <ConfigProvider
      theme={{
        algorithm,
        token: {
          colorPrimary: '#667eea',
          borderRadius: 8,
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
});


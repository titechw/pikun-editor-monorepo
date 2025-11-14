import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { AdminLayout } from '@/components/AdminLayout';
import { AdminLogin } from './login';
import { adminAuthStore } from '@/stores/admin-auth';
import { AbilityCategories } from './ability-categories';
import { AbilityDimensions } from './ability-dimensions';
import { AbilityItems } from './ability-items';
import { AbilityLevelConfigs } from './ability-level-configs';

/**
 * 受保护的管理端路由组件
 */
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = observer(({ children }) => {
  if (adminAuthStore.loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!adminAuthStore.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
});

/**
 * 管理端应用
 */
export const AdminApp = (): React.JSX.Element => {
  return (
    <ConfigProvider>
      <BrowserRouter basename="/admin">
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route
            path="/*"
            element={
              <ProtectedAdminRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="/" element={<Navigate to="/categories" replace />} />
                    <Route path="/categories" element={<AbilityCategories />} />
                    <Route path="/dimensions" element={<AbilityDimensions />} />
                    <Route path="/items" element={<AbilityItems />} />
                    <Route path="/level-configs" element={<AbilityLevelConfigs />} />
                  </Routes>
                </AdminLayout>
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};


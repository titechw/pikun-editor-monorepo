import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import { TestLayout } from '@/components/TestLayout';
import { TestLogin } from './login';
import { AbilityProfile } from './ability-profile';
import { ExperienceTest } from './experience-test';
import { authStore } from '@/stores/auth';

/**
 * 受保护的测试端路由组件
 */
const ProtectedTestRoute: React.FC<{ children: React.ReactNode }> = observer(({ children }) => {
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
});

/**
 * 测试端应用
 */
export const TestApp = (): React.JSX.Element => {
  return (
    <ConfigProvider>
      <BrowserRouter basename="/test">
        <Routes>
          <Route path="/login" element={<TestLogin />} />
          <Route
            path="/*"
            element={
              <ProtectedTestRoute>
                <TestLayout>
                  <Routes>
                    <Route path="/" element={<AbilityProfile />} />
                    <Route path="/profile" element={<AbilityProfile />} />
                    <Route path="/experience" element={<ExperienceTest />} />
                  </Routes>
                </TestLayout>
              </ProtectedTestRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};


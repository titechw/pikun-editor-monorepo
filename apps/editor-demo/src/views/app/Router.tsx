import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { authStore } from '../../stores/auth.store';
import { LoginPage } from '../auth/Login';
import { DocumentListPage } from '../documents/DocumentList';
import { DocumentEditorPage } from '../documents/DocumentEditor';
import { DocumentHistoryPage } from '../documents/DocumentHistory';

/**
 * 路由守卫组件
 */
const ProtectedRoute = observer(({ children }: { children: React.ReactNode }) => {
  if (!authStore.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
});

export const AppRouter = observer(() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <DocumentListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/documents/:objectId"
          element={
            <ProtectedRoute>
              <DocumentEditorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/documents/:objectId/history"
          element={
            <ProtectedRoute>
              <DocumentHistoryPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/documents" replace />} />
      </Routes>
    </BrowserRouter>
  );
});

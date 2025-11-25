import { adminApiClient, setAdminAuthToken, clearAdminAuthToken } from '@/utils/adminApiClient';
import type { User, LoginRequest, AuthResponse } from './auth.api';

/**
 * 管理端认证 API
 */
export const adminAuthApi = {
  /**
   * 管理员登录
   */
  async adminLogin(data: LoginRequest): Promise<AuthResponse> {
    const response = await adminApiClient.post<AuthResponse>('/admin/auth/login', data);
    if (response.data) {
      setAdminAuthToken(response.data.token);
      return response.data;
    }
    throw new Error('管理员登录失败');
  },

  /**
   * 获取当前管理员信息（验证 token）
   */
  async getMe(): Promise<User> {
    const response = await adminApiClient.get<User>('/admin/auth/me');
    if (!response.data) {
      throw new Error('获取用户信息失败');
    }
    return response.data;
  },

  /**
   * 登出
   */
  logout(): void {
    clearAdminAuthToken();
  },
};












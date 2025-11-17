import apiClient from '../utils/apiClient';

export interface User {
  uid: number;
  uuid: string;
  email: string;
  name: string;
  metadata?: Record<string, unknown>;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  defaultWorkspaceId?: string;
}

/**
 * 认证 API
 */
export const authApi = {
  /**
   * 用户注册
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    if (response.success && response.data) {
      apiClient.setToken(response.data.token);
      return response.data;
    }
    throw new Error(response.message || 'Registration failed');
  },

  /**
   * 用户登录
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    if (response.success && response.data) {
      apiClient.setToken(response.data.token);
      return response.data;
    }
    throw new Error(response.message || 'Login failed');
  },

  /**
   * 刷新 token
   */
  async refreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
    const response = await apiClient.post<{ token: string; refreshToken: string }>(
      '/auth/refresh',
      { refreshToken },
    );
    if (response.success && response.data) {
      apiClient.setToken(response.data.token);
      return response.data;
    }
    throw new Error(response.message || 'Token refresh failed');
  },

  /**
   * 验证 token
   */
  async verifyToken(): Promise<{ uid: number; uuid: string; is_new: boolean }> {
    const response = await apiClient.get<{ uid: number; uuid: string; is_new: boolean }>(
      '/auth/verify',
    );
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Token verification failed');
  },

  /**
   * 登出
   */
  logout(): void {
    apiClient.clearToken();
  },
};




import { apiClient, setAuthToken, clearAuthToken } from '@/utils/apiClient';

export interface User {
  uid: number;
  uuid: string;
  email: string;
  name: string;
  type?: 'admin' | 'user';
  metadata?: Record<string, unknown>;
  deleted_at?: Date | null;
  created_at?: Date;
  updated_at?: Date;
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
  defaultWorkspaceId: string;
}

export interface VerifyTokenResponse {
  uid: number;
  uuid: string;
  is_new: boolean;
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
    if (response.data) {
      setAuthToken(response.data.token);
      return response.data;
    }
    throw new Error('注册失败');
  },

  /**
   * 用户登录
   */
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
    if (response.data) {
      setAuthToken(response.data.token);
      return response.data;
    }
    throw new Error('登录失败');
  },

  /**
   * 管理员登录
   */
  async adminLogin(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/admin/auth/login', data);
    if (response.data) {
      setAuthToken(response.data.token);
      return response.data;
    }
    throw new Error('管理员登录失败');
  },

  /**
   * 刷新 token
   */
  async refreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
    const response = await apiClient.post<{ token: string; refreshToken: string }>(
      '/auth/refresh',
      { refreshToken },
    );
    if (response.data) {
      setAuthToken(response.data.token);
      return response.data;
    }
    throw new Error('刷新 token 失败');
  },

  /**
   * 验证 token
   */
  async verifyToken(): Promise<VerifyTokenResponse> {
    const response = await apiClient.get<VerifyTokenResponse>('/auth/verify');
    if (response.data) {
      return response.data;
    }
    throw new Error('验证 token 失败');
  },

  /**
   * 登出
   */
  logout(): void {
    clearAuthToken();
  },
};

import { makeAutoObservable, runInAction } from 'mobx';
import { authApi, User } from '@/api/auth.api';

export class AuthStore {
  user: User | null = null;
  loading = false;
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
    this.checkAuth();
  }

  /**
   * 检查认证状态
   */
  async checkAuth(): Promise<void> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.isAuthenticated = false;
      return;
    }

    try {
      this.loading = true;
      const result = await authApi.verifyToken();
      // 验证成功后，需要获取用户信息
      // 这里暂时使用 verifyToken 返回的信息，后续可以添加获取用户详情的接口
      runInAction(() => {
        // 注意：verifyToken 只返回 uid 和 uuid，不返回完整用户信息
        // 如果需要完整用户信息，需要调用其他接口或从已存储的信息中获取
        this.isAuthenticated = true;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.user = null;
        this.isAuthenticated = false;
        this.loading = false;
        authApi.logout();
      });
    }
  }

  /**
   * 登录
   */
  async login(email: string, password: string): Promise<void> {
    this.loading = true;
    try {
      const response = await authApi.login({ email, password });
      runInAction(() => {
        this.user = response.user;
        this.isAuthenticated = true;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      throw error;
    }
  }

  /**
   * 注册
   */
  async register(email: string, password: string, name: string): Promise<void> {
    this.loading = true;
    try {
      const response = await authApi.register({ email, password, name });
      runInAction(() => {
        this.user = response.user;
        this.isAuthenticated = true;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      throw error;
    }
  }

  /**
   * 登出
   */
  logout(): void {
    authApi.logout();
    this.user = null;
    this.isAuthenticated = false;
  }
}

export const authStore = new AuthStore();

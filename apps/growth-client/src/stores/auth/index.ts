import { makeAutoObservable, runInAction } from 'mobx';
import { authApi, User } from '@/api/auth.api';
import { AUTH_TOKEN_KEY } from '@/constants/auth';

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
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      this.isAuthenticated = false;
      return;
    }

    try {
      this.loading = true;
      // 先验证 token
      await authApi.verifyToken();
      // 验证成功后，获取用户信息
      const user = await authApi.getMe();
      runInAction(() => {
        this.user = user;
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

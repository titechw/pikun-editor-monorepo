import { makeAutoObservable, runInAction } from 'mobx';
import { adminAuthApi } from '@/api/admin-auth.api';
import type { User } from '@/api/auth.api';
import { ADMIN_AUTH_TOKEN_KEY } from '@/constants/auth';

/**
 * 管理端认证 Store
 */
export class AdminAuthStore {
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
    const token = localStorage.getItem(ADMIN_AUTH_TOKEN_KEY);
    if (!token) {
      runInAction(() => {
        this.isAuthenticated = false;
        this.user = null;
      });
      return;
    }

    try {
      // 暂时简单处理：如果有token就认为已登录
      // 后续可以添加API验证token并获取用户信息的逻辑
      runInAction(() => {
        this.isAuthenticated = true;
      });
    } catch (error) {
      runInAction(() => {
        this.isAuthenticated = false;
        this.user = null;
      });
      localStorage.removeItem(ADMIN_AUTH_TOKEN_KEY);
    }
  }

  /**
   * 管理员登录
   */
  async login(email: string, password: string): Promise<void> {
    this.loading = true;
    try {
      const response = await adminAuthApi.adminLogin({ email, password });
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
    adminAuthApi.logout();
    runInAction(() => {
      this.user = null;
      this.isAuthenticated = false;
    });
  }
}

export const adminAuthStore = new AdminAuthStore();


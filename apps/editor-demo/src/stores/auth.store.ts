import { makeAutoObservable, runInAction } from 'mobx';
import { authApi, type User, type AuthResponse } from '../api/auth.api';
import { workspaceApi } from '../api/workspace.api';

export class AuthStore {
  user: User | null = null;
  token: string | null = null;
  defaultWorkspaceId: string | null = null;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    // 从 localStorage 恢复用户信息
    this.loadFromStorage();
  }

  /**
   * 从 localStorage 加载用户信息
   */
  private loadFromStorage(): void {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('auth_user');
    const workspaceId = localStorage.getItem('default_workspace_id');
    if (token && userStr) {
      this.token = token;
      try {
        this.user = JSON.parse(userStr);
      } catch {
        // 忽略解析错误
      }
    }
    if (workspaceId) {
      this.defaultWorkspaceId = workspaceId;
    }
  }

  /**
   * 保存到 localStorage
   */
  private saveToStorage(): void {
    if (this.token) {
      localStorage.setItem('auth_token', this.token);
    }
    if (this.user) {
      localStorage.setItem('auth_user', JSON.stringify(this.user));
    }
    if (this.defaultWorkspaceId) {
      localStorage.setItem('default_workspace_id', this.defaultWorkspaceId);
    }
  }

  /**
   * 获取默认工作空间 ID（如果不存在则从服务器获取）
   */
  async getDefaultWorkspaceId(): Promise<string> {
    if (this.defaultWorkspaceId) {
      return this.defaultWorkspaceId;
    }

    try {
      const workspace = await workspaceApi.getDefaultWorkspace();
      runInAction(() => {
        this.defaultWorkspaceId = workspace.workspace_id;
        this.saveToStorage();
      });
      return workspace.workspace_id;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get default workspace';
      throw new Error(errorMessage);
    }
  }

  /**
   * 用户注册
   */
  async register(email: string, password: string, name: string): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const response: AuthResponse = await authApi.register({ email, password, name });
      runInAction(() => {
        this.user = response.user;
        this.token = response.token;
        // 如果注册时返回了 defaultWorkspaceId，使用它
        if (response.defaultWorkspaceId) {
          this.defaultWorkspaceId = response.defaultWorkspaceId;
        }
        this.isLoading = false;
        this.saveToStorage();
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      runInAction(() => {
        this.error = errorMessage;
        this.isLoading = false;
      });
      throw error;
    }
  }

  /**
   * 用户登录
   */
  async login(email: string, password: string): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const response: AuthResponse = await authApi.login({ email, password });
      runInAction(() => {
        this.user = response.user;
        this.token = response.token;
        // 登录后获取默认工作空间
        if (response.defaultWorkspaceId) {
          this.defaultWorkspaceId = response.defaultWorkspaceId;
        }
        this.isLoading = false;
        this.saveToStorage();
      });
      // 如果没有 defaultWorkspaceId，尝试从服务器获取
      if (!this.defaultWorkspaceId) {
        await this.getDefaultWorkspaceId();
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      runInAction(() => {
        this.error = errorMessage;
        this.isLoading = false;
      });
      throw error;
    }
  }

  /**
   * 用户登出
   */
  logout(): void {
    authApi.logout();
    runInAction(() => {
      this.user = null;
      this.token = null;
      this.defaultWorkspaceId = null;
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      localStorage.removeItem('default_workspace_id');
    });
  }

  /**
   * 验证 token
   */
  async verifyToken(): Promise<boolean> {
    try {
      const result = await authApi.verifyToken();
      runInAction(() => {
        // Token 有效，可以更新用户信息
        if (result.uid && this.user) {
          this.user.uid = result.uid;
          this.user.uuid = result.uuid;
        }
      });
      // 如果没有 defaultWorkspaceId，尝试获取
      if (!this.defaultWorkspaceId) {
        await this.getDefaultWorkspaceId();
      }
      return true;
    } catch {
      runInAction(() => {
        this.user = null;
        this.token = null;
        this.defaultWorkspaceId = null;
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        localStorage.removeItem('default_workspace_id');
      });
      return false;
    }
  }

  /**
   * 检查是否已登录
   */
  get isAuthenticated(): boolean {
    return !!this.user && !!this.token;
  }
}

// 创建单例
export const authStore = new AuthStore();

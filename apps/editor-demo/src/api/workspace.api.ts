import apiClient from '../utils/apiClient';

export interface Workspace {
  workspace_id: string;
  name: string;
  owner_uid: number;
  icon?: string | null;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

/**
 * 工作空间 API
 */
export const workspaceApi = {
  /**
   * 获取默认工作空间
   */
  async getDefaultWorkspace(): Promise<Workspace> {
    const response = await apiClient.get<Workspace>('/workspace/default');
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to get default workspace');
  },

  /**
   * 获取用户的所有工作空间
   */
  async getWorkspaces(): Promise<Workspace[]> {
    const response = await apiClient.get<Workspace[]>('/workspace');
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to get workspaces');
  },
};


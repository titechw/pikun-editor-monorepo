import { createHttpClient, ApiError, ErrorCode, HttpMethod } from '@pikun/tools';
import { AUTH_TOKEN_KEY } from '@/constants/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * 后端 API 响应格式
 */
interface ServerResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: unknown;
}

/**
 * 获取认证 token（C端用户）
 */
function getAuthToken(): string | undefined {
  return localStorage.getItem(AUTH_TOKEN_KEY) || undefined;
}

/**
 * 创建 HTTP 客户端实例（适配服务器响应格式）
 */
const baseClient = createHttpClient({
  baseURL: API_BASE_URL,
  timeoutMs: 30000,
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
  getAuthToken,
});

/**
 * 适配服务器响应格式的 API 客户端
 */
export const apiClient = {
  /**
   * GET 请求
   */
  async get<T = unknown>(url: string, query?: unknown, headers?: Record<string, string>) {
    try {
      // baseClient 返回的 data 是服务器原始响应
      const response = await baseClient.get<unknown>(url, query, headers);
      const serverResponse = response.data as ServerResponse<T>;

      if (!serverResponse || !serverResponse.success) {
        throw new ApiError(
          ErrorCode.Unknown,
          serverResponse?.message || '请求失败',
          response.status,
          serverResponse?.errors,
        );
      }

      return {
        ...response,
        data: serverResponse.data as T,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(ErrorCode.Unknown, '请求失败', undefined, error);
    }
  },

  /**
   * POST 请求
   */
  async post<T = unknown>(url: string, body?: unknown, headers?: Record<string, string>) {
    try {
      // baseClient 返回的 data 是服务器原始响应
      const response = await baseClient.post<unknown>(url, body, headers);
      const serverResponse = response.data as ServerResponse<T>;

      if (!serverResponse || !serverResponse.success) {
        throw new ApiError(
          ErrorCode.Unknown,
          serverResponse?.message || '请求失败',
          response.status,
          serverResponse?.errors,
        );
      }

      return {
        ...response,
        data: serverResponse.data as T,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(ErrorCode.Unknown, '请求失败', undefined, error);
    }
  },

  /**
   * PUT 请求
   */
  async put<T = unknown>(url: string, body?: unknown, headers?: Record<string, string>) {
    try {
      const response = await baseClient.request<unknown, unknown, unknown>({
        url,
        method: HttpMethod.PUT,
        body,
        headers,
      });
      const serverResponse = response.data as ServerResponse<T>;

      if (!serverResponse || !serverResponse.success) {
        throw new ApiError(
          ErrorCode.Unknown,
          serverResponse?.message || '请求失败',
          response.status,
          serverResponse?.errors,
        );
      }

      return {
        ...response,
        data: serverResponse.data as T,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(ErrorCode.Unknown, '请求失败', undefined, error);
    }
  },

  /**
   * DELETE 请求
   */
  async delete<T = unknown>(url: string, headers?: Record<string, string>) {
    try {
      const response = await baseClient.request<unknown>({
        url,
        method: HttpMethod.DELETE,
        headers,
      });
      const serverResponse = response.data as ServerResponse<T>;

      if (!serverResponse || !serverResponse.success) {
        throw new ApiError(
          ErrorCode.Unknown,
          serverResponse?.message || '请求失败',
          response.status,
          serverResponse?.errors,
        );
      }

      return {
        ...response,
        data: serverResponse.data as T,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(ErrorCode.Unknown, '请求失败', undefined, error);
    }
  },
};

/**
 * 设置认证 token（C端用户）
 */
export function setAuthToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

/**
 * 清除认证 token（C端用户）
 */
export function clearAuthToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

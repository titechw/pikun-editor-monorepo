import { createHttpClient, ApiError, ErrorCode, HttpMethod } from '@pikun/tools';
import { ADMIN_AUTH_TOKEN_KEY } from '@/constants/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * 后端 API 响应格式
 */
interface ServerResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: unknown;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
  };
}

/**
 * 获取管理端认证 token
 */
function getAdminAuthToken(): string | undefined {
  return localStorage.getItem(ADMIN_AUTH_TOKEN_KEY) || undefined;
}

/**
 * 创建管理端 HTTP 客户端实例（适配服务器响应格式）
 */
const baseClient = createHttpClient({
  baseURL: API_BASE_URL,
  timeoutMs: 30000,
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
  getAuthToken: getAdminAuthToken,
});

/**
 * 管理端 API 客户端
 */
export const adminApiClient = {
  /**
   * GET 请求
   */
  async get<T = unknown>(url: string, query?: unknown, headers?: Record<string, string>) {
    try {
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
        pagination: serverResponse.pagination,
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
        pagination: serverResponse.pagination,
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
        pagination: serverResponse.pagination,
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
        pagination: serverResponse.pagination,
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
 * 设置管理端认证 token
 */
export function setAdminAuthToken(token: string): void {
  localStorage.setItem(ADMIN_AUTH_TOKEN_KEY, token);
}

/**
 * 清除管理端认证 token
 */
export function clearAdminAuthToken(): void {
  localStorage.removeItem(ADMIN_AUTH_TOKEN_KEY);
}


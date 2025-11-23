import { useState } from 'react';

interface SubmitResultData {
  secretId: string;
  courseId: string;
  resultData: {
    correct: boolean;
    correctRate: number;
    score: number;
    timeSpent: number;
    userAnswer: any;
  };
}

interface SubmitResultResponse {
  success: boolean;
  data?: {
    expEarned: number;
    levelUp: boolean;
    newLevel?: number;
    message?: string;
  };
  message?: string;
}

/**
 * 游戏 API Hook
 * 用于与后端通信，提交游戏结果
 */
export const useGameAPI = () => {
  const [loading, setLoading] = useState(false);

  const submitResult = async (data: SubmitResultData): Promise<void> => {
    setLoading(true);
    try {
      // 从环境变量或配置获取 API 地址
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

      // 尝试从父窗口获取 token（如果是在 iframe 中）
      let authToken: string | null = null;
      try {
        if (window.parent !== window) {
          // 向父窗口请求 token
          window.parent.postMessage({ type: 'REQUEST_TOKEN' }, '*');
          
          // 监听父窗口返回的 token
          const tokenPromise = new Promise<string | null>((resolve) => {
            const handler = (event: MessageEvent) => {
              if (event.data.type === 'TOKEN_RESPONSE') {
                window.removeEventListener('message', handler);
                resolve(event.data.token);
              }
            };
            window.addEventListener('message', handler);
            // 5秒超时
            setTimeout(() => {
              window.removeEventListener('message', handler);
              resolve(null);
            }, 5000);
          });
          authToken = await tokenPromise;
        }
      } catch (error) {
        console.warn('无法从父窗口获取 token:', error);
      }

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      const response = await fetch(`${API_BASE_URL}/course/submit-game-result`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      const result: SubmitResultResponse = await response.json();

      if (!result.success) {
        throw new Error(result.message || '提交结果失败');
      }

      if (result.data?.levelUp) {
        // 通知父窗口（如果是在 iframe 中）
        if (window.parent !== window) {
          window.parent.postMessage(
            {
              type: 'GAME_RESULT',
              data: result.data,
            },
            '*'
          );
        }
      }
    } catch (error) {
      console.error('提交结果失败:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    submitResult,
    loading,
  };
};


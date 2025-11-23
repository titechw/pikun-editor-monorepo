import React, { useEffect, useRef } from 'react';
import { Card, Spin, message } from 'antd';
import type { Course } from '@/api/admin-course.api';
import './CourseGame.less';

interface CourseGameProps {
  course: Course;
}

/**
 * 课程游戏组件
 * 通过 iframe 加载游戏，并处理游戏与父窗口的通信
 */
export const CourseGame: React.FC<CourseGameProps> = ({ course }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // 监听来自游戏的消息
    const handleMessage = (event: MessageEvent): void => {
      // 验证消息来源（生产环境应该验证 origin）
      if (event.data.type === 'REQUEST_TOKEN') {
        // 游戏请求 token，发送 token 给游戏
        const token = localStorage.getItem('auth_token');
        if (iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.postMessage(
            {
              type: 'TOKEN_RESPONSE',
              token,
            },
            '*'
          );
        }
      } else if (event.data.type === 'GAME_RESULT') {
        // 游戏结果已提交
        message.success(
          event.data.data?.levelUp
            ? `恭喜升级到 ${event.data.data.newLevel} 级！获得 ${event.data.data.expEarned} 经验值`
            : `训练完成！获得 ${event.data.data?.expEarned || 0} 经验值`
        );
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  if (!course.course_url) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>该课程暂无游戏内容</p>
        </div>
      </Card>
    );
  }

  // 构建游戏 URL
  // 如果 course_url 已经包含参数，直接使用；否则添加 secretId 和 courseId
  const buildGameUrl = (): string => {
    if (!course.course_url) return '';
    
    // 如果 URL 已经包含参数，直接使用
    if (course.course_url.includes('?')) {
      return `${course.course_url}&secretId=${course.secret_id}&courseId=${course.course_id}`;
    }
    
    // 否则添加参数
    return `${course.course_url}?secretId=${course.secret_id}&courseId=${course.course_id}`;
  };

  const gameUrl = buildGameUrl();

  return (
    <div className="course-game">
      <iframe
        ref={iframeRef}
        src={gameUrl}
        width="100%"
        height="600px"
        frameBorder="0"
        allow="fullscreen"
        style={{ border: 'none', borderRadius: '8px' }}
      />
    </div>
  );
};


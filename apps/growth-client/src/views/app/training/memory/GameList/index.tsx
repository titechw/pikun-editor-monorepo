import React, { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Spin, Typography, Button, Select, Space, Empty, message } from 'antd';
import { ArrowLeftOutlined, FilterOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { courseApi, type Course } from '@/api/course.api';
import { growthStore } from '@/stores/growth';
import { GameCard } from '../GameCard';
import './GameList.less';

const { Title, Text } = Typography;
const { Option } = Select;

/**
 * 记忆训练游戏列表页面（基于课程管理数据）
 */
export const GameList = observer((): React.JSX.Element => {
  const navigate = useNavigate();
  const { abilityId } = useParams<{ abilityId: string }>();
  
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // 筛选状态
  const [filters, setFilters] = useState({
    abilityItemId: abilityId || undefined,
    difficultyLevel: undefined as number | undefined,
    courseSource: undefined as string | undefined,
  });

  useEffect(() => {
    // 确保能力项数据已加载
    if (growthStore.items.length === 0 && !growthStore.loading) {
      growthStore.loadData();
    }
  }, []);

  // 当 URL 中的 abilityId 变化时更新筛选
  useEffect(() => {
    if (abilityId) {
      setFilters(prev => ({ ...prev, abilityItemId: abilityId }));
    }
  }, [abilityId]);

  // 加载课程数据
  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      try {
        const response = await courseApi.getCourses({
          courseType: 'ability_training', // 只显示能力训练类型的课程
          abilityItemId: filters.abilityItemId,
          difficultyLevel: filters.difficultyLevel,
          courseSource: filters.courseSource,
          pageSize: 100, // 暂时加载所有
        });
        setCourses(response.courses || []);
        // 调试信息
        if (response.courses && response.courses.length === 0) {
          console.log('未找到符合条件的课程，筛选条件:', filters);
        }
      } catch (error) {
        console.error('加载课程失败:', error);
        message.error('加载课程失败，请稍后重试');
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [filters]);

  // 监听来自游戏的消息
  useEffect(() => {
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

  const handleGameClick = (course: Course): void => {
    if (course.course_url) {
      // 在当前页面内嵌 iframe，不跳转
      setSelectedCourse(course);
    } else {
      message.warning('该课程暂无游戏内容');
    }
  };

  const handleCloseGame = (): void => {
    setSelectedCourse(null);
  };

  const handleBack = (): void => {
    if (selectedCourse) {
      // 如果正在玩游戏，先关闭游戏
      handleCloseGame();
    } else {
      // 否则返回训练页面
      navigate('/training');
    }
  };

  // 构建游戏 URL
  const buildGameUrl = (course: Course): string => {
    if (!course.course_url) return '';
    
    // 如果 URL 已经包含参数，追加参数
    if (course.course_url.includes('?')) {
      return `${course.course_url}&secretId=${course.secret_id || ''}&courseId=${course.course_id}`;
    }
    
    // 否则添加参数
    return `${course.course_url}?secretId=${course.secret_id || ''}&courseId=${course.course_id}`;
  };

  // 获取当前用户在选定能力项上的等级（如果有选定）
  const getCurrentAbilityLevel = (): number | undefined => {
    if (!filters.abilityItemId) return undefined;
    const userLevel = growthStore.getUserLevel(filters.abilityItemId);
    return userLevel?.current_level;
  };

  const currentLevel = getCurrentAbilityLevel();

  // 根据 abilityId 获取能力项名称
  const getAbilityItemName = (): string => {
    if (filters.abilityItemId) {
      const item = growthStore.items.find(item => item.item_id === filters.abilityItemId);
      if (item) {
        return `${item.name}训练`;
      }
    }
    return '能力训练';
  };

  // 如果选中了课程，显示游戏 iframe
  if (selectedCourse) {
    const gameUrl = buildGameUrl(selectedCourse);
    
    return (
      <div className="game-list">
        <div className="game-list-container">
          {/* 游戏头部 */}
          <div className="game-list-header">
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={handleCloseGame}
              className="back-button"
            >
              返回课程列表
            </Button>
            <div className="header-content">
              <Title level={2} className="page-title">
                {selectedCourse.name}
              </Title>
              <Text className="page-subtitle">
                正在训练中...
              </Text>
            </div>
          </div>

          {/* 游戏 iframe */}
          <div className="game-iframe-container">
            <div className="game-iframe-wrapper">
              <iframe
                ref={iframeRef}
                src={gameUrl}
                className="game-iframe"
                allow="fullscreen"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-list">
      <div className="game-list-container">
        {/* 页面头部 */}
        <div className="game-list-header">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
            className="back-button"
          >
            返回
          </Button>
          <div className="header-content">
            <Title level={2} className="page-title">
              {getAbilityItemName()}
            </Title>
            <Text className="page-subtitle">
              选择训练课程，提升{getAbilityItemName().replace('训练', '')}能力
            </Text>
          </div>
        </div>

        {/* 筛选区域 */}
        <div className="filter-section">
          <Space wrap>
            <Space>
              <FilterOutlined style={{ color: '#fff' }} />
              <Text strong style={{ color: '#fff' }}>筛选：</Text>
            </Space>
            
            <Select
              placeholder="关联能力项"
              style={{ width: 200 }}
              allowClear
              value={filters.abilityItemId}
              onChange={(value) => setFilters(prev => ({ ...prev, abilityItemId: value }))}
              showSearch
              optionFilterProp="children"
              className="filter-select"
            >
              {growthStore.items.map(item => (
                <Option key={item.item_id} value={item.item_id}>{item.name}</Option>
              ))}
            </Select>

            <Select
              placeholder="难度等级"
              style={{ width: 120 }}
              allowClear
              value={filters.difficultyLevel}
              onChange={(value) => setFilters(prev => ({ ...prev, difficultyLevel: value }))}
              className="filter-select"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(level => (
                <Option key={level} value={level}>Lv.{level}</Option>
              ))}
            </Select>

            <Select
              placeholder="课程来源"
              style={{ width: 120 }}
              allowClear
              value={filters.courseSource}
              onChange={(value) => setFilters(prev => ({ ...prev, courseSource: value }))}
              className="filter-select"
            >
              <Option value="official">官方课程</Option>
              <Option value="third_party">三方作者</Option>
            </Select>
          </Space>
        </div>

        {/* 游戏列表 */}
        {loading ? (
          <div className="game-list-loading">
            <Spin size="large" />
          </div>
        ) : (
          <div className="game-list-grid">
            {courses.map((course) => (
              <GameCard
                key={course.course_id}
                course={course}
                onClick={handleGameClick}
              />
            ))}
          </div>
        )}

        {!loading && courses.length === 0 && (
          <Empty description="暂无符合条件的训练课程" />
        )}
      </div>
    </div>
  );
});


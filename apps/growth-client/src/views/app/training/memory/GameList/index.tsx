import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Spin, Typography, Button, Select, Space, Empty } from 'antd';
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
  
  // 筛选状态
  const [filters, setFilters] = useState({
    abilityItemId: abilityId || undefined,
    difficultyLevel: undefined as number | undefined,
    courseSource: undefined as string | undefined,
  });

  useEffect(() => {
    if (growthStore.items.length === 0) {
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
        setCourses(response.courses);
      } catch (error) {
        console.error('加载课程失败:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [filters]);

  const handleGameClick = (course: Course): void => {
    if (course.course_url) {
      // 如果有 URL，判断是内部还是外部
      if (course.course_url.startsWith('http')) {
        window.open(course.course_url, '_blank');
      } else {
        navigate(course.course_url);
      }
    } else {
      // 默认逻辑：尝试进入 /training/memory/game/:code
      // 这里假设 code 对应旧的游戏 ID 或者我们有某种映射
      // 如果是迁移的旧游戏，course.code 可能就是 game.code
      // 暂时不做假设，如果没有 URL 就不跳转或者提示
      console.warn('No course URL provided');
    }
  };

  const handleBack = (): void => {
    navigate('/training');
  };

  // 获取当前用户在选定能力项上的等级（如果有选定）
  const getCurrentAbilityLevel = (): number | undefined => {
    if (!filters.abilityItemId) return undefined;
    const userLevel = growthStore.getUserLevel(filters.abilityItemId);
    return userLevel?.current_level;
  };

  const currentLevel = getCurrentAbilityLevel();

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
              记忆力训练
            </Title>
            <Text className="page-subtitle">
              选择训练课程，提升记忆能力
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


import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Spin, Input, Tag, Empty, message, Progress } from 'antd';
import {
  ArrowLeftOutlined,
  PlayCircleOutlined,
  FileTextOutlined,
  VideoCameraOutlined,
  ExperimentOutlined,
  BookOutlined,
  TrophyOutlined,
  MessageOutlined,
  SaveOutlined,
  EditOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  StarOutlined,
  FireOutlined,
} from '@ant-design/icons';
import { learningStore } from '@/stores/learning';
import { growthStore } from '@/stores/growth';
import type { LearningResource, ResourceType } from '@/api/learning.api';
import './LearningWorkspace.less';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

/**
 * 获取资源类型图标
 */
const getResourceTypeIcon = (type: ResourceType): React.ReactNode => {
  switch (type) {
    case 'video':
      return <VideoCameraOutlined />;
    case 'document':
    case 'pdf':
      return <FileTextOutlined />;
    case 'game':
      return <PlayCircleOutlined />;
    case 'experiment':
      return <ExperimentOutlined />;
    case 'book':
      return <BookOutlined />;
    default:
      return <FileTextOutlined />;
  }
};

/**
 * 获取资源类型标签颜色
 */
const getResourceTypeColor = (type: ResourceType): string => {
  switch (type) {
    case 'video':
      return '#ff4d4f';
    case 'document':
    case 'pdf':
      return '#1890ff';
    case 'game':
      return '#52c41a';
    case 'experiment':
      return '#faad14';
    case 'book':
      return '#722ed1';
    default:
      return '#8c8c8c';
  }
};

/**
 * 学习工作台组件
 */
export const LearningWorkspace = observer((): React.JSX.Element => {
  const { pointId } = useParams<{ pointId: string }>();
  const navigate = useNavigate();
  const [noteContent, setNoteContent] = useState('');
  const [selectedAbilities, setSelectedAbilities] = useState<string[]>([]);
  const [currentResourceIndex, setCurrentResourceIndex] = useState(0);

  useEffect(() => {
    if (pointId) {
      learningStore.loadWorkspace(pointId);
    }

    return () => {
      learningStore.reset();
    };
  }, [pointId]);

  useEffect(() => {
    if (growthStore.items.length === 0) {
      growthStore.loadData();
    }
  }, []);

  useEffect(() => {
    if (learningStore.resources.length > 0 && learningStore.currentResource) {
      const index = learningStore.resources.findIndex(
        (r) => r.resource_id === learningStore.currentResource?.resource_id,
      );
      if (index >= 0) {
        setCurrentResourceIndex(index);
      }
    }
  }, [learningStore.currentResource, learningStore.resources]);

  const handleResourceClick = (resource: LearningResource, index: number): void => {
    if (learningStore.currentPointId) {
      learningStore.switchResource(resource.resource_id);
      setCurrentResourceIndex(index);
    }
  };

  const handleSaveNote = (): void => {
    if (!noteContent.trim()) {
      message.warning('请输入笔记内容');
      return;
    }

    learningStore.saveNote(noteContent, selectedAbilities);
    setNoteContent('');
    setSelectedAbilities([]);
  };

  const handleAbilityToggle = (abilityId: string): void => {
    setSelectedAbilities((prev) =>
      prev.includes(abilityId) ? prev.filter((id) => id !== abilityId) : [...prev, abilityId],
    );
  };

  const handleGoToTraining = (): void => {
    if (learningStore.workspaceData?.knowledge_point.required_abilities.length) {
      const abilityId = learningStore.workspaceData.knowledge_point.required_abilities[0];
      navigate(`/training/memory/${abilityId}`);
    } else {
      message.info('该知识点暂无相关训练');
    }
  };

  const handleGoToExam = (): void => {
    message.info('考试功能开发中');
  };

  // 计算学习进度
  const calculateProgress = (): number => {
    if (learningStore.resources.length === 0) return 0;
    return ((currentResourceIndex + 1) / learningStore.resources.length) * 100;
  };

  if (learningStore.loading) {
    return (
      <div className="learning-workspace-loading">
        <Spin size="large" />
        <Text className="loading-text">加载学习内容中...</Text>
      </div>
    );
  }

  if (!learningStore.workspaceData) {
    return (
      <div className="learning-workspace-empty">
        <Empty description="未找到学习内容" />
      </div>
    );
  }

  const { knowledge_point, current_resource, resources, notes, comments, related_resources } =
    learningStore.workspaceData;

  const progress = calculateProgress();

  return (
    <div className="learning-workspace">
      <div className="learning-workspace-container">
        {/* 顶部导航栏 */}
        <div className="workspace-header">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            className="back-button"
          >
            返回
          </Button>
          <div className="header-content">
            <Title level={2} className="workspace-title">
              {knowledge_point.name}
            </Title>
            <Text className="workspace-subtitle">
              {knowledge_point.description || '开始你的学习之旅'}
            </Text>
          </div>
        </div>

        {/* 知识点信息卡片 */}
        <div className="knowledge-point-card">
          <div className="point-header">
            <div className="point-info">
              <div className="point-meta">
                <Tag color="blue" className="meta-tag">
                  <TrophyOutlined /> 难度等级: Lv.{knowledge_point.difficulty_level}
                </Tag>
                {knowledge_point.estimated_hours && (
                  <Tag color="green" className="meta-tag">
                    <ClockCircleOutlined /> 预计时长: {knowledge_point.estimated_hours}小时
                  </Tag>
                )}
                <Tag color="purple" className="meta-tag">
                  <FireOutlined /> {resources.length} 个学习资源
                </Tag>
              </div>
              <div className="required-abilities">
                <Text className="abilities-label">所需能力:</Text>
                <div className="abilities-tags">
                  {knowledge_point.required_abilities.map((abilityId) => {
                    const ability = growthStore.items.find((item) => item.item_id === abilityId);
                    return ability ? (
                      <Tag key={abilityId} color="purple" className="ability-tag">
                        {ability.name}
                      </Tag>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
            <div className="progress-section">
              <Text className="progress-label">学习进度</Text>
              <Progress
                percent={Math.round(progress)}
                strokeColor={{
                  '0%': '#667eea',
                  '100%': '#764ba2',
                }}
                className="progress-bar"
              />
              <Text className="progress-text">
                {currentResourceIndex + 1} / {resources.length}
              </Text>
            </div>
          </div>
        </div>

        {/* 主内容区：左右布局 */}
        <div className="workspace-content">
          {/* 左侧学习区 */}
          <div className="learning-area">
            {/* 内容展示区 + 资源列表 */}
            <div className="content-section">
              {/* 左侧：当前学习内容 */}
              <div className="content-display">
                {current_resource ? (
                  <div className="current-resource">
                    <div className="resource-header">
                      <div
                        className="resource-type-badge"
                        style={{ background: getResourceTypeColor(current_resource.type) }}
                      >
                        <div className="resource-type-icon">
                          {getResourceTypeIcon(current_resource.type)}
                        </div>
                      </div>
                      <div className="resource-info">
                        <Title level={4} className="resource-title">
                          {current_resource.name}
                        </Title>
                        <Text type="secondary" className="resource-intro">
                          {current_resource.introduction}
                        </Text>
                        <div className="resource-meta">
                          <Tag
                            color={
                              current_resource.creator_type === 'official' ? 'green' : 'orange'
                            }
                            className="creator-tag"
                          >
                            {current_resource.creator_name}
                          </Tag>
                          {current_resource.duration_minutes && (
                            <Text type="secondary" className="duration-text">
                              <ClockCircleOutlined /> {current_resource.duration_minutes}分钟
                            </Text>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="resource-content">
                      {current_resource.type === 'video' ? (
                        <div className="video-player">
                          <iframe
                            src={current_resource.content_url || ''}
                            title={current_resource.name}
                            className="video-iframe"
                            allowFullScreen
                          />
                        </div>
                      ) : current_resource.type === 'document' ||
                        current_resource.type === 'pdf' ? (
                        <div className="document-viewer">
                          <iframe
                            src={current_resource.content_url || ''}
                            title={current_resource.name}
                            className="document-iframe"
                          />
                        </div>
                      ) : current_resource.type === 'game' ? (
                        <div className="game-container">
                          <iframe
                            src={current_resource.content_url || ''}
                            title={current_resource.name}
                            className="game-iframe"
                          />
                        </div>
                      ) : (
                        <div className="resource-placeholder">
                          <div
                            className="placeholder-icon"
                            style={{ color: getResourceTypeColor(current_resource.type) }}
                          >
                            {getResourceTypeIcon(current_resource.type)}
                          </div>
                          <Text type="secondary" className="placeholder-text">
                            资源类型: {current_resource.type}
                          </Text>
                          {current_resource.content_url && (
                            <Button
                              type="primary"
                              href={current_resource.content_url}
                              target="_blank"
                              className="open-resource-button"
                            >
                              打开资源
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="empty-resource">
                    <Empty description="请选择学习资源" />
                  </div>
                )}
              </div>

              {/* 右侧：资源列表（学习顺序） */}
              <div className="resource-list">
                <div className="resource-list-header">
                  <Title level={5} className="resource-list-title">
                    <StarOutlined /> 学习顺序
                  </Title>
                  <Text className="resource-list-subtitle">按顺序完成学习，获得最佳效果</Text>
                </div>
                <div className="resource-items">
                  {resources.map((resource, index) => {
                    const isActive = current_resource?.resource_id === resource.resource_id;
                    const isCompleted = index < currentResourceIndex;
                    return (
                      <div
                        key={resource.resource_id}
                        className={`resource-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                        onClick={() => handleResourceClick(resource, index)}
                      >
                        <div className="resource-item-left">
                          <div
                            className={`resource-item-number ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                          >
                            {isCompleted ? <CheckCircleOutlined /> : index + 1}
                          </div>
                          <div
                            className="resource-item-icon"
                            style={{ color: getResourceTypeColor(resource.type) }}
                          >
                            {getResourceTypeIcon(resource.type)}
                          </div>
                        </div>
                        <div className="resource-item-content">
                          <Text className={`resource-item-name ${isActive ? 'active' : ''}`}>
                            {resource.name}
                          </Text>
                          {resource.duration_minutes && (
                            <Text type="secondary" className="resource-item-duration">
                              <ClockCircleOutlined /> {resource.duration_minutes}分钟
                            </Text>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 操作栏 */}
            <div className="action-bar">
              <Button
                type="primary"
                icon={<TrophyOutlined />}
                onClick={handleGoToTraining}
                className="action-button training-button"
              >
                开始训练
              </Button>
              <Button
                icon={<EditOutlined />}
                onClick={handleGoToExam}
                className="action-button exam-button"
              >
                开始考试
              </Button>
            </div>

            {/* 评论区 */}
            <div className="comments-section">
              <div className="section-header">
                <Title level={5} className="section-title">
                  <MessageOutlined /> 评论区
                </Title>
                <Text className="section-subtitle">与其他学习者交流讨论</Text>
              </div>
              <div className="comments-list">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.comment_id} className="comment-item">
                      <div className="comment-header">
                        <div className="comment-avatar">
                          {comment.user_name.charAt(0).toUpperCase()}
                        </div>
                        <div className="comment-info">
                          <Text strong className="comment-author">
                            {comment.user_name}
                          </Text>
                          <Text type="secondary" className="comment-time">
                            {new Date(comment.created_at).toLocaleDateString('zh-CN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </Text>
                        </div>
                      </div>
                      <Paragraph className="comment-content">{comment.content}</Paragraph>
                    </div>
                  ))
                ) : (
                  <Empty description="暂无评论，快来发表第一条评论吧！" />
                )}
              </div>
            </div>

            {/* 相关资源区 */}
            {related_resources.length > 0 && (
              <div className="related-resources-section">
                <div className="section-header">
                  <Title level={5} className="section-title">
                    相关资源
                  </Title>
                  <Text className="section-subtitle">扩展学习，加深理解</Text>
                </div>
                <div className="related-resources-list">
                  {related_resources.map((resource) => (
                    <div key={resource.resource_id} className="related-resource-item">
                      <div
                        className="related-resource-icon"
                        style={{ color: getResourceTypeColor(resource.type) }}
                      >
                        {getResourceTypeIcon(resource.type)}
                      </div>
                      <div className="related-resource-content">
                        <Text className="related-resource-name">{resource.name}</Text>
                        <Text type="secondary" className="related-resource-intro">
                          {resource.introduction}
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 右侧笔记区 */}
          <div className="notes-area">
            <div className="notes-header">
              <Title level={5} className="notes-title">
                学习笔记
              </Title>
              <Text className="notes-subtitle">记录学习心得，关联能力标签</Text>
            </div>

            {/* 笔记编辑器 */}
            <div className="note-editor">
              <TextArea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="记录你的学习笔记..."
                rows={6}
                className="note-textarea"
              />
              <div className="note-abilities">
                <Text className="abilities-label">关联能力:</Text>
                <div className="abilities-tags">
                  {growthStore.items
                    .filter((item) => knowledge_point.required_abilities.includes(item.item_id))
                    .map((item) => (
                      <Tag
                        key={item.item_id}
                        color={selectedAbilities.includes(item.item_id) ? 'blue' : 'default'}
                        onClick={() => handleAbilityToggle(item.item_id)}
                        className="ability-tag clickable"
                      >
                        {item.name}
                      </Tag>
                    ))}
                </div>
              </div>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={handleSaveNote}
                disabled={!noteContent.trim()}
                className="save-note-button"
              >
                保存笔记
              </Button>
            </div>

            {/* 笔记列表 */}
            <div className="notes-list">
              <Title level={5} className="notes-list-title">
                我的笔记 ({notes.length})
              </Title>
              {notes.length > 0 ? (
                <div className="notes-items">
                  {notes.map((note) => (
                    <div key={note.note_id} className="note-item">
                      <Paragraph className="note-content">{note.content}</Paragraph>
                      <div className="note-meta">
                        <div className="note-abilities-tags">
                          {note.related_abilities.map((abilityId) => {
                            const ability = growthStore.items.find(
                              (item) => item.item_id === abilityId,
                            );
                            return ability ? (
                              <Tag key={abilityId} color="purple" className="note-ability-tag">
                                {ability.name}
                              </Tag>
                            ) : null;
                          })}
                        </div>
                        <Text type="secondary" className="note-time">
                          {new Date(note.created_at).toLocaleString('zh-CN')}
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Empty description="暂无笔记，开始记录你的学习心得吧！" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

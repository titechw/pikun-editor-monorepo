import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams, useNavigate } from 'react-router-dom';
import { List, Card, Button, Tag, message, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { documentStore } from '../../stores/document.store';
import { authStore } from '../../stores/auth.store';
import './DocumentHistory.less';

export const DocumentHistoryPage = observer(() => {
  const { objectId } = useParams<{ objectId: string }>();
  const navigate = useNavigate();
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);

  useEffect(() => {
    if (!authStore.isAuthenticated) {
      navigate('/login');
      return;
    }

    const initWorkspace = async () => {
      try {
        const id = await authStore.getDefaultWorkspaceId();
        setWorkspaceId(id);
      } catch (error: any) {
        message.error(error.message || '获取工作空间失败');
      }
    };

    initWorkspace();
  }, [navigate]);

  useEffect(() => {
    if (objectId && workspaceId) {
      loadSnapshots();
    }
  }, [objectId, workspaceId]);

  const loadSnapshots = async () => {
    if (!objectId || !workspaceId) return;
    try {
      await documentStore.loadSnapshots(workspaceId, objectId);
    } catch (error: any) {
      message.error(error.message || '加载历史记录失败');
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('zh-CN');
  };

  return (
    <div className="document-history-page">
      <Card
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>文档历史记录</span>
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(`/documents/${objectId}`)}>
              返回文档
            </Button>
          </div>
        }
      >
        <List
          loading={documentStore.isLoadingSnapshots}
          dataSource={documentStore.snapshots}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Space>
                    <span>快照 {item.snapshot_id.slice(0, 8)}</span>
                    <Tag>{formatDate(item.created_at)}</Tag>
                  </Space>
                }
                description={`创建时间: ${formatDate(item.created_at)}`}
              />
              <Button
                onClick={() => {
                  // TODO: 实现恢复到该版本的功能
                  message.info('恢复功能待实现');
                }}
              >
                恢复到此版本
              </Button>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
});


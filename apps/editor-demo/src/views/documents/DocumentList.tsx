import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Table, Button, Input, Space, Popconfirm, message, Card, Tag } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  HistoryOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { documentStore } from '../../stores/document.store';
import { authStore } from '../../stores/auth.store';
import { useNavigate } from 'react-router-dom';
import type { Document } from '../../api/document.api';
import './DocumentList.less';

export const DocumentListPage = observer(() => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);

  useEffect(() => {
    // 检查登录状态
    if (!authStore.isAuthenticated) {
      navigate('/login');
      return;
    }

    // 获取默认工作空间 ID
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
    if (workspaceId) {
      loadDocuments();
    }
  }, [workspaceId]);

  const loadDocuments = async () => {
    if (!workspaceId) return;
    try {
      await documentStore.loadDocuments(workspaceId);
    } catch (error: any) {
      message.error(error.message || '加载文档列表失败');
    }
  };

  const handleCreate = async () => {
    if (!workspaceId) {
      message.error('工作空间未初始化');
      return;
    }
    try {
      const objectId = await documentStore.createDocument(workspaceId, '新文档');
      navigate(`/documents/${objectId}`);
    } catch (error: any) {
      message.error(error.message || '创建文档失败');
    }
  };

  const handleEdit = (document: Document) => {
    navigate(`/documents/${document.object_id}`);
  };

  const handleDelete = async (objectId: string) => {
    if (!workspaceId) {
      message.error('工作空间未初始化');
      return;
    }
    try {
      await documentStore.deleteDocument(workspaceId, objectId);
      message.success('删除成功');
    } catch (error: any) {
      message.error(error.message || '删除失败');
    }
  };

  const handleSearch = async () => {
    if (!workspaceId) {
      message.error('工作空间未初始化');
      return;
    }
    if (!searchText.trim()) {
      loadDocuments();
      return;
    }
    try {
      const results = await documentStore.searchDocuments(workspaceId, searchText);
      // 这里可以显示搜索结果
      message.info(`找到 ${results.length} 个结果`);
    } catch (error: any) {
      message.error(error.message || '搜索失败');
    }
  };

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: '大小',
      dataIndex: 'content_length',
      key: 'content_length',
      width: 100,
      render: (size: number) => {
        if (size < 1024) return `${size} B`;
        if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
        return `${(size / (1024 * 1024)).toFixed(2)} MB`;
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: 180,
      render: (date: string) => new Date(date).toLocaleString('zh-CN'),
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_: any, record: Document) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button
            type="link"
            icon={<HistoryOutlined />}
            onClick={() => navigate(`/documents/${record.object_id}/history`)}
          >
            历史
          </Button>
          <Popconfirm
            title="确定要删除这个文档吗？"
            onConfirm={() => handleDelete(record.object_id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="document-list-page">
      <Card>
        <div className="toolbar">
          <Space>
            <Input
              placeholder="搜索文档..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={handleSearch}
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
            />
            <Button onClick={handleSearch}>搜索</Button>
          </Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            新建文档
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={documentStore.documents}
          rowKey="object_id"
          loading={documentStore.isLoading}
          pagination={{
            current: documentStore.page,
            pageSize: documentStore.pageSize,
            total: documentStore.total,
            onChange: (page, pageSize) => {
              documentStore.setPagination(page, pageSize);
              loadDocuments();
            },
          }}
        />
      </Card>
    </div>
  );
});

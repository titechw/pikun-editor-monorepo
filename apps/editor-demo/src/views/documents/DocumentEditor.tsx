import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams, useNavigate } from 'react-router-dom';
import { TiptapCollabProvider } from '@hocuspocus/provider';
import * as Y from 'yjs';
import { Button, Input, message, Space, Tag } from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { documentStore } from '../../stores/document.store';
import { authStore } from '../../stores/auth.store';
import { Editor } from '../editor/Editor';
import type { Document } from '../../api/document.api';
import './DocumentEditor.less';

export const DocumentEditorPage = observer(() => {
  const { objectId } = useParams<{ objectId: string }>();
  const navigate = useNavigate();
  const [ydoc, setYdoc] = useState<Y.Doc | null>(null);
  const [provider, setProvider] = useState<TiptapCollabProvider | null>(null);
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [titleValue, setTitleValue] = useState<string>(''); // 本地标题状态

  // 初始化 Yjs 文档和 Provider
  useEffect(() => {
    if (!objectId) return;

    // 创建 Yjs 文档
    const newYdoc = new Y.Doc();
    setYdoc(newYdoc);

    // 创建 Provider
    const room = `document.${objectId}`;
    const newProvider = new TiptapCollabProvider({
      appId: 'pikun-editor',
      name: room,
      document: newYdoc,
    });
    setProvider(newProvider);

    return () => {
      // 清理
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
        saveTimerRef.current = null;
      }
      if (newProvider) {
        newProvider.destroy();
      }
      if (newYdoc) {
        newYdoc.destroy();
      }
      setProvider(null);
      setYdoc(null);
    };
  }, [objectId]);

  // 获取工作空间 ID
  useEffect(() => {
    if (!authStore.isAuthenticated) {
      navigate('/login');
      return;
    }

    const initWorkspace = async () => {
      try {
        const id = await authStore.getDefaultWorkspaceId();
        setWorkspaceId(id);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : '获取工作空间失败';
        message.error(errorMessage);
      }
    };

    initWorkspace();
  }, [navigate]);

  // 加载文档内容到 Yjs
  useEffect(() => {
    if (!objectId || !ydoc || !provider || !workspaceId) return;

    const loadDocument = async () => {
      try {
        await documentStore.loadDocument(workspaceId, objectId, true);
        const doc = documentStore.currentDocument as Document & { content?: string };
        // 更新本地标题状态
        if (doc?.title) {
          setTitleValue(doc.title);
        }
        if (doc && doc.content && ydoc) {
          // 如果有内容，需要解码并加载到 Yjs
          try {
            const binaryString = atob(doc.content);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }
            // 应用到 Yjs 文档
            Y.applyUpdate(ydoc, bytes);
          } catch (error) {
            console.error('Failed to decode document content:', error);
          }
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : '加载文档失败';
        message.error(errorMessage);
      }
    };

    loadDocument();
  }, [objectId, ydoc, provider, workspaceId]);

  // 同步文档标题变化到本地状态
  useEffect(() => {
    if (documentStore.currentDocument?.title) {
      setTitleValue(documentStore.currentDocument.title);
    }
  }, [documentStore.currentDocument?.title]);

  // 监听 Yjs 文档更新，实现自动保存
  useEffect(() => {
    if (!ydoc || !objectId || !workspaceId) return;

    const handleUpdate = (update: Uint8Array, origin: unknown) => {
      // 忽略来自 provider 的同步更新（避免循环）
      if (
        origin &&
        typeof origin === 'object' &&
        'constructor' in origin &&
        origin.constructor &&
        'name' in origin.constructor &&
        origin.constructor.name === 'TiptapCollabProvider'
      ) {
        return;
      }

      // 防抖保存：2秒后保存
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }

      saveTimerRef.current = setTimeout(async () => {
        try {
          // 使用增量更新（update）而不是完整状态
          await documentStore.saveDocument(workspaceId, objectId, ydoc, false, update);
          message.success('已自动保存', 1);
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : '保存失败';
          message.error(errorMessage);
        }
      }, 2000);
    };

    ydoc.on('update', handleUpdate);

    return () => {
      ydoc.off('update', handleUpdate);
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
        saveTimerRef.current = null;
      }
    };
  }, [ydoc, objectId, workspaceId]);

  // 手动保存
  const handleSave = async () => {
    if (!objectId || !ydoc || !workspaceId) return;

    try {
      await documentStore.saveDocument(workspaceId, objectId, ydoc, true);
      message.success('保存成功');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '保存失败';
      message.error(errorMessage);
    }
  };

  // 更新标题（仅更新本地状态）
  const handleTitleInputChange = (value: string) => {
    setTitleValue(value);
  };

  // 保存标题（onBlur 或 onPressEnter）
  const handleTitleSave = async () => {
    if (!objectId || !workspaceId) return;
    const titleToSave = titleValue.trim();
    // 如果标题没有变化，不保存
    if (titleToSave === documentStore.currentDocument?.title) {
      return;
    }
    try {
      await documentStore.updateDocumentTitle(workspaceId, objectId, titleToSave);
      message.success('标题已更新', 1);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '更新标题失败';
      message.error(errorMessage);
      // 保存失败时恢复原值
      if (documentStore.currentDocument?.title) {
        setTitleValue(documentStore.currentDocument.title);
      }
    }
  };

  // 如果 ydoc 和 provider 未准备好，显示加载状态
  if (!ydoc || !provider) {
    return <div>加载中...</div>;
  }

  return (
    <div className="document-editor-page">
      <div className="editor-header">
        <Space>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/documents')}>
            返回
          </Button>
          <Input
            value={titleValue}
            onChange={(e) => handleTitleInputChange(e.target.value)}
            onBlur={handleTitleSave}
            onPressEnter={handleTitleSave}
            placeholder="文档标题"
            style={{ width: 300 }}
          />
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSave}
            loading={documentStore.isSaving}
          >
            保存
          </Button>
          {documentStore.lastSavedAt && (
            <Tag color="green">
              最后保存: {documentStore.lastSavedAt.toLocaleTimeString('zh-CN')}
            </Tag>
          )}
          {documentStore.saveError && <Tag color="red">{documentStore.saveError}</Tag>}
        </Space>
      </div>

      <div className="editor-content">
        <Editor provider={provider} ydoc={ydoc} />
      </div>
    </div>
  );
});

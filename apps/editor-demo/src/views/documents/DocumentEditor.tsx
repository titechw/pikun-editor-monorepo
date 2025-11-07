import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams, useNavigate } from 'react-router-dom';
import { EditorContent, useEditor } from '@pikun/react';
import Collaboration from '@pikun/extension-collaboration';
import CollaborationCaret from '@pikun/extension-collaboration-caret';
import Highlight from '@pikun/extension-highlight';
import { TaskItem, TaskList } from '@pikun/extension-list';
import { CharacterCount } from '@pikun/extensions';
import StarterKit from '@pikun/starter-kit';
import { TiptapCollabProvider } from '@hocuspocus/provider';
import { NodeFloatMenu } from '@pikun/extension-node-float-menu';
import * as Y from 'yjs';
import { Button, Input, message, Space, Tag } from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { documentStore } from '../../stores/document.store';
import { authStore } from '../../stores/auth.store';
import { getInitialUser } from '../editor/utils/getRandamUsers';
import { MenuBar } from '../editor/MenuBar';
import type { Document } from '../../api/document.api';
import './DocumentEditor.less';

const defaultContent = `
  <p>开始编辑你的文档...</p>
`;

export const DocumentEditorPage = observer(() => {
  const { objectId } = useParams<{ objectId: string }>();
  const navigate = useNavigate();
  const [currentUser] = useState(getInitialUser);
  const [ydoc, setYdoc] = useState<Y.Doc | null>(null);
  const [provider, setProvider] = useState<TiptapCollabProvider | null>(null);
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);

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

  // 创建编辑器，参考 Editor.tsx 的实现
  // 只在 ydoc 和 provider 准备好时创建编辑器
  const editor = useEditor({
    enableContentCheck: true,
    onContentError: ({ disableCollaboration }: { disableCollaboration: () => void }) => {
      disableCollaboration();
    },
    onCreate: ({ editor: currentEditor }) => {
      if (provider && ydoc) {
        provider.on('synced', () => {
          // 同步完成后，如果编辑器为空且没有服务器内容，设置默认内容
          const doc = documentStore.currentDocument as Document & { content?: string };
          if (currentEditor.isEmpty && (!doc || !doc.content)) {
            currentEditor.commands.setContent(defaultContent);
          }
        });
      }
    },
    extensions: [
      StarterKit.configure({
        undoRedo: false,
      }),
      Highlight,
      TaskList,
      TaskItem,
      CharacterCount.extend().configure({
        limit: 100000,
      }),
      Collaboration.extend().configure({
        document: ydoc,
      }),
      CollaborationCaret.extend().configure({
        provider: provider,
      }),
    ],
  });

  // 设置用户信息
  useEffect(() => {
    if (editor && currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      editor.chain().focus().updateUser(currentUser).run();
    }
  }, [editor, currentUser]);

  // 监听编辑器更新，实现自动保存
  useEffect(() => {
    if (!editor || !objectId || !ydoc) return;

    const handleUpdate = () => {
      // 防抖保存：2秒后保存
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }

      saveTimerRef.current = setTimeout(async () => {
        if (!workspaceId) return;
        try {
          await documentStore.saveDocument(workspaceId, objectId, ydoc, false);
          message.success('已自动保存', 1);
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : '保存失败';
          message.error(errorMessage);
        }
      }, 2000);
    };

    editor.on('update', handleUpdate);

    return () => {
      editor.off('update', handleUpdate);
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
        saveTimerRef.current = null;
      }
    };
  }, [editor, objectId, ydoc, workspaceId]);

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

  // 更新标题
  const handleTitleChange = async (title: string) => {
    if (!objectId || !workspaceId) return;
    try {
      await documentStore.updateDocumentTitle(workspaceId, objectId, title);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '更新标题失败';
      message.error(errorMessage);
    }
  };

  // 如果编辑器未准备好，显示加载状态
  if (!editor || !ydoc || !provider) {
    return <div>加载中...</div>;
  }

  const currentDoc = documentStore.currentDocument;

  return (
    <div className="document-editor-page">
      <div className="editor-header">
        <Space>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/documents')}>
            返回
          </Button>
          <Input
            value={currentDoc?.title || ''}
            onChange={(e) => handleTitleChange(e.target.value)}
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
        <MenuBar editor={editor} />
        <EditorContent editor={editor} className="main-group" />
        <NodeFloatMenu editor={editor} onNodeChange={() => {}} />
      </div>
    </div>
  );
});

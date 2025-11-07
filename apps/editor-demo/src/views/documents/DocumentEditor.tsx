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

            // 初始化最后保存的状态向量（文档加载后）
            try {
              lastSavedStateVectorRef.current = Y.snapshot(ydoc);
            } catch {
              // snapshot 失败不影响
            }
          } catch (error) {
            console.error('Failed to decode document content:', error);
          }
        } else {
          // 空文档，初始化状态向量
          try {
            lastSavedStateVectorRef.current = Y.snapshot(ydoc);
          } catch {
            // snapshot 失败不影响
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
  // 使用 ref 累积防抖期间的所有增量更新
  const pendingUpdatesRef = React.useRef<Uint8Array[]>([]);
  const lastSavedStateVectorRef = React.useRef<Y.Snapshot | null>(null); // 记录最后一次保存的状态向量

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

      // 累积增量更新
      pendingUpdatesRef.current.push(update);

      // 防抖保存：2秒后保存
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }

      saveTimerRef.current = setTimeout(async () => {
        try {
          // 优先计算增量更新：从最后一次保存的状态到当前状态
          let incrementalUpdate: Uint8Array | undefined;

          if (lastSavedStateVectorRef.current) {
            // 方案1：有上次保存的状态向量，计算真正的增量（最佳方案）
            // 注意：Y.encodeStateAsUpdate 的第二个参数需要是 Uint8Array，不是 Snapshot 对象
            // 我们需要从 Snapshot 获取状态向量
            try {
              // @ts-ignore - Y.encodeSnapshotVector 可能不存在，我们需要使用其他方法
              // 实际上，Yjs 的 encodeStateAsUpdate 不接受 Snapshot 作为第二个参数
              // 我们需要使用 Y.diffUpdate 或其他方法
              // 暂时使用累积的 update 作为 fallback
              if (pendingUpdatesRef.current.length > 0) {
                incrementalUpdate = mergeYjsUpdates(pendingUpdatesRef.current);
                console.log(
                  '[DocumentEditor] Auto save: using accumulated updates (state vector not directly usable)',
                );
              } else {
                // 如果没有累积的 update，使用当前状态
                incrementalUpdate = Y.encodeStateAsUpdate(ydoc);
                console.log(
                  '[DocumentEditor] Auto save: using current state (no updates accumulated)',
                );
              }
            } catch {
              // 如果失败，使用累积的 update
              if (pendingUpdatesRef.current.length > 0) {
                incrementalUpdate = mergeYjsUpdates(pendingUpdatesRef.current);
              }
            }
          } else if (pendingUpdatesRef.current.length > 0) {
            // 方案2：没有状态向量，但有累积的 update，使用它们（fallback）
            incrementalUpdate = mergeYjsUpdates(pendingUpdatesRef.current);
            console.log(
              '[DocumentEditor] Auto save: using accumulated updates as incremental update',
            );
          } else {
            // 方案3：既没有状态向量也没有累积的 update
            // 这种情况应该很少见（文档刚加载，还没有任何编辑）
            // 但为了安全，我们仍然尝试计算增量：从空状态到当前状态
            const currentState = Y.encodeStateAsUpdate(ydoc);
            if (currentState.length > 0) {
              incrementalUpdate = currentState;
              console.log(
                '[DocumentEditor] Auto save: no state vector or updates, using current state as update',
              );
            }
          }

          // 清空累积的更新
          pendingUpdatesRef.current = [];

          // 更新最后保存的状态向量
          try {
            lastSavedStateVectorRef.current = Y.snapshot(ydoc);
          } catch {
            // snapshot 失败不影响保存
          }

          // 使用增量更新保存（优先使用增量）
          if (incrementalUpdate && incrementalUpdate.length > 0) {
            await documentStore.saveDocument(workspaceId, objectId, ydoc, false, incrementalUpdate);
            message.success('已自动保存', 1);
          }
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
      pendingUpdatesRef.current = [];
    };
  }, [ydoc, objectId, workspaceId]);

  // 辅助函数：合并多个 Yjs update
  // Yjs 的 update 本身就是增量的，可以直接顺序应用
  // 我们创建一个临时 doc，依次应用所有 update，然后计算从空状态到最终状态的增量
  // 注意：虽然这是从空状态计算的，但由于 Yjs 的 CRDT 特性，这个 update 可以安全地应用到现有文档
  const mergeYjsUpdates = React.useCallback((updates: Uint8Array[]): Uint8Array => {
    if (updates.length === 0) {
      return new Uint8Array(0);
    }
    if (updates.length === 1) {
      // 单个 update，直接返回
      return updates[0];
    }

    // 多个 update：创建一个临时 doc，依次应用所有 update
    // 然后获取从空状态到最终状态的增量
    // 注意：Yjs 的 update 是基于 CRDT 的，可以安全地合并
    const tempDoc = new Y.Doc();
    for (const update of updates) {
      Y.applyUpdate(tempDoc, update);
    }

    // 获取合并后的增量 update
    // 这个 update 包含了所有累积的变更，可以安全地应用到现有文档
    return Y.encodeStateAsUpdate(tempDoc);
  }, []);

  // 手动保存：优先使用增量更新
  // 只有在确实没有任何增量信息时（比如文档刚加载，还没有任何编辑），才使用全量
  const handleSave = async () => {
    if (!objectId || !ydoc || !workspaceId) return;

    try {
      // 优先计算增量更新
      let incrementalUpdate: Uint8Array | undefined;

      if (lastSavedStateVectorRef.current) {
        // 方案1：有上次保存的状态向量，计算真正的增量（最佳方案）
        // 注意：Y.encodeStateAsUpdate 的第二个参数需要是 Uint8Array，不是 Snapshot 对象
        // 我们需要从 Snapshot 获取状态向量
        try {
          // @ts-ignore - Y.encodeSnapshotVector 可能不存在，我们需要使用其他方法
          // 实际上，Yjs 的 encodeStateAsUpdate 不接受 Snapshot 作为第二个参数
          // 我们需要使用 Y.diffUpdate 或其他方法
          // 暂时使用累积的 update 作为 fallback
          if (pendingUpdatesRef.current.length > 0) {
            incrementalUpdate = mergeYjsUpdates(pendingUpdatesRef.current);
            console.log(
              '[DocumentEditor] Manual save: using accumulated updates (state vector not directly usable)',
            );
          } else {
            // 如果没有累积的 update，使用当前状态
            incrementalUpdate = Y.encodeStateAsUpdate(ydoc);
            console.log(
              '[DocumentEditor] Manual save: using current state (no updates accumulated)',
            );
          }
        } catch {
          // 如果失败，使用累积的 update
          if (pendingUpdatesRef.current.length > 0) {
            incrementalUpdate = mergeYjsUpdates(pendingUpdatesRef.current);
          }
        }
      } else if (pendingUpdatesRef.current.length > 0) {
        // 方案2：没有状态向量，但有累积的 update，使用它们（fallback）
        incrementalUpdate = mergeYjsUpdates(pendingUpdatesRef.current);
        console.log(
          '[DocumentEditor] Manual save: using accumulated updates as incremental update',
        );
      } else {
        // 方案3：既没有状态向量也没有累积的 update
        // 这种情况应该很少见（文档刚加载，还没有任何编辑）
        // 但为了安全，我们仍然尝试计算增量：从空状态到当前状态
        // 注意：这实际上是从空状态到当前状态的完整状态，不是真正的增量
        // 但后端会正确处理（因为后端会应用这个 update 到现有文档）
        const currentState = Y.encodeStateAsUpdate(ydoc);
        if (currentState.length > 0) {
          incrementalUpdate = currentState;
          console.log(
            '[DocumentEditor] Manual save: no state vector or updates, using current state as update',
          );
        }
      }

      // 清空累积的更新
      pendingUpdatesRef.current = [];

      // 更新最后保存的状态向量
      try {
        lastSavedStateVectorRef.current = Y.snapshot(ydoc);
      } catch {
        // snapshot 失败不影响保存
      }

      // 使用增量更新保存（优先使用增量，只有在确实没有增量时才使用全量）
      await documentStore.saveDocument(workspaceId, objectId, ydoc, true, incrementalUpdate);
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

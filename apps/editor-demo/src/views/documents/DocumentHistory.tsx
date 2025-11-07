import React, { useEffect, useState, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Tag, message, Space, Typography, Empty, Tree, Spin } from 'antd';
import {
  ArrowLeftOutlined,
  SaveOutlined,
  FileTextOutlined,
  FolderOutlined,
} from '@ant-design/icons';
import { documentStore } from '../../stores/document.store';
import { authStore } from '../../stores/auth.store';
import type { DocumentSnapshot, DocumentChange } from '../../api/document.api';
import * as Y from 'yjs';
import StarterKit from '@pikun/starter-kit';
import { generateHTML } from '@pikun/html';
import { yXmlFragmentToProsemirrorJSON } from '@tiptap/y-tiptap';
import './DocumentHistory.less';

const { Text, Title } = Typography;
const { DirectoryTree } = Tree;

interface HistoryVersion {
  snapshot: DocumentSnapshot;
  changes: DocumentChange[];
}

interface SelectedItem {
  type: 'snapshot' | 'change';
  id: string;
  snapshot?: DocumentSnapshot;
  change?: DocumentChange;
}

interface TreeNode {
  title: React.ReactNode;
  key: string;
  icon?: React.ReactNode;
  isLeaf: boolean;
  selectable?: boolean;
  snapshot?: DocumentSnapshot;
  change?: DocumentChange;
  children?: TreeNode[];
}

export const DocumentHistoryPage = observer(() => {
  const { objectId } = useParams<{ objectId: string }>();
  const navigate = useNavigate();
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [content, setContent] = useState<string>('');
  const [isLoadingContent, setIsLoadingContent] = useState(false);

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

  useEffect(() => {
    if (objectId && workspaceId) {
      documentStore.clearHistory();
      loadHistory();
    }
  }, [objectId, workspaceId]);

  const loadHistory = async () => {
    if (!objectId || !workspaceId) return;
    try {
      await documentStore.loadChanges(workspaceId, objectId, {
        limit: 200,
        offset: 0,
      });

      await documentStore.loadSnapshots(workspaceId, objectId, 50, 0);

      const snapshots = documentStore.snapshots;
      for (const snapshot of snapshots) {
        try {
          const nextSnapshotIndex =
            snapshots.findIndex((s) => s.snapshot_id === snapshot.snapshot_id) + 1;
          if (nextSnapshotIndex < snapshots.length) {
            const nextSnapshot = snapshots[nextSnapshotIndex];
            await documentStore.getChangesBetweenSnapshots(
              workspaceId,
              objectId,
              snapshot.snapshot_id,
              nextSnapshot.snapshot_id,
            );
          }
        } catch (error) {
          console.error(`Failed to load changes for snapshot ${snapshot.snapshot_id}:`, error);
        }
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '加载历史记录失败';
      message.error(errorMessage);
    }
  };

  // 组织历史版本：大版本 + 多个变更
  const historyVersions = useMemo(() => {
    const versions: HistoryVersion[] = [];
    const snapshots = [...documentStore.snapshots].sort((a, b) => b.created_at - a.created_at);
    const allChanges = [...documentStore.changes].sort((a, b) => a.created_at - b.created_at);

    if (snapshots.length === 0 && allChanges.length > 0) {
      const firstChange = allChanges[0];
      const virtualSnapshot: DocumentSnapshot = {
        snapshot_id: 'initial',
        object_id: firstChange.object_id,
        workspace_id: firstChange.workspace_id,
        version_type: 'major',
        created_at: firstChange.created_at - 1,
        metadata: { is_virtual: true, label: '初始版本' },
      };
      versions.push({
        snapshot: virtualSnapshot,
        changes: allChanges,
      });
      return versions;
    }

    for (let i = 0; i < snapshots.length; i++) {
      const snapshot = snapshots[i];
      const nextSnapshot = i > 0 ? snapshots[i - 1] : null;

      const changes = allChanges.filter((change) => {
        if (change.snapshot_id === snapshot.snapshot_id) return true;
        if (change.created_at > snapshot.created_at) {
          if (nextSnapshot) {
            return change.created_at <= nextSnapshot.created_at;
          }
          return true;
        }
        return false;
      });

      versions.push({
        snapshot,
        changes,
      });
    }

    return versions;
  }, [documentStore.snapshots, documentStore.changes]);

  // 格式化日期（完整日期时间）
  const formatDate = (timestamp: number | string) => {
    // 处理字符串类型的时间戳
    let ts: number;
    if (typeof timestamp === 'string') {
      ts = parseInt(timestamp, 10);
    } else {
      ts = timestamp;
    }

    if (!ts || ts <= 0 || isNaN(ts)) {
      return '无效日期';
    }
    try {
      // 检查是否是毫秒时间戳（13位）还是秒时间戳（10位）
      const date = ts > 10000000000 ? new Date(ts) : new Date(ts * 1000);
      if (isNaN(date.getTime())) {
        return '无效日期';
      }
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    } catch (error) {
      console.error('Date formatting error:', error, 'timestamp:', timestamp);
      return '无效日期';
    }
  };

  // 格式化日期（仅日期，如 "7月30日"）
  const formatDateOnly = (timestamp: number | string): string => {
    let ts: number;
    if (typeof timestamp === 'string') {
      ts = parseInt(timestamp, 10);
    } else {
      ts = timestamp;
    }

    if (!ts || ts <= 0 || isNaN(ts)) {
      return '无效日期';
    }
    try {
      const date = ts > 10000000000 ? new Date(ts) : new Date(ts * 1000);
      if (isNaN(date.getTime())) {
        return '无效日期';
      }
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${month}月${day}日`;
    } catch (error) {
      console.error('Date formatting error:', error, 'timestamp:', timestamp);
      return '无效日期';
    }
  };

  // 格式化时间（仅时间，如 "10:12"）
  const formatTimeOnly = (timestamp: number | string): string => {
    let ts: number;
    if (typeof timestamp === 'string') {
      ts = parseInt(timestamp, 10);
    } else {
      ts = timestamp;
    }

    if (!ts || ts <= 0 || isNaN(ts)) {
      return '无效时间';
    }
    try {
      const date = ts > 10000000000 ? new Date(ts) : new Date(ts * 1000);
      if (isNaN(date.getTime())) {
        return '无效时间';
      }
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    } catch (error) {
      console.error('Time formatting error:', error, 'timestamp:', timestamp);
      return '无效时间';
    }
  };

  const getVersionTypeLabel = (type: 'major' | 'minor') => {
    return type === 'major' ? '大版本' : '小版本';
  };

  const getChangeTypeLabel = (type: 'auto_save' | 'manual_save') => {
    return type === 'manual_save' ? '手动保存' : '自动保存';
  };

  // 获取保存人信息
  const getCreatorName = (metadata?: Record<string, unknown>): string => {
    // 优先从 metadata 中获取保存人信息
    if (metadata?.created_by_name && typeof metadata.created_by_name === 'string') {
      return metadata.created_by_name;
    }
    if (metadata?.creator_name && typeof metadata.creator_name === 'string') {
      return metadata.creator_name;
    }
    // 如果没有，使用当前登录用户的名称
    return authStore.user?.name || '未知用户';
  };

  // 从 Yjs 文档中提取 Tiptap 内容
  const extractTiptapContent = (ydoc: Y.Doc): string => {
    try {
      // 获取所有共享的键
      const allKeys = Array.from(ydoc.share.keys());
      console.log('Yjs document keys:', allKeys);
      console.log('Yjs document state size:', Y.encodeStateAsUpdate(ydoc).length, 'bytes');

      // Tiptap Collaboration 扩展默认使用 'default' 作为 field
      const xmlFragment = ydoc.getXmlFragment('default');

      if (xmlFragment && xmlFragment.length > 0) {
        try {
          // 使用 yXmlFragmentToProsemirrorJSON 将 XMLFragment 转换为 JSON
          const jsonContent = yXmlFragmentToProsemirrorJSON(xmlFragment);
          console.log('ProseMirror JSON:', jsonContent);

          // 使用 generateHTML 将 JSON 转换为 HTML
          const htmlContent = generateHTML(jsonContent, [StarterKit]);
          console.log('Generated HTML:', htmlContent);

          if (htmlContent && htmlContent.trim()) {
            return htmlContent;
          }
        } catch (error) {
          console.error('Failed to convert XMLFragment to HTML:', error);
          // 降级方案：直接使用 XMLFragment.toString()
          const xmlString = xmlFragment.toString();
          console.log('XMLFragment toString():', xmlString.substring(0, 200));

          // 尝试提取 HTML 内容
          if (xmlString.includes('<prosemirror-fragment>')) {
            const match = xmlString.match(
              /<prosemirror-fragment[^>]*>(.*?)<\/prosemirror-fragment>/s,
            );
            if (match && match[1]) {
              return match[1].trim();
            }
          }
          return xmlString.trim() || '(空文档)';
        }
      } else {
        console.log(
          'XMLFragment "default" is empty or not found, length:',
          xmlFragment?.length || 0,
        );
      }

      // 如果 'default' 找不到，尝试其他键
      const possibleKeys = ['prosemirror', 'content', 'doc'];
      for (const key of possibleKeys) {
        try {
          const fragment = ydoc.getXmlFragment(key);
          if (fragment && fragment.length > 0) {
            console.log(`Trying XMLFragment '${key}', length:`, fragment.length);
            try {
              const jsonContent = yXmlFragmentToProsemirrorJSON(fragment);
              const htmlContent = generateHTML(jsonContent, [StarterKit]);
              if (htmlContent && htmlContent.trim()) {
                return htmlContent;
              }
            } catch (error) {
              console.warn(`Failed to convert XMLFragment '${key}':`, error);
            }
          }
        } catch {
          // 键不存在，继续
        }
      }

      // 如果还是找不到，尝试查找所有 XMLFragment
      for (const key of allKeys) {
        try {
          const fragment = ydoc.getXmlFragment(key);
          if (fragment && fragment.length > 0) {
            console.log(`Found XMLFragment in key: ${key}, length:`, fragment.length);
            try {
              const jsonContent = yXmlFragmentToProsemirrorJSON(fragment);
              const htmlContent = generateHTML(jsonContent, [StarterKit]);
              if (htmlContent && htmlContent.trim()) {
                return htmlContent;
              }
            } catch (error) {
              console.warn(`Failed to convert XMLFragment '${key}':`, error);
            }
          }
        } catch {
          // 不是 XMLFragment，继续
        }
      }

      console.warn('No content found in Yjs document, keys:', allKeys);
      return '(空文档 - 未找到内容)';
    } catch (error) {
      console.error('Failed to extract Tiptap content:', error);
      return `(无法提取内容: ${error instanceof Error ? error.message : String(error)})`;
    }
  };

  // 构建树形结构数据（按日期分组）
  const treeData = useMemo(() => {
    // 按日期分组，同时记录时间戳用于排序
    const dateGroups = new Map<string, { versions: HistoryVersion[]; maxTimestamp: number }>();

    historyVersions.forEach((version) => {
      const dateKey = formatDateOnly(version.snapshot.created_at);
      const timestamp =
        typeof version.snapshot.created_at === 'string'
          ? parseInt(version.snapshot.created_at, 10)
          : version.snapshot.created_at;

      if (!dateGroups.has(dateKey)) {
        dateGroups.set(dateKey, { versions: [], maxTimestamp: 0 });
      }
      const group = dateGroups.get(dateKey)!;
      group.versions.push(version);
      // 记录该日期组中最大的时间戳（用于排序）
      if (timestamp > group.maxTimestamp) {
        group.maxTimestamp = timestamp;
      }
    });

    // 构建树形结构
    const result: TreeNode[] = [];

    // 按时间戳倒序排列（最新的在前）
    const sortedDates = Array.from(dateGroups.entries()).sort((a, b) => {
      return b[1].maxTimestamp - a[1].maxTimestamp;
    });

    sortedDates.forEach(([dateKey, group]) => {
      const versions = group.versions;

      // 日期标题节点
      const dateNode = {
        title: (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontWeight: 500,
              color: '#1890ff',
              fontSize: 14,
              padding: '4px 0',
            }}
          >
            <FolderOutlined style={{ fontSize: 14 }} />
            <span>{dateKey}</span>
          </div>
        ),
        key: `date-${dateKey}`,
        icon: null, // 隐藏默认图标，因为 title 中已经包含了图标
        isLeaf: false,
        selectable: false, // 日期节点不可选择
        children: versions.map((version) => {
          const snapshotNode = {
            title: (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FileTextOutlined style={{ fontSize: 14 }} />
                  <span style={{ fontSize: 13 }}>
                    {formatTimeOnly(version.snapshot.created_at)}
                  </span>
                </div>
                <span style={{ fontSize: 13 }}>
                  {version.snapshot.metadata?.is_virtual
                    ? version.snapshot.metadata.label || '初始版本'
                    : getVersionTypeLabel(version.snapshot.version_type)}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: '#722ed1',
                      display: 'inline-block',
                    }}
                  />
                  <span style={{ fontSize: 12, color: '#666' }}>
                    {getCreatorName(version.snapshot.metadata)}
                  </span>
                </div>
                <Tag
                  color={version.snapshot.version_type === 'major' ? 'blue' : 'green'}
                  style={{ margin: 0 }}
                >
                  {getVersionTypeLabel(version.snapshot.version_type)}
                </Tag>
              </div>
            ),
            key: `snapshot-${version.snapshot.snapshot_id}`,
            icon: null, // 隐藏默认图标，因为 title 中已经包含了图标
            isLeaf: version.changes.length === 0,
            snapshot: version.snapshot,
            children:
              version.changes.length > 0
                ? version.changes.map((change) => ({
                    title: (
                      <div
                        style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <FileTextOutlined style={{ fontSize: 12, color: '#999' }} />
                          <span style={{ fontSize: 12, color: '#666' }}>
                            {formatTimeOnly(change.created_at)}
                          </span>
                        </div>
                        <Tag
                          color={change.change_type === 'manual_save' ? 'orange' : 'default'}
                          style={{ margin: 0, fontSize: 11 }}
                        >
                          {getChangeTypeLabel(change.change_type)}
                        </Tag>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              backgroundColor: '#722ed1',
                              display: 'inline-block',
                            }}
                          />
                          <span style={{ fontSize: 12, color: '#666' }}>
                            {getCreatorName(change.metadata)}
                          </span>
                        </div>
                      </div>
                    ),
                    key: `change-${change.change_id}`,
                    icon: null, // 隐藏默认图标
                    isLeaf: true,
                    change,
                  }))
                : undefined,
          };
          return snapshotNode;
        }),
      };

      result.push(dateNode);
    });

    return result;
  }, [historyVersions]);

  // 处理树节点选择
  const handleTreeSelect = async (selectedKeys: React.Key[]) => {
    console.log('=== handleTreeSelect called ===');
    console.log('selectedKeys:', selectedKeys);

    if (selectedKeys.length === 0) {
      console.log('No keys selected, returning');
      return;
    }

    const key = selectedKeys[0] as string;
    console.log('Selected key:', key);

    // 修复：正确解析 key，key 格式是 "type-id"，id 可能是 UUID（包含多个 -）
    const firstDashIndex = key.indexOf('-');
    if (firstDashIndex === -1) {
      console.warn('Invalid key format:', key);
      return;
    }

    const type = key.substring(0, firstDashIndex);
    const id = key.substring(firstDashIndex + 1);
    console.log('Parsed type:', type, 'id:', id);

    if (type === 'snapshot') {
      console.log('Loading snapshot:', id);
      const snapshot = historyVersions.find((v) => v.snapshot.snapshot_id === id)?.snapshot;
      if (snapshot) {
        console.log('Found snapshot:', snapshot);
        setSelectedItem({ type: 'snapshot', id, snapshot });
        await loadSnapshotContent(snapshot);
      } else {
        console.warn('Snapshot not found:', id);
      }
    } else if (type === 'change') {
      console.log('Loading change:', id);
      console.log('documentStore.changes:', documentStore.changes);
      console.log('documentStore.changes.length:', documentStore.changes.length);

      const change = documentStore.changes.find((c) => c.change_id === id);
      console.log('Found change:', change);

      if (change) {
        console.log('Setting selected item and loading change content');
        setSelectedItem({ type: 'change', id, change });
        await loadChangeContent(change);
      } else {
        console.warn('Change not found in documentStore.changes');
        console.log(
          'Available change IDs:',
          documentStore.changes.map((c) => c.change_id),
        );
        console.log('Looking for ID:', id);
      }
    } else {
      console.warn('Unknown type:', type);
    }
  };

  // 加载快照内容
  const loadSnapshotContent = async (snapshot: DocumentSnapshot) => {
    if (!workspaceId || !objectId) return;
    setIsLoadingContent(true);
    try {
      // 如果是虚拟的初始快照，不调用 API，直接显示信息
      if (snapshot.snapshot_id === 'initial' || snapshot.metadata?.is_virtual) {
        const version = historyVersions.find(
          (v) => v.snapshot.snapshot_id === snapshot.snapshot_id,
        );
        if (version && version.changes.length > 0) {
          // 尝试从第一个变更构建初始内容
          try {
            const firstChange = version.changes[0];
            if (firstChange.change_data) {
              const binaryString = atob(firstChange.change_data);
              const bytes = new Uint8Array(binaryString.length);
              for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
              }

              const ydoc = new Y.Doc();
              Y.applyUpdate(ydoc, bytes);
              const content = extractTiptapContent(ydoc);
              setContent(content);
            } else {
              setContent(
                `初始版本\n\n版本类型: ${getVersionTypeLabel(snapshot.version_type)}\n创建时间: ${formatDate(snapshot.created_at)}\n变更数量: ${version.changes.length}`,
              );
            }
          } catch (error) {
            console.error('Failed to parse initial content:', error);
            setContent(
              `初始版本\n\n版本类型: ${getVersionTypeLabel(snapshot.version_type)}\n创建时间: ${formatDate(snapshot.created_at)}\n变更数量: ${version?.changes.length || 0}`,
            );
          }
        } else {
          setContent(
            `初始版本\n\n版本类型: ${getVersionTypeLabel(snapshot.version_type)}\n创建时间: ${formatDate(snapshot.created_at)}\n暂无变更记录`,
          );
        }
        setIsLoadingContent(false);
        return;
      }

      // 正常快照，调用 API
      const { documentApi } = await import('../../api/document.api');
      const snapshotData = await documentApi.getSnapshotById(
        workspaceId,
        objectId,
        snapshot.snapshot_id,
      );

      if (snapshotData.doc_state) {
        // 解码 Base64 并尝试解析为 Yjs 文档
        try {
          const binaryString = atob(snapshotData.doc_state);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }

          // 创建临时 Yjs 文档并应用状态
          const ydoc = new Y.Doc();
          Y.applyUpdate(ydoc, bytes);

          // 提取 Tiptap 内容
          const content = extractTiptapContent(ydoc);
          setContent(content);
        } catch (error) {
          console.error('Failed to parse snapshot content:', error);
          setContent(
            `快照内容解析失败\n\n快照ID: ${snapshot.snapshot_id}\n版本类型: ${getVersionTypeLabel(snapshot.version_type)}\n创建时间: ${formatDate(snapshot.created_at)}`,
          );
        }
      } else {
        setContent(
          `快照内容为空\n\n快照ID: ${snapshot.snapshot_id}\n版本类型: ${getVersionTypeLabel(snapshot.version_type)}\n创建时间: ${formatDate(snapshot.created_at)}`,
        );
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '加载快照内容失败';
      message.error(errorMessage);
      setContent(`加载失败: ${errorMessage}`);
    } finally {
      setIsLoadingContent(false);
    }
  };

  // 加载变更内容（累积应用所有变更直到该变更）
  const loadChangeContent = async (change: DocumentChange) => {
    console.log('=== loadChangeContent called ===');
    console.log('change:', change);
    console.log('workspaceId:', workspaceId);
    console.log('objectId:', objectId);

    if (!workspaceId || !objectId) {
      console.warn('Missing workspaceId or objectId, returning');
      return;
    }

    setIsLoadingContent(true);
    try {
      // 找到该变更所属的版本
      console.log('Finding version for change:', change.change_id);
      console.log('historyVersions:', historyVersions);

      const version = historyVersions.find((v) =>
        v.changes.some((c) => c.change_id === change.change_id),
      );

      console.log('Found version:', version);

      if (!version) {
        console.warn('Version not found for change:', change.change_id);
        setContent(`未找到变更所属的版本\n\n变更ID: ${change.change_id}`);
        setIsLoadingContent(false);
        return;
      }

      // 找到该变更在版本中的索引
      console.log('version.changes:', version.changes);
      console.log('version.changes.length:', version.changes.length);

      const changeIndex = version.changes.findIndex((c) => c.change_id === change.change_id);
      console.log('changeIndex:', changeIndex);

      if (changeIndex === -1) {
        console.warn('Change index not found:', change.change_id);
        setContent(`未找到变更\n\n变更ID: ${change.change_id}`);
        setIsLoadingContent(false);
        return;
      }

      try {
        console.log('Creating Yjs document and applying changes...');
        // 创建 Yjs 文档
        const ydoc = new Y.Doc();

        // 如果有快照，先加载快照（虚拟初始快照跳过）
        if (version.snapshot.snapshot_id !== 'initial' && !version.snapshot.metadata?.is_virtual) {
          console.log('Loading snapshot:', version.snapshot.snapshot_id);
          try {
            const { documentApi } = await import('../../api/document.api');
            const snapshotData = await documentApi.getSnapshotById(
              workspaceId,
              objectId,
              version.snapshot.snapshot_id,
            );
            console.log('Snapshot data loaded:', snapshotData);
            if (snapshotData.doc_state) {
              console.log('Applying snapshot doc_state, size:', snapshotData.doc_state.length);
              const binaryString = atob(snapshotData.doc_state);
              const bytes = new Uint8Array(binaryString.length);
              for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
              }
              Y.applyUpdate(ydoc, bytes);
              console.log('Snapshot applied successfully');
            } else {
              console.log('Snapshot has no doc_state');
            }
          } catch (error) {
            console.warn('Failed to load snapshot, starting from empty:', error);
          }
        } else {
          console.log('Skipping snapshot (initial or virtual):', version.snapshot.snapshot_id);
        }

        // 应用该快照之后到该变更之前的所有变更
        const changesToApply = version.changes.slice(0, changeIndex + 1);
        console.log('Changes to apply:', changesToApply.length);
        console.log(
          'Changes to apply IDs:',
          changesToApply.map((c) => c.change_id),
        );

        for (let i = 0; i < changesToApply.length; i++) {
          const c = changesToApply[i];
          console.log(`Applying change ${i + 1}/${changesToApply.length}:`, c.change_id);
          if (c.change_data) {
            try {
              console.log('Change data size:', c.change_data.length);
              const binaryString = atob(c.change_data);
              const bytes = new Uint8Array(binaryString.length);
              for (let j = 0; j < binaryString.length; j++) {
                bytes[j] = binaryString.charCodeAt(j);
              }
              Y.applyUpdate(ydoc, bytes);
              console.log(`Change ${c.change_id} applied successfully`);
            } catch (error) {
              console.warn(`Failed to apply change ${c.change_id}:`, error);
            }
          } else {
            console.warn(`Change ${c.change_id} has no change_data`);
          }
        }

        console.log('All changes applied, extracting content...');
        // 提取 Tiptap 内容
        const content = extractTiptapContent(ydoc);
        console.log('Extracted content length:', content.length);
        setContent(content);
      } catch (error) {
        console.error('Failed to parse change content:', error);
        setContent(
          `变更内容解析失败\n\n变更ID: ${change.change_id}\n变更类型: ${getChangeTypeLabel(change.change_type)}\n变更大小: ${change.change_size} bytes\n创建时间: ${formatDate(change.created_at)}`,
        );
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '加载变更内容失败';
      message.error(errorMessage);
      setContent(`加载失败: ${errorMessage}`);
    } finally {
      setIsLoadingContent(false);
    }
  };

  const handleRestore = async (_snapshotId: string) => {
    message.info('恢复功能待实现');
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
        bodyStyle={{ padding: 0 }}
      >
        <div className="history-layout">
          {/* 左侧：文档内容显示区域 */}
          <div className="history-content-panel">
            {isLoadingContent ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <Spin size="large" />
              </div>
            ) : selectedItem ? (
              <div className="content-display">
                <div className="content-header">
                  <Space>
                    <Title level={4}>
                      {selectedItem.type === 'snapshot'
                        ? `${getVersionTypeLabel(selectedItem.snapshot!.version_type)} - ${formatDate(selectedItem.snapshot!.created_at)}`
                        : `${getChangeTypeLabel(selectedItem.change!.change_type)} - ${formatDate(selectedItem.change!.created_at)}`}
                    </Title>
                    {selectedItem.type === 'snapshot' && (
                      <Button
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={() => handleRestore(selectedItem.snapshot!.snapshot_id)}
                      >
                        恢复到此版本
                      </Button>
                    )}
                  </Space>
                </div>
                <div className="content-body">
                  {content.startsWith('<') ? (
                    // 如果是 HTML 内容，使用 dangerouslySetInnerHTML 渲染
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                  ) : (
                    // 如果是纯文本，使用 pre 标签显示
                    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{content}</pre>
                  )}
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <Empty description="请从右侧选择版本或变更记录查看内容" />
              </div>
            )}
          </div>

          {/* 右侧：记录树 */}
          <div className="history-tree-panel">
            <div className="tree-header">
              <Text strong>版本历史</Text>
            </div>
            {documentStore.isLoadingSnapshots || documentStore.isLoadingChanges ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
                <Spin />
              </div>
            ) : treeData.length === 0 ? (
              <div style={{ padding: 20 }}>
                <Empty description="暂无历史记录" />
              </div>
            ) : (
              <DirectoryTree
                defaultExpandAll
                onSelect={handleTreeSelect}
                treeData={treeData}
                style={{ padding: '8px 0' }}
              />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
});

import React, { useState, useCallback, useMemo } from 'react';
import { RightOutlined, DownOutlined } from '@ant-design/icons';
import './CustomTree.less';

/**
 * 树节点数据接口
 */
export interface TreeNodeData<T = unknown> {
  key: string;
  title: React.ReactNode;
  children?: TreeNodeData<T>[];
  isLeaf?: boolean;
  data?: T; // 原始数据
  [key: string]: unknown;
}

/**
 * 树组件 Props
 */
export interface CustomTreeProps<T = unknown> {
  /** 树节点数据 */
  treeData: TreeNodeData<T>[];
  /** 选中的节点 key 数组 */
  selectedKeys?: React.Key[];
  /** 展开的节点 key 数组 */
  expandedKeys?: React.Key[];
  /** 默认展开的节点 key 数组 */
  defaultExpandedKeys?: React.Key[];
  /** 节点选择回调 */
  onSelect?: (selectedKeys: React.Key[], info: { node: TreeNodeData<T> }) => void;
  /** 节点展开/收起回调 */
  onExpand?: (expandedKeys: React.Key[], info: { node: TreeNodeData<T>; expanded: boolean }) => void;
  /** 懒加载回调 */
  loadData?: (node: TreeNodeData<T>) => Promise<void>;
  /** 正在加载的节点 key 集合 */
  loadingKeys?: Set<string>;
  /** 是否显示连接线 */
  showLine?: boolean;
  /** 是否块级节点 */
  blockNode?: boolean;
  /** 自定义节点渲染 */
  renderNode?: (node: TreeNodeData<T>, isExpanded: boolean, isLoading: boolean) => React.ReactNode;
  /** 节点点击回调 */
  onNodeClick?: (node: TreeNodeData<T>, e: React.MouseEvent) => void;
  /** 节点双击回调 */
  onNodeDoubleClick?: (node: TreeNodeData<T>, e: React.MouseEvent) => void;
  /** 自定义样式类名 */
  className?: string;
}

/**
 * 通用树组件
 */
export const CustomTree = <T,>({
  treeData,
  selectedKeys = [],
  expandedKeys: controlledExpandedKeys,
  defaultExpandedKeys = [],
  onSelect,
  onExpand,
  loadData,
  loadingKeys = new Set(),
  showLine = false,
  blockNode = false,
  renderNode,
  onNodeClick,
  onNodeDoubleClick,
  className = '',
}: CustomTreeProps<T>): React.JSX.Element => {
  // 内部展开状态（非受控模式）
  const [internalExpandedKeys, setInternalExpandedKeys] = useState<Set<string>>(
    new Set(defaultExpandedKeys.map((k) => String(k)))
  );

  // 使用受控或非受控的展开状态
  const expandedKeysSet = useMemo(() => {
    if (controlledExpandedKeys !== undefined) {
      return new Set(controlledExpandedKeys.map((k) => String(k)));
    }
    return internalExpandedKeys;
  }, [controlledExpandedKeys, internalExpandedKeys]);

  /**
   * 切换节点展开状态
   */
  const toggleExpand = useCallback(
    async (node: TreeNodeData<T>, e: React.MouseEvent) => {
      e.stopPropagation();
      const nodeKey = String(node.key);
      const isExpanded = expandedKeysSet.has(nodeKey);
      const newExpanded = !isExpanded;

      // 更新展开状态
      if (controlledExpandedKeys === undefined) {
        // 非受控模式
        setInternalExpandedKeys((prev) => {
          const next = new Set(prev);
          if (newExpanded) {
            next.add(nodeKey);
          } else {
            next.delete(nodeKey);
          }
          return next;
        });
      }

      // 触发展开回调
      if (onExpand) {
        const newExpandedKeys = newExpanded
          ? [...expandedKeysSet, nodeKey]
          : Array.from(expandedKeysSet).filter((k) => k !== nodeKey);
        onExpand(newExpandedKeys, { node, expanded: newExpanded });
      }

      // 如果是展开且需要懒加载，触发加载
      if (newExpanded && loadData && !node.isLeaf && (!node.children || node.children.length === 0)) {
        await loadData(node);
      }
    },
    [expandedKeysSet, controlledExpandedKeys, onExpand, loadData]
  );

  /**
   * 处理节点点击
   */
  const handleNodeClick = useCallback(
    (node: TreeNodeData<T>, e: React.MouseEvent) => {
      // 如果点击的是展开图标，不处理节点选择
      if ((e.target as HTMLElement).closest('.custom-tree-switcher')) {
        return;
      }
      
      if (onNodeClick) {
        onNodeClick(node, e);
      }
      if (onSelect) {
        const nodeKey = String(node.key);
        const isSelected = selectedKeys.some((k) => String(k) === nodeKey);
        const newSelectedKeys = isSelected ? [] : [nodeKey];
        onSelect(newSelectedKeys, { node });
      }
    },
    [onNodeClick, onSelect, selectedKeys]
  );

  /**
   * 渲染树节点
   */
  const renderTreeNode = useCallback(
    (node: TreeNodeData<T>, level: number = 0): React.ReactNode => {
      const nodeKey = String(node.key);
      const isExpanded = expandedKeysSet.has(nodeKey);
      const isSelected = selectedKeys.some((k) => String(k) === nodeKey);
      const isLoading = loadingKeys.has(nodeKey);
      const hasChildren = node.children && node.children.length > 0;
      const canExpand = !node.isLeaf && (hasChildren || loadData);

      // 计算连接线的位置（基于层级）
      const lineLeft = level * 20 + 10; // 展开图标中心位置
      
      return (
        <div 
          key={nodeKey} 
          className={`custom-tree-node ${isSelected ? 'custom-tree-node-selected' : ''} ${!canExpand ? 'custom-tree-node-leaf' : ''}`}
          data-level={level}
        >
          <div
            className="custom-tree-node-content"
            style={{ 
              paddingLeft: level > 0 ? `${level * 20 + 8}px` : '8px',
              ...(showLine && !canExpand ? { '--line-left': `${lineLeft}px` } as React.CSSProperties : {})
            }}
            onClick={(e) => handleNodeClick(node, e)}
            onDoubleClick={(e) => onNodeDoubleClick?.(node, e)}
          >
            {/* 展开/收起图标 */}
            <span
              className={`custom-tree-switcher ${canExpand ? '' : 'custom-tree-switcher-noop'}`}
              onClick={(e) => canExpand && toggleExpand(node, e)}
            >
              {isLoading ? (
                <span className="custom-tree-loading">
                  <span className="custom-tree-loading-spinner" />
                </span>
              ) : canExpand ? (
                isExpanded ? (
                  <DownOutlined className="custom-tree-switcher-icon" />
                ) : (
                  <RightOutlined className="custom-tree-switcher-icon" />
                )
              ) : showLine ? (
                <span className="custom-tree-switcher-line" />
              ) : null}
            </span>

            {/* 节点内容 */}
            <span className="custom-tree-node-title">
              {renderNode ? renderNode(node, isExpanded, isLoading) : node.title}
            </span>
          </div>

          {/* 子节点 */}
          {isExpanded && hasChildren && node.children && (
            <div 
              className="custom-tree-child-nodes" 
              style={showLine ? { '--line-left': `${lineLeft}px` } as React.CSSProperties : undefined}
            >
              {node.children.map((child, index) => (
                <div 
                  key={child.key} 
                  className="custom-tree-child-wrapper"
                  data-is-last={index === node.children!.length - 1 ? 'true' : 'false'}
                >
                  {renderTreeNode(child, level + 1)}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    },
    [expandedKeysSet, selectedKeys, loadingKeys, showLine, loadData, renderNode, handleNodeClick, onNodeDoubleClick, toggleExpand]
  );

  return (
    <div className={`custom-tree ${className} ${blockNode ? 'custom-tree-block-node' : ''} ${showLine ? 'custom-tree-show-line' : ''}`}>
      {treeData.map((node) => renderTreeNode(node))}
    </div>
  );
};


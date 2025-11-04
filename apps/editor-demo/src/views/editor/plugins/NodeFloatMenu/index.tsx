import { defaultComputePositionConfig } from './extension';
import {
  NodeFloatMenuPlugin,
  nodeFloatMenuPluginDefaultKey,
  NodeFloatMenuPluginProps,
} from './plugin';
import type { Plugin } from '@tiptap/pm/state';
// import type { Editor } from '@tiptap/core';
import { useEditorState } from '@tiptap/react';
import { useEffect, useRef, useState } from 'react';
import { selectNodeTypeInfo, nodeToNodeTypeInfo, type NodeTypeInfo } from './utils/nodeType';
import { NodeTypeIcon } from './NodeTypeIcon';
import { MenuPanel } from './MenuPanel';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';
import './index.less';
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type NodeFloatMenuProps = Omit<
  Optional<NodeFloatMenuPluginProps, 'pluginKey'>,
  'element'
> & {
  className?: string;
};

export const NodeFloatMenu = ({
  className = 'node-float-menu-handle',
  editor,
  pluginKey = nodeFloatMenuPluginDefaultKey,
  onNodeChange,
  computePositionConfig = defaultComputePositionConfig,
}: NodeFloatMenuProps) => {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const plugin = useRef<Plugin | null>(null);
  const [hoveredInfo, setHoveredInfo] = useState<NodeTypeInfo>(() => nodeToNodeTypeInfo(null));
  const [hoveredPos, setHoveredPos] = useState<number>(-1);
  const fallbackInfo = useEditorState({ editor, selector: selectNodeTypeInfo });
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    let initPlugin: {
      plugin: Plugin;
      unbind: () => void;
    } | null = null;

    if (!element) {
      return () => {
        plugin.current = null;
      };
    }

    if (editor.isDestroyed) {
      return () => {
        plugin.current = null;
      };
    }

    if (!plugin.current) {
      initPlugin = NodeFloatMenuPlugin({
        editor,
        element,
        pluginKey,
        computePositionConfig: {
          ...defaultComputePositionConfig,
          ...computePositionConfig,
        },
        onNodeChange: (props) => {
          setHoveredInfo(nodeToNodeTypeInfo(props.node as ProseMirrorNode | null));
          setHoveredPos(props.pos);
          onNodeChange?.(props);
        },
      });
      plugin.current = initPlugin?.plugin!;

      editor.registerPlugin(plugin.current as Plugin);
    }

    return () => {
      editor.unregisterPlugin(pluginKey);
      plugin.current = null;
      if (initPlugin) {
        initPlugin.unbind();
        initPlugin = null;
      }
    };
  }, [element, editor, onNodeChange, pluginKey, computePositionConfig]);

  const nodeTypeInfo = hoveredInfo.activeNodeType ? hoveredInfo : fallbackInfo;
  const menuRef = useRef<HTMLDivElement | null>(null);
  // const wrapperRef = useRef<HTMLDivElement | null>(null);

  // 监听全局点击事件，点击其他地方时关闭菜单
  useEffect(() => {
    if (!showMenu) {
      return;
    }

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) {
        setShowMenu(false);
        return;
      }

      // 如果点击在 wrapper 或菜单内，不关闭
      if (element && element.contains(target)) {
        return;
      }

      if (menuRef.current && menuRef.current.contains(target)) {
        return;
      }

      // 点击在其他地方，关闭菜单
      setShowMenu(false);
    };

    // 使用捕获阶段确保能捕获到所有点击
    document.addEventListener('mousedown', handleClickOutside, true);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [showMenu]);

  return (
    <div
      className="node-float-menu__wrapper"
      style={{
        position: 'absolute',
        transition: 'top 160ms ease, left 160ms ease',
        willChange: 'top, left',
        visibility: 'hidden',
      }}
      ref={setElement}
      onMouseEnter={() => setShowMenu(true)}
      // onMouseLeave={handleMouseLeave}
    >
      <div
        className={`${className} node-float-menu-handle-container`}
        style={{
          position: 'relative',
        }}
      >
        <NodeTypeIcon info={nodeTypeInfo} />
      </div>
      {showMenu && element && (
        <div
          ref={menuRef}
          onMouseEnter={() => setShowMenu(true)}
          className="node-float-menu-panel-container"
          onMouseLeave={(e) => {
            const relatedTarget = e.relatedTarget as HTMLElement | null;
            // 如果鼠标移动到 wrapper 内部，不隐藏
            if (
              relatedTarget &&
              e.currentTarget.closest('.node-float-menu__wrapper')?.contains(relatedTarget)
            ) {
              return;
            }
            setShowMenu(false);
          }}
        >
          <MenuPanel
            editor={editor}
            activeNodeType={nodeTypeInfo.activeNodeType}
            headingLevel={nodeTypeInfo.headingLevel}
            isBulletList={nodeTypeInfo.isBulletList}
            isOrderedList={nodeTypeInfo.isOrderedList}
            isCodeBlock={nodeTypeInfo.isCodeBlock}
            isBlockquote={nodeTypeInfo.isBlockquote}
            isTaskList={nodeTypeInfo.isTaskList}
            targetPos={hoveredPos}
          />
        </div>
      )}
    </div>
  );
};

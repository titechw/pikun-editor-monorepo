import { defaultComputePositionConfig } from './extension';
import {
  NodeFloatMenuPlugin,
  nodeFloatMenuPluginDefaultKey,
  NodeFloatMenuPluginProps,
} from './plugin';
import type { Plugin } from '@pikun/pm/state';
// import type { Editor } from '@pikun/core';
import { useEditorState } from '@pikun/react';
import { useEffect, useRef, useState } from 'react';
import { selectNodeTypeInfo, nodeToNodeTypeInfo, type NodeTypeInfo } from './utils/nodeType';
import { NodeTypeIcon } from './NodeTypeIcon';
import { DragDotsIcon } from './Icons';
// import { MenuPanel } from './MenuPanel';
import type { Node as ProseMirrorNode } from '@pikun/pm/model';
import './index.less';
import { MenuPanel } from './MenuPanel';
import { computePosition, flip, shift, offset as offsetMiddleware } from '@floating-ui/dom';
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
        onNodeChange: (props: {
          editor: typeof editor;
          node: ProseMirrorNode | null;
          pos: number;
        }) => {
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
  const [isHoveringIcon, setIsHoveringIcon] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  // const wrapperRef = useRef<HTMLDivElement | null>(null);

  // 清除关闭定时器
  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  // 延迟关闭菜单
  const scheduleCloseMenu = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setShowMenu(false);
      closeTimerRef.current = null;
    }, 150); // 150ms 延迟，避免快速移动时菜单闪烁
  };

  // 监听拖拽事件，拖拽时隐藏菜单
  useEffect(() => {
    if (!element) {
      return;
    }

    const handleDragStart = () => {
      setShowMenu(false);
    };

    const handleDragEnd = () => {
      // 拖拽结束后保持菜单隐藏
      setShowMenu(false);
    };

    // 在捕获阶段监听，确保能捕获到拖拽事件
    element.addEventListener('dragstart', handleDragStart, true);
    element.addEventListener('dragend', handleDragEnd, true);

    return () => {
      element.removeEventListener('dragstart', handleDragStart, true);
      element.removeEventListener('dragend', handleDragEnd, true);
    };
  }, [element]);

  // 使用 ProseMirror Decorations 方式添加悬停样式
  useEffect(() => {
    if (!editor) {
      return;
    }

    // 通过 Transaction 更新插件状态，触发 decorations 更新
    const { view } = editor;
    const { state, dispatch } = view;
    const tr = state.tr;

    if (isHoveringIcon && hoveredPos >= 0) {
      tr.setMeta('setHoveringIcon', true);
      tr.setMeta('setHoveredPos', hoveredPos);
    } else {
      tr.setMeta('setHoveringIcon', false);
      tr.setMeta('setHoveredPos', -1);
    }

    // 不触发历史记录，只是更新装饰
    dispatch(tr);
  }, [editor, hoveredPos, isHoveringIcon]);

  // 计算菜单面板位置（自适应定位）
  useEffect(() => {
    if (!showMenu || !element || !menuRef.current) {
      setMenuPosition(null);
      return;
    }

    const updateMenuPosition = () => {
      if (!element || !menuRef.current) {
        return;
      }

      computePosition(element, menuRef.current, {
        placement: 'left-start',
        strategy: 'fixed',
        middleware: [
          offsetMiddleware(8),
          flip({
            fallbackPlacements: ['left-start', 'left-end', 'right-start'],
          }),
          shift({
            padding: 8,
          }),
        ],
      }).then(({ x, y }) => {
        setMenuPosition({ top: y, left: x });
      });
    };

    updateMenuPosition();

    // 使用 ResizeObserver 监听元素位置变化
    let resizeObserver: ResizeObserver | null = null;
    if (element) {
      resizeObserver = new ResizeObserver(() => {
        updateMenuPosition();
      });
      resizeObserver.observe(element);
    }

    // 监听滚动和窗口大小变化，重新计算位置
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(() => {
        updateMenuPosition();
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', updateMenuPosition);

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', updateMenuPosition);
    };
  }, [showMenu, element]);

  // 监听全局点击事件，点击其他地方时关闭菜单
  useEffect(() => {
    if (!showMenu) {
      return;
    }

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) {
        clearCloseTimer();
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

      // 点击在其他地方，立即关闭菜单
      clearCloseTimer();
      setShowMenu(false);
    };

    // 使用捕获阶段确保能捕获到所有点击
    document.addEventListener('mousedown', handleClickOutside, true);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [showMenu, element]);

  // 清理定时器
  useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, []);

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
      onMouseEnter={() => {
        clearCloseTimer();
        setShowMenu(true);
      }}
      onMouseLeave={(e) => {
        const relatedTarget = e.relatedTarget as HTMLElement | null;
        // 如果鼠标移动到菜单面板，不关闭
        if (menuRef.current && relatedTarget && menuRef.current.contains(relatedTarget)) {
          return;
        }
        // 延迟关闭菜单
        scheduleCloseMenu();
      }}
    >
      <div
        className={`${className} node-float-menu-handle-container`}
        style={{
          position: 'relative',
        }}
        onMouseEnter={() => {
          clearCloseTimer();
          setIsHoveringIcon(true);
          setShowMenu(true);
        }}
        onMouseLeave={(e) => {
          setIsHoveringIcon(false);
          const relatedTarget = e.relatedTarget as HTMLElement | null;
          // 如果鼠标移动到菜单面板，不关闭
          if (menuRef.current && relatedTarget && menuRef.current.contains(relatedTarget)) {
            return;
          }
          // 延迟关闭菜单
          scheduleCloseMenu();
        }}
      >
        <div className="node-float-menu-handle__type">
          <NodeTypeIcon info={nodeTypeInfo} />
        </div>
        <div className="node-float-menu-handle__drag" aria-label="Drag">
          <DragDotsIcon />
        </div>
      </div>
      {showMenu && element && (
        <div
          ref={menuRef}
          onMouseEnter={() => {
            clearCloseTimer();
            setShowMenu(true);
          }}
          className="node-float-menu-panel-container"
          style={{
            position: 'fixed',
            ...(menuPosition || { top: 0, left: 0 }),
            zIndex: 1000,
          }}
          onMouseLeave={(e) => {
            const relatedTarget = e.relatedTarget as HTMLElement | null;
            // 如果鼠标移动到 wrapper 内部，不隐藏
            if (
              relatedTarget &&
              (element?.contains(relatedTarget) ||
                relatedTarget.closest('.node-float-menu__wrapper'))
            ) {
              return;
            }
            // 延迟关闭菜单
            scheduleCloseMenu();
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

import { type ComputePositionConfig, type VirtualElement, computePosition } from '@floating-ui/dom';
import { type EditorState, type Transaction, Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import type { Editor } from '@tiptap/core';
import { isChangeOrigin } from '@tiptap/extension-collaboration';
import { getAbsolutePos, getOuterDomNode, getRelativePos } from './utils/util';
import { getOuterNode, getOuterNodePos } from './utils/getOuterNode';
import type { Node } from '@tiptap/pm/model';
import { removeNode } from './utils/removeNode';
import { findElementNextToCoords } from './utils/findNextElementFromCursor';
import { dragHandler } from '../DragHandle/helpers/dragHandler';
export interface NodeFloatMenuPluginProps {
  pluginKey?: PluginKey | string;
  editor: Editor;
  element: HTMLElement;
  onNodeChange?: (payload: { editor: Editor; node: Node | null; pos: number }) => void;
  computePositionConfig?: ComputePositionConfig;
  getReferencedVirtualElement?: () => VirtualElement | null;
  isHoveringIcon?: boolean;
}

type PluginState = {
  locked: boolean;
  hoveredNodePos: number | null;
  isHoveringIcon: boolean;
};
export const nodeFloatMenuPluginDefaultKey = new PluginKey('nodeFloatMenu');

export const NodeFloatMenuPlugin = ({
  pluginKey = nodeFloatMenuPluginDefaultKey,
  element,
  editor,
  computePositionConfig,
  getReferencedVirtualElement,
  onNodeChange,
  isHoveringIcon: _isHoveringIcon = false,
}: NodeFloatMenuPluginProps) => {
  const wrapper = document.createElement('div');
  let locked = false;
  let currentNode: Node | null = null;
  let currentNodePos = -1;
  // biome-ignore lint/suspicious/noExplicitAny: y-prosemirror relative positions are untyped
  let currentNodeRelPos: unknown;
  let rafId: number | null = null;
  let pendingMouseCoords: { x: number; y: number } | null = null;

  function hideHandle() {
    if (!element) {
      return;
    }

    element.style.visibility = 'hidden';
    element.style.pointerEvents = 'none';
  }

  function repositionDragHandle(dom: Element) {
    const virtualElement = getReferencedVirtualElement?.() || {
      getBoundingClientRect: () => dom.getBoundingClientRect(),
    };

    computePosition(virtualElement, element, computePositionConfig).then((val) => {
      Object.assign(element.style, {
        position: val.strategy,
        left: `${val.x}px`,
        top: `${val.y}px`,
      });
    });
  }

  function showHandle() {
    if (!element) {
      return;
    }

    if (!editor.isEditable) {
      hideHandle();
      return;
    }

    element.style.visibility = '';
    element.style.pointerEvents = 'auto';
  }

  function onDragStart(e: DragEvent) {
    // trigger node drag via helper
    // @ts-ignore
    dragHandler(e, editor);
    setTimeout(() => {
      if (element) {
        element.style.pointerEvents = 'none';
      }
    }, 0);
  }

  function onDragEnd() {
    hideHandle();
    if (element) {
      element.style.pointerEvents = 'auto';
    }
  }

  wrapper.appendChild(element);
  return {
    plugin: new Plugin({
      key: typeof pluginKey === 'string' ? new PluginKey(pluginKey) : pluginKey,
      state: {
        init() {
          return { locked: false, hoveredNodePos: null, isHoveringIcon: false };
        },
        apply(tr: Transaction, value: PluginState, _oldState: EditorState, state: EditorState) {
          // 获取外部传入的 isHoveringIcon 状态
          const metaIsHoveringIcon = tr.getMeta('setHoveringIcon');
          const metaHoveredPos = tr.getMeta('setHoveredPos');

          const newValue = {
            ...value,
            isHoveringIcon:
              metaIsHoveringIcon !== undefined ? metaIsHoveringIcon : value.isHoveringIcon,
            hoveredNodePos: metaHoveredPos !== undefined ? metaHoveredPos : value.hoveredNodePos,
          };
          const isLocked = tr.getMeta('lockDragHandle');
          const hideDragHandle = tr.getMeta('hideDragHandle');

          if (isLocked !== undefined) {
            locked = isLocked;
          }

          if (hideDragHandle) {
            hideHandle();

            locked = false;
            currentNode = null;
            currentNodePos = -1;

            onNodeChange?.({ editor, node: null, pos: -1 });

            return value;
          }

          // Something has changed and drag handler is visible…
          if (tr.docChanged && currentNodePos !== -1 && element) {
            // Yjs replaces the entire document on every incoming change and needs a special handling.
            // If change comes from another user …
            if (isChangeOrigin(tr)) {
              // https://discuss.yjs.dev/t/y-prosemirror-mapping-a-single-relative-position-when-doc-changes/851/3
              // currentNodeRelPos is unknown (y-prosemirror relative pos)
              const newPos = getAbsolutePos(state, currentNodeRelPos);

              if (newPos !== currentNodePos) {
                // Set the new position for our current node.
                currentNodePos = newPos;

                // We will get the outer node with data and position in views update method.
              }
            } else {
              // … otherwise use ProseMirror mapping to update the position.
              const newPos = tr.mapping.map(currentNodePos);

              if (newPos !== currentNodePos) {
                // TODO: Remove
                // console.log('Position has changed …', { old: currentNodePos, new: newPos }, tr);

                // Set the new position for our current node.
                currentNodePos = newPos;

                // Memorize relative position to retrieve absolute position in case of collaboration
                currentNodeRelPos = getRelativePos(state, currentNodePos);

                // We will get the outer node with data and position in views update method.
              }
            }
          }

          return newValue;
        },
      },

      props: {
        decorations(state: EditorState) {
          const pluginState = (
            typeof pluginKey === 'string' ? new PluginKey(pluginKey) : pluginKey
          ).getState(state) as PluginState;
          if (
            !pluginState.isHoveringIcon ||
            pluginState.hoveredNodePos === null ||
            pluginState.hoveredNodePos < 0
          ) {
            console.log('【decoration】no decoration');
            return DecorationSet.empty;
          }

          try {
            const { doc } = state;
            const pos = pluginState.hoveredNodePos;

            // 确保位置有效
            if (pos >= doc.content.size) {
              console.log('【decoration】no decoration2');
              return DecorationSet.empty;
            }

            // 获取节点位置范围
            const $pos = doc.resolve(pos);
            const node = $pos.nodeAfter || $pos.nodeBefore;

            if (!node) {
              console.log('【decoration】no decoration3');
              return DecorationSet.empty;
            }

            // 获取节点的起始和结束位置
            const start = $pos.start($pos.depth);
            const end = start + node.nodeSize;

            console.log('【decoration】decoration', start, end);

            // 创建装饰，添加类名
            const decoration = Decoration.node(start, end, {
              class: 'node-float-menu-row-hovered',
            });
            console.log('【decoration】decoration2', decoration);
            return DecorationSet.create(doc, [decoration]);
          } catch {
            console.log('【decoration】no decoration4');
            return DecorationSet.empty;
          }
        },
        handleDOMEvents: {
          keydown(view) {
            if (!element || locked) {
              return false;
            }

            if (view.hasFocus()) {
              hideHandle();
              currentNode = null;
              currentNodePos = -1;
              onNodeChange?.({ editor, node: null, pos: -1 });

              // We want to still continue with other keydown events.
              return false;
            }

            return false;
          },
          mouseleave(_view, e) {
            // Do not hide open popup on mouseleave.
            if (locked) {
              return false;
            }

            // If e.target is not inside the wrapper, hide.
            if (e.target && !wrapper.contains(e.relatedTarget as HTMLElement)) {
              hideHandle();

              currentNode = null;
              currentNodePos = -1;

              onNodeChange?.({ editor, node: null, pos: -1 });
            }

            return false;
          },

          mousemove(view, e) {
            // Do not continue if popup is not initialized or open.
            if (!element || locked) {
              return false;
            }

            // Store latest mouse coords and schedule a single RAF per frame
            pendingMouseCoords = { x: e.clientX, y: e.clientY };

            if (rafId) {
              return false;
            }

            rafId = requestAnimationFrame(() => {
              rafId = null;

              if (!pendingMouseCoords) {
                return;
              }

              const { x, y } = pendingMouseCoords;
              pendingMouseCoords = null;

              const nodeData = findElementNextToCoords({
                x,
                y,
                direction: 'right',
                editor,
              });

              // Skip if there is no node next to coords
              if (!nodeData.resultElement) {
                return;
              }

              let domNode = nodeData.resultElement as HTMLElement;

              domNode = getOuterDomNode(view, domNode);

              // Skip if domNode is editor dom.
              if (domNode === view.dom) {
                return;
              }

              // We only want `Element`.
              if (domNode?.nodeType !== 1) {
                return;
              }

              const domNodePos = view.posAtDOM(domNode, 0);
              const outerNode = getOuterNode(editor.state.doc, domNodePos);

              if (outerNode !== currentNode) {
                const outerNodePos = getOuterNodePos(editor.state.doc, domNodePos);

                currentNode = outerNode;
                currentNodePos = outerNodePos;

                // Memorize relative position to retrieve absolute position in case of collaboration
                currentNodeRelPos = getRelativePos(view.state, currentNodePos);

                onNodeChange?.({ editor, node: currentNode, pos: currentNodePos });

                // Set nodes clientRect.
                repositionDragHandle(domNode as Element);

                showHandle();
              }
            });

            return false;
          },
        },
      },

      view: (view) => {
        element.draggable = true;
        element.style.pointerEvents = 'auto';

        element.addEventListener('dragstart', onDragStart);
        element.addEventListener('dragend', onDragEnd);

        editor.view.dom.parentElement?.appendChild(wrapper);

        wrapper.style.pointerEvents = 'none';
        wrapper.style.position = 'absolute';
        wrapper.style.top = '0';
        wrapper.style.left = '0';

        return {
          update(_, oldState) {
            if (!element) {
              return;
            }

            if (!editor.isEditable) {
              hideHandle();
              return;
            }

            // Prevent element being draggend while being open.
            if (locked) {
              element.draggable = false;
            } else {
              element.draggable = true;
            }

            // Recalculate popup position if doc has changend and drag handler is visible.
            if (view.state.doc.eq(oldState.doc) || currentNodePos === -1) {
              return;
            }

            // Get domNode from (new) position.
            let domNode = view.nodeDOM(currentNodePos) as HTMLElement;

            // Since old element could have been wrapped, we need to find
            // the outer node and take its position and node data.
            domNode = getOuterDomNode(view, domNode);

            // Skip if domNode is editor dom.
            if (domNode === view.dom) {
              return;
            }

            // We only want `Element`.
            if (domNode?.nodeType !== 1) {
              return;
            }

            const domNodePos = view.posAtDOM(domNode, 0);
            const outerNode = getOuterNode(editor.state.doc, domNodePos);
            const outerNodePos = getOuterNodePos(editor.state.doc, domNodePos); // TODO: needed?

            currentNode = outerNode;
            currentNodePos = outerNodePos;

            // Memorize relative position to retrieve absolute position in case of collaboration
            currentNodeRelPos = getRelativePos(view.state, currentNodePos);

            onNodeChange?.({ editor, node: currentNode, pos: currentNodePos });

            repositionDragHandle(domNode as Element);
          },

          // TODO: Kills even on hot reload
          destroy() {
            element.removeEventListener('dragstart', onDragStart);
            element.removeEventListener('dragend', onDragEnd);
            if (rafId) {
              cancelAnimationFrame(rafId);
              rafId = null;
              pendingMouseCoords = null;
            }

            if (element) {
              removeNode(wrapper);
            }
          },
        };
      },
    }),
    unbind: () => {
      if (element) {
        removeNode(wrapper);
      }
    },
  };
};

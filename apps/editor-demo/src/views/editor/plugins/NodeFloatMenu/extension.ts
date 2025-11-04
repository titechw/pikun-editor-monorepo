import type { ComputePositionConfig, VirtualElement } from '@floating-ui/dom';
import { offset } from '@floating-ui/dom';
import { type Editor, Extension } from '@tiptap/core';
import type { Node } from '@tiptap/pm/model';
import { NodeFloatMenuPlugin } from './plugin';

export const defaultComputePositionConfig: ComputePositionConfig = {
  placement: 'left-start',
  strategy: 'absolute',
  middleware: [offset(8)],
};
export interface NodeFloatMenuExtensionOptions {
  /**
   * Renders an element that is positioned with the floating-ui/dom package
   */
  render(): HTMLElement;
  /**
   * Configuration for position computation of the drag handle
   * using the floating-ui/dom package
   */
  computePositionConfig?: ComputePositionConfig;
  /**
   * A function that returns the virtual element for the drag handle.
   * This is useful when the menu needs to be positioned relative to a specific DOM element.
   */
  getReferencedVirtualElement?: () => VirtualElement | null;
  /**
   * Locks the draghandle in place and visibility
   */
  locked?: boolean;
  /**
   * Returns a node or null when a node is hovered over
   */
  onNodeChange?: (options: { node: Node | null; editor: Editor }) => void;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    nodeFloatMenu: {
      /**
       * Locks the draghandle in place and visibility
       */
      lockNodeFloatMenuHandle: () => ReturnType;
      /**
       * Unlocks the draghandle
       */
      unlockNodeFloatMenuHandle: () => ReturnType;
      /**
       * Toggle draghandle lock state
       */
      toggleNodeFloatMenuHandle: () => ReturnType;
    };
  }
}

export const NodeFloatMenu = Extension.create<NodeFloatMenuExtensionOptions>({
  name: 'nodeFloatMenu',

  addOptions() {
    return {
      render() {
        const element = document.createElement('div');

        element.classList.add('node-float-menu-handle');

        return element;
      },
      computePositionConfig: {},
      locked: false,
      onNodeChange: (_options: { node: Node | null; editor: Editor }) => {
        return null;
      },
      onElementDragStart: undefined,
      onElementDragEnd: undefined,
    };
  },

  addCommands() {
    return {
      lockNodeFloatMenuHandle:
        () =>
        ({ editor }) => {
          this.options.locked = true;
          return editor.commands.setMeta('lockNodeFloatMenuHandle', this.options.locked);
        },
      unlockNodeFloatMenuHandle:
        () =>
        ({ editor }) => {
          this.options.locked = false;
          return editor.commands.setMeta('lockNodeFloatMenuHandle', this.options.locked);
        },
      toggleNodeFloatMenuHandle:
        () =>
        ({ editor }) => {
          this.options.locked = !this.options.locked;
          return editor.commands.setMeta('lockNodeFloatMenuHandle', this.options.locked);
        },
    };
  },

  addProseMirrorPlugins() {
    const element = this.options.render();

    // Merge middleware arrays if both exist
    const userConfig = this.options.computePositionConfig || {};
    const mergedMiddleware = userConfig.middleware
      ? [...(defaultComputePositionConfig.middleware || []), ...userConfig.middleware]
      : defaultComputePositionConfig.middleware;

    return [
      NodeFloatMenuPlugin({
        computePositionConfig: {
          ...defaultComputePositionConfig,
          ...userConfig,
          middleware: mergedMiddleware,
        },
        getReferencedVirtualElement: this.options.getReferencedVirtualElement,
        element,
        editor: this.editor,
        onNodeChange: this.options.onNodeChange,
      }).plugin,
    ];
  },
});

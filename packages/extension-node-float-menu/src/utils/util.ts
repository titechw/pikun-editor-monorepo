import {
  absolutePositionToRelativePosition,
  relativePositionToAbsolutePosition,
  ySyncPluginKey,
} from '@tiptap/y-tiptap';
import type { EditorView } from '@pikun/pm/view';
import { type EditorState } from '@pikun/pm/state';
export const getRelativePos = (state: EditorState, absolutePos: number) => {
  const ystate = ySyncPluginKey.getState(state);

  if (!ystate) {
    return null;
  }

  return absolutePositionToRelativePosition(absolutePos, ystate.type, ystate.binding.mapping);
};

// biome-ignore lint/suspicious/noExplicitAny: y-prosemirror (and y-tiptap by extension) does not have types for relative positions
export const getAbsolutePos = (state: EditorState, relativePos: unknown) => {
  const ystate = ySyncPluginKey.getState(state);

  if (!ystate) {
    return -1;
  }

  return (
    relativePositionToAbsolutePosition(
      ystate.doc,
      ystate.type,
      relativePos,
      ystate.binding.mapping
    ) || 0
  );
};

export const getOuterDomNode = (view: EditorView, domNode: HTMLElement) => {
  let tmpDomNode = domNode;

  // Traverse to top level node.
  while (tmpDomNode?.parentNode) {
    if (tmpDomNode.parentNode === view.dom) {
      break;
    }

    tmpDomNode = tmpDomNode.parentNode as HTMLElement;
  }

  return tmpDomNode;
};

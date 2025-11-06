import { getNodeType } from '@pikun/core';
import type { Node } from '@pikun/pm/model';
import type { EditorState } from '@pikun/pm/state';

export const listItemHasSubList = (typeOrName: string, state: EditorState, node?: Node) => {
  if (!node) {
    return false;
  }

  const nodeType = getNodeType(typeOrName, state.schema);

  let hasSubList = false;

  node.descendants((child) => {
    if (child.type === nodeType) {
      hasSubList = true;
    }
  });

  return hasSubList;
};

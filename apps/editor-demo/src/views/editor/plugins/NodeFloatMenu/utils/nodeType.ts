import type { Editor } from '@tiptap/core';
import type { Node as ProseMirrorNode } from '@tiptap/pm/model';

export type NodeTypeInfo = {
  activeNodeType: string;
  headingLevel: 1 | 2 | 3 | 4 | 5 | 6 | null;
  isBulletList: boolean;
  isOrderedList: boolean;
  isCodeBlock: boolean;
  isBlockquote: boolean;
  isTaskList: boolean;
};

export const selectNodeTypeInfo = (ctx: { editor: Editor }): NodeTypeInfo => {
  const activeNode = ctx.editor.state.selection.$from.node(1);

  const headingLevel =
    (ctx.editor.isActive('heading', { level: 1 }) && 1) ||
    (ctx.editor.isActive('heading', { level: 2 }) && 2) ||
    (ctx.editor.isActive('heading', { level: 3 }) && 3) ||
    (ctx.editor.isActive('heading', { level: 4 }) && 4) ||
    (ctx.editor.isActive('heading', { level: 5 }) && 5) ||
    (ctx.editor.isActive('heading', { level: 6 }) && 6) ||
    null;

  return {
    activeNodeType: activeNode?.type.name ?? 'paragraph',
    headingLevel,
    isBulletList: ctx.editor.isActive('bulletList'),
    isOrderedList: ctx.editor.isActive('orderedList'),
    isCodeBlock: ctx.editor.isActive('codeBlock'),
    isBlockquote: ctx.editor.isActive('blockquote'),
    isTaskList: ctx.editor.isActive('taskList'),
  };
};

export const nodeToNodeTypeInfo = (node: ProseMirrorNode | null | undefined): NodeTypeInfo => {
  const name = node?.type?.name ?? 'paragraph';
  const headingLevel =
    name === 'heading' ? ((node?.attrs?.level as 1 | 2 | 3 | 4 | 5 | 6 | undefined) ?? null) : null;

  return {
    activeNodeType: name,
    headingLevel,
    isBulletList: name === 'bulletList',
    isOrderedList: name === 'orderedList',
    isCodeBlock: name === 'codeBlock',
    isBlockquote: name === 'blockquote',
    isTaskList: name === 'taskList',
  };
};

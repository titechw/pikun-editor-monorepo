import React from 'react';
import type { Editor } from '@tiptap/core';
import {
  TextIcon,
  H1Icon,
  H2Icon,
  H3Icon,
  OrderedListIcon,
  BulletListIcon,
  TodoIcon,
  CodeIcon,
  QuoteIcon,
  CalloutIcon,
  SyncedBlockIcon,
} from '../Icons';

export interface BlockTypeIconsProps {
  editor: Editor;
  activeNodeType: string;
  headingLevel: 1 | 2 | 3 | 4 | 5 | 6 | null;
  isBulletList: boolean;
  isOrderedList: boolean;
  isCodeBlock: boolean;
  isBlockquote: boolean;
  isTaskList: boolean;
  targetPos: number;
}

export function BlockTypeIcons({
  editor,
  activeNodeType,
  headingLevel,
  isBulletList,
  isOrderedList,
  isCodeBlock,
  isBlockquote,
  isTaskList,
  targetPos,
}: BlockTypeIconsProps) {
  const blockTypes = [
    {
      name: 'text',
      label: 'Text',
      icon: <TextIcon />,
      onClick: () =>
        targetPos >= 0
          ? editor.chain().setNodeSelection(targetPos).focus().setParagraph().run()
          : editor.chain().focus().setParagraph().run(),
      isActive: activeNodeType === 'paragraph',
    },
    {
      name: 'heading1',
      label: 'H1',
      icon: <H1Icon />,
      onClick: () =>
        targetPos >= 0
          ? editor.chain().setNodeSelection(targetPos).focus().toggleHeading({ level: 1 }).run()
          : editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: headingLevel === 1,
    },
    {
      name: 'heading2',
      label: 'H2',
      icon: <H2Icon />,
      onClick: () =>
        targetPos >= 0
          ? editor.chain().setNodeSelection(targetPos).focus().toggleHeading({ level: 2 }).run()
          : editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: headingLevel === 2,
    },
    {
      name: 'heading3',
      label: 'H3',
      icon: <H3Icon />,
      onClick: () =>
        targetPos >= 0
          ? editor.chain().setNodeSelection(targetPos).focus().toggleHeading({ level: 3 }).run()
          : editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: headingLevel === 3,
    },
    {
      name: 'ordered',
      label: 'Ordered List',
      icon: <OrderedListIcon />,
      onClick: () =>
        targetPos >= 0
          ? editor.chain().setNodeSelection(targetPos).focus().toggleOrderedList().run()
          : editor.chain().focus().toggleOrderedList().run(),
      isActive: isOrderedList,
    },
    {
      name: 'bullet',
      label: 'Bullet List',
      icon: <BulletListIcon />,
      onClick: () =>
        targetPos >= 0
          ? editor.chain().setNodeSelection(targetPos).focus().toggleBulletList().run()
          : editor.chain().focus().toggleBulletList().run(),
      isActive: isBulletList,
    },
    {
      name: 'todo',
      label: 'Todo List',
      icon: <TodoIcon />,
      onClick: () =>
        targetPos >= 0
          ? editor.chain().setNodeSelection(targetPos).focus().toggleTaskList?.().run?.()
          : editor.chain().focus().toggleTaskList?.().run?.(),
      isActive: isTaskList,
    },
    {
      name: 'code',
      label: 'Code Block',
      icon: <CodeIcon />,
      onClick: () =>
        targetPos >= 0
          ? editor.chain().setNodeSelection(targetPos).focus().toggleCodeBlock().run()
          : editor.chain().focus().toggleCodeBlock().run(),
      isActive: isCodeBlock,
    },
    {
      name: 'quote',
      label: 'Quote',
      icon: <QuoteIcon />,
      onClick: () =>
        targetPos >= 0
          ? editor.chain().setNodeSelection(targetPos).focus().toggleBlockquote().run()
          : editor.chain().focus().toggleBlockquote().run(),
      isActive: isBlockquote,
    },
    {
      name: 'callout',
      label: 'Callout',
      icon: <CalloutIcon />,
      onClick: () => {
        // TODO: Implement callout
      },
      isActive: false,
    },
    {
      name: 'synced',
      label: 'Synced Block',
      icon: <SyncedBlockIcon />,
      onClick: () => {
        // TODO: Implement synced block
      },
      isActive: false,
    },
  ];

  return (
    <div className="node-float-menu-panel__block-types-grid">
      {blockTypes.map((type) => (
        <button
          key={type.name}
          className={`node-float-menu-panel__block-type-btn ${
            type.isActive ? 'node-float-menu-panel__block-type-btn--active' : ''
          }`}
          onClick={type.onClick}
          aria-label={type.label}
          title={type.label}
        >
          {type.icon}
        </button>
      ))}
    </div>
  );
}

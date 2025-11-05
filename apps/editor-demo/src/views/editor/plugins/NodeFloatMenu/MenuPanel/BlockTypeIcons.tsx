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
      label: '正文',
      icon: <TextIcon />,
      onClick: () =>
        targetPos >= 0
          ? editor.chain().setNodeSelection(targetPos).focus().setParagraph().run()
          : editor.chain().focus().setParagraph().run(),
      isActive: activeNodeType === 'paragraph',
      tooltip: '正文 (⌘ + ⌥ + 0)\nMarkdown: 空行开始',
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
      tooltip: '一级标题 (⌘ + ⌥ + 1)\nMarkdown: # 空格',
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
      tooltip: '二级标题 (⌘ + ⌥ + 2)\nMarkdown: ## 空格',
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
      tooltip: '三级标题 (⌘ + ⌥ + 3)\nMarkdown: ### 空格',
    },
    {
      name: 'ordered',
      label: '有序',
      icon: <OrderedListIcon />,
      onClick: () =>
        targetPos >= 0
          ? editor.chain().setNodeSelection(targetPos).focus().toggleOrderedList().run()
          : editor.chain().focus().toggleOrderedList().run(),
      isActive: isOrderedList,
      tooltip: '有序列表 (⌘ + ⌥ + 7)\nMarkdown: 1. 空格',
    },
    {
      name: 'bullet',
      label: '无序',
      icon: <BulletListIcon />,
      onClick: () =>
        targetPos >= 0
          ? editor.chain().setNodeSelection(targetPos).focus().toggleBulletList().run()
          : editor.chain().focus().toggleBulletList().run(),
      isActive: isBulletList,
      tooltip: '无序列表 (⌘ + ⌥ + 8)\nMarkdown: - 空格',
    },
    {
      name: 'todo',
      label: '任务',
      icon: <TodoIcon />,
      onClick: () =>
        targetPos >= 0
          ? editor.chain().setNodeSelection(targetPos).focus().toggleTaskList?.().run?.()
          : editor.chain().focus().toggleTaskList?.().run?.(),
      isActive: isTaskList,
      tooltip: '任务清单 (⌘ + ⌥ + 9)\nMarkdown: [] 空格',
    },
    {
      name: 'code',
      label: '代码',
      icon: <CodeIcon />,
      onClick: () =>
        targetPos >= 0
          ? editor.chain().setNodeSelection(targetPos).focus().toggleCodeBlock().run()
          : editor.chain().focus().toggleCodeBlock().run(),
      isActive: isCodeBlock,
      tooltip: '代码块 (⌘ + ⌥ + C)\nMarkdown: ``` 代码 ```',
    },
    {
      name: 'quote',
      label: '引用',
      icon: <QuoteIcon />,
      onClick: () =>
        targetPos >= 0
          ? editor.chain().setNodeSelection(targetPos).focus().toggleBlockquote().run()
          : editor.chain().focus().toggleBlockquote().run(),
      isActive: isBlockquote,
      tooltip: '引用 (⌘ + ⌥ + Q)\nMarkdown: > 空格',
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
          data-tooltip={type.tooltip}
        >
          {type.icon}
        </button>
      ))}
    </div>
  );
}

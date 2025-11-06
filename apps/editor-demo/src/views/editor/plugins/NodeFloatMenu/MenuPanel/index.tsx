import React from 'react';
import type { Editor } from '@pikun/core';
import { BlockTypeIcons } from './BlockTypeIcons';
import { ActionMenuItems } from './ActionMenuItems';
import {
  CommentIcon,
  CutIcon,
  CopyIcon,
  TranslateIcon,
  DeleteIcon,
  ShareIcon,
  TemplateIcon,
  CopyLinkIcon,
  AddBelowIcon,
  ArrowRightIcon,
} from '../Icons';
import './MenuPanel.less';

export interface MenuPanelProps {
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

export function MenuPanel({
  editor,
  activeNodeType,
  headingLevel,
  isBulletList,
  isOrderedList,
  isCodeBlock,
  isBlockquote,
  isTaskList,
  targetPos,
}: MenuPanelProps) {
  return (
    <div className="node-float-menu-panel">
      {/* Block Type Selection */}
      <div className="node-float-menu-panel__block-types">
        <BlockTypeIcons
          editor={editor}
          activeNodeType={activeNodeType}
          headingLevel={headingLevel}
          isBulletList={isBulletList}
          isOrderedList={isOrderedList}
          isCodeBlock={isCodeBlock}
          isBlockquote={isBlockquote}
          isTaskList={isTaskList}
          targetPos={targetPos}
        />
      </div>

      <div className="node-float-menu-panel__divider" />

      {/* Actions with Submenu */}
      <ActionMenuItems editor={editor} />

      <div className="node-float-menu-panel__divider" />

      {/* Direct Actions */}
      <div className="node-float-menu-panel__actions">
        <button
          className="node-float-menu-panel__action-item"
          onClick={() => {
            // TODO: Implement comment
          }}
        >
          <span className="node-float-menu-panel__icon">
            <CommentIcon />
          </span>
          <span className="node-float-menu-panel__text">评论</span>
        </button>

        <button
          className="node-float-menu-panel__action-item"
          onClick={() => {
            document.execCommand('cut');
          }}
        >
          <span className="node-float-menu-panel__icon color-g-500">
            <CutIcon />
          </span>
          <span className="node-float-menu-panel__text">剪切</span>
        </button>

        <button
          className="node-float-menu-panel__action-item"
          onClick={() => {
            document.execCommand('copy');
          }}
        >
          <span className="node-float-menu-panel__icon color-b-500">
            <CopyIcon />
          </span>
          <span className="node-float-menu-panel__text">复制</span>
        </button>

        <button
          className="node-float-menu-panel__action-item"
          onClick={() => {
            // TODO: Implement translate
          }}
        >
          <span className="node-float-menu-panel__icon">
            <TranslateIcon />
          </span>
          <span className="node-float-menu-panel__text">翻译</span>
        </button>

        <button
          className="node-float-menu-panel__action-item node-float-menu-panel__action-item--delete"
          onClick={() => {
            if (targetPos >= 0) {
              editor.chain().setNodeSelection(targetPos).focus().deleteSelection().run();
            } else {
              editor.chain().focus().deleteSelection().run();
            }
          }}
        >
          <span className="node-float-menu-panel__icon color-r-500">
            <DeleteIcon />
          </span>
          <span className="node-float-menu-panel__text">删除</span>
        </button>
      </div>

      <div className="node-float-menu-panel__divider" />

      {/* Share Actions */}
      <div className="node-float-menu-panel__actions">
        <button
          className="node-float-menu-panel__action-item"
          onClick={() => {
            // TODO: Implement share
          }}
        >
          <span className="node-float-menu-panel__icon color-b-500">
            <ShareIcon />
          </span>
          <span className="node-float-menu-panel__text">分享</span>
        </button>

        <button
          className="node-float-menu-panel__action-item"
          onClick={() => {
            // TODO: Implement save as template
          }}
        >
          <span className="node-float-menu-panel__icon">
            <TemplateIcon />
          </span>
          <span className="node-float-menu-panel__text">保存为模板</span>
        </button>

        <button
          className="node-float-menu-panel__action-item"
          onClick={() => {
            // TODO: Implement copy link
          }}
        >
          <span className="node-float-menu-panel__icon color-b-500">
            <CopyLinkIcon />
          </span>
          <span className="node-float-menu-panel__text">复制链接</span>
        </button>
      </div>

      <div className="node-float-menu-panel__divider" />

      {/* Add Below */}
      <button
        className="node-float-menu-panel__action-item node-float-menu-panel__action-item--submenu"
        onClick={() => {
          // TODO: Implement add below menu
        }}
      >
        <span className="node-float-menu-panel__icon">
          <AddBelowIcon />
        </span>
        <span className="node-float-menu-panel__text">在下方添加</span>
        <span className="node-float-menu-panel__arrow">
          <ArrowRightIcon />
        </span>
      </button>
    </div>
  );
}

import React from 'react';
import type { Editor } from '@pikun/core';
import { AlignIcon, ColorIcon, ArrowRightIcon } from '../Icons';

export interface ActionMenuItemsProps {
  editor: Editor;
}

export function ActionMenuItems({ editor }: ActionMenuItemsProps) {
  return (
    <div className="node-float-menu-panel__actions">
      <button
        className="node-float-menu-panel__action-item node-float-menu-panel__action-item--submenu"
        onClick={() => {
          // TODO: Implement align and indent submenu
        }}
      >
        <span className="node-float-menu-panel__icon">
          <AlignIcon />
        </span>
        <span className="node-float-menu-panel__text">缩进和对齐</span>
        <span className="node-float-menu-panel__arrow">
          <ArrowRightIcon />
        </span>
      </button>

      <button
        className="node-float-menu-panel__action-item node-float-menu-panel__action-item--submenu"
        onClick={() => {
          // TODO: Implement color submenu
        }}
      >
        <span className="node-float-menu-panel__icon">
          <ColorIcon />
        </span>
        <span className="node-float-menu-panel__text">颜色</span>
        <span className="node-float-menu-panel__arrow">
          <ArrowRightIcon />
        </span>
      </button>
    </div>
  );
}

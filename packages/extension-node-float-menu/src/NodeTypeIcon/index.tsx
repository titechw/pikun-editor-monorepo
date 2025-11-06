import React from 'react';
import type { NodeTypeInfo } from '../utils/nodeType';
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
} from '../Icons';

export function NodeTypeIcon({ info }: { info: NodeTypeInfo }) {
  if (info.headingLevel) {
    const HeadingIcon = info.headingLevel === 1 ? H1Icon : info.headingLevel === 2 ? H2Icon : H3Icon;
    return <HeadingIcon />;
  }

  if (info.isBulletList) {
    return <BulletListIcon />;
  }

  if (info.isOrderedList) {
    return <OrderedListIcon />;
  }

  if (info.isBlockquote) {
    return <QuoteIcon />;
  }

  if (info.isCodeBlock) {
    return <CodeIcon />;
  }

  if (info.isTaskList) {
    return <TodoIcon />;
  }

  return <TextIcon />;
}

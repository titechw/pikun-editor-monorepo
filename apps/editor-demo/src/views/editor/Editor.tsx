import Collaboration from '@pikun/extension-collaboration';
import CollaborationCaret from '@pikun/extension-collaboration-caret';
import Highlight from '@pikun/extension-highlight';
import { TaskItem, TaskList } from '@pikun/extension-list';
import { CharacterCount } from '@pikun/extensions';
import { EditorContent, useEditor } from '@pikun/react';
import StarterKit from '@pikun/starter-kit';
import { TiptapCollabProvider } from '@hocuspocus/provider';
import * as Y from 'yjs';
import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { NodeFloatMenu } from '@pikun/extension-node-float-menu';
import { MenuBar } from './MenuBar';
import { authStore } from '../../stores/auth.store';

const defaultContent = `
  <p>Hi 👋, this is a collaborative document.</p>
  <p>Feel free to edit and collaborate in real-time!</p>
`;

// 根据用户 ID 生成稳定的颜色
const getUserColor = (userId: number): string => {
  const colors = [
    '#958DF1',
    '#F98181',
    '#FBBC88',
    '#FAF594',
    '#70CFF8',
    '#94FADB',
    '#B9F18D',
    '#C3E2C2',
    '#EAECCC',
    '#AFC8AD',
    '#EEC759',
    '#9BB8CD',
    '#FF90BC',
    '#FFC0D9',
    '#DC8686',
    '#7ED7C1',
    '#F3EEEA',
    '#89B9AD',
    '#D0BFFF',
    '#FFF8C9',
    '#CBFFA9',
    '#9BABB8',
    '#E3F4F4',
  ];
  return colors[userId % colors.length];
};

export const Editor = observer(
  ({ provider, ydoc }: { provider: TiptapCollabProvider; ydoc: Y.Doc }) => {
    // 从 authStore 获取真实的用户信息
    const currentUser = useMemo(() => {
      if (authStore.user) {
        return {
          name: authStore.user.name,
          color: getUserColor(authStore.user.uid),
        };
      }
      // 如果没有登录用户，使用默认值（不应该发生，但作为后备）
      return {
        name: 'Anonymous',
        color: '#958DF1',
      };
    }, [authStore.user]);
    const editor = useEditor({
      enableContentCheck: true,
      onContentError: ({ disableCollaboration }) => {
        disableCollaboration();
      },
      onCreate: ({ editor: currentEditor }) => {
        provider.on('synced', () => {
          console.log('defaultContent:', defaultContent);
          if (currentEditor.isEmpty) {
            currentEditor.commands.setContent(defaultContent);
          }
        });
      },
      extensions: [
        StarterKit.configure({
          undoRedo: false,
        }),
        Highlight,
        TaskList,
        TaskItem,
        CharacterCount.extend().configure({
          limit: 10000,
        }),
        Collaboration.extend().configure({
          document: ydoc,
        }),
        CollaborationCaret.extend().configure({
          provider,
        }),
      ],
    });
    // (optional) listen provider status if needed

    // Save current user to localStorage and emit to editor
    useEffect(() => {
      if (editor && currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        editor.chain().focus().updateUser(currentUser).run();
      }
    }, [editor, currentUser]);

    // Optionally set user name via UI when needed

    if (!editor) {
      return null;
    }

    return (
      <div className="column-half">
        <MenuBar editor={editor} />

        <EditorContent editor={editor} className="main-group" />

        {/* Handles marks: bold, italic, etc. using a bubble menu */}
        {/* <TextMenu editor={editor} /> */}
        {/* Handles nodes: headings, lists, etc. using a floating menu */}
        {/* <InsertMenu editor={editor} /> */}
        <NodeFloatMenu editor={editor} onNodeChange={() => {}}></NodeFloatMenu>
      </div>
    );
  },
);

import Collaboration from '@pikun/extension-collaboration';
import CollaborationCaret from '@pikun/extension-collaboration-caret';
import Highlight from '@pikun/extension-highlight';
import { TaskItem, TaskList } from '@pikun/extension-list';
import { CharacterCount } from '@pikun/extensions';
import { EditorContent, useEditor } from '@pikun/react';
import StarterKit from '@pikun/starter-kit';
import { TiptapCollabProvider } from '@hocuspocus/provider';
import * as Y from 'yjs';
import React, { useEffect, useState } from 'react';

import { getInitialUser } from './utils/getRandamUsers';
import { MenuBar } from './MenuBar';
import { NodeFloatMenu } from './plugins/NodeFloatMenu';

const defaultContent = `
  <p>Hi 👋, this is a collaborative document.</p>
  <p>Feel free to edit and collaborate in real-time!</p>
`;

export const Editor = ({ provider, ydoc }: { provider: TiptapCollabProvider; ydoc: Y.Doc }) => {
  const [currentUser] = useState(getInitialUser);
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
};

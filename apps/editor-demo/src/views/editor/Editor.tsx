import { TiptapCollabProvider } from '@hocuspocus/provider'
import { useState } from 'react';
import * as Y from 'yjs'
import { getInitialUser } from './utils/getRandamUsers';
import { EditorContent, useEditor } from '@tiptap/react'

export const Editor = ({ provider, ydoc, room }: {
    provider: TiptapCollabProvider
    ydoc: Y.Doc
    room: string
}) => {
    const [status, setStatus] = useState('connecting')
    const [currentUser, setCurrentUser] = useState(getInitialUser)
    const editor = useEditor({
        enableContentCheck: true,
        onContentError: ({ disableCollaboration }) => {
          disableCollaboration()
        },
        onCreate: ({ editor: currentEditor }) => {
          provider.on('synced', () => {
            if (currentEditor.isEmpty) {
              currentEditor.commands.setContent(defaultContent)
            }
          })
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
      })
    return <div>Editor</div>;     
};
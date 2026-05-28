'use client'

import type { EditorView } from '@prosekit/pm/view'
import type { Transaction } from '@prosekit/pm/state'
import { ProseMirror } from '@handlewithcare/react-prosemirror'
import {
  createElement,
  useCallback,
  useSyncExternalStore,
  type ComponentType,
  type ReactNode,
} from 'react'

import { EditorContextProvider } from '../contexts/editor-context.ts'
import type {
  ReactBindingEditor,
  ReactBindingEditorSnapshot,
} from '../editor/react-binding-editor.ts'

import { ViewMountHandler } from './view-mount-handler.ts'

export interface ProseKitProps {
  editor: ReactBindingEditor
  children?: ReactNode
}

function useEditorBindingSnapshot(editor: ReactBindingEditor): ReactBindingEditorSnapshot {
  return useSyncExternalStore(
    (onStoreChange) => editor.subscribe((event) => {
      if (event === 'state' || event === 'plugins' || event === 'views') {
        onStoreChange()
      }
    }),
    editor.getSnapshot,
    editor.getSnapshot,
  )
}

export const ProseKit: ComponentType<ProseKitProps> = (props) => {
  const { editor, children } = props
  const snapshot = useEditorBindingSnapshot(editor)

  const handleTransaction = useCallback(
    function (this: unknown, tr: Transaction) {
      editor.onTransaction(tr)
    },
    [editor],
  )

  const handleViewMount = useCallback(
    (view: EditorView) => {
      editor.attachView(view)
    },
    [editor],
  )

  const handleViewUnmount = useCallback(
    (view: EditorView) => {
      editor.detachView(view)
    },
    [editor],
  )

  return createElement(
    EditorContextProvider,
    { value: editor },
    createElement(
      ProseMirror,
      {
        state: snapshot.state,
        dispatchTransaction: handleTransaction,
        nodeViewComponents: snapshot.nodeViewComponents,
        markViewComponents: snapshot.markViewComponents,
      },
      createElement(ViewMountHandler, {
        onMount: handleViewMount,
        onUnmount: handleViewUnmount,
      }),
      children,
    ),
  )
}

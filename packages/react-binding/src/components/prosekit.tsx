'use client'

import type { EditorView } from '@prosekit/pm/view'
import type { Transaction } from '@prosekit/pm/state'
import { ProseMirror, ProseMirrorDoc, reactKeys } from '@handlewithcare/react-prosemirror'
import {
  createElement,
  useCallback,
  useMemo,
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

function ensureReactKeys(plugins: readonly any[]): readonly any[] {
  const hasReactKeys = plugins.some(
    (p: any) => p.spec?.key?.startsWith?.('@handlewithcare/react-prosemirror'),
  )
  if (hasReactKeys) {
    return plugins
  }
  return [reactKeys(), ...plugins]
}

function useEditorBindingSnapshot(editor: ReactBindingEditor): ReactBindingEditorSnapshot {
  return useSyncExternalStore(
    (onStoreChange) => editor.subscribe(() => onStoreChange()),
    editor.getSnapshot,
    editor.getSnapshot,
  )
}

export const ProseKit: ComponentType<ProseKitProps> = (props) => {
  const { editor, children } = props
  const snapshot = useEditorBindingSnapshot(editor)

  const plugins = useMemo(
    () => ensureReactKeys(snapshot.plugins),
    [snapshot.plugins],
  )

  const handleTransaction = useCallback(
    function (_this: unknown, tr: Transaction) {
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
        plugins,
        dispatchTransaction: handleTransaction as (this: any, tr: Transaction) => void,
        nodeViewComponents: snapshot.nodeViewComponents,
        markViewComponents: snapshot.markViewComponents,
      },
      createElement(ViewMountHandler, {
        onMount: handleViewMount,
        onUnmount: handleViewUnmount,
      }),
      createElement(ProseMirrorDoc),
      children,
    ),
  )
}

'use client'

import { useCallback } from 'react'
import { useMemo } from 'react'
import {
  useDocChange,
  useEditor,
  useEditorDerivedValue,
  useKeymap,
} from '@prosekit/react-binding'

import type { EditorExtension } from './extension.ts'

function getToolbarState(editor: ReturnType<typeof useEditor<EditorExtension>>) {
  return {
    boldActive: editor.marks.bold.isActive(),
    boldEnabled: editor.commands.toggleBold.canExec(),
    italicActive: editor.marks.italic.isActive(),
    italicEnabled: editor.commands.toggleItalic.canExec(),
  }
}

export function Toolbar() {
  const editor = useEditor<EditorExtension>()
  const state = useEditorDerivedValue(getToolbarState)

  const keymap = useMemo(() => ({
    'Mod-b': () => editor.commands.toggleBold(),
    'Mod-i': () => editor.commands.toggleItalic(),
  }), [editor])

  useKeymap(keymap)

  const saveDraft = useCallback(() => {
    localStorage.setItem(
      'react-binding-full-example',
      JSON.stringify(editor.getDocJSON()),
    )
  }, [editor])

  const saveKeymap = useMemo(() => ({
    'Mod-s': () => {
      saveDraft()
      return true
    },
  }), [saveDraft])

  useKeymap(saveKeymap)

  useDocChange(() => {
    saveDraft()
  })

  return (
    <div className="CSS_TOOLBAR">
      <button
        type="button"
        className="rounded border px-3 py-1.5 text-sm"
        disabled={!state.boldEnabled}
        data-active={state.boldActive}
        onClick={() => editor.commands.toggleBold()}
      >
        Bold
      </button>
      <button
        type="button"
        className="rounded border px-3 py-1.5 text-sm"
        disabled={!state.italicEnabled}
        data-active={state.italicActive}
        onClick={() => editor.commands.toggleItalic()}
      >
        Italic
      </button>
    </div>
  )
}

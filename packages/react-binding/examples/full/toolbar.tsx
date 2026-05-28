'use client'

import {
  useDocChange,
  useEditor,
  useEditorDerivedValue,
  useKeymap,
} from '@prosekit/react-binding'
import { useCallback, useMemo } from 'react'

function getToolbarState(editor: ReturnType<typeof useEditor>) {
  return {
    boldActive: editor.marks.bold.isActive(),
    boldEnabled: editor.commands.toggleBold.canExec(),
    italicActive: editor.marks.italic.isActive(),
    italicEnabled: editor.commands.toggleItalic.canExec(),
  }
}

export function Toolbar() {
  const editor = useEditor()
  const state = useEditorDerivedValue(getToolbarState)

  const keymap = useMemo(() => ({
    'Mod-b': () => editor.commands.toggleBold(),
    'Mod-i': () => editor.commands.toggleItalic(),
  }), [editor])

  useKeymap(keymap)

  const saveDraft = useCallback(() => {
    localStorage.setItem('react-binding-doc', JSON.stringify(editor.getDocJSON()))
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
    <div className="toolbar">
      <button
        type="button"
        disabled={!state.boldEnabled}
        data-active={state.boldActive}
        onClick={() => editor.commands.toggleBold()}
      >
        Bold
      </button>
      <button
        type="button"
        disabled={!state.italicEnabled}
        data-active={state.italicActive}
        onClick={() => editor.commands.toggleItalic()}
      >
        Italic
      </button>
    </div>
  )
}

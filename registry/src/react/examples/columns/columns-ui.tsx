'use client'

import 'prosekit/extensions/columns/style.css'

import type { Editor } from 'prosekit/core'
import { findParentColumn } from 'prosekit/extensions/columns'
import { useEditor, useEditorDerivedValue } from 'prosekit/react'
import { useEffect, useMemo, useRef, useState } from 'react'

import Button from '../../ui/button/button.tsx'

import type { EditorExtension } from './extension.ts'

interface ColumnMenuRect {
  x: number
  y: number
}

interface OverlayBounds {
  left: number
  top: number
  right: number
  bottom: number
}

function getColumnMenuState(
  editor: Editor<EditorExtension>,
): {
  rect: ColumnMenuRect
  addBefore: { canExec: boolean; command: () => void }
  addAfter: { canExec: boolean; command: () => void }
  remove: { canExec: boolean; command: () => void }
  distribute: { canExec: boolean; command: () => void }
} | null {
  const found = findParentColumn(editor.state.selection.$anchor)
  if (!found) return null

  const dom = editor.view.nodeDOM(found.pos)
  if (!(dom instanceof HTMLElement)) return null

  const rect = dom.getBoundingClientRect()

  return {
    rect: {
      x: rect.left + rect.width / 2,
      y: rect.top,
    },
    addBefore: {
      canExec: editor.commands.addColumnBefore.canExec(),
      command: () => {
        editor.commands.addColumnBefore()
        editor.focus()
      },
    },
    addAfter: {
      canExec: editor.commands.addColumnAfter.canExec(),
      command: () => {
        editor.commands.addColumnAfter()
        editor.focus()
      },
    },
    remove: {
      canExec: editor.commands.removeColumn.canExec(),
      command: () => {
        editor.commands.removeColumn()
        editor.focus()
      },
    },
    distribute: {
      canExec: editor.commands.distributeColumns.canExec(),
      command: () => {
        editor.commands.distributeColumns()
        editor.focus()
      },
    },
  }
}

function getOverlayBounds(editor: Editor<EditorExtension>): OverlayBounds | null {
  if (!editor.mounted) return null
  const scrolling = editor.view.dom.parentElement
  if (!(scrolling instanceof HTMLElement)) return null

  const rect = scrolling.getBoundingClientRect()
  return {
    left: rect.left,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
  }
}

export default function ColumnsUi() {
  const editor = useEditor<EditorExtension>()
  const inlineMenuRef = useRef<HTMLDivElement | null>(null)
  const [focused, setFocused] = useState(() => editor.focused)

  const menuState = useEditorDerivedValue(
    useMemo(() => {
      return (currentEditor: Editor<EditorExtension>) => getColumnMenuState(currentEditor)
    }, []),
  )

  const overlayBounds = useEditorDerivedValue(
    useMemo(() => {
      return (currentEditor: Editor<EditorExtension>) => getOverlayBounds(currentEditor)
    }, []),
  )

  useEffect(() => {
    if (!editor.mounted) return

    const view = editor.view

    const handleFocusIn = () => {
      setFocused(true)
    }

    const handleFocusOut = () => {
      queueMicrotask(() => {
        setFocused(editor.focused)
      })
    }

    view.dom.addEventListener('focusin', handleFocusIn)
    view.dom.addEventListener('focusout', handleFocusOut)

    return () => {
      view.dom.removeEventListener('focusin', handleFocusIn)
      view.dom.removeEventListener('focusout', handleFocusOut)
    }
  }, [editor])

  if (!focused || !menuState || !overlayBounds) return null

  return (
    <div
      ref={inlineMenuRef}
      style={{
        position: 'fixed',
        left: `${
          Math.min(
            Math.max(menuState.rect.x, overlayBounds.left + 72),
            overlayBounds.right - 72,
          )
        }px`,
        top: `${Math.max(menuState.rect.y - 40, overlayBounds.top + 8)}px`,
        transform: 'translate(-50%, -100%)',
        zIndex: 21,
      }}
    >
      <div className="CSS_INLINE_MENU_MAIN_POPUP">
        <Button
          pressed={false}
          disabled={!menuState.addBefore.canExec}
          onClick={menuState.addBefore.command}
          tooltip="Add column before"
        >
          <div className="CSS_ICON_ARROW_LEFT"></div>
        </Button>
        <Button
          pressed={false}
          disabled={!menuState.addAfter.canExec}
          onClick={menuState.addAfter.command}
          tooltip="Add column after"
        >
          <div className="CSS_ICON_PLUS"></div>
        </Button>
        <Button
          pressed={false}
          disabled={!menuState.distribute.canExec}
          onClick={menuState.distribute.command}
          tooltip="Equalize columns"
        >
          <span className="text-sm leading-none">=</span>
        </Button>
        <Button
          pressed={false}
          disabled={!menuState.remove.canExec}
          onClick={menuState.remove.command}
          tooltip="Remove column"
        >
          <div className="CSS_ICON_MINUS"></div>
        </Button>
      </div>
    </div>
  )
}

import type {
  Editor,
  Keymap,
} from 'prosekit/core'
import {
  useEditor,
  useEditorDerivedValue,
  useKeymap,
} from 'prosekit/react'
import { InlinePopover } from 'prosekit/react/inline-popover'
import {
  useMemo,
  useState,
} from 'react'

import { Button } from '../../ui/button'

import type { EditorExtension } from './extension'

const colors = [
  { label: 'red', value: '#ef4444' },
  { label: 'orange', value: '#f97316' },
  { label: 'yellow', value: '#eab308' },
  { label: 'green', value: '#22c55e' },
  { label: 'blue', value: '#3b82f6' },
  { label: 'indigo', value: '#6366f1' },
  { label: 'violet', value: '#a855f7' },
]

function hasTextColor(editor: Editor<EditorExtension>, color: string) {
  return editor.marks.textColor.isActive({ color })
}

function getColorState(editor: Editor<EditorExtension>) {
  return colors.map((color) => ({
    name: color.name,
    value: color.value,
    isActive: hasTextColor(editor, color.value),
  }))
}

export default function InlineMenu() {
  const editor = useEditor<EditorExtension>()
  const colorState = useEditorDerivedValue(getColorState)
  const [open, setOpen] = useState(false)

  const toggleTextColor = (color: string) => {
    if (!color || hasTextColor(editor, color)) {
      editor.commands.removeTextColor()
    } else {
      editor.commands.addTextColor({ color })
    }
  }

  const keymap: Keymap = useMemo(() => ({
    Escape: () => {
      if (open) {
        setOpen(false)
        return true
      }
      return false
    },
  }), [open])

  useKeymap(keymap)

  return (
    <InlinePopover
      className="CSS_INLINE_MENU_MAIN"
      open={open}
      onOpenChange={setOpen}
    >
      {colorState.map((color) => (
        <Button
          key={color.name}
          pressed={color.isActive}
          tooltip={color.name}
          onClick={() => toggleTextColor(color.value)}
        >
          <span style={{ color: color.value }}>A</span>
        </Button>
      ))}
    </InlinePopover>
  )
}

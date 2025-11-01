import type { Editor } from 'prosekit/core'
import {
  useEditor,
  useEditorDerivedValue,
  useKeymap,
} from 'prosekit/react'
import { InlinePopover } from 'prosekit/react/inline-popover'
import { useState } from 'react'

import { Button } from '../../ui/button'

import type { EditorExtension } from './extension'

const colors = [
  { name: 'default', value: '' },
  { name: 'red', value: '#ef4444' },
  { name: 'orange', value: '#f97316' },
  { name: 'yellow', value: '#eab308' },
  { name: 'green', value: '#22c55e' },
  { name: 'blue', value: '#3b82f6' },
  { name: 'indigo', value: '#6366f1' },
  { name: 'violet', value: '#a855f7' },
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
      editor.commands.setTextColor({ color })
    }
  }

  useKeymap({
    Escape: () => {
      if (open) {
        setOpen(false)
        return true
      }
      return false
    },
  })

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

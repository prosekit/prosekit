import type {
  Editor,
  Keymap,
} from 'prosekit/core'
import {
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

function getColorState(editor: Editor<EditorExtension>) {
  return [{
    label: 'default',
    value: 'unset',
    isActive: !editor.marks.textColor.isActive(),
    onClick: () => editor.commands.removeTextColor(),
  }].concat(colors.map((color) => ({
    label: color.label,
    value: color.value,
    isActive: editor.marks.textColor.isActive({ color: color.value }),
    onClick: () => editor.commands.addTextColor({ color: color.value }),
  })))
}

export default function InlineMenu() {
  const colorState = useEditorDerivedValue(getColorState)
  const [open, setOpen] = useState(false)

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
          key={color.label}
          pressed={color.isActive}
          tooltip={color.label}
          onClick={color.onClick}
        >
          <span style={{ color: color.value }}>A</span>
        </Button>
      ))}
    </InlinePopover>
  )
}

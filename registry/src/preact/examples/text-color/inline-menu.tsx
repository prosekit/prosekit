import {
  useMemo,
  useState,
} from 'preact/hooks'
import type {
  Editor,
  Keymap,
} from 'prosekit/core'
import {
  useEditorDerivedValue,
  useKeymap,
} from 'prosekit/preact'
import { InlinePopover } from 'prosekit/preact/inline-popover'

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

function getTextColorState(editor: Editor<EditorExtension>) {
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

function getBackgroundColorState(editor: Editor<EditorExtension>) {
  return [{
    label: 'default',
    value: 'unset',
    isActive: !editor.marks.backgroundColor.isActive(),
    onClick: () => editor.commands.removeBackgroundColor(),
  }].concat(colors.map((color) => ({
    label: color.label,
    value: color.value,
    isActive: editor.marks.backgroundColor.isActive({ color: color.value }),
    onClick: () => editor.commands.addBackgroundColor({ color: color.value }),
  })))
}

export default function InlineMenu() {
  const textColorState = useEditorDerivedValue(getTextColorState)
  const backgroundColorState = useEditorDerivedValue(getBackgroundColorState)
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
      <div className="flex flex-col gap-2 p-2">
        <div className="flex gap-1">
          {textColorState.map((color) => (
            <Button
              key={color.label}
              pressed={color.isActive}
              tooltip={`Text: ${color.label}`}
              onClick={color.onClick}
            >
              <span style={{ color: color.value }}>A</span>
            </Button>
          ))}
        </div>
        <div className="flex gap-1">
          {backgroundColorState.map((color) => (
            <Button
              key={color.label}
              pressed={color.isActive}
              tooltip={`Background: ${color.label}`}
              onClick={color.onClick}
            >
              <span style={{ backgroundColor: color.value, padding: '0 4px' }}>A</span>
            </Button>
          ))}
        </div>
      </div>
    </InlinePopover>
  )
}

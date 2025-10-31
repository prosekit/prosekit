import type { Editor } from 'prosekit/core'
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

import Button from './button'
import type { EditorExtension } from './extension'

type ColorConfig = {
  name: string
  value: string
}

type ColorItem = ColorConfig & {
  markValue: string | null
  isActive: boolean
  canExec: boolean
}

const COLORS: ColorConfig[] = [
  { name: 'default', value: '' },
  { name: 'red', value: '#ef4444' },
  { name: 'orange', value: '#f97316' },
  { name: 'yellow', value: '#eab308' },
  { name: 'green', value: '#22c55e' },
  { name: 'blue', value: '#3b82f6' },
  { name: 'indigo', value: '#6366f1' },
  { name: 'violet', value: '#a855f7' },
]

function getColorItems(editor: Editor<EditorExtension>): ColorItem[] {
  return COLORS.map((color) => {
    const markValue = color.value || null
    const isActive = editor.marks.textColor.isActive({
      color: markValue,
    })
    const canExec = markValue
      ? editor.commands.setTextColor.canExec({ color: markValue })
      : editor.commands.removeTextColor.canExec()

    return {
      ...color,
      markValue,
      isActive,
      canExec,
    }
  })
}

export default function InlineMenu() {
  const editor = useEditor<EditorExtension>()
  const colorItems = useEditorDerivedValue(getColorItems)

  const [open, setOpen] = useState(false)

  useKeymap(
    useMemo(
      () => ({
        Escape: () => {
          if (open) {
            setOpen(false)
            return true
          }
          return false
        },
      }),
      [open],
    ),
  )

  const toggleTextColor = (item: ColorItem) => {
    if (!item.markValue || item.isActive) {
      editor.commands.removeTextColor()
    } else {
      editor.commands.setTextColor({ color: item.markValue })
    }
    editor.focus()
  }

  return (
    <InlinePopover
      className="CSS_INLINE_MENU_MAIN"
      open={open}
      onOpenChange={setOpen}
    >
      {colorItems.map((item) => (
        <Button
          key={item.name}
          pressed={item.isActive}
          disabled={!item.canExec}
          tooltip={item.name}
          onClick={() => toggleTextColor(item)}
        >
          <span style={{ color: item.value || undefined }}>A</span>
        </Button>
      ))}
    </InlinePopover>
  )
}

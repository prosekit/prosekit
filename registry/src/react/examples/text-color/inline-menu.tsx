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

const textColors = [
  { label: 'Gray', value: '#9ca3af' },
  { label: 'Brown', value: '#92400e' },
  { label: 'Orange', value: '#ea580c' },
  { label: 'Yellow', value: '#ca8a04' },
  { label: 'Green', value: '#16a34a' },
  { label: 'Blue', value: '#2563eb' },
  { label: 'Purple', value: '#9333ea' },
  { label: 'Magenta', value: '#c026d3' },
  { label: 'Red', value: '#dc2626' },
]

const backgroundColors = [
  { label: 'Gray', value: '#f3f4f6' },
  { label: 'Brown', value: '#fef3c7' },
  { label: 'Orange', value: '#ffedd5' },
  { label: 'Yellow', value: '#fef9c3' },
  { label: 'Green', value: '#d1fae5' },
  { label: 'Blue', value: '#dbeafe' },
  { label: 'Purple', value: '#e9d5ff' },
  { label: 'Pink', value: '#fce7f3' },
  { label: 'Red', value: '#fecaca' },
]

function getTextColorState(editor: Editor<EditorExtension>) {
  return [{
    label: 'Default',
    value: 'currentColor',
    isActive: !editor.marks.textColor.isActive(),
    onClick: () => editor.commands.removeTextColor(),
  }].concat(textColors.map((color) => ({
    label: color.label,
    value: color.value,
    isActive: editor.marks.textColor.isActive({ color: color.value }),
    onClick: () => editor.commands.addTextColor({ color: color.value }),
  })))
}

function getBackgroundColorState(editor: Editor<EditorExtension>) {
  return [{
    label: 'Default',
    value: 'canvas',
    isActive: !editor.marks.backgroundColor.isActive(),
    onClick: () => editor.commands.removeBackgroundColor(),
  }].concat(
    backgroundColors.map((color) => ({
      label: color.label,
      value: color.value,
      isActive: editor.marks.backgroundColor.isActive({ color: color.value }),
      onClick: () => editor.commands.addBackgroundColor({ color: color.value }),
    })),
  )
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
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-2">
          <div className="text-sm">Text color</div>
          <div className="grid grid-cols-5 gap-1">
            {textColorState.map((color) => (
              <Button
                key={color.label}
                pressed={color.isActive}
                tooltip={`Text: ${color.label}`}
                onClick={color.onClick}
              >
                <span
                  className="text-base font-medium"
                  style={{ color: color.value }}
                >
                  A
                </span>
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm">Background color</div>
          <div className="grid grid-cols-5 gap-1">
            {backgroundColorState.map((color) => (
              <Button
                key={color.label}
                pressed={color.isActive}
                tooltip={`Background: ${color.label}`}
                onClick={color.onClick}
              >
                <div
                  className="w-6 h-6 rounded border border-gray-200 dark:border-gray-700"
                  style={{ backgroundColor: color.value }}
                />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </InlinePopover>
  )
}

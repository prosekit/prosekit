import type { Editor, Keymap } from 'prosekit/core'
import { useEditorDerivedValue, useKeymap } from 'prosekit/solid'
import { InlinePopover } from 'prosekit/solid/inline-popover'
import { createSignal, For, type JSX } from 'solid-js'

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
  return [
    {
      label: 'Default',
      value: 'currentColor',
      isActive: !editor.marks.textColor.isActive(),
      onClick: () => editor.commands.removeTextColor(),
    },
  ].concat(
    textColors.map((color) => ({
      label: color.label,
      value: color.value,
      isActive: editor.marks.textColor.isActive({ color: color.value }),
      onClick: () => editor.commands.addTextColor({ color: color.value }),
    })),
  )
}

function getBackgroundColorState(editor: Editor<EditorExtension>) {
  return [
    {
      label: 'Default',
      value: 'canvas',
      isActive: !editor.marks.backgroundColor.isActive(),
      onClick: () => editor.commands.removeBackgroundColor(),
    },
  ].concat(
    backgroundColors.map((color) => ({
      label: color.label,
      value: color.value,
      isActive: editor.marks.backgroundColor.isActive({ color: color.value }),
      onClick: () => editor.commands.addBackgroundColor({ color: color.value }),
    })),
  )
}

export default function InlineMenu(): JSX.Element {
  const textColorState = useEditorDerivedValue(getTextColorState)
  const backgroundColorState = useEditorDerivedValue(getBackgroundColorState)
  const [open, setOpen] = createSignal(false)

  const keymap: () => Keymap = () => ({
    Escape: () => {
      if (open()) {
        setOpen(false)
        return true
      }
      return false
    },
  })

  useKeymap(keymap)

  return (
    <InlinePopover
      class="CSS_INLINE_MENU_MAIN"
      open={open()}
      onOpenChange={setOpen}
    >
      <div class="flex flex-col gap-4 p-4">
        <div class="flex flex-col gap-2">
          <div class="text-sm">Text color</div>
          <div class="grid grid-cols-5 gap-1">
            <For each={textColorState()}>
              {(color) => (
                <Button
                  pressed={color.isActive}
                  tooltip={`Text: ${color.label}`}
                  onClick={color.onClick}
                >
                  <span
                    class="text-base font-medium"
                    style={{ color: color.value }}
                  >
                    A
                  </span>
                </Button>
              )}
            </For>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div class="text-sm">Background color</div>
          <div class="grid grid-cols-5 gap-1">
            <For each={backgroundColorState()}>
              {(color) => (
                <Button
                  pressed={color.isActive}
                  tooltip={`Background: ${color.label}`}
                  onClick={color.onClick}
                >
                  <div
                    class="w-6 h-6 rounded border border-gray-200 dark:border-gray-700"
                    style={{ 'background-color': color.value }}
                  />
                </Button>
              )}
            </For>
          </div>
        </div>
      </div>
    </InlinePopover>
  )
}

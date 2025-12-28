<script setup lang="ts">
import type { Editor } from 'prosekit/core'
import {
  useEditorDerivedValue,
  useKeymap,
} from 'prosekit/vue'
import { InlinePopover } from 'prosekit/vue/inline-popover'
import { ref } from 'vue'

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

const textColorState = useEditorDerivedValue(getTextColorState)
const backgroundColorState = useEditorDerivedValue(getBackgroundColorState)
const open = ref(false)

useKeymap({
  Escape: () => {
    if (open.value) {
      open.value = false
      return true
    }
    return false
  },
})
</script>

<template>
  <InlinePopover
    class="CSS_INLINE_MENU_MAIN"
    :open="open"
    @open-change="(value) => open = value"
  >
    <div class="flex flex-col gap-4 p-4">
      <div class="flex flex-col gap-2">
        <div class="text-sm">
          Text color
        </div>
        <div class="grid grid-cols-5 gap-1">
          <Button
            v-for="color in textColorState"
            :key="color.label"
            :pressed="color.isActive"
            :tooltip="`Text: ${color.label}`"
            @click="color.onClick"
          >
            <span
              class="text-base font-medium"
              :style="{ color: color.value }"
            >
              A
            </span>
          </Button>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="text-sm">
          Background color
        </div>
        <div class="grid grid-cols-5 gap-1">
          <Button
            v-for="color in backgroundColorState"
            :key="color.label"
            :pressed="color.isActive"
            :tooltip="`Background: ${color.label}`"
            @click="color.onClick"
          >
            <div
              class="w-6 h-6 rounded border border-gray-200 dark:border-gray-700"
              :style="{ backgroundColor: color.value }"
            />
          </Button>
        </div>
      </div>
    </div>
  </InlinePopover>
</template>

<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/vue'
import { InlinePopover } from 'prosekit/vue/inline-popover'
import type { EditorExtension } from './extension'
import Toggle from './button.vue'

const editor = useEditor<EditorExtension>({ update: true })
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

const hasTextColor = (color: string) => {
  return editor.value.marks.textColor.isActive({ color })
}

const toggleTextColor = (color: string) => {
  if (!color || hasTextColor(color)) {
    editor.value.commands.removeTextColor()
  } else {
    editor.value.commands.setTextColor({ color })
  }
}
</script>

<template>
  <InlinePopover :class="Themes.INLINE_MENU_MAIN">
    <Toggle
      v-for="color in colors"
      :key="color.name"
      :pressed="hasTextColor(color.value)"
      :onClick="() => toggleTextColor(color.value)"
      :tooltip="color.name"
    >
      <span :style="{ color: color.value }">A</span>
    </Toggle>
  </InlinePopover>
</template>

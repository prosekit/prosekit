<script setup lang="ts">
import type { Editor } from 'prosekit/core'
import {
  useEditor,
  useEditorDerivedValue,
  useKeymap,
} from 'prosekit/vue'
import { InlinePopover } from 'prosekit/vue/inline-popover'
import { ref } from 'vue'

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

const editor = useEditor<EditorExtension>()
const colorState = useEditorDerivedValue(getColorState)
const open = ref(false)

function toggleTextColor(color: string) {
  if (!color || hasTextColor(editor.value, color)) {
    editor.value.commands.removeTextColor()
  } else {
    editor.value.commands.setTextColor({ color })
  }
}

function handleOpenChange(value: boolean) {
  open.value = value
}

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
    @open-change="handleOpenChange"
  >
    <Button
      v-for="color in colorState"
      :key="color.name"
      :pressed="color.isActive"
      :on-click="() => toggleTextColor(color.value)"
      :tooltip="color.name"
    >
      <span :style="{ color: color.value }">A</span>
    </Button>
  </InlinePopover>
</template>

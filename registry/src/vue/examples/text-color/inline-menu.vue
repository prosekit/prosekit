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

const colorState = useEditorDerivedValue(getColorState)
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
    <Button
      v-for="color in colorState"
      :key="color.label"
      :pressed="color.isActive"
      :tooltip="color.label"
      @click="color.onClick"
    >
      <span :style="{ color: color.value }">A</span>
    </Button>
  </InlinePopover>
</template>

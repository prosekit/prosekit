<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import { InlinePopover } from 'prosekit/vue/inline-popover'
import InlineButtons from './inline-buttons.vue'
import { effect, ref } from 'vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>()
const customColor = ref('')
const open = ref(false)
const handleOpenChange = (value: boolean) => {
  open.value = value
  if (!open.value) {
    customColor.value = ''
  }
}

effect(() => {
  const color = customColor.value
  if (color) {
    editor.value.commands.addTextColor({ color })
  }
})
</script>

<template>
  <InlinePopover
    :editor="editor"
    :open="open"
    :onOpenChange="handleOpenChange"
    class="INLINE_MENU"
  >
    <InlineButtons v-model="customColor" />
  </InlinePopover>
</template>

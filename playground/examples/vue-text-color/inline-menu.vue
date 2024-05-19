<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import { InlinePopover } from 'prosekit/vue/inline-popover'
import { effect, ref } from 'vue'
import type { EditorExtension } from './extension'
import Toggle from './toggle.vue'

const editor = useEditor<EditorExtension>({ update: true })
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
    :onOpenChange="handleOpenChange"
    class="INLINE_MENU_MAIN"
  >
    <Toggle
      :pressed="editor.marks.textColor.isActive({ color: 'peru' })"
      :onClick="() => editor.commands.toggleTextColor({ color: 'peru' })"
    >
      <span style="color:peru;">peru</span>
    </Toggle>

    <Toggle
      :pressed="editor.marks.textColor.isActive({ color: 'gold' })"
      :onClick="() => editor.commands.toggleTextColor({ color: 'gold' })"
    >
      <span style="color:gold;">gold</span>
    </Toggle>

    <Toggle
      :pressed="editor.marks.textColor.isActive({ color: 'plum' })"
      :onClick="() => editor.commands.toggleTextColor({ color: 'plum' })"
    >
      <span style="color:plum;">plum</span>
    </Toggle>

    <input
      placeholder="Input custom color..."
      v-model="customColor"
      class="p-1"
    />
  </InlinePopover>
</template>

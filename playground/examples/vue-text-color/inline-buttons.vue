<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import { effect } from 'vue'
import type { EditorExtension } from './extension'
import Toggle from './toggle.vue'

const editor = useEditor<EditorExtension>({ update: true })

const customColor = defineModel<string>()

effect(() => {
  const color = customColor.value
  if (color) {
    editor.value.commands.addTextColor({ color })
  }
})

const red = '#ef4444'
const green = '#22c55e'
const blue = '#3b82f6'
</script>

<template>
  <Toggle
    :pressed="editor.marks.textColor.isActive({ color: red })"
    :onClick="() => editor.commands.toggleTextColor({ color: red })"
  >
    <span class="text-red-500">Red</span>
  </Toggle>

  <Toggle
    :pressed="editor.marks.textColor.isActive({ color: green })"
    :onClick="() => editor.commands.toggleTextColor({ color: green })"
  >
    <span class="text-green-500">Green</span>
  </Toggle>

  <Toggle
    :pressed="editor.marks.textColor.isActive({ color: blue })"
    :onClick="() => editor.commands.toggleTextColor({ color: blue })"
  >
    <span class="text-blue-500">Blue</span>
  </Toggle>

  <input
    placeholder="Input custom color..."
    v-model="customColor"
    class="p-1"
  />
</template>

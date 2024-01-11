<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import Toggle from './toggle.vue'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <Toggle
    :pressed="editor.marks.bold.isActive()"
    :onClick="() => editor.commands.toggleBold()"
  >
    Bold
  </Toggle>

  <Toggle
    :pressed="editor.marks.italic.isActive()"
    :onClick="() => editor.commands.toggleItalic()"
  >
    Italic
  </Toggle>

  <Toggle
    :pressed="editor.marks.underline.isActive()"
    :onClick="() => editor.commands.toggleUnderline()"
  >
    Underline
  </Toggle>
</template>

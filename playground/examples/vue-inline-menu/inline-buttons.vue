<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <Toggle
    :active="editor.marks.bold.isActive()"
    :onChange="() => editor.commands.toggleBold()"
  >
    Bold
  </Toggle>

  <Toggle
    :active="editor.marks.italic.isActive()"
    :onChange="() => editor.commands.toggleItalic()"
  >
    Italic
  </Toggle>

  <Toggle
    :active="editor.marks.underline.isActive()"
    :onChange="() => editor.commands.toggleUnderline()"
  >
    Underline
  </Toggle>
</template>

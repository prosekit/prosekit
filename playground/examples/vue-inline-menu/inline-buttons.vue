<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import Button from './button.vue'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <Button
    :pressed="editor.marks.bold.isActive()"
    :onClick="() => editor.commands.toggleBold()"
  >
    Bold
  </Button>

  <Button
    :pressed="editor.marks.italic.isActive()"
    :onClick="() => editor.commands.toggleItalic()"
  >
    Italic
  </Button>

  <Button
    :pressed="editor.marks.underline.isActive()"
    :onClick="() => editor.commands.toggleUnderline()"
  >
    Underline
  </Button>
</template>

<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import Button from './button.vue'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <Button
    :pressed="editor.marks.bold.isActive()"
    @click="() => editor.commands.toggleBold()"
  >
    Bold
  </Button>

  <Button
    :pressed="editor.marks.italic.isActive()"
    @click="() => editor.commands.toggleItalic()"
  >
    Italic
  </Button>

  <Button
    :pressed="editor.marks.underline.isActive()"
    @click="() => editor.commands.toggleUnderline()"
  >
    Underline
  </Button>
</template>

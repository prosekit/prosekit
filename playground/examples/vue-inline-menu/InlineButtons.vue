<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <button
    :data-state="editor.marks.bold.isActive() ? 'on' : 'off'"
    @click="() => editor.commands.toggleBold()"
    @mousedown.prevent
    class="TOGGLE_BUTTON"
  >
    Bold
  </button>

  <button
    :data-state="editor.marks.italic.isActive() ? 'on' : 'off'"
    @click="() => editor.commands.toggleItalic()"
    @mousedown.prevent
    class="TOGGLE_BUTTON"
  >
    Italic
  </button>

  <button
    :data-state="editor.marks.underline.isActive() ? 'on' : 'off'"
    @click="() => editor.commands.toggleUnderline()"
    @mousedown.prevent
    class="TOGGLE_BUTTON"
  >
    Underline
  </button>
</template>

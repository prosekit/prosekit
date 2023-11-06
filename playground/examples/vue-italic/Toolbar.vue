<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class="TOOLBAR">
    <button
      :data-state="editor.marks.italic.isActive() ? 'on' : 'off'"
      @click="() => editor.commands.toggleItalic()"
      @mousedown.prevent
      class="TOGGLE_BUTTON"
    >
      Italic
    </button>
  </div>
</template>

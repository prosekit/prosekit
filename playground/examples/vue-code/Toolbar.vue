<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class="TOOLBAR">
    <button
      :data-state="editor.marks.code.isActive() ? 'on' : 'off'"
      @click="() => editor.commands.toggleCode()"
      @mousedown.prevent
      class="TOGGLE_BUTTON"
    >
      Code
    </button>
  </div>
</template>

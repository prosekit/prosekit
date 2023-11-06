<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class="TOOLBAR">
    <button
      :data-state="editor.marks.strike.isActive() ? 'on' : 'off'"
      @click="() => editor.commands.toggleStrike()"
      @mousedown.prevent
      class="TOGGLE_BUTTON"
    >
      Strike
    </button>
  </div>
</template>

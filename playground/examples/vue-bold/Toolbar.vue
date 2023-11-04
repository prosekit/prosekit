<script setup lang="ts">
import { useEditor } from 'prosekit/vue';
import type { EditorExtension } from './extension';

const editor = useEditor<EditorExtension>()
</script>

<template>
  <div class="TOOLBAR">
    <button
      :data-state="editor.marks.bold.isActive() ? 'on' : 'off'"
      @click="() => editor.commands.toggleBold()"
      @mousedown.prevent
      class="TOGGLE_BUTTON"
    >
      Bold
    </button>
  </div>
</template>

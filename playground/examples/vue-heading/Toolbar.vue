<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class="TOOLBAR">
    <button
      :data-state="editor.nodes.heading.isActive({ level: 1 }) ? 'on' : 'off'"
      @click="() => editor.commands.toggleHeading({ level: 1 })"
      @mousedown.prevent
      class="TOGGLE_BUTTON"
    >
      H1
    </button>

    <button
      :data-state="editor.nodes.heading.isActive({ level: 2 }) ? 'on' : 'off'"
      @click="() => editor.commands.toggleHeading({ level: 2 })"
      @mousedown.prevent
      class="TOGGLE_BUTTON"
    >
      H2
    </button>

    <button
      :data-state="editor.nodes.heading.isActive({ level: 3 }) ? 'on' : 'off'"
      @click="() => editor.commands.toggleHeading({ level: 3 })"
      @mousedown.prevent
      class="TOGGLE_BUTTON"
    >
      H3
    </button>
  </div>
</template>

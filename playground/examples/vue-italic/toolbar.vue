<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import Toggle from './toggle.vue'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class="TOOLBAR">
    <Toggle
      :active="editor.marks.italic.isActive()"
      :onChange="() => editor.commands.toggleItalic()"
      :available="true"
    >
      Italic
    </Toggle>
  </div>
</template>

<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import type Toggle from './toggle.vue'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class="TOOLBAR">
    <Toggle
      :active="editor.marks.underline.isActive()"
      :onChange="() => editor.commands.toggleUnderline()"
    >
      Underline
    </Toggle>
  </div>
</template>

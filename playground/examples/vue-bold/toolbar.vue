<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import Toggle from './toggle.vue'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class="TOOLBAR">
    <Toggle
      :pressed="editor.marks.bold.isActive()"
      :onClick="() => editor.commands.toggleBold()"
    >
      Bold
    </Toggle>
  </div>
</template>

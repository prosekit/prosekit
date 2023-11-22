<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import type Toggle from './toggle.vue'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class="TOOLBAR">
    <Toggle
      :active="editor.marks.code.isActive()"
      :onChange="() => editor.commands.toggleCode()"
    >
      Code
    </Toggle>
  </div>
</template>

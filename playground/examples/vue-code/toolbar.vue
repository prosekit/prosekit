<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import type Toggle from './toggle.vue'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class="TOOLBAR">
    <Toggle
      :pressed="editor.marks.code.isActive()"
      :onClick="() => editor.commands.toggleCode()"
    >
      Code
    </Toggle>
  </div>
</template>

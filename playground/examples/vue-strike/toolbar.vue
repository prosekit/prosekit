<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class="TOOLBAR">
    <Toggle
      :pressed="editor.marks.strike.isActive()"
      :onClick="() => editor.commands.toggleStrike()"
    >
      Underline
    </Toggle>
  </div>
</template>

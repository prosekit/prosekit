<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import Toggle from './button.vue'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div :class="Themes.TOOLBAR">
    <Toggle
      :pressed="editor.marks.italic.isActive()"
      :onClick="() => editor.commands.toggleItalic()"
    >
      Italic
    </Toggle>
  </div>
</template>

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
      :pressed="editor.marks.underline.isActive()"
      :onClick="() => editor.commands.toggleUnderline()"
    >
      Underline
    </Toggle>
  </div>
</template>

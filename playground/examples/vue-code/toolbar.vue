<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import type Toggle from './button.vue'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div :class="Themes.TOOLBAR">
    <Toggle
      :pressed="editor.marks.code.isActive()"
      :onClick="() => editor.commands.toggleCode()"
    >
      Code
    </Toggle>
  </div>
</template>

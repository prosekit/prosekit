<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div :class="Themes.TOOLBAR">
    <Button
      :pressed="editor.marks.strike.isActive()"
      @click="() => editor.commands.toggleStrike()"
    >
      Underline
    </Button>
  </div>
</template>

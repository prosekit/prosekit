<script setup lang="ts">
import { useEditor } from 'prosekit/vue'

import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class="CSS_TOOLBAR">
    <Button
      :pressed="editor.marks.strike.isActive()"
      @click="() => editor.commands.toggleStrike()"
    >
      Strikethrough
    </Button>
  </div>
</template>

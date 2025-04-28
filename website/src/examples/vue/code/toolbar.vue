<script setup lang="ts">
import { useEditor } from 'prosekit/vue'

import Button from './button.vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class="CSS_TOOLBAR">
    <Button
      :pressed="editor.marks.code.isActive()"
      @click="() => editor.commands.toggleCode()"
    >
      Code
    </Button>
  </div>
</template>

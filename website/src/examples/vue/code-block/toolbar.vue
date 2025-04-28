<script setup lang="ts">
import { useEditor } from 'prosekit/vue'

import Button from './button.vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class="CSS_TOOLBAR">
    <Button
      :pressed="editor.nodes.codeBlock.isActive()"
      :disabled="!editor.commands.setCodeBlock.canExec()"
      @click="() => editor.commands.setCodeBlock()"
    >
      <div class="CSS_ICON_CODE_BLOCK" />
    </Button>
  </div>
</template>

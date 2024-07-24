<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/vue'

import Button from './button.vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div :class="Themes.TOOLBAR">
    <Button
      :pressed="editor.nodes.codeBlock.isActive()"
      :disabled="!editor.commands.setCodeBlock.canApply()"
      @click="() => editor.commands.setCodeBlock()"
    >
      <div :class="Themes.ICON_CODE_BLOCK" />
    </Button>
  </div>
</template>

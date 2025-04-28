<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/vue'

import Button from './button.vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div :class="Themes.CSS_TOOLBAR">
    <Button
      :pressed="editor.nodes.blockquote.isActive()"
      :disabled="!editor.commands.toggleBlockquote.canExec()"
      tooltip="Blockquote"
      @click="() => editor.commands.toggleBlockquote()"
    >
      <div :class="Themes.CSS_ICON_BLOCKQUOTE" />
    </Button>
  </div>
</template>

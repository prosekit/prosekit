<script setup lang="ts">
import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/vue'

import { Button } from '../../ui/button'

import type { EditorExtension } from './extension'

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    highlight: {
      isActive: editor.marks.highlight.isActive(),
      canExec: editor.commands.toggleHighlight.canExec(),
      command: () => editor.commands.toggleHighlight(),
    },
  }
}

const items = useEditorDerivedValue(getToolbarItems)
</script>

<template>
  <div class="CSS_TOOLBAR">
    <Button
      :pressed="items.highlight.isActive"
      :disabled="!items.highlight.canExec"
      @click="items.highlight.command"
    >
      Highlight
    </Button>
  </div>
</template>

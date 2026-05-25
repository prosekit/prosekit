<script setup lang="ts">
import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/vue'

import { Button } from '../../ui/button/index.ts'

import type { EditorExtension } from './extension.ts'

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    hardBreak: {
      canExec: editor.commands.insertHardBreak.canExec(),
      command: () => editor.commands.insertHardBreak(),
    },
  }
}

const items = useEditorDerivedValue(getToolbarItems)
</script>

<template>
  <div class="CSS_TOOLBAR">
    <Button
      :pressed="false"
      :disabled="!items.hardBreak.canExec"
      @click="items.hardBreak.command"
    >
      Insert Hard Break
    </Button>
  </div>
</template>

<script setup lang="ts">
import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/vue'

import { Button } from '../../ui/button'

import type { EditorExtension } from './extension'

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    subscript: {
      isActive: editor.marks.subscript.isActive(),
      canExec: editor.commands.toggleSubscript.canExec(),
      command: () => editor.commands.toggleSubscript(),
    },
    superscript: {
      isActive: editor.marks.superscript.isActive(),
      canExec: editor.commands.toggleSuperscript.canExec(),
      command: () => editor.commands.toggleSuperscript(),
    },
  }
}

const items = useEditorDerivedValue(getToolbarItems)
</script>

<template>
  <div class="CSS_TOOLBAR">
    <Button
      :pressed="items.subscript.isActive"
      :disabled="!items.subscript.canExec"
      @click="items.subscript.command"
    >
      Subscript
    </Button>
    <Button
      :pressed="items.superscript.isActive"
      :disabled="!items.superscript.canExec"
      @click="items.superscript.command"
    >
      Superscript
    </Button>
  </div>
</template>

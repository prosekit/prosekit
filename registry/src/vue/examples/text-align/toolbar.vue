<script setup lang="ts">
import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/vue'

import { Button } from '../../ui/button'

import type { EditorExtension } from './extension'

function isTextAlignActive(editor: Editor<EditorExtension>, value: string) {
  return Object.values(editor.nodes).some((node) => {
    // @ts-expect-error textAlign may not be available on every node
    return node.isActive({ textAlign: value })
  })
}

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    left: {
      isActive: isTextAlignActive(editor, 'left'),
      canExec: editor.commands.setTextAlign.canExec('left'),
      command: () => editor.commands.setTextAlign('left'),
    },
    center: {
      isActive: isTextAlignActive(editor, 'center'),
      canExec: editor.commands.setTextAlign.canExec('center'),
      command: () => editor.commands.setTextAlign('center'),
    },
    right: {
      isActive: isTextAlignActive(editor, 'right'),
      canExec: editor.commands.setTextAlign.canExec('right'),
      command: () => editor.commands.setTextAlign('right'),
    },
    justify: {
      isActive: isTextAlignActive(editor, 'justify'),
      canExec: editor.commands.setTextAlign.canExec('justify'),
      command: () => editor.commands.setTextAlign('justify'),
    },
  }
}

const items = useEditorDerivedValue(getToolbarItems)
</script>

<template>
  <div class="CSS_TOOLBAR">
    <Button
      :pressed="items.left.isActive"
      :disabled="!items.left.canExec"
      @click="items.left.command"
    >
      Left
    </Button>

    <Button
      :pressed="items.center.isActive"
      :disabled="!items.center.canExec"
      @click="items.center.command"
    >
      Center
    </Button>

    <Button
      :pressed="items.right.isActive"
      :disabled="!items.right.canExec"
      @click="items.right.command"
    >
      Right
    </Button>

    <Button
      :pressed="items.justify.isActive"
      :disabled="!items.justify.canExec"
      @click="items.justify.command"
    >
      Justify
    </Button>
  </div>
</template>

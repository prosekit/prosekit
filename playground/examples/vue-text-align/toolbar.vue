<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/vue'
import Button from './button.vue'
import type { Editor } from 'prosekit/core'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })

const isTextAlignActive = (editor: Editor<EditorExtension>, value: string) => {
  return Object.values(editor.nodes).some((node) => {
    return node.isActive({ textAlign: value })
  })
}
</script>

<template>
  <div :class="Themes.TOOLBAR">
    <Button
      :pressed="isTextAlignActive(editor, 'left')"
      :disabled="!editor.commands.setTextAlign.canApply('left')"
      @click="editor.commands.setTextAlign('left')"
    >
      Left
    </Button>

    <Button
      :pressed="isTextAlignActive(editor, 'center')"
      :disabled="!editor.commands.setTextAlign.canApply('center')"
      @click="editor.commands.setTextAlign('center')"
    >
      Center
    </Button>

    <Button
      :pressed="isTextAlignActive(editor, 'right')"
      :disabled="!editor.commands.setTextAlign.canApply('right')"
      @click="editor.commands.setTextAlign('right')"
    >
      Right
    </Button>

    <Button
      :pressed="isTextAlignActive(editor, 'justify')"
      :disabled="!editor.commands.setTextAlign.canApply('justify')"
      @click="editor.commands.setTextAlign('justify')"
    >
      Justify
    </Button>
  </div>
</template>

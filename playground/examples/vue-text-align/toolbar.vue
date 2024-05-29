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
    <Toggle
      :pressed="isTextAlignActive(editor, 'left')"
      :disabled="!editor.commands.setTextAlign.canApply('left')"
      :onClick="() => editor.commands.setTextAlign('left')"
    >
      Left
    </Toggle>

    <Toggle
      :pressed="isTextAlignActive(editor, 'center')"
      :disabled="!editor.commands.setTextAlign.canApply('center')"
      :onClick="() => editor.commands.setTextAlign('center')"
    >
      Center
    </Toggle>

    <Toggle
      :pressed="isTextAlignActive(editor, 'right')"
      :disabled="!editor.commands.setTextAlign.canApply('right')"
      :onClick="() => editor.commands.setTextAlign('right')"
    >
      Right
    </Toggle>

    <Toggle
      :pressed="isTextAlignActive(editor, 'justify')"
      :disabled="!editor.commands.setTextAlign.canApply('justify')"
      :onClick="() => editor.commands.setTextAlign('justify')"
    >
      Justify
    </Toggle>
  </div>
</template>

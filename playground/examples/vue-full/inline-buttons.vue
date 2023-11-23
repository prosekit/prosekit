<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import Toggle from './toggle.vue'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <Toggle
    :pressed="editor.marks.bold.isActive()"
    :disabled="!editor.commands.toggleBold.canApply()"
    :onClick="() => editor.commands.toggleBold()"
  >
    <div class="ICON_BOLD"></div>
  </Toggle>

  <Toggle
    :pressed="editor.marks.italic.isActive()"
    :disabled="!editor.commands.toggleItalic.canApply()"
    :onClick="() => editor.commands.toggleItalic()"
  >
    <div class="ICON_ITALIC"></div>
  </Toggle>

  <Toggle
    :pressed="editor.marks.underline.isActive()"
    :disabled="!editor.commands.toggleUnderline.canApply()"
    :onClick="() => editor.commands.toggleUnderline()"
  >
    <div class="ICON_UNDERLINE"></div>
  </Toggle>

  <Toggle
    :pressed="editor.marks.strike.isActive()"
    :disabled="!editor.commands.toggleStrike.canApply()"
    :onClick="() => editor.commands.toggleStrike()"
  >
    <div class="ICON_STRIKE"></div>
  </Toggle>

  <Toggle
    :pressed="editor.marks.code.isActive()"
    :disabled="!editor.commands.toggleCode.canApply()"
    :onClick="() => editor.commands.toggleCode()"
  >
    <div class="ICON_CODE"></div>
  </Toggle>
</template>

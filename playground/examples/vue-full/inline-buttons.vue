<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import Toggle from './toggle.vue'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <Toggle
    :active="editor.marks.bold.isActive()"
    :available="editor.commands.toggleBold.canApply()"
    @change="() => editor.commands.toggleBold()"
  >
    <div class="ICON_BOLD"></div>
  </Toggle>

  <Toggle
    :active="editor.marks.italic.isActive()"
    :available="editor.commands.toggleItalic.canApply()"
    @change="() => editor.commands.toggleItalic()"
  >
    <div class="ICON_ITALIC"></div>
  </Toggle>

  <Toggle
    :active="editor.marks.underline.isActive()"
    :available="editor.commands.toggleUnderline.canApply()"
    @change="() => editor.commands.toggleUnderline()"
  >
    <div class="ICON_UNDERLINE"></div>
  </Toggle>

  <Toggle
    :active="editor.marks.strike.isActive()"
    :available="editor.commands.toggleStrike.canApply()"
    @change="() => editor.commands.toggleStrike()"
  >
    <div class="ICON_STRIKE"></div>
  </Toggle>

  <Toggle
    :active="editor.marks.code.isActive()"
    :available="editor.commands.toggleCode.canApply()"
    @change="() => editor.commands.toggleCode()"
  >
    <div class="ICON_CODE"></div>
  </Toggle>
</template>

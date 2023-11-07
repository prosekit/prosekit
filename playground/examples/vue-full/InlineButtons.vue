<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import ToggleButton from './ToggleButton.vue'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <ToggleButton
    :active="editor.marks.bold.isActive()"
    :available="editor.commands.toggleBold.canApply()"
    @change="() => editor.commands.toggleBold()"
  >
    <div class="ICON_BOLD"></div>
  </ToggleButton>

  <ToggleButton
    :active="editor.marks.italic.isActive()"
    :available="editor.commands.toggleItalic.canApply()"
    @change="() => editor.commands.toggleItalic()"
  >
    <div class="ICON_ITALIC"></div>
  </ToggleButton>

  <ToggleButton
    :active="editor.marks.underline.isActive()"
    :available="editor.commands.toggleUnderline.canApply()"
    @change="() => editor.commands.toggleUnderline()"
  >
    <div class="ICON_UNDERLINE"></div>
  </ToggleButton>

  <ToggleButton
    :active="editor.marks.strike.isActive()"
    :available="editor.commands.toggleStrike.canApply()"
    @change="() => editor.commands.toggleStrike()"
  >
    <div class="ICON_STRIKE"></div>
  </ToggleButton>

  <ToggleButton
    :active="editor.marks.code.isActive()"
    :available="editor.commands.toggleCode.canApply()"
    @change="() => editor.commands.toggleCode()"
  >
    <div class="ICON_CODE"></div>
  </ToggleButton>
</template>

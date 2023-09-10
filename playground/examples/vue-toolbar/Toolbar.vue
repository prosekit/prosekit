<script setup lang="ts">
import ToggleButton from './ToggleButton.vue'
import { useExampleEditorRef } from './use-example-editor'

const editor = useExampleEditorRef()
</script>

<template>
  <div>
    <ToggleButton
      :active="editor.marks.italic.isActive()"
      @change="() => editor.commands.toggleItalic()"
    >
      <div class="ICON_ITALIC"></div>
    </ToggleButton>

    <ToggleButton
      :active="editor.marks.bold.isActive()"
      @change="() => editor.commands.toggleBold()"
    >
      <div class="ICON_BOLD"></div>
    </ToggleButton>

    <ToggleButton
      :active="editor.nodes.heading.isActive({ level: 1 })"
      @change="() => editor.commands.toggleHeading({ level: 1 })"
    >
      <div class="ICON_H1"></div>
    </ToggleButton>

    <ToggleButton
      :active="editor.nodes.heading.isActive({ level: 2 })"
      @change="() => editor.commands.toggleHeading({ level: 2 })"
    >
      <div class="ICON_H2"></div>
    </ToggleButton>

    <ToggleButton
      :active="editor.nodes.heading.isActive({ level: 3 })"
      @change="() => editor.commands.toggleHeading({ level: 3 })"
    >
      <div class="ICON_H3"></div>
    </ToggleButton>
  </div>
</template>

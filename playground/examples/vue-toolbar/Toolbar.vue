<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import ToggleButton from './ToggleButton.vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class="TOOLBAR">
    <ToggleButton
      :available="editor.commands.undo.canApply()"
      @change="() => editor.commands.undo()"
    >
      <div className="ICON_UNDO" />
    </ToggleButton>

    <ToggleButton
      :available="editor.commands.redo.canApply()"
      @change="() => editor.commands.redo()"
    >
      <div className="ICON_REDO" />
    </ToggleButton>

    <ToggleButton
      :active="editor.marks.italic.isActive()"
      :available="editor.commands.toggleItalic.canApply()"
      @change="() => editor.commands.toggleItalic()"
    >
      <div class="ICON_ITALIC"></div>
    </ToggleButton>

    <ToggleButton
      :active="editor.marks.bold.isActive()"
      :available="editor.commands.toggleBold.canApply()"
      @change="() => editor.commands.toggleBold()"
    >
      <div class="ICON_BOLD"></div>
    </ToggleButton>

    <ToggleButton
      :active="editor.nodes.heading.isActive({ level: 1 })"
      :available="editor.commands.toggleHeading.canApply({ level: 1 })"
      @change="() => editor.commands.toggleHeading({ level: 1 })"
    >
      <div class="ICON_H1"></div>
    </ToggleButton>

    <ToggleButton
      :active="editor.nodes.heading.isActive({ level: 2 })"
      :available="editor.commands.toggleHeading.canApply({ level: 2 })"
      @change="() => editor.commands.toggleHeading({ level: 2 })"
    >
      <div class="ICON_H2"></div>
    </ToggleButton>

    <ToggleButton
      :active="editor.nodes.heading.isActive({ level: 3 })"
      :available="editor.commands.toggleHeading.canApply({ level: 3 })"
      @change="() => editor.commands.toggleHeading({ level: 3 })"
    >
      <div class="ICON_H3"></div>
    </ToggleButton>
  </div>
</template>

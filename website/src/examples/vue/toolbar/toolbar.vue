<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/vue'

import Button from './button.vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div :class="Themes.TOOLBAR">
    <Button
      :pressed="false"
      :disabled="!editor.commands.undo.canExec()"
      @click="() => editor.commands.undo()"
    >
      <div :class="Themes.CSS_ICON_UNDO" />
    </Button>

    <Button
      :pressed="false"
      :disabled="!editor.commands.redo.canExec()"
      @click="() => editor.commands.redo()"
    >
      <div :class="Themes.CSS_ICON_REDO" />
    </Button>

    <Button
      :pressed="editor.marks.bold.isActive()"
      :disabled="!editor.commands.toggleBold.canExec()"
      @click="() => editor.commands.toggleBold()"
    >
      <div :class="Themes.CSS_ICON_BOLD" />
    </Button>

    <Button
      :pressed="editor.marks.italic.isActive()"
      :disabled="!editor.commands.toggleItalic.canExec()"
      @click="() => editor.commands.toggleItalic()"
    >
      <div :class="Themes.CSS_ICON_ITALIC" />
    </Button>

    <Button
      :pressed="editor.nodes.heading.isActive({ level: 1 })"
      :disabled="!editor.commands.toggleHeading.canExec({ level: 1 })"
      @click="() => editor.commands.toggleHeading({ level: 1 })"
    >
      <div :class="Themes.CSS_ICON_H1" />
    </Button>

    <Button
      :pressed="editor.nodes.heading.isActive({ level: 2 })"
      :disabled="!editor.commands.toggleHeading.canExec({ level: 2 })"
      @click="() => editor.commands.toggleHeading({ level: 2 })"
    >
      <div :class="Themes.CSS_ICON_H2" />
    </Button>

    <Button
      :pressed="editor.nodes.heading.isActive({ level: 3 })"
      :disabled="!editor.commands.toggleHeading.canExec({ level: 3 })"
      @click="() => editor.commands.toggleHeading({ level: 3 })"
    >
      <div :class="Themes.CSS_ICON_H3" />
    </Button>
  </div>
</template>

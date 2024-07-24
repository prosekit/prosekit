<script setup lang="ts">
import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/vue'

import Button from './button.vue'
import type { EditorExtension } from './extension'
import ImageUploadPopover from './image-upload-popover.vue'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div :class="Themes.TOOLBAR">
    <Button
      :pressed="false"
      :disabled="!editor.commands.undo.canApply()"
      tooltip="Undo"
      @click="() => editor.commands.undo()"
    >
      <div :class="Themes.ICON_UNDO" />
    </Button>

    <Button
      :pressed="false"
      :disabled="!editor.commands.redo.canApply()"
      tooltip="Redo"
      @click="() => editor.commands.redo()"
    >
      <div :class="Themes.ICON_REDO" />
    </Button>

    <Button
      :pressed="editor.marks.bold.isActive()"
      :disabled="!editor.commands.toggleBold.canApply()"
      tooltip="Bold"
      @click="() => editor.commands.toggleBold()"
    >
      <div :class="Themes.ICON_BOLD" />
    </Button>

    <Button
      :pressed="editor.marks.italic.isActive()"
      :disabled="!editor.commands.toggleItalic.canApply()"
      tooltip="Italic"
      @click="() => editor.commands.toggleItalic()"
    >
      <div :class="Themes.ICON_ITALIC" />
    </Button>

    <Button
      :pressed="editor.marks.underline.isActive()"
      :disabled="!editor.commands.toggleUnderline.canApply()"
      tooltip="Underline"
      @click="() => editor.commands.toggleUnderline()"
    >
      <div :class="Themes.ICON_UNDERLINE" />
    </Button>

    <Button
      :pressed="editor.marks.strike.isActive()"
      :disabled="!editor.commands.toggleStrike.canApply()"
      tooltip="Strike"
      @click="() => editor.commands.toggleStrike()"
    >
      <div :class="Themes.ICON_STRIKE" />
    </Button>

    <Button
      :pressed="editor.marks.code.isActive()"
      :disabled="!editor.commands.toggleCode.canApply()"
      tooltip="Code"
      @click="() => editor.commands.toggleCode()"
    >
      <div :class="Themes.ICON_CODE" />
    </Button>

    <Button
      :pressed="editor.nodes.heading.isActive({ level: 1 })"
      :disabled="!editor.commands.toggleHeading.canApply({ level: 1 })"
      tooltip="Heading 1"
      @click="() => editor.commands.toggleHeading({ level: 1 })"
    >
      <div :class="Themes.ICON_H1" />
    </Button>

    <Button
      :pressed="editor.nodes.heading.isActive({ level: 2 })"
      :disabled="!editor.commands.toggleHeading.canApply({ level: 2 })"
      tooltip="Heading 2"
      @click="() => editor.commands.toggleHeading({ level: 2 })"
    >
      <div :class="Themes.ICON_H2" />
    </Button>

    <Button
      :pressed="editor.nodes.heading.isActive({ level: 3 })"
      :disabled="!editor.commands.toggleHeading.canApply({ level: 3 })"
      tooltip="Heading 3"
      @click="() => editor.commands.toggleHeading({ level: 3 })"
    >
      <div :class="Themes.ICON_H3" />
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'bullet' })"
      :disabled="!editor.commands.toggleList.canApply({ kind: 'bullet' })"
      tooltip="Bullet List"
      @click="() => editor.commands.toggleList({ kind: 'bullet' })"
    >
      <div :class="Themes.ICON_LIST_BULLET" />
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'ordered' })"
      :disabled="!editor.commands.toggleList.canApply({ kind: 'ordered' })"
      tooltip="Ordered List"
      @click="() => editor.commands.toggleList({ kind: 'ordered' })"
    >
      <div :class="Themes.ICON_LIST_ORDERED" />
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'task' })"
      :disabled="!editor.commands.toggleList.canApply({ kind: 'task' })"
      tooltip="Task List"
      @click="() => editor.commands.toggleList({ kind: 'task' })"
    >
      <div :class="Themes.ICON_LIST_TASK" />
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'toggle' })"
      :disabled="!editor.commands.toggleList.canApply({ kind: 'toggle' })"
      tooltip="Toggle List"
      @click="() => editor.commands.toggleList({ kind: 'toggle' })"
    >
      <div :class="Themes.ICON_LIST_TOGGLE" />
    </Button>

    <Button
      :pressed="false"
      :disabled="!editor.commands.indentList.canApply()"
      tooltip="Increase indentation"
      @click="() => editor.commands.indentList()"
    >
      <div :class="Themes.ICON_LIST_INDENT" />
    </Button>

    <Button
      :pressed="false"
      :disabled="!editor.commands.dedentList.canApply()"
      tooltip="Decrease indentation"
      @click="() => editor.commands.dedentList()"
    >
      <div :class="Themes.ICON_LIST_DEDENT" />
    </Button>

    <ImageUploadPopover
      :disabled="!editor.commands.insertImage.canApply()"
      tooltip="Insert Image"
    >
      <div :class="Themes.ICON_IMAGE" />
    </ImageUploadPopover>
  </div>
</template>

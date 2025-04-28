<script setup lang="ts">
import { useEditor } from 'prosekit/vue'

import Button from './button.vue'
import type { EditorExtension } from './extension'
import ImageUploadPopover from './image-upload-popover.vue'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class="CSS_TOOLBAR">
    <Button
      :pressed="false"
      :disabled="!editor.commands.undo.canExec()"
      tooltip="Undo"
      @click="() => editor.commands.undo()"
    >
      <div class="CSS_ICON_UNDO" />
    </Button>

    <Button
      :pressed="false"
      :disabled="!editor.commands.redo.canExec()"
      tooltip="Redo"
      @click="() => editor.commands.redo()"
    >
      <div class="CSS_ICON_REDO" />
    </Button>

    <Button
      :pressed="editor.marks.bold.isActive()"
      :disabled="!editor.commands.toggleBold.canExec()"
      tooltip="Bold"
      @click="() => editor.commands.toggleBold()"
    >
      <div class="CSS_ICON_BOLD" />
    </Button>

    <Button
      :pressed="editor.marks.italic.isActive()"
      :disabled="!editor.commands.toggleItalic.canExec()"
      tooltip="Italic"
      @click="() => editor.commands.toggleItalic()"
    >
      <div class="CSS_ICON_ITALIC" />
    </Button>

    <Button
      :pressed="editor.marks.underline.isActive()"
      :disabled="!editor.commands.toggleUnderline.canExec()"
      tooltip="Underline"
      @click="() => editor.commands.toggleUnderline()"
    >
      <div class="CSS_ICON_UNDERLINE" />
    </Button>

    <Button
      :pressed="editor.marks.strike.isActive()"
      :disabled="!editor.commands.toggleStrike.canExec()"
      tooltip="Strike"
      @click="() => editor.commands.toggleStrike()"
    >
      <div class="CSS_ICON_STRIKE" />
    </Button>

    <Button
      :pressed="editor.marks.code.isActive()"
      :disabled="!editor.commands.toggleCode.canExec()"
      tooltip="Code"
      @click="() => editor.commands.toggleCode()"
    >
      <div class="CSS_ICON_CODE" />
    </Button>

    <Button
      :pressed="editor.nodes.codeBlock.isActive()"
      :disabled="!editor.commands.toggleCodeBlock.canExec({ language: 'javascript' })"
      tooltip="Code Block"
      @click="() => editor.commands.toggleCodeBlock.canExec({ language: 'javascript' })"
    >
      <div class="CSS_ICON_CODE_BLOCK" />
    </Button>

    <Button
      :pressed="editor.nodes.heading.isActive({ level: 1 })"
      :disabled="!editor.commands.toggleHeading.canExec({ level: 1 })"
      tooltip="Heading 1"
      @click="() => editor.commands.toggleHeading({ level: 1 })"
    >
      <div class="CSS_ICON_H1" />
    </Button>

    <Button
      :pressed="editor.nodes.heading.isActive({ level: 2 })"
      :disabled="!editor.commands.toggleHeading.canExec({ level: 2 })"
      tooltip="Heading 2"
      @click="() => editor.commands.toggleHeading({ level: 2 })"
    >
      <div class="CSS_ICON_H2" />
    </Button>

    <Button
      :pressed="editor.nodes.heading.isActive({ level: 3 })"
      :disabled="!editor.commands.toggleHeading.canExec({ level: 3 })"
      tooltip="Heading 3"
      @click="() => editor.commands.toggleHeading({ level: 3 })"
    >
      <div class="CSS_ICON_H3" />
    </Button>

    <Button
      :pressed="editor.nodes.horizontalRule.isActive()"
      :disabled="!editor.commands.insertHorizontalRule.canExec()"
      tooltip="Divider"
      @click="() => editor.commands.insertHorizontalRule()"
    >
      <div class="CSS_ICON_MINUS"></div>
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'bullet' })"
      :disabled="!editor.commands.toggleList.canExec({ kind: 'bullet' })"
      tooltip="Bullet List"
      @click="() => editor.commands.toggleList({ kind: 'bullet' })"
    >
      <div class="CSS_ICON_LIST_BULLET" />
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'ordered' })"
      :disabled="!editor.commands.toggleList.canExec({ kind: 'ordered' })"
      tooltip="Ordered List"
      @click="() => editor.commands.toggleList({ kind: 'ordered' })"
    >
      <div class="CSS_ICON_LIST_ORDERED" />
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'task' })"
      :disabled="!editor.commands.toggleList.canExec({ kind: 'task' })"
      tooltip="Task List"
      @click="() => editor.commands.toggleList({ kind: 'task' })"
    >
      <div class="CSS_ICON_LIST_TASK" />
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'toggle' })"
      :disabled="!editor.commands.toggleList.canExec({ kind: 'toggle' })"
      tooltip="Toggle List"
      @click="() => editor.commands.toggleList({ kind: 'toggle' })"
    >
      <div class="CSS_ICON_LIST_TOGGLE" />
    </Button>

    <Button
      :pressed="false"
      :disabled="!editor.commands.indentList.canExec()"
      tooltip="Increase indentation"
      @click="() => editor.commands.indentList()"
    >
      <div class="CSS_ICON_LIST_INDENT" />
    </Button>

    <Button
      :pressed="false"
      :disabled="!editor.commands.dedentList.canExec()"
      tooltip="Decrease indentation"
      @click="() => editor.commands.dedentList()"
    >
      <div class="CSS_ICON_LIST_DEDENT" />
    </Button>

    <ImageUploadPopover
      :disabled="!editor.commands.insertImage.canExec()"
      tooltip="Insert Image"
    >
      <div class="CSS_ICON_IMAGE" />
    </ImageUploadPopover>
  </div>
</template>

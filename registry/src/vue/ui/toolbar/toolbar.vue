<script setup lang="ts">
import type { BasicExtension } from 'prosekit/basic'
import type { Editor } from 'prosekit/core'
import type { Uploader } from 'prosekit/extensions/file'
import { useEditorDerivedValue } from 'prosekit/vue'

import { Button } from '../button'
import { ImageUploadPopover } from '../image-upload-popover'

defineProps<{ uploader?: Uploader<string> }>()

function getToolbarItems(editor: Editor<BasicExtension>) {
  return {
    undo: editor.commands.undo
      ? {
        isActive: false,
        canExec: editor.commands.undo.canExec(),
        command: () => editor.commands.undo(),
      }
      : undefined,
    redo: editor.commands.redo
      ? {
        isActive: false,
        canExec: editor.commands.redo.canExec(),
        command: () => editor.commands.redo(),
      }
      : undefined,
    bold: editor.commands.toggleBold
      ? {
        isActive: editor.marks.bold.isActive(),
        canExec: editor.commands.toggleBold.canExec(),
        command: () => editor.commands.toggleBold(),
      }
      : undefined,
    italic: editor.commands.toggleItalic
      ? {
        isActive: editor.marks.italic.isActive(),
        canExec: editor.commands.toggleItalic.canExec(),
        command: () => editor.commands.toggleItalic(),
      }
      : undefined,
    underline: editor.commands.toggleUnderline
      ? {
        isActive: editor.marks.underline.isActive(),
        canExec: editor.commands.toggleUnderline.canExec(),
        command: () => editor.commands.toggleUnderline(),
      }
      : undefined,
    strike: editor.commands.toggleStrike
      ? {
        isActive: editor.marks.strike.isActive(),
        canExec: editor.commands.toggleStrike.canExec(),
        command: () => editor.commands.toggleStrike(),
      }
      : undefined,
    code: editor.commands.toggleCode
      ? {
        isActive: editor.marks.code.isActive(),
        canExec: editor.commands.toggleCode.canExec(),
        command: () => editor.commands.toggleCode(),
      }
      : undefined,
    codeBlock: editor.commands.insertCodeBlock
      ? {
        isActive: editor.nodes.codeBlock.isActive(),
        canExec: editor.commands.insertCodeBlock.canExec({ language: 'javascript' }),
        command: () => editor.commands.insertCodeBlock({ language: 'javascript' }),
      }
      : undefined,
    heading1: editor.commands.toggleHeading
      ? {
        isActive: editor.nodes.heading.isActive({ level: 1 }),
        canExec: editor.commands.toggleHeading.canExec({ level: 1 }),
        command: () => editor.commands.toggleHeading({ level: 1 }),
      }
      : undefined,
    heading2: editor.commands.toggleHeading
      ? {
        isActive: editor.nodes.heading.isActive({ level: 2 }),
        canExec: editor.commands.toggleHeading.canExec({ level: 2 }),
        command: () => editor.commands.toggleHeading({ level: 2 }),
      }
      : undefined,
    heading3: editor.commands.toggleHeading
      ? {
        isActive: editor.nodes.heading.isActive({ level: 3 }),
        canExec: editor.commands.toggleHeading.canExec({ level: 3 }),
        command: () => editor.commands.toggleHeading({ level: 3 }),
      }
      : undefined,
    horizontalRule: editor.commands.insertHorizontalRule
      ? {
        isActive: editor.nodes.horizontalRule.isActive(),
        canExec: editor.commands.insertHorizontalRule.canExec(),
        command: () => editor.commands.insertHorizontalRule(),
      }
      : undefined,
    blockquote: editor.commands.toggleBlockquote
      ? {
        isActive: editor.nodes.blockquote.isActive(),
        canExec: editor.commands.toggleBlockquote.canExec(),
        command: () => editor.commands.toggleBlockquote(),
      }
      : undefined,
    bulletList: editor.commands.toggleList
      ? {
        isActive: editor.nodes.list.isActive({ kind: 'bullet' }),
        canExec: editor.commands.toggleList.canExec({ kind: 'bullet' }),
        command: () => editor.commands.toggleList({ kind: 'bullet' }),
      }
      : undefined,
    orderedList: editor.commands.toggleList
      ? {
        isActive: editor.nodes.list.isActive({ kind: 'ordered' }),
        canExec: editor.commands.toggleList.canExec({ kind: 'ordered' }),
        command: () => editor.commands.toggleList({ kind: 'ordered' }),
      }
      : undefined,
    taskList: editor.commands.toggleList
      ? {
        isActive: editor.nodes.list.isActive({ kind: 'task' }),
        canExec: editor.commands.toggleList.canExec({ kind: 'task' }),
        command: () => editor.commands.toggleList({ kind: 'task' }),
      }
      : undefined,
    toggleList: editor.commands.toggleList
      ? {
        isActive: editor.nodes.list.isActive({ kind: 'toggle' }),
        canExec: editor.commands.toggleList.canExec({ kind: 'toggle' }),
        command: () => editor.commands.toggleList({ kind: 'toggle' }),
      }
      : undefined,
    indentList: editor.commands.indentList
      ? {
        isActive: false,
        canExec: editor.commands.indentList.canExec(),
        command: () => editor.commands.indentList(),
      }
      : undefined,
    dedentList: editor.commands.dedentList
      ? {
        isActive: false,
        canExec: editor.commands.dedentList.canExec(),
        command: () => editor.commands.dedentList(),
      }
      : undefined,
    insertImage: editor.commands.insertImage
      ? {
        isActive: false,
        canExec: editor.commands.insertImage.canExec(),
      }
      : undefined,
  }
}

const items = useEditorDerivedValue(getToolbarItems)
</script>

<template>
  <div class="CSS_TOOLBAR">
    <Button
      v-if="items.undo"
      :pressed="items.undo.isActive"
      :disabled="!items.undo.canExec"
      tooltip="Undo"
      @click="items.undo.command"
    >
      <div class="CSS_ICON_UNDO" />
    </Button>
    <Button
      v-if="items.redo"
      :pressed="items.redo.isActive"
      :disabled="!items.redo.canExec"
      tooltip="Redo"
      @click="items.redo.command"
    >
      <div class="CSS_ICON_REDO" />
    </Button>

    <Button
      v-if="items.bold"
      :pressed="items.bold.isActive"
      :disabled="!items.bold.canExec"
      tooltip="Bold"
      @click="items.bold.command"
    >
      <div class="CSS_ICON_BOLD" />
    </Button>
    <Button
      v-if="items.italic"
      :pressed="items.italic.isActive"
      :disabled="!items.italic.canExec"
      tooltip="Italic"
      @click="items.italic.command"
    >
      <div class="CSS_ICON_ITALIC" />
    </Button>
    <Button
      v-if="items.underline"
      :pressed="items.underline.isActive"
      :disabled="!items.underline.canExec"
      tooltip="Underline"
      @click="items.underline.command"
    >
      <div class="CSS_ICON_UNDERLINE" />
    </Button>
    <Button
      v-if="items.strike"
      :pressed="items.strike.isActive"
      :disabled="!items.strike.canExec"
      tooltip="Strike"
      @click="items.strike.command"
    >
      <div class="CSS_ICON_STRIKETHROUGH" />
    </Button>
    <Button
      v-if="items.code"
      :pressed="items.code.isActive"
      :disabled="!items.code.canExec"
      tooltip="Code"
      @click="items.code.command"
    >
      <div class="CSS_ICON_CODE" />
    </Button>
    <Button
      v-if="items.codeBlock"
      :pressed="items.codeBlock.isActive"
      :disabled="!items.codeBlock.canExec"
      tooltip="Code Block"
      @click="items.codeBlock.command"
    >
      <div class="CSS_ICON_CODE_BLOCK" />
    </Button>
    <Button
      v-if="items.heading1"
      :pressed="items.heading1.isActive"
      :disabled="!items.heading1.canExec"
      tooltip="Heading 1"
      @click="items.heading1.command"
    >
      <div class="CSS_ICON_H1" />
    </Button>
    <Button
      v-if="items.heading2"
      :pressed="items.heading2.isActive"
      :disabled="!items.heading2.canExec"
      tooltip="Heading 2"
      @click="items.heading2.command"
    >
      <div class="CSS_ICON_H2" />
    </Button>
    <Button
      v-if="items.heading3"
      :pressed="items.heading3.isActive"
      :disabled="!items.heading3.canExec"
      tooltip="Heading 3"
      @click="items.heading3.command"
    >
      <div class="CSS_ICON_H3" />
    </Button>
    <Button
      v-if="items.horizontalRule"
      :pressed="items.horizontalRule.isActive"
      :disabled="!items.horizontalRule.canExec"
      tooltip="Divider"
      @click="items.horizontalRule.command"
    >
      <div class="CSS_ICON_MINUS"></div>
    </Button>
    <Button
      v-if="items.blockquote"
      :pressed="items.blockquote.isActive"
      :disabled="!items.blockquote.canExec"
      tooltip="Blockquote"
      @click="items.blockquote.command"
    >
      <div class="CSS_ICON_BLOCKQUOTE" />
    </Button>
    <Button
      v-if="items.bulletList"
      :pressed="items.bulletList.isActive"
      :disabled="!items.bulletList.canExec"
      tooltip="Bullet List"
      @click="items.bulletList.command"
    >
      <div class="CSS_ICON_LIST_BULLET" />
    </Button>
    <Button
      v-if="items.orderedList"
      :pressed="items.orderedList.isActive"
      :disabled="!items.orderedList.canExec"
      tooltip="Ordered List"
      @click="items.orderedList.command"
    >
      <div class="CSS_ICON_LIST_ORDERED" />
    </Button>
    <Button
      v-if="items.taskList"
      :pressed="items.taskList.isActive"
      :disabled="!items.taskList.canExec"
      tooltip="Task List"
      @click="items.taskList.command"
    >
      <div class="CSS_ICON_LIST_TASK" />
    </Button>
    <Button
      v-if="items.toggleList"
      :pressed="items.toggleList.isActive"
      :disabled="!items.toggleList.canExec"
      tooltip="Toggle List"
      @click="items.toggleList.command"
    >
      <div class="CSS_ICON_LIST_TOGGLE" />
    </Button>
    <Button
      v-if="items.indentList"
      :pressed="items.indentList.isActive"
      :disabled="!items.indentList.canExec"
      tooltip="Increase indentation"
      @click="items.indentList.command"
    >
      <div class="CSS_ICON_LIST_INDENT" />
    </Button>
    <Button
      v-if="items.dedentList"
      :pressed="items.dedentList.isActive"
      :disabled="!items.dedentList.canExec"
      tooltip="Decrease indentation"
      @click="items.dedentList.command"
    >
      <div class="CSS_ICON_LIST_DEDENT" />
    </Button>
    <ImageUploadPopover
      v-if="uploader && items.insertImage"
      :uploader="uploader"
      :disabled="!items.insertImage.canExec"
      tooltip="Insert Image"
    >
      <div class="CSS_ICON_IMAGE" />
    </ImageUploadPopover>
  </div>
</template>

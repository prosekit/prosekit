<script lang="ts">
import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/svelte'
import Button from './button.svelte'
import type { EditorExtension } from './extension'
import ImageUploadPopover from './image-upload-popover.svelte'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<div class={Themes.TOOLBAR}>
  <Button
    pressed={false}
    disabled={!$editor.commands.undo.canExec()}
    onClick={() => $editor.commands.undo()}
    tooltip="Undo"
  >
    <div class={Themes.ICON_UNDO}></div>
  </Button>

  <Button
    pressed={false}
    disabled={!$editor.commands.redo.canExec()}
    onClick={() => $editor.commands.redo()}
    tooltip="Redo"
  >
    <div class={Themes.ICON_REDO}></div>
  </Button>

  <Button
    pressed={$editor.marks.bold.isActive()}
    disabled={!$editor.commands.toggleBold.canExec()}
    onClick={() => $editor.commands.toggleBold()}
    tooltip="Bold"
  >
    <div class={Themes.ICON_BOLD}></div>
  </Button>

  <Button
    pressed={$editor.marks.italic.isActive()}
    disabled={!$editor.commands.toggleItalic.canExec()}
    onClick={() => $editor.commands.toggleItalic()}
    tooltip="Italic"
  >
    <div class={Themes.ICON_ITALIC}></div>
  </Button>

  <Button
    pressed={$editor.marks.underline.isActive()}
    disabled={!$editor.commands.toggleUnderline.canExec()}
    onClick={() => $editor.commands.toggleUnderline()}
    tooltip="Underline"
  >
    <div class={Themes.ICON_UNDERLINE}></div>
  </Button>

  <Button
    pressed={$editor.marks.strike.isActive()}
    disabled={!$editor.commands.toggleStrike.canExec()}
    onClick={() => $editor.commands.toggleStrike()}
    tooltip="Strike"
  >
    <div class={Themes.ICON_STRIKE}></div>
  </Button>

  <Button
    pressed={$editor.marks.code.isActive()}
    disabled={!$editor.commands.toggleCode.canExec()}
    onClick={() => $editor.commands.toggleCode()}
    tooltip="Code"
  >
    <div class={Themes.ICON_CODE}></div>
  </Button>

  <Button
    pressed={$editor.nodes.heading.isActive({ level: 1 })}
    disabled={!$editor.commands.toggleHeading.canExec({ level: 1 })}
    onClick={() => $editor.commands.toggleHeading({ level: 1 })}
    tooltip="Heading 1"
  >
    <div class={Themes.ICON_H1}></div>
  </Button>

  <Button
    pressed={$editor.nodes.heading.isActive({ level: 2 })}
    disabled={!$editor.commands.toggleHeading.canExec({ level: 2 })}
    onClick={() => $editor.commands.toggleHeading({ level: 2 })}
    tooltip="Heading 2"
  >
    <div class={Themes.ICON_H2}></div>
  </Button>

  <Button
    pressed={$editor.nodes.heading.isActive({ level: 3 })}
    disabled={!$editor.commands.toggleHeading.canExec({ level: 3 })}
    onClick={() => $editor.commands.toggleHeading({ level: 3 })}
    tooltip="Heading 3"
  >
    <div class={Themes.ICON_H3}></div>
  </Button>

  <Button
    pressed={$editor.nodes.horizontalRule.isActive()}
    disabled={!$editor.commands.insertHorizontalRule.canExec()}
    onClick={() => $editor.commands.insertHorizontalRule()}
    tooltip="Divider"
  >
    <div class={Themes.ICON_MINUS}></div>
  </Button>

  <Button
    pressed={$editor.nodes.list.isActive({ kind: 'bullet' })}
    disabled={!$editor.commands.toggleList.canExec({ kind: 'bullet' })}
    onClick={() => $editor.commands.toggleList({ kind: 'bullet' })}
    tooltip="Bullet List"
  >
    <div class={Themes.ICON_LIST_BULLET}></div>
  </Button>

  <Button
    pressed={$editor.nodes.list.isActive({ kind: 'ordered' })}
    disabled={!$editor.commands.toggleList.canExec({ kind: 'ordered' })}
    onClick={() => $editor.commands.toggleList({ kind: 'ordered' })}
    tooltip="Ordered List"
  >
    <div class={Themes.ICON_LIST_ORDERED}></div>
  </Button>

  <Button
    pressed={$editor.nodes.list.isActive({ kind: 'task' })}
    disabled={!$editor.commands.toggleList.canExec({ kind: 'task' })}
    onClick={() => $editor.commands.toggleList({ kind: 'task' })}
    tooltip="Task List"
  >
    <div class={Themes.ICON_LIST_TASK}></div>
  </Button>

  <Button
    pressed={$editor.nodes.list.isActive({ kind: 'toggle' })}
    disabled={!$editor.commands.toggleList.canExec({ kind: 'toggle' })}
    onClick={() => $editor.commands.toggleList({ kind: 'toggle' })}
    tooltip="Toggle List"
  >
    <div class={Themes.ICON_LIST_TOGGLE}></div>
  </Button>

  <Button
    pressed={false}
    disabled={!$editor.commands.indentList.canExec()}
    onClick={() => $editor.commands.indentList()}
    tooltip="Increase indentation"
  >
    <div class={Themes.ICON_LIST_INDENT}></div>
  </Button>

  <Button
    pressed={false}
    disabled={!$editor.commands.dedentList.canExec()}
    onClick={() => $editor.commands.dedentList()}
    tooltip="Decrease indentation"
  >
    <div class={Themes.ICON_LIST_DEDENT}></div>
  </Button>

  <ImageUploadPopover
    disabled={!$editor.commands.insertImage.canExec()}
    tooltip="Insert Image"
  >
    <div class={Themes.ICON_IMAGE}></div>
  </ImageUploadPopover>
</div>

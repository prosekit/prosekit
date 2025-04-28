<script lang="ts">
import { useEditor } from 'prosekit/svelte'
import Button from './button.svelte'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<div class="CSS_TOOLBAR">
  <Button
    pressed={false}
    disabled={!$editor.commands.undo.canExec()}
    onClick={() => $editor.commands.undo()}
  >
    <div class="CSS_ICON_UNDO"></div>
  </Button>

  <Button
    pressed={false}
    disabled={!$editor.commands.redo.canExec()}
    onClick={() => $editor.commands.redo()}
  >
    <div class="CSS_ICON_REDO"></div>
  </Button>

  <Button
    pressed={$editor.marks.bold.isActive()}
    disabled={!$editor.commands.toggleBold.canExec()}
    onClick={() => $editor.commands.toggleBold()}
  >
    <div class="CSS_ICON_BOLD"></div>
  </Button>

  <Button
    pressed={$editor.marks.italic.isActive()}
    disabled={!$editor.commands.toggleItalic.canExec()}
    onClick={() => $editor.commands.toggleItalic()}
  >
    <div class="CSS_ICON_ITALIC"></div>
  </Button>

  <Button
    pressed={$editor.nodes.heading.isActive({ level: 1 })}
    disabled={!$editor.commands.toggleHeading.canExec({ level: 1 })}
    onClick={() => $editor.commands.toggleHeading({ level: 1 })}
  >
    <div class="CSS_ICON_H1"></div>
  </Button>

  <Button
    pressed={$editor.nodes.heading.isActive({ level: 2 })}
    disabled={!$editor.commands.toggleHeading.canExec({ level: 2 })}
    onClick={() => $editor.commands.toggleHeading({ level: 2 })}
  >
    <div class="CSS_ICON_H2"></div>
  </Button>

  <Button
    pressed={$editor.nodes.heading.isActive({ level: 3 })}
    disabled={!$editor.commands.toggleHeading.canExec({ level: 3 })}
    onClick={() => $editor.commands.toggleHeading({ level: 3 })}
  >
    <div class="CSS_ICON_H3"></div>
  </Button>
</div>

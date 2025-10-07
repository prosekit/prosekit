<script lang="ts">
import { useEditor } from 'prosekit/svelte'
import Button from './button.svelte'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<div class="CSS_TOOLBAR">
  <Button
    pressed={$editor.nodes.blockquote.isActive()}
    disabled={!$editor.commands.toggleBlockquote.canExec()}
    onClick={() => $editor.commands.toggleBlockquote()}
    tooltip="Blockquote"
  >
    <div class="CSS_ICON_BLOCKQUOTE" />
  </Button>
</div>

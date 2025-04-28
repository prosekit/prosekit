<script lang="ts">
import { useEditor } from 'prosekit/svelte'
import Button from './button.svelte'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<div class="CSS_TOOLBAR">
  <Button
    pressed={$editor.nodes.codeBlock.isActive()}
    disabled={!$editor.commands.setCodeBlock.canExec()}
    onClick={() => $editor.commands.setCodeBlock()}
    tooltip="Heading 1"
  >
    <div class="CSS_ICON_CODE_BLOCK"></div>
  </Button>
</div>

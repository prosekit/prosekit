<script lang="ts">
import { useEditor } from 'prosekit/svelte'
import Button from './button.svelte'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<div class="CSS_TOOLBAR">
  <Button
    pressed={$editor.nodes.horizontalRule.isActive()}
    onClick={() => $editor.commands.insertHorizontalRule()}
    tooltip="Divider"
  >
    <div class="CSS_ICON_MINUS"></div>
  </Button>
</div>

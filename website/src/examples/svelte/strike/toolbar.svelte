<script lang="ts">
import { useEditor } from 'prosekit/svelte'
import Button from './button.svelte'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<div class="CSS_TOOLBAR">
  <Button
    pressed={$editor.marks.strike.isActive()}
    onClick={() => $editor.commands.toggleStrike()}
    tooltip="Strike"
  >
    Strike
  </Button>
</div>

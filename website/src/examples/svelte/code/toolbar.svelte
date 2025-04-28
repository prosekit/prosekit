<script lang="ts">
import { useEditor } from 'prosekit/svelte'
import Button from './button.svelte'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<div class="CSS_TOOLBAR">
  <Button
    pressed={$editor.marks.code.isActive()}
    onClick={() => $editor.commands.toggleCode()}
  >
    Code
  </Button>
</div>

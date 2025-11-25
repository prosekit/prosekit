<script lang="ts">
import { useEditor } from 'prosekit/svelte'

import { Button } from '../../ui/button'

import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<div class="CSS_TOOLBAR">
  <Button
    pressed={false}
    disabled={!$editor.commands.toggleStrike.canExec()}
    onClick={() => $editor.commands.toggleStrike()}
  >
    Strikethrough
  </Button>
</div>

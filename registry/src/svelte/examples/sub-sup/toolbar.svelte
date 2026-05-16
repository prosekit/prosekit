<script lang="ts">
import { useEditor } from 'prosekit/svelte'

import { Button } from '../../ui/button'

import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<div class="CSS_TOOLBAR">
  <Button
    pressed={false}
    disabled={!$editor.commands.toggleSubscript.canExec()}
    onClick={() => $editor.commands.toggleSubscript()}
  >
    Subscript
  </Button>
  <Button
    pressed={false}
    disabled={!$editor.commands.toggleSuperscript.canExec()}
    onClick={() => $editor.commands.toggleSuperscript()}
  >
    Superscript
  </Button>
</div>

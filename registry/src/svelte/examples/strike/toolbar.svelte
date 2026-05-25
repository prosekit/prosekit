<script lang="ts">
import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/svelte'

import { Button } from '../../ui/button/index.ts'

import type { EditorExtension } from './extension.ts'

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    strike: {
      isActive: editor.marks.strike.isActive(),
      canExec: editor.commands.toggleStrike.canExec(),
      command: () => editor.commands.toggleStrike(),
    },
  }
}

const items = useEditorDerivedValue(getToolbarItems)
</script>

<div class="CSS_TOOLBAR">
  <Button
    pressed={$items.strike.isActive}
    disabled={!$items.strike.canExec}
    onClick={$items.strike.command}
  >
    Strikethrough
  </Button>
</div>

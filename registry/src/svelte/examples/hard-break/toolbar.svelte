<script lang="ts">
import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/svelte'

import { Button } from '../../ui/button/index.ts'

import type { EditorExtension } from './extension.ts'

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    hardBreak: {
      canExec: editor.commands.insertHardBreak.canExec(),
      command: () => editor.commands.insertHardBreak(),
    },
  }
}

const items = useEditorDerivedValue(getToolbarItems)
</script>

<div class="CSS_TOOLBAR">
  <Button
    pressed={false}
    disabled={!$items.hardBreak.canExec}
    onClick={$items.hardBreak.command}
  >
    Insert Hard Break
  </Button>
</div>

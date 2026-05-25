<script lang="ts">
import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/svelte'

import { Button } from '../../ui/button/index.ts'

import type { EditorExtension } from './extension.ts'

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    highlight: {
      isActive: editor.marks.highlight.isActive(),
      canExec: editor.commands.toggleHighlight.canExec(),
      command: () => editor.commands.toggleHighlight(),
    },
  }
}

const items = useEditorDerivedValue(getToolbarItems)
</script>

<div class="CSS_TOOLBAR">
  <Button
    pressed={$items.highlight.isActive}
    disabled={!$items.highlight.canExec}
    onClick={$items.highlight.command}
  >
    Highlight
  </Button>
</div>

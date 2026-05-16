import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/solid'
import type { JSX } from 'solid-js'

import { Button } from '../../ui/button'

import type { EditorExtension } from './extension'

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    highlight: {
      isActive: editor.marks.highlight.isActive(),
      canExec: editor.commands.toggleHighlight.canExec(),
      command: () => editor.commands.toggleHighlight(),
    },
  }
}

export default function Toolbar(): JSX.Element {
  const items = useEditorDerivedValue(getToolbarItems)

  return (
    <div class="CSS_TOOLBAR">
      <Button
        pressed={items().highlight.isActive}
        disabled={!items().highlight.canExec}
        onClick={items().highlight.command}
      >
        Highlight
      </Button>
    </div>
  )
}

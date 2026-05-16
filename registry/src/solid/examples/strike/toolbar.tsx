import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/solid'
import type { JSX } from 'solid-js'

import { Button } from '../../ui/button'

import type { EditorExtension } from './extension'

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    strike: {
      isActive: editor.marks.strike.isActive(),
      canExec: editor.commands.toggleStrike.canExec(),
      command: () => editor.commands.toggleStrike(),
    },
  }
}

export default function Toolbar(): JSX.Element {
  const items = useEditorDerivedValue(getToolbarItems)

  return (
    <div class="CSS_TOOLBAR">
      <Button
        pressed={items().strike.isActive}
        disabled={!items().strike.canExec}
        onClick={items().strike.command}
      >
        Strikethrough
      </Button>
    </div>
  )
}

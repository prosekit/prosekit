import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/solid'
import type { JSX } from 'solid-js'

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

export default function Toolbar(): JSX.Element {
  const items = useEditorDerivedValue(getToolbarItems)

  return (
    <div class="CSS_TOOLBAR">
      <Button
        pressed={false}
        disabled={!items().hardBreak.canExec}
        onClick={items().hardBreak.command}
      >
        Insert Hard Break
      </Button>
    </div>
  )
}

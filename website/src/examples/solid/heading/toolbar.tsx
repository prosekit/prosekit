import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/solid'

import Button from './button'
import type { EditorExtension } from './extension'

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    heading1: {
      isActive: editor.nodes.heading.isActive({ level: 1 }),
      canExec: editor.commands.toggleHeading.canExec({ level: 1 }),
      command: () => editor.commands.toggleHeading({ level: 1 }),
    },
    heading2: {
      isActive: editor.nodes.heading.isActive({ level: 2 }),
      canExec: editor.commands.toggleHeading.canExec({ level: 2 }),
      command: () => editor.commands.toggleHeading({ level: 2 }),
    },
    heading3: {
      isActive: editor.nodes.heading.isActive({ level: 3 }),
      canExec: editor.commands.toggleHeading.canExec({ level: 3 }),
      command: () => editor.commands.toggleHeading({ level: 3 }),
    },
  }
}

export default function Toolbar() {
  const items = useEditorDerivedValue(getToolbarItems)

  return (
    <div class="CSS_TOOLBAR">
      <Button
        pressed={() => items().heading1.isActive}
        disabled={() => !items().heading1.canExec}
        onClick={() => items().heading1.command()}
      >
        H1
      </Button>

      <Button
        pressed={() => items().heading2.isActive}
        disabled={() => !items().heading2.canExec}
        onClick={() => items().heading2.command()}
      >
        H2
      </Button>

      <Button
        pressed={() => items().heading3.isActive}
        disabled={() => !items().heading3.canExec}
        onClick={() => items().heading3.command()}
      >
        H3
      </Button>
    </div>
  )
}

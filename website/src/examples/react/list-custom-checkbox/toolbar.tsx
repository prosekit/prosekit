import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/react'

import Button from './button'
import type { EditorExtension } from './extension'

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    bullet: {
      isActive: editor.nodes.list.isActive({ kind: 'bullet' }),
      canExec: editor.commands.toggleList.canExec({ kind: 'bullet' }),
      command: () => editor.commands.toggleList({ kind: 'bullet' }),
    },
    ordered: {
      isActive: editor.nodes.list.isActive({ kind: 'ordered' }),
      canExec: editor.commands.toggleList.canExec({ kind: 'ordered' }),
      command: () => editor.commands.toggleList({ kind: 'ordered' }),
    },
    task: {
      isActive: editor.nodes.list.isActive({ kind: 'task' }),
      canExec: editor.commands.toggleList.canExec({ kind: 'task' }),
      command: () => editor.commands.toggleList({ kind: 'task' }),
    },
    toggle: {
      isActive: editor.nodes.list.isActive({ kind: 'toggle' }),
      canExec: editor.commands.toggleList.canExec({ kind: 'toggle' }),
      command: () => editor.commands.toggleList({ kind: 'toggle' }),
    },
  }
}

export default function Toolbar() {
  const items = useEditorDerivedValue(getToolbarItems)

  return (
    <div className="CSS_TOOLBAR">
      <Button
        pressed={items.bullet.isActive}
        disabled={!items.bullet.canExec}
        onClick={items.bullet.command}
      >
        <div className="CSS_ICON_LIST_BULLET" />
      </Button>

      <Button
        pressed={items.ordered.isActive}
        disabled={!items.ordered.canExec}
        onClick={items.ordered.command}
      >
        <div className="CSS_ICON_LIST_ORDERED" />
      </Button>

      <Button
        pressed={items.task.isActive}
        disabled={!items.task.canExec}
        onClick={items.task.command}
      >
        <div className="CSS_ICON_LIST_TASK" />
      </Button>

      <Button
        pressed={items.toggle.isActive}
        disabled={!items.toggle.canExec}
        onClick={items.toggle.command}
      >
        <div className="CSS_ICON_LIST_TOGGLE" />
      </Button>
    </div>
  )
}

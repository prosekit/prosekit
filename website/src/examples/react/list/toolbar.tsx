import { useEditor } from 'prosekit/react'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div className="CSS_TOOLBAR">
      <Button
        pressed={editor.nodes.list.isActive({ kind: 'bullet' })}
        disabled={!editor.commands.toggleList.canExec({ kind: 'bullet' })}
        onClick={() => editor.commands.toggleList({ kind: 'bullet' })}
      >
        <div className="CSS_ICON_LIST_BULLET" />
      </Button>

      <Button
        pressed={editor.nodes.list.isActive({ kind: 'ordered' })}
        disabled={!editor.commands.toggleList.canExec({ kind: 'ordered' })}
        onClick={() => editor.commands.toggleList({ kind: 'ordered' })}
      >
        <div className="CSS_ICON_LIST_ORDERED" />
      </Button>

      <Button
        pressed={editor.nodes.list.isActive({ kind: 'task' })}
        disabled={!editor.commands.toggleList.canExec({ kind: 'task' })}
        onClick={() => editor.commands.toggleList({ kind: 'task' })}
      >
        <div className="CSS_ICON_LIST_TASK" />
      </Button>

      <Button
        pressed={editor.nodes.list.isActive({ kind: 'toggle' })}
        disabled={!editor.commands.toggleList.canExec({ kind: 'toggle' })}
        onClick={() => editor.commands.toggleList({ kind: 'toggle' })}
      >
        <div className="CSS_ICON_LIST_TOGGLE" />
      </Button>
    </div>
  )
}

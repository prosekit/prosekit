import { useEditor } from 'prosekit/react'

import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div className="TOOLBAR">
      <button
        data-state={
          editor.nodes.list.isActive({ kind: 'bullet' }) ? 'on' : 'off'
        }
        onClick={() => editor.commands.toggleList({ kind: 'bullet' })}
        onMouseDown={(event) => event.preventDefault()}
        className="TOGGLE_BUTTON"
      >
        <div className="ICON_LIST_BULLET" />
      </button>

      <button
        data-state={
          editor.nodes.list.isActive({ kind: 'ordered' }) ? 'on' : 'off'
        }
        onClick={() => editor.commands.toggleList({ kind: 'ordered' })}
        onMouseDown={(event) => event.preventDefault()}
        className="TOGGLE_BUTTON"
      >
        <div className="ICON_LIST_ORDERED" />
      </button>

      <button
        data-state={editor.nodes.list.isActive({ kind: 'task' }) ? 'on' : 'off'}
        onClick={() => editor.commands.toggleList({ kind: 'task' })}
        onMouseDown={(event) => event.preventDefault()}
        className="TOGGLE_BUTTON"
      >
        <div className="ICON_LIST_TASK" />
      </button>

      <button
        data-state={
          editor.nodes.list.isActive({ kind: 'toggle' }) ? 'on' : 'off'
        }
        onClick={() => editor.commands.toggleList({ kind: 'toggle' })}
        onMouseDown={(event) => event.preventDefault()}
        className="TOGGLE_BUTTON"
      >
        <div className="ICON_LIST_TOGGLE" />
      </button>
    </div>
  )
}

import { useTypedEditor } from './use-typed-editor'

export default function Toolbar() {
  const editor = useTypedEditor({ update: true })

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
        Bullet
      </button>

      <button
        data-state={
          editor.nodes.list.isActive({ kind: 'ordered' }) ? 'on' : 'off'
        }
        onClick={() => editor.commands.toggleList({ kind: 'ordered' })}
        onMouseDown={(event) => event.preventDefault()}
        className="TOGGLE_BUTTON"
      >
        Ordered
      </button>

      <button
        data-state={editor.nodes.list.isActive({ kind: 'task' }) ? 'on' : 'off'}
        onClick={() => editor.commands.toggleList({ kind: 'task' })}
        onMouseDown={(event) => event.preventDefault()}
        className="TOGGLE_BUTTON"
      >
        Task
      </button>

      <button
        data-state={
          editor.nodes.list.isActive({ kind: 'toggle' }) ? 'on' : 'off'
        }
        onClick={() => editor.commands.toggleList({ kind: 'toggle' })}
        onMouseDown={(event) => event.preventDefault()}
        className="TOGGLE_BUTTON"
      >
        Toggle
      </button>
    </div>
  )
}

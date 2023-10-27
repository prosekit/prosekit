/** @jsxImportSource solid-js */

import { useTypedEditor } from './use-typed-editor'

export default function Toolbar() {
  const editor = useTypedEditor({ update: true })

  return (
    <div class="TOOLBAR">
      <button
        data-state={
          editor().nodes.heading.isActive({ level: 1 }) ? 'on' : 'off'
        }
        onClick={() => editor().commands.toggleHeading({ level: 1 })}
        onMouseDown={(event) => event.preventDefault()}
        class="TOGGLE_BUTTON"
      >
        H1
      </button>

      <button
        data-state={
          editor().nodes.heading.isActive({ level: 2 }) ? 'on' : 'off'
        }
        onClick={() => editor().commands.toggleHeading({ level: 2 })}
        onMouseDown={(event) => event.preventDefault()}
        class="TOGGLE_BUTTON"
      >
        H2
      </button>

      <button
        data-state={
          editor().nodes.heading.isActive({ level: 3 }) ? 'on' : 'off'
        }
        onClick={() => editor().commands.toggleHeading({ level: 3 })}
        onMouseDown={(event) => event.preventDefault()}
        class="TOGGLE_BUTTON"
      >
        H3
      </button>
    </div>
  )
}

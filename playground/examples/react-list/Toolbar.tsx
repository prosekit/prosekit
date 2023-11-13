import { useEditor } from 'prosekit/react'

import ToggleButton from './ToggleButton'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div className="TOOLBAR">
      <ToggleButton
        active={editor.nodes.list.isActive({ kind: 'bullet' })}
        available={editor.commands.toggleList.canApply({ kind: 'bullet' })}
        onChange={() => editor.commands.toggleList({ kind: 'bullet' })}
      >
        <div className="ICON_LIST_BULLET" />
      </ToggleButton>

      <ToggleButton
        active={editor.nodes.list.isActive({ kind: 'ordered' })}
        available={editor.commands.toggleList.canApply({ kind: 'ordered' })}
        onChange={() => editor.commands.toggleList({ kind: 'ordered' })}
      >
        <div className="ICON_LIST_ORDERED" />
      </ToggleButton>

      <ToggleButton
        active={editor.nodes.list.isActive({ kind: 'task' })}
        available={editor.commands.toggleList.canApply({ kind: 'task' })}
        onChange={() => editor.commands.toggleList({ kind: 'task' })}
      >
        <div className="ICON_LIST_TASK" />
      </ToggleButton>

      <ToggleButton
        active={editor.nodes.list.isActive({ kind: 'toggle' })}
        available={editor.commands.toggleList.canApply({ kind: 'toggle' })}
        onChange={() => editor.commands.toggleList({ kind: 'toggle' })}
      >
        <div className="ICON_LIST_TOGGLE" />
      </ToggleButton>
    </div>
  )
}

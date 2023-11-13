/** @jsxImportSource solid-js */

import { useEditor } from 'prosekit/solid'

import ToggleButton from './ToggleButton'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div class="TOOLBAR">
      <ToggleButton
        active={editor().nodes.heading.isActive({ level: 1 })}
        available={editor().commands.toggleHeading.canApply({ level: 1 })}
        onChange={() => editor().commands.toggleHeading({ level: 1 })}
      >
        H1
      </ToggleButton>

      <ToggleButton
        active={editor().nodes.heading.isActive({ level: 2 })}
        available={editor().commands.toggleHeading.canApply({ level: 2 })}
        onChange={() => editor().commands.toggleHeading({ level: 2 })}
      >
        H2
      </ToggleButton>

      <ToggleButton
        active={editor().nodes.heading.isActive({ level: 3 })}
        available={editor().commands.toggleHeading.canApply({ level: 3 })}
        onChange={() => editor().commands.toggleHeading({ level: 3 })}
      >
        H3
      </ToggleButton>
    </div>
  )
}

import { useEditor } from 'prosekit/solid'

import type { EditorExtension } from './extension'
import Toggle from './toggle'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div class="TOOLBAR">
      <Toggle
        active={() => editor().nodes.heading.isActive({ level: 1 })}
        available={() => editor().commands.toggleHeading.canApply({ level: 1 })}
        onChange={() => editor().commands.toggleHeading({ level: 1 })}
      >
        H1
      </Toggle>

      <Toggle
        active={() => editor().nodes.heading.isActive({ level: 2 })}
        available={() => editor().commands.toggleHeading.canApply({ level: 2 })}
        onChange={() => editor().commands.toggleHeading({ level: 2 })}
      >
        H2
      </Toggle>

      <Toggle
        active={() => editor().nodes.heading.isActive({ level: 3 })}
        available={() => editor().commands.toggleHeading.canApply({ level: 3 })}
        onChange={() => editor().commands.toggleHeading({ level: 3 })}
      >
        H3
      </Toggle>
    </div>
  )
}

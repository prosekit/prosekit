import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/solid'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div class={Themes.TOOLBAR}>
      <Button
        pressed={() => editor().nodes.heading.isActive({ level: 1 })}
        disabled={() => !editor().commands.toggleHeading.canApply({ level: 1 })}
        onClick={() => editor().commands.toggleHeading({ level: 1 })}
      >
        H1
      </Button>

      <Button
        pressed={() => editor().nodes.heading.isActive({ level: 2 })}
        disabled={() => !editor().commands.toggleHeading.canApply({ level: 2 })}
        onClick={() => editor().commands.toggleHeading({ level: 2 })}
      >
        H2
      </Button>

      <Button
        pressed={() => editor().nodes.heading.isActive({ level: 3 })}
        disabled={() => !editor().commands.toggleHeading.canApply({ level: 3 })}
        onClick={() => editor().commands.toggleHeading({ level: 3 })}
      >
        H3
      </Button>
    </div>
  )
}

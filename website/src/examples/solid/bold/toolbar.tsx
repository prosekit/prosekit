import { useEditor } from 'prosekit/solid'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div class="CSS_TOOLBAR">
      <Button
        pressed={() => editor().marks.bold.isActive()}
        onClick={() => editor().commands.toggleBold()}
      >
        Bold
      </Button>
    </div>
  )
}

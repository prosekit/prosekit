import { useEditor } from 'prosekit/solid'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div class="CSS_TOOLBAR">
      <Button
        pressed={() => editor().marks.underline.isActive()}
        disabled={() => !editor().commands.toggleUnderline.canExec()}
        onClick={() => editor().commands.toggleUnderline()}
      >
        Underline
      </Button>
    </div>
  )
}

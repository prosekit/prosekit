import { useEditor } from 'prosekit/solid'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div class="CSS_TOOLBAR">
      <Button
        pressed={() => editor().marks.italic.isActive()}
        onClick={() => editor().commands.toggleItalic()}
        tooltip="Italic"
      >
        <div class="CSS_ICON_ITALIC"></div>
      </Button>
    </div>
  )
}

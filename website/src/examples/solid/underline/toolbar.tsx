import { useEditor } from 'prosekit/solid'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div class="CSS_TOOLBAR">
      <Button
        pressed={() => editor().marks.underline.isActive()}
        onClick={() => editor().commands.toggleUnderline()}
        tooltip="Underline"
      >
        <div class="CSS_ICON_UNDERLINE"></div>
      </Button>
    </div>
  )
}

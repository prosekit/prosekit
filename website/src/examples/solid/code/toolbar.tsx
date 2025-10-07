import { useEditor } from 'prosekit/solid'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div class="CSS_TOOLBAR">
      <Button
        pressed={() => editor().marks.code.isActive()}
        onClick={() => editor().commands.toggleCode()}
        tooltip="Code"
      >
        <div class="CSS_ICON_CODE"></div>
      </Button>
    </div>
  )
}

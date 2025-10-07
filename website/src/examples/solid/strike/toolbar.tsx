import { useEditor } from 'prosekit/solid'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div class="CSS_TOOLBAR">
      <Button
        pressed={() => editor().marks.strike.isActive()}
        onClick={() => editor().commands.toggleStrike()}
        tooltip="Strikethrough"
      >
        <div class="CSS_ICON_STRIKETHROUGH"></div>
      </Button>
    </div>
  )
}

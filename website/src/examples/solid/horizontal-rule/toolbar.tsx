import { useEditor } from 'prosekit/solid'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div class="CSS_TOOLBAR">
      <Button
        pressed={() => editor().nodes.horizontalRule.isActive()}
        onClick={() => editor().commands.insertHorizontalRule()}
        tooltip="Divider"
      >
        <div class="CSS_ICON_MINUS"></div>
      </Button>
    </div>
  )
}

import { useEditor } from 'prosekit/solid'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div class="CSS_TOOLBAR">
      <Button
        pressed={() => editor().nodes.blockquote.isActive()}
        disabled={() => !editor().commands.toggleBlockquote.canExec()}
        onClick={() => editor().commands.toggleBlockquote()}
        tooltip="Blockquote"
      >
        <div class="CSS_ICON_BLOCKQUOTE" />
      </Button>
    </div>
  )
}

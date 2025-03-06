import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/react'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div className={Themes.TOOLBAR}>
      <Button
        pressed={editor.nodes.blockquote.isActive()}
        disabled={!editor.commands.toggleBlockquote.canExec()}
        onClick={() => editor.commands.setBlockquote()}
        tooltip="Blockquote"
      >
        <div className={Themes.ICON_BLOCKQUOTE} />
      </Button>
    </div>
  )
}

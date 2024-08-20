import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/react'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div className={Themes.TOOLBAR}>
      <Button
        pressed={editor.nodes.codeBlock.isActive()}
        disabled={!editor.commands.setCodeBlock.canExec()}
        onClick={() => editor.commands.setCodeBlock()}
      >
        <div className={Themes.ICON_CODE_BLOCK} />
      </Button>
    </div>
  )
}

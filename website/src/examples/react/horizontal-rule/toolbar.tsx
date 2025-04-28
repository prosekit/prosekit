import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/react'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div className={Themes.TOOLBAR}>
      <Button
        pressed={editor.nodes.horizontalRule.isActive()}
        disabled={!editor.commands.insertHorizontalRule.canExec()}
        onClick={() => editor.commands.insertHorizontalRule()}
        tooltip="Divider"
      >
        <div className={Themes.CSS_ICON_MINUS}></div>
      </Button>
    </div>
  )
}

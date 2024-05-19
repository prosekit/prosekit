import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/react'

import type { EditorExtension } from './extension'
import Toggle from './toggle'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div className={Themes.TOOLBAR}>
      <Toggle
        pressed={editor.nodes.codeBlock.isActive()}
        disabled={!editor.commands.setCodeBlock.canApply()}
        onClick={() => editor.commands.setCodeBlock()}
      >
        <div className={Themes.ICON_CODE_BLOCK} />
      </Toggle>
    </div>
  )
}

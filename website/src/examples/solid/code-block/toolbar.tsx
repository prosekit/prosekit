import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/solid'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div class={Themes.TOOLBAR}>
      <Button
        pressed={editor().nodes.codeBlock.isActive}
        disabled={() => !editor().commands.setCodeBlock.canExec()}
        onClick={editor().commands.setCodeBlock}
      >
        <div class={Themes.CSS_ICON_CODE_BLOCK} />
      </Button>
    </div>
  )
}

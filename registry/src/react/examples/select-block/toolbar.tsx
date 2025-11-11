import { useEditor } from 'prosekit/react'

import { Button } from '../../ui/button'

import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div className="CSS_TOOLBAR">
      <Button
        pressed={false}
        disabled={!editor.commands.selectBlock?.canExec()}
        onClick={() => editor.commands.selectBlock?.()}
        tooltip="Select current block"
      >
        Select Block
      </Button>
    </div>
  )
}



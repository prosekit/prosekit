import { useEditor } from 'prosekit/react'

import { Button } from '../../ui/button'

import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div className="CSS_TOOLBAR">
      <Button
        pressed={false}
        disabled={!editor.commands.insertHardBreak.canExec()}
        onClick={() => editor.commands.insertHardBreak()}
      >
        Insert Hard Break
      </Button>
    </div>
  )
}

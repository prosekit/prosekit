'use client'

import { useEditor } from 'prosekit/react'

import { Button } from '../../ui/button'

import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div className="CSS_TOOLBAR">
      <Button
        pressed={false}
        disabled={!editor.commands.toggleSubscript.canExec()}
        onClick={() => editor.commands.toggleSubscript()}
      >
        Subscript
      </Button>
      <Button
        pressed={false}
        disabled={!editor.commands.toggleSuperscript.canExec()}
        onClick={() => editor.commands.toggleSuperscript()}
      >
        Superscript
      </Button>
    </div>
  )
}

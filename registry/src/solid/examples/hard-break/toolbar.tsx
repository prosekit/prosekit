import { useEditor } from 'prosekit/solid'
import type { JSX } from 'solid-js'

import { Button } from '../../ui/button'

import type { EditorExtension } from './extension'

export default function Toolbar(): JSX.Element {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div class="CSS_TOOLBAR">
      <Button
        pressed={false}
        disabled={!editor().commands.insertHardBreak.canExec()}
        onClick={() => editor().commands.insertHardBreak()}
      >
        Insert Hard Break
      </Button>
    </div>
  )
}

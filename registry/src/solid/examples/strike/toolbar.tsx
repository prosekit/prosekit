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
        disabled={!editor().commands.toggleStrike.canExec()}
        onClick={() => editor().commands.toggleStrike()}
      >
        Strikethrough
      </Button>
    </div>
  )
}

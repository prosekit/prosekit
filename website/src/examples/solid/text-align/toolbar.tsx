import type { NodeAction } from 'prosekit/core'
import { useEditor } from 'prosekit/solid'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  const isTextAlignActive = (value: string) => {
    return Object.values(editor().nodes).some((node: NodeAction<any>) => {
      return node.isActive({ textAlign: value })
    })
  }

  return (
    <div class="CSS_TOOLBAR">
      <Button
        pressed={() => isTextAlignActive('left')}
        disabled={() => !editor().commands.setTextAlign.canExec('left')}
        onClick={() => editor().commands.setTextAlign('left')}
      >
        Left
      </Button>

      <Button
        pressed={() => isTextAlignActive('center')}
        disabled={() => !editor().commands.setTextAlign.canExec('center')}
        onClick={() => editor().commands.setTextAlign('center')}
      >
        Center
      </Button>

      <Button
        pressed={() => isTextAlignActive('right')}
        disabled={() => !editor().commands.setTextAlign.canExec('right')}
        onClick={() => editor().commands.setTextAlign('right')}
      >
        Right
      </Button>

      <Button
        pressed={() => isTextAlignActive('justify')}
        disabled={() => !editor().commands.setTextAlign.canExec('justify')}
        onClick={() => editor().commands.setTextAlign('justify')}
      >
        Justify
      </Button>
    </div>
  )
}

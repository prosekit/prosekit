import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/solid'

import type { EditorExtension } from './extension'
import Toggle from './toggle'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  const isTextAlignActive = (value: string) => {
    return Object.values(editor().nodes).some((node) => {
      return node.isActive({ textAlign: value })
    })
  }

  return (
    <div class={Themes.TOOLBAR}>
      <Toggle
        pressed={() => isTextAlignActive('left')}
        disabled={() => !editor().commands.setTextAlign.canApply('left')}
        onClick={() => editor().commands.setTextAlign('left')}
      >
        Left
      </Toggle>

      <Toggle
        pressed={() => isTextAlignActive('center')}
        disabled={() => !editor().commands.setTextAlign.canApply('center')}
        onClick={() => editor().commands.setTextAlign('center')}
      >
        Center
      </Toggle>

      <Toggle
        pressed={() => isTextAlignActive('right')}
        disabled={() => !editor().commands.setTextAlign.canApply('right')}
        onClick={() => editor().commands.setTextAlign('right')}
      >
        Right
      </Toggle>

      <Toggle
        pressed={() => isTextAlignActive('justify')}
        disabled={() => !editor().commands.setTextAlign.canApply('justify')}
        onClick={() => editor().commands.setTextAlign('justify')}
      >
        Justify
      </Toggle>
    </div>
  )
}

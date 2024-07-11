import { Themes } from '@prosekit/themes'
import { useEditor } from 'prosekit/react'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div className={Themes.TOOLBAR}>
      <Button
        pressed={editor.nodes.list.isActive({ kind: 'bullet' })}
        disabled={!editor.commands.toggleList.canApply({ kind: 'bullet' })}
        onClick={() => editor.commands.toggleList({ kind: 'bullet' })}
      >
        <div className={Themes.ICON_LIST_BULLET} />
      </Button>

      <Button
        pressed={editor.nodes.list.isActive({ kind: 'ordered' })}
        disabled={!editor.commands.toggleList.canApply({ kind: 'ordered' })}
        onClick={() => editor.commands.toggleList({ kind: 'ordered' })}
      >
        <div className={Themes.ICON_LIST_ORDERED} />
      </Button>

      <Button
        pressed={editor.nodes.list.isActive({ kind: 'task' })}
        disabled={!editor.commands.toggleList.canApply({ kind: 'task' })}
        onClick={() => editor.commands.toggleList({ kind: 'task' })}
      >
        <div className={Themes.ICON_LIST_TASK} />
      </Button>

      <Button
        pressed={editor.nodes.list.isActive({ kind: 'toggle' })}
        disabled={!editor.commands.toggleList.canApply({ kind: 'toggle' })}
        onClick={() => editor.commands.toggleList({ kind: 'toggle' })}
      >
        <div className={Themes.ICON_LIST_TOGGLE} />
      </Button>
    </div>
  )
}

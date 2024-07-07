import 'prosekit/basic/style.css'

import { Themes } from '@prosekit/themes'
import { Editor } from 'prosekit/core'
import { ProseKit, useDocChange } from 'prosekit/react'

export default function EditorComponent({
  editor,
  onDocChange,
}: {
  editor: Editor
  onDocChange: () => void
}) {
  useDocChange(onDocChange, { editor })

  return (
    <ProseKit editor={editor}>
      <div className={Themes.EDITOR_SCROLLING}>
        <div ref={editor.mount} className={Themes.EDITOR_CONTENT}></div>
      </div>
    </ProseKit>
  )
}

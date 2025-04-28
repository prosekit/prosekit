import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import type { Editor } from 'prosekit/core'
import {
  ProseKit,
  useDocChange,
} from 'prosekit/react'

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
      <div className="CSS_EDITOR_SCROLLING">
        <div ref={editor.mount} className="CSS_EDITOR_CONTENT"></div>
      </div>
    </ProseKit>
  )
}

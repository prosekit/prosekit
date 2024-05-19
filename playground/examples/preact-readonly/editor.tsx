import 'prosekit/basic/style.css'

import { useMemo } from 'preact/hooks'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/preact'

import { defineExtension } from './extension'
import Toolbar from './toolbar'

export default function Editor() {
  const editor = useMemo(() => {
    return createEditor({
      extension: defineExtension(),
      defaultHTML:
        'The content is readonly. Press the buttons above to toggle the readonly mode.',
    })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className="EDITOR_VIEWPORT">
        <div className="EDITOR_DOCUMENT">
          <Toolbar />
          <div ref={editor.mount} className="EDITOR_CONTENT"></div>
        </div>
      </div>
    </ProseKit>
  )
}

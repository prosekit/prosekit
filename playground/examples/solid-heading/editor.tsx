import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'

import { defineExtension } from './extension'
import Toolbar from './toolbar'

export default function Editor() {
  const editor = createEditor({ extension: defineExtension() })

  return (
    <ProseKit editor={editor}>
      <div class="EDITOR_VIEWPORT">
        <div class="EDITOR_DOCUMENT">
          <Toolbar />
          <div ref={editor.mount} class="EDITOR_CONTENT"></div>
        </div>
      </div>
    </ProseKit>
  )
}

import 'prosekit/core/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'

import { defineExtension } from './extension'
import Toolbar from './toolbar'

export default function Editor() {
  const editor = createEditor({
    extension: defineExtension(),
    defaultHTML:
      'The content is readonly. Press the buttons above to toggle the readonly mode.',
  })

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

import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'

import { defineExtension } from './extension'
import Toolbar from './toolbar'

export default function Editor() {
  const editor = createEditor({
    extension: defineExtension(),
    defaultHTML:
      '<h1 style="text-align:center;">Heading</h1>' +
      '<p style="text-align:left;">First paragraph</p>' +
      '<p style="text-align:center;">Second paragraph</p>' +
      '<p style="text-align:right;">Third paragraph</p>',
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

import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'

import { defineExtension } from './extension'
import Toolbar from './toolbar'

export default function Editor() {
  const editor = createEditor({
    extension: defineExtension(),
    defaultContent: 'The content is readonly. Press the buttons above to toggle the readonly mode.',
  })

  return (
    <ProseKit editor={editor}>
      <div class="CSS_EDITOR_VIEWPORT">
        <Toolbar />
        <div class="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} class="CSS_EDITOR_CONTENT"></div>
        </div>
      </div>
    </ProseKit>
  )
}

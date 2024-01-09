import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'

import { defaultDoc } from './default-doc'
import { defineExtension } from './extension'

export default function Editor() {
  const editor = createEditor({ extension: defineExtension(), defaultDoc })

  return (
    <ProseKit editor={editor}>
      <div class="EDITOR_VIEWPORT">
        <div class="EDITOR_DOCUMENT">
          <div ref={editor.mount} class="EDITOR_CONTENT"></div>
        </div>
      </div>
    </ProseKit>
  )
}

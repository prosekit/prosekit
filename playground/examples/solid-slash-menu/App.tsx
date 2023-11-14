import 'prosekit/basic/style.css'
import 'prosekit/extensions/placeholder/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'

import SlashMenu from './SlashMenu'
import { defineExtension } from './extension'

export default function App() {
  const editor = createEditor({ extension: defineExtension() })

  return (
    <ProseKit editor={editor}>
      <div class="EDITOR_VIEWPORT">
        <div class="EDITOR_DOCUMENT">
          <div ref={editor.mount} class="EDITOR_CONTENT"></div>
          <SlashMenu />
        </div>
      </div>
    </ProseKit>
  )
}

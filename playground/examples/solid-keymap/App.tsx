import 'prosekit/basic/style.css'
import 'prosekit/extensions/placeholder/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'

import KeymapConfig from './KeymapConfig'

export default function App() {
  const extension = defineBasicExtension()
  const editor = createEditor({ extension })

  return (
    <ProseKit editor={editor}>
      <div class="EDITOR_VIEWPORT">
        <div ref={editor.mount} class="EDITOR_CONTENT"></div>
        <KeymapConfig />
      </div>
    </ProseKit>
  )
}

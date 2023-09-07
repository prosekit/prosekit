/** @jsxImportSource solid-js */

import 'prosekit/basic/internal/preflight.css'
import 'prosekit/basic/style.css'
import 'prosekit/extensions/placeholder/style.css'

import { addBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'

export default function App() {
  const extension = addBasicExtension()
  const editor = createEditor({ extension })

  return (
    <ProseKit editor={editor}>
      <div ref={editor.mount} class="EDITOR_CONTENT"></div>
    </ProseKit>
  )
}

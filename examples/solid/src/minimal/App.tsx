import 'prosekit/basic/style.css'

import { addBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'

export default function App() {
  const extension = addBasicExtension()
  const editor = createEditor({ extension })

  return (
    <ProseKit editor={editor}>
      <div ref={editor.mount} class="example-editor"></div>
    </ProseKit>
  )
}

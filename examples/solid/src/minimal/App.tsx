import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'

import { addExampleExtension } from './extension'

export default function App() {
  const editor = createEditor({ extension: addExampleExtension() })

  return (
    <ProseKit editor={editor}>
      <div ref={editor.mount} class="example-editor"></div>
    </ProseKit>
  )
}

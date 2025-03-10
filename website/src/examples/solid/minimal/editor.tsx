import 'prosekit/basic/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'

export default function Editor() {
  const extension = defineBasicExtension()
  const editor = createEditor({ extension })

  return (
    <ProseKit editor={editor}>
      <div ref={editor.mount} style={{ outline: 'solid', padding: '1rem' }}></div>
    </ProseKit>
  )
}

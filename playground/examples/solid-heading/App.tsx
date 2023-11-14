import 'prosekit/core/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'

import Toolbar from './Toolbar'
import { defineExtension } from './extension'

export default function App() {
  const editor = createEditor({ extension: defineExtension() })

  return (
    <ProseKit editor={editor}>
      <Toolbar />
      <div ref={editor.mount} class="EDITOR_CONTENT"></div>
    </ProseKit>
  )
}

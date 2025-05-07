import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'

import { defineExtension } from './extension'
import Toolbar from './toolbar'

const defaultContent = `<p>
O’er all the hilltops<br />
Is quiet now,<br />
In all the treetops<br />
Hearest thou<br />
Hardly a breath;<br />
The birds are asleep in the trees:<br />
Wait, soon like these<br />
Thou too shalt rest.<br />
</p>
`

export default function Editor() {
  const editor = createEditor({ extension: defineExtension(), defaultContent })

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

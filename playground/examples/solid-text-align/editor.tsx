import 'prosekit/basic/style.css'

import { Themes } from '@prosekit/themes'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'

import { defineExtension } from './extension'
import Toolbar from './toolbar'

export default function Editor() {
  const editor = createEditor({
    extension: defineExtension(),
    defaultHTML:
      '<h1 style="text-align:center;">Heading</h1>' +
      '<p style="text-align:left;">First paragraph</p>' +
      '<p style="text-align:center;">Second paragraph</p>' +
      '<p style="text-align:right;">Third paragraph</p>',
  })

  return (
    <ProseKit editor={editor}>
      <div class={Themes.EDITOR_VIEWPORT}>
        <div class={Themes.EDITOR_DOCUMENT}>
          <Toolbar />
          <div ref={editor.mount} class={Themes.EDITOR_CONTENT}></div>
        </div>
      </div>
    </ProseKit>
  )
}

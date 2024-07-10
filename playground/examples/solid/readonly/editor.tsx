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
      'The content is readonly. Press the buttons above to toggle the readonly mode.',
  })

  return (
    <ProseKit editor={editor}>
      <div class={Themes.EDITOR_VIEWPORT}>
        <Toolbar />
        <div class={Themes.EDITOR_SCROLLING}>
          <div ref={editor.mount} class={Themes.EDITOR_CONTENT}></div>
        </div>
      </div>
    </ProseKit>
  )
}

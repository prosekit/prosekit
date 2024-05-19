import 'prosekit/basic/style.css'
import { Themes } from '@prosekit/themes'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'

import { defaultDoc } from './default-doc'
import { defineExtension } from './extension'

export default function Editor() {
  const editor = createEditor({ extension: defineExtension(), defaultDoc })

  return (
    <ProseKit editor={editor}>
      <div class={Themes.EDITOR_VIEWPORT}>
        <div class={Themes.EDITOR_DOCUMENT}>
          <div ref={editor.mount} class={Themes.EDITOR_CONTENT}></div>
        </div>
      </div>
    </ProseKit>
  )
}

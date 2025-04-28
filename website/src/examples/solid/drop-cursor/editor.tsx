import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { Themes } from '@prosekit/themes'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'

import { defaultContent } from './default-doc'
import { defineExtension } from './extension'

export default function Editor() {
  const editor = createEditor({ extension: defineExtension(), defaultContent })

  return (
    <ProseKit editor={editor}>
      <div class={Themes.CSS_EDITOR_VIEWPORT}>
        <div class={Themes.CSS_EDITOR_SCROLLING}>
          <div ref={editor.mount} class={Themes.CSS_EDITOR_CONTENT}></div>
        </div>
      </div>
    </ProseKit>
  )
}

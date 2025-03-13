import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { Themes } from '@prosekit/themes'
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'

import { typographyContent } from './typography-content'

export default function Editor() {
  const editor = createEditor({ extension: defineBasicExtension(), defaultContent: typographyContent })

  return (
    <ProseKit editor={editor}>
      <div class={Themes.EDITOR_VIEWPORT}>
        <div class={Themes.EDITOR_SCROLLING}>
          <div ref={editor.mount} class={Themes.EDITOR_CONTENT}></div>
        </div>
      </div>
    </ProseKit>
  )
}

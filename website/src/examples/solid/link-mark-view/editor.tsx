import 'prosekit/basic/style.css'

import { Themes } from '@prosekit/themes'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'

import { defineExtension } from './extension'

export default function Editor() {
  const editor = createEditor({ extension: defineExtension(), defaultContent })

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

const defaultContent = `
  <p>Here is a link that changes color every second: <a href="https://www.example.com">example link</a>
`

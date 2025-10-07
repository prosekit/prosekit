import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { useMemo } from 'preact/hooks'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/preact'

import { defineExtension } from './extension'
import Toolbar from './toolbar'

const defaultContent = '<h1 style="text-align:center;">Heading</h1>'
  + '<p style="text-align:left;">First paragraph</p>'
  + '<p style="text-align:center;">Second paragraph</p>'
  + '<p style="text-align:right;">Third paragraph</p>'

export default function Editor() {
  const editor = useMemo(() => {
    return createEditor({ extension: defineExtension(), defaultContent })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div class="CSS_EDITOR_VIEWPORT">
        <Toolbar />
        <div class="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} spellcheck={false} class="CSS_EDITOR_CONTENT"></div>
        </div>
      </div>
    </ProseKit>
  )
}

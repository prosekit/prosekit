import 'prosekit/basic/style.css'
import 'prosekit/extensions/placeholder/style.css'

import { useMemo } from 'preact/hooks'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/preact'

import { defineExtension } from './extension'
import SlashMenu from './slash-menu'

export default function Editor() {
  const editor = useMemo(() => {
    return createEditor({ extension: defineExtension() })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className="EDITOR_VIEWPORT">
        <div className="EDITOR_DOCUMENT">
          <div ref={editor.mount} className="EDITOR_CONTENT"></div>
          <SlashMenu />
        </div>
      </div>
    </ProseKit>
  )
}

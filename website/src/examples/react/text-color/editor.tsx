import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { defineExtension } from './extension'
import InlineMenu from './inline-menu'

const defaultContent = '<p>'
  + '<span style="color: #ef4444">Select</span> '
  + '<span style="color: #f97316">some</span> '
  + '<span style="color: #eab308">text</span> '
  + '<span style="color: #22c55e">to</span> '
  + '<span style="color: #3b82f6">change</span> '
  + '<span style="color: #6366f1">the</span> '
  + '<span style="color: #a855f7">color</span> '
  + '</p>'

export default function Editor() {
  const editor = useMemo(() => {
    return createEditor({ extension: defineExtension(), defaultContent })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className="CSS_EDITOR_VIEWPORT">
        <div className="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} className="CSS_EDITOR_CONTENT"></div>
          <InlineMenu />
        </div>
      </div>
    </ProseKit>
  )
}

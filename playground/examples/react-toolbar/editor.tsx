import 'highlight.js/styles/github-dark-dimmed.css'
import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { defineExtension } from './extension'
import Toolbar from './toolbar'

export default function Editor() {
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({ extension })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className="EDITOR_VIEWPORT">
        <div className="EDITOR_DOCUMENT">
          <Toolbar />
          <div ref={editor.mount} className="EDITOR_CONTENT"></div>
        </div>
      </div>
    </ProseKit>
  )
}

import 'prosekit/basic/style.css'
import 'prosekit/basic/internal/example.css'
import 'highlight.js/styles/github-dark-dimmed.css'

import { addBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import React from 'react'
import { useMemo } from 'react'

export default function App() {
  const editor = useMemo(() => {
    const extension = addBasicExtension()
    return createEditor({ extension })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div ref={editor.mount} className={`example-editor EDITOR_BOX`}></div>
    </ProseKit>
  )
}

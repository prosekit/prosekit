import 'prosekit/basic/internal/preflight.css'
import 'prosekit/basic/style.css'

import { addBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

export default function App() {
  const editor = useMemo(() => {
    const extension = addBasicExtension()
    return createEditor({ extension })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div ref={editor.mount} className="EDITOR_CONTENT"></div>
    </ProseKit>
  )
}

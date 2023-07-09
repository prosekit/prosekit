import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { addNoteExtension } from './extension'

export function App() {
  const editor = useMemo(() => {
    return createEditor({ extension: addNoteExtension() })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div ref={editor.mount} className="my-awesome-editor"></div>
    </ProseKit>
  )
}

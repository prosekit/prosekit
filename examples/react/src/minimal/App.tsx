import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { addExampleExtension } from './extension'

export default function App() {
  const editor = useMemo(() => {
    return createEditor({ extension: addExampleExtension() })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div ref={editor.mount} className="example-editor"></div>
    </ProseKit>
  )
}

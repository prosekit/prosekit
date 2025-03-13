import 'prosekit/basic/style.css'

import { useMemo } from 'preact/hooks'
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/preact'

export default function Editor() {
  const editor = useMemo(() => {
    const extension = defineBasicExtension()
    return createEditor({ extension })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div ref={editor.mount} style={{ outline: 'auto', padding: '1rem' }}></div>
    </ProseKit>
  )
}

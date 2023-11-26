import 'prosekit/basic/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import KeymapConfig from './keymap-config'

export default function Editor() {
  const editor = useMemo(() => {
    const extension = defineBasicExtension()
    return createEditor({ extension })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className="EDITOR_VIEWPORT">
        <div ref={editor.mount} className="EDITOR_CONTENT"></div>
        <KeymapConfig />
      </div>
    </ProseKit>
  )
}

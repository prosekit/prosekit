import 'prosekit/basic/style.css'

import { useMemo } from 'preact/hooks'
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/preact'

import KeymapConfig from './keymap-config'

export default function Editor() {
  const editor = useMemo(() => {
    const extension = defineBasicExtension()
    return createEditor({ extension })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className="EDITOR_VIEWPORT">
        <div className="EDITOR_CONTENT" ref={editor.mount}></div>
        <KeymapConfig />
      </div>
    </ProseKit>
  )
}

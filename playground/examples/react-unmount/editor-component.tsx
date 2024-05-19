import 'prosekit/basic/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import ExtensionComponent from './extension-component'

export default function EditorComponent({
  placeholder,
}: {
  placeholder: string
}) {
  const editor = useMemo(() => {
    return createEditor({ extension: defineBasicExtension() })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className="EDITOR_VIEWPORT">
        <div className="EDITOR_DOCUMENT">
          <div ref={editor.mount} className="EDITOR_CONTENT"></div>
        </div>
      </div>
      <ExtensionComponent placeholder={placeholder} />
    </ProseKit>
  )
}

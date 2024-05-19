import { createEditor } from 'prosekit/core'
import { definePlaceholder } from 'prosekit/extensions/placeholder'
import { ProseKit } from 'prosekit/react'
import { useEffect, useMemo } from 'react'
import { defineExtension } from './extension'

export function EditorComponent({ placeholder }: { placeholder: string }) {
  const editor = useMemo(() => {
    return createEditor({ extension: defineExtension() })
  }, [])

  useEffect(() => {
    return editor.use(definePlaceholder({ placeholder }))
  }, [placeholder])

  return (
    <ProseKit editor={editor}>
      <div className="EDITOR_VIEWPORT">
        <div className="EDITOR_DOCUMENT">
          <div ref={editor.mount} className="EDITOR_CONTENT"></div>
        </div>
      </div>
    </ProseKit>
  )
}

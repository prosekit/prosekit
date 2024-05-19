import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { definePlaceholder } from 'prosekit/extensions/placeholder'
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

function EditorGroup() {
  const nextKeyRef = useRef(1)
  const [editorKeys, setEditorKeys] = useState<number[]>([])

  const addEditor = useCallback(() => {
    const key = nextKeyRef.current
    nextKeyRef.current += 1
    setEditorKeys((keys) => [...keys, key])
  }, [])

  const removeEditor = useCallback((key: number) => {
    setEditorKeys((keys) => keys.filter((k) => k !== key))
  }, [])

  useEffect(() => {
    if (nextKeyRef.current === 1) {
      addEditor()
    }
  }, [addEditor])

  return (
    <div className="flex flex-col gap-2">
      <div className="gap-2 flex">
        <button onClick={addEditor} className="border p-2">
          Add editor
        </button>
        {editorKeys.map((key) => (
          <button
            key={key}
            onClick={() => removeEditor(key)}
            className="border p-2"
          >
            Unmount No.{key}
          </button>
        ))}
      </div>
      {editorKeys.map((key) => (
        <div key={key} className="h-32">
          <EditorComponent
            key={key}
            placeholder={`Editor No.${key} of ${editorKeys.length}`}
          />
        </div>
      ))}
    </div>
  )
}

export default EditorGroup

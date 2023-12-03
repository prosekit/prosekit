import 'prosekit/basic/style.css'

import { useMemo, useState, useCallback } from 'preact/hooks'
import { createEditor, jsonFromNode } from 'prosekit/core'
import { ProseKit } from 'prosekit/preact'

import { defineExtension } from './extension'
import Toolbar from './toolbar'

export default function Editor() {
  const editor = useMemo(() => {
    return createEditor({ extension: defineExtension() })
  }, [])

  const [submitions, setSubmitions] = useState<string[]>([])

  const pushSubmition = useCallback(
    (hotkey: string) => {
      const doc = editor.view.state.doc
      const docString = JSON.stringify(jsonFromNode(doc))
      const submition = `${new Date().toISOString()}\t${hotkey}\n${docString}`
      setSubmitions((submitions) => [...submitions, submition])
    },
    [editor],
  )

  return (
    <ProseKit editor={editor}>
      <div className="EDITOR_VIEWPORT">
        <div className="EDITOR_DOCUMENT">
          <Toolbar onSubmit={pushSubmition} />
          <div ref={editor.mount} className="EDITOR_CONTENT"></div>
        </div>
      </div>
      <fieldset className="mt-4 border">
        <legend>Submit Records</legend>
        <ol>
          {submitions.map((submition, index) => (
            <li key={index}>
              <pre>{submition}</pre>
            </li>
          ))}
        </ol>
        {submitions.length === 0 && <div>No submitions yet</div>}
      </fieldset>
    </ProseKit>
  )
}

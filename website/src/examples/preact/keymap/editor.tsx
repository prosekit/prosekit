import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import {
  useCallback,
  useMemo,
  useState,
} from 'preact/hooks'
import { createEditor } from 'prosekit/core'
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
      const docString = JSON.stringify(editor.getDocJSON())
      const submition = `${new Date().toISOString()}\t${hotkey}\n${docString}`
      setSubmitions((submitions) => [...submitions, submition])
    },
    [editor],
  )

  return (
    <ProseKit editor={editor}>
      <div className="CSS_EDITOR_VIEWPORT">
        <Toolbar onSubmit={pushSubmition} />
        <div className="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} className="CSS_EDITOR_CONTENT"></div>
        </div>
      </div>
      <fieldset className="CSS_KEYMAP_FIELDSET">
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

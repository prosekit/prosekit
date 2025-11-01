import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import {
  useCallback,
  useMemo,
  useState,
} from 'react'

import { defineExtension } from './extension'
import Toolbar from './toolbar'

export default function Editor() {
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({ extension })
  }, [])

  const [submissions, setSubmissions] = useState<string[]>([])

  const pushSubmission = useCallback(
    (hotkey: string) => {
      const docString = JSON.stringify(editor.getDocJSON())
      const submission = `${new Date().toISOString()}\t${hotkey}\n${docString}`
      setSubmissions((prev) => [...prev, submission])
    },
    [editor],
  )

  return (
    <ProseKit editor={editor}>
      <div className="CSS_EDITOR_VIEWPORT">
        <Toolbar onSubmit={pushSubmission} />
        <div className="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} className="CSS_EDITOR_CONTENT"></div>
        </div>
      </div>
      <fieldset className="CSS_KEYMAP_FIELDSET">
        <legend>Submit Records</legend>
        <ol>
          {submissions.map((submission, index) => (
            <li key={index}>
              <pre>{submission}</pre>
            </li>
          ))}
        </ol>
        {submissions.length === 0 && <div>No submissions yet</div>}
      </fieldset>
    </ProseKit>
  )
}

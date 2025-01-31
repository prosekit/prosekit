import 'prosekit/basic/style.css'

import { Themes } from '@prosekit/themes'
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
      const docString = JSON.stringify(editor.getContentJSON())
      const submition = `${new Date().toISOString()}\t${hotkey}\n${docString}`
      setSubmitions((submitions) => [...submitions, submition])
    },
    [editor],
  )

  return (
    <ProseKit editor={editor}>
      <div className={Themes.EDITOR_VIEWPORT}>
        <Toolbar onSubmit={pushSubmition} />
        <div className={Themes.EDITOR_SCROLLING}>
          <div ref={editor.mount} className={Themes.EDITOR_CONTENT}></div>
        </div>
      </div>
      <fieldset className={Themes.KEYMAP_FIELDSET}>
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

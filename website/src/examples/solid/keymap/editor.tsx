import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import {
  createEditor,
  jsonFromNode,
} from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'
import { createSignal } from 'solid-js'

import { defineExtension } from './extension'
import Toolbar from './toolbar'

export default function Editor() {
  const editor = createEditor({ extension: defineExtension() })

  const [submitions, setSubmitions] = createSignal<string[]>([])

  const pushSubmition = (hotkey: string) => {
    const doc = editor.view.state.doc
    const docString = JSON.stringify(jsonFromNode(doc))
    const submition = `${new Date().toISOString()}\t${hotkey}\n${docString}`
    setSubmitions((submitions) => [...submitions, submition])
  }

  return (
    <ProseKit editor={editor}>
      <div class="CSS_EDITOR_VIEWPORT">
        <Toolbar onSubmit={pushSubmition} />
        <div class="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} class="CSS_EDITOR_CONTENT"></div>
        </div>
      </div>
      <fieldset class="CSS_KEYMAP_FIELDSET">
        <legend>Submit Records</legend>
        <ol>
          {submitions().map((submition) => (
            <li>
              <pre>{submition}</pre>
            </li>
          ))}
        </ol>
        {submitions().length === 0 && <div>No submitions yet</div>}
      </fieldset>
    </ProseKit>
  )
}

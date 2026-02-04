import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'
import { createSignal, For, Show, type JSX } from 'solid-js'

import { defineExtension } from './extension'
import Toolbar from './toolbar'

export default function Editor(): JSX.Element {
  const extension = defineExtension()
  const editor = createEditor({ extension })
  const [submissions, setSubmissions] = createSignal<string[]>([])

  const pushSubmission = (hotkey: string) => {
    const docString = JSON.stringify(editor.getDocJSON())
    const submission = `${new Date().toISOString()}	${hotkey}
${docString}`
    setSubmissions((prev) => [...prev, submission])
  }

  return (
    <ProseKit editor={editor}>
      <div class="CSS_EDITOR_VIEWPORT">
        <Toolbar onSubmit={pushSubmission} />
        <div class="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} class="CSS_EDITOR_CONTENT"></div>
        </div>
      </div>
      <fieldset class="CSS_KEYMAP_FIELDSET">
        <legend>Submit Records</legend>
        <ol>
          <For each={submissions()}>
            {(submission) => (
              <li>
                <pre>{submission}</pre>
              </li>
            )}
          </For>
        </ol>
        <Show when={submissions().length === 0}>
          <div>No submissions yet</div>
        </Show>
      </fieldset>
    </ProseKit>
  )
}

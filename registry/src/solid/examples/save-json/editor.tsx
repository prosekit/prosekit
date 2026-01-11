import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import {
  createEditor,
  type NodeJSON,
} from 'prosekit/core'
import {
  ProseKit,
  useDocChange,
} from 'prosekit/solid'
import {
  createSignal,
  For,
  type JSX,
} from 'solid-js'

export default function Editor(): JSX.Element {
  const [records, setRecords] = createSignal<string[]>([])
  const [hasUnsavedChange, setHasUnsavedChange] = createSignal(false)

  const extension = defineBasicExtension()
  const editor = createEditor({ extension })

  const handleDocChange = () => setHasUnsavedChange(true)
  useDocChange(handleDocChange, { editor })

  const handleSave = () => {
    const record = JSON.stringify(editor.getDocJSON())
    setRecords((prev) => [...prev, record])
    setHasUnsavedChange(false)
  }

  const handleLoad = (record: string) => {
    editor.setContent(JSON.parse(record) as NodeJSON)
    setHasUnsavedChange(false)
  }

  return (
    <div class="CSS_EDITOR_VIEWPORT">
      <button
        onClick={handleSave}
        disabled={!hasUnsavedChange()}
        class="m-1 border border-solid bg-white px-2 py-1 text-sm text-black disabled:cursor-not-allowed disabled:text-gray-500"
      >
        {hasUnsavedChange() ? 'Save' : 'No changes to save'}
      </button>
      <ul class="border-b border-t border-solid text-sm">
        <For each={records()}>
          {(record) => (
            <li class="m-1 flex gap-2">
              <button
                class="border border-solid bg-white px-2 py-1 text-black"
                onClick={() => handleLoad(record)}
              >
                Load
              </button>
              <span class="flex-1 overflow-x-scroll p-2">
                <pre>{record}</pre>
              </span>
            </li>
          )}
        </For>
      </ul>
      <ProseKit editor={editor}>
        <div class="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} class="CSS_EDITOR_CONTENT"></div>
        </div>
      </ProseKit>
    </div>
  )
}

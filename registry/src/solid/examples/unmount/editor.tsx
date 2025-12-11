import {
  createSignal,
  For,
  type JSX,
} from 'solid-js'

import EditorComponent from './editor-component'

export default function Editor(): JSX.Element {
  let nextKey = 1
  const [editorKeys, setEditorKeys] = createSignal<number[]>([])

  const addEditor = () => {
    const key = nextKey
    nextKey += 1
    setEditorKeys((keys) => [...keys, key])
  }

  const removeEditor = (key: number) => {
    setEditorKeys((keys) => keys.filter((k) => k !== key))
  }

  return (
    <div class="flex flex-col gap-2">
      <div class="flex gap-2">
        <button onClick={addEditor} class="border p-2">
          Add editor
        </button>
        <For each={editorKeys()}>
          {(key) => (
            <button
              onClick={() => removeEditor(key)}
              class="border p-2"
            >
              Unmount No.{key}
            </button>
          )}
        </For>
      </div>
      <For each={editorKeys()}>
        {(key) => (
          <div>
            <EditorComponent
              placeholder={`Editor No.${key}`}
            />
          </div>
        )}
      </For>
    </div>
  )
}

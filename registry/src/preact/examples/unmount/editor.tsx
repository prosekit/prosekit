import {
  useCallback,
  useRef,
  useState,
} from 'preact/hooks'

import EditorComponent from './editor-component'

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

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
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
        <div key={key}>
          <EditorComponent
            placeholder={`Editor No.${key}`}
          />
        </div>
      ))}
    </div>
  )
}

export default EditorGroup

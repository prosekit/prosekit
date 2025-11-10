import {
  useCallback,
  useEffect,
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

  useEffect(() => {
    if (nextKeyRef.current === 1) {
      addEditor()
    }
  }, [addEditor])

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
        <div key={key} className="h-32">
          <EditorComponent
            placeholder={`Editor No.${key} of ${editorKeys.length}`}
          />
        </div>
      ))}
    </div>
  )
}

export default EditorGroup

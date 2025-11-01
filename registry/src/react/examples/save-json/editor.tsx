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
} from 'prosekit/react'
import {
  useCallback,
  useMemo,
  useState,
} from 'react'

export default function Editor() {
  const [defaultContent, setDefaultContent] = useState<NodeJSON | undefined>()
  const [records, setRecords] = useState<string[]>([])
  const [hasUnsavedChange, setHasUnsavedChange] = useState(false)
  const [key, setKey] = useState(1)

  const editor = useMemo(() => {
    const extension = defineBasicExtension()
    return createEditor({ extension, defaultContent })
  }, [defaultContent])

  const handleDocChange = useCallback(() => setHasUnsavedChange(true), [])

  const handleSave = useCallback(() => {
    const record = JSON.stringify(editor.getDocJSON())
    setRecords((prev) => [...prev, record])
    setHasUnsavedChange(false)
  }, [editor])

  const handleLoad = useCallback((record: string) => {
    setDefaultContent(JSON.parse(record) as NodeJSON)
    setHasUnsavedChange(false)
    setKey((prev) => prev + 1)
  }, [])

  useDocChange(handleDocChange, { editor })

  return (
    <div className="CSS_EDITOR_VIEWPORT">
      <button
        onClick={handleSave}
        disabled={!hasUnsavedChange}
        className="m-1 border border-solid bg-white px-2 py-1 text-sm text-black disabled:cursor-not-allowed disabled:text-gray-500"
      >
        {hasUnsavedChange ? 'Save' : 'No changes to save'}
      </button>
      <ul className="border-b border-t border-solid text-sm">
        {records.map((record, index) => (
          <li key={index} className="m-1 flex gap-2">
            <button
              className="border border-solid bg-white px-2 py-1 text-black"
              onClick={() => handleLoad(record)}
            >
              Load
            </button>
            <span className="flex-1 overflow-x-scroll p-2">
              <pre>{record}</pre>
            </span>
          </li>
        ))}
      </ul>
      <ProseKit editor={editor} key={key}>
        <div className="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} className="CSS_EDITOR_CONTENT"></div>
        </div>
      </ProseKit>
    </div>
  )
}

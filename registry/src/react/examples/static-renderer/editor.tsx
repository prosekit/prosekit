'use client'

import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit, useDocChange } from 'prosekit/react'
import { renderToHTMLString } from 'prosekit/static-renderer/html'
import { renderToMarkdown } from 'prosekit/static-renderer/markdown'
import { useCallback, useMemo, useState } from 'react'

import { defineExtension } from './extension.ts'

export default function Editor() {
  const [htmlOutput, setHtmlOutput] = useState('')
  const [markdownOutput, setMarkdownOutput] = useState('')

  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({ extension })
  }, [])

  const updatePreview = useCallback(
    (doc: NodeJSON) => {
      const html = renderToHTMLString({ extension: defineExtension(), content: doc })
      const markdown = renderToMarkdown({ extension: defineExtension(), content: doc })
      setHtmlOutput(html)
      setMarkdownOutput(markdown)
    },
    [],
  )

  const handleDocChange = useCallback(() => {
    const doc = editor.getDocJSON()
    updatePreview(doc)
  }, [editor, updatePreview])

  useDocChange(handleDocChange, { editor })

  return (
    <div className="flex flex-col gap-4">
      {/* Editor */}
      <div className="border border-solid border-gray-300 rounded">
        <div className="bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 border-b border-solid border-gray-300">
          Editor
        </div>
        <ProseKit editor={editor}>
          <div className="CSS_EDITOR_SCROLLING">
            <div ref={editor.mount} className="CSS_EDITOR_CONTENT"></div>
          </div>
        </ProseKit>
      </div>

      {/* HTML Output */}
      <div className="border border-solid border-gray-300 rounded">
        <div className="bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 border-b border-solid border-gray-300">
          renderToHTMLString Output
        </div>
        <pre className="p-3 text-xs overflow-x-auto whitespace-pre-wrap">
          {htmlOutput}
        </pre>
      </div>

      {/* Markdown Output */}
      <div className="border border-solid border-gray-300 rounded">
        <div className="bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 border-b border-solid border-gray-300">
          renderToMarkdown Output
        </div>
        <pre className="p-3 text-xs overflow-x-auto whitespace-pre-wrap">
          {markdownOutput}
        </pre>
      </div>
    </div>
  )
}

'use client'

import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit, useDocChange } from 'prosekit/react'
import { renderToHTMLString } from 'prosekit/static-renderer/html'
import { renderToMarkdown } from 'prosekit/static-renderer/markdown'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { defineExtension } from './extension.ts'
import { sampleContent } from './sample-content.ts'

export default function Editor() {
  const [htmlOutput, setHtmlOutput] = useState('')
  const [markdownOutput, setMarkdownOutput] = useState('')
  const editorRef = useRef<ReturnType<typeof createEditor> | null>(null)

  const extension = useMemo(() => defineExtension(), [])

  const editor = useMemo(() => {
    const editor = createEditor({ extension, defaultContent: sampleContent })
    editorRef.current = editor
    return editor
  }, [extension])

  const updatePreview = useCallback(
    (doc: NodeJSON) => {
      const html = renderToHTMLString({ extension, content: doc })
      const md = renderToMarkdown({ extension, content: doc })
      setHtmlOutput(html)
      setMarkdownOutput(md)
    },
    [extension],
  )

  // Initialize preview with sample content
  useEffect(() => {
    updatePreview(sampleContent)
  }, [updatePreview])

  const handleDocChange = useCallback(() => {
    const doc = editorRef.current?.getDocJSON()
    if (doc) {
      updatePreview(doc)
    }
  }, [updatePreview])

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

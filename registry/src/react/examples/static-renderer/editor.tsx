'use client'

import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import type { BasicExtension } from 'prosekit/basic'
import { createEditor, type Union } from 'prosekit/core'
import { ProseKit, useEditorDerivedValue } from 'prosekit/react'
import { createMarkdownRenderer } from 'prosekit/static-renderer/markdown'
import { useCallback, useMemo, useRef } from 'react'
import { createHTMLRenderer, createReactRenderer } from 'prosekit/static-renderer'

import { defineExtension } from './extension.ts'
import { sampleContent } from './sample-content.ts'

export default function Editor() {
  const editorRef = useRef<ReturnType<typeof createEditor> | null>(null)

  const extension = useMemo(() => defineExtension(), [])

  const editor = useMemo(() => {
    const editor = createEditor({ extension, defaultContent: sampleContent })
    editorRef.current = editor
    return editor
  }, [extension])

  return (
    <ProseKit editor={editor}>
      <div className="flex flex-col gap-4 max-h-[80vh] overflow-y-auto p-4">
        {/* Editor */}
        <div className="border border-solid border-gray-300 rounded flex flex-col" style={{ minHeight: '200px' }}>
          <div className="bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 border-b border-solid border-gray-300 shrink-0">
            Editor
          </div>

          <div className="overflow-y-auto flex-1" style={{ maxHeight: '300px' }}>
            <div ref={editor.mount} className="ProseMirror box-border min-h-full px-4 py-4 outline-hidden"></div>
          </div>
        </div>
        {/* HTML Output */}
        <RenderJson type="html" extension={extension} />

        {/* Markdown Output */}
        <RenderJson type="markdown" extension={extension} />

        {/* React Output */}
        <RenderJson type="react" extension={extension} />
      </div>
    </ProseKit>
  )
}

interface RenderJsonProps {
  type: 'html' | 'markdown' | 'react'
  extension: Union<readonly [BasicExtension]>
}

function RenderJson(props: RenderJsonProps) {
  const { type, extension } = props
  const docJSON = useEditorDerivedValue(useCallback((editor) => {
    return editor.getDocJSON()
  }, []))

  const render = useMemo(() => {
    if (type === 'html') {
      return createHTMLRenderer({ extension })
    } else if (type === 'markdown') {
      return createMarkdownRenderer({ extension })
    } else if (type === 'react') {
      return createReactRenderer({ extension })
    }
    return null
  }, [type, extension])

  const jsonOutput = useMemo(() => {
    if (!render || !docJSON) return ''
    return render(docJSON)
  }, [render, docJSON])

  return (
    <div className="border border-solid border-gray-300 rounded flex flex-col" style={{ minHeight: '150px', maxHeight: '300px' }}>
      <div className="bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 border-b border-solid border-gray-300 shrink-0">
        {type === 'html' && 'renderToHTMLString Output'}
        {type === 'markdown' && 'renderToMarkdown Output'}
        {type === 'react' && 'renderToReactElement Output'}
      </div>
      <pre className="p-3 text-xs overflow-auto whitespace-pre-wrap flex-1 m-0">
        {jsonOutput}
      </pre>
    </div>
  )
}

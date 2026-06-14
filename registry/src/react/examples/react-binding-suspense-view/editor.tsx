'use client'

import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { ProseMirrorDoc } from '@handlewithcare/react-prosemirror'
import { createReactBindingEditor, ProseKit } from '@prosekit/react-binding'
import { Suspense, useMemo } from 'react'

import { sampleContent } from '../../sample/sample-doc-suspense-view.ts'

import { defineExtension } from './extension.ts'
import type { NodeJSON } from 'prosekit/core'

interface EditorProps {
  initialContent?: NodeJSON
}

function Fallback(props: { description: string; title: string }) {
  return (
    <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-950">
      <div className="text-sm font-medium">{props.title}</div>
      <div className="mt-1 text-sm">{props.description}</div>
    </div>
  )
}

function EditorSurface(props: EditorProps) {
  const defaultContent = props.initialContent ?? sampleContent
  const editor = useMemo(() => {
    return createReactBindingEditor({ extension: defineExtension(), defaultContent })
  }, [defaultContent])

  return (
    <ProseKit editor={editor}>
      <div className="CSS_EDITOR_VIEWPORT">
        <div className="CSS_EDITOR_SCROLLING">
          <div className="mb-3 rounded-xl border border-black/10 bg-neutral-50 p-3 text-sm text-neutral-700">
            The node view itself does not install a local Suspense boundary here. The async render is caught directly
            by the editor-level boundary because the document is part of the same React tree.
          </div>
          <Suspense
            fallback={(
              <Fallback
                description="Only the editor content is replaced while the async node view resolves."
                title="Editor-level fallback"
              />
            )}
          >
            <ProseMirrorDoc className="CSS_EDITOR_CONTENT" />
          </Suspense>
        </div>
      </div>
    </ProseKit>
  )
}

export default function Editor(props: EditorProps) {
  return (
    <Suspense
      fallback={(
        <Fallback
          description="This outer boundary should stay idle because the editor-level boundary already catches the async node view."
          title="App-level fallback"
        />
      )}
    >
      <EditorSurface {...props} />
    </Suspense>
  )
}

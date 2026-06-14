'use client'

import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { Suspense, useMemo } from 'react'

import { sampleContent } from '../../sample/sample-doc-suspense-view.ts'

import { defineExtension } from './extension.ts'

interface EditorProps {
  initialContent?: NodeJSON
}

function Fallback(props: { description: string; tone: 'amber' | 'rose'; title: string }) {
  const className = props.tone === 'amber'
    ? 'border-amber-300 bg-amber-50 text-amber-950'
    : 'border-rose-300 bg-rose-50 text-rose-950'

  return (
    <div className={`rounded-xl border p-4 ${className}`}>
      <div className="text-sm font-medium">{props.title}</div>
      <div className="mt-1 text-sm">{props.description}</div>
    </div>
  )
}

function EditorSurface(props: EditorProps) {
  const defaultContent = props.initialContent ?? sampleContent
  const editor = useMemo(() => {
    return createEditor({ extension: defineExtension(), defaultContent })
  }, [defaultContent])

  return (
    <ProseKit editor={editor}>
      <div className="CSS_EDITOR_VIEWPORT">
        <div className="CSS_EDITOR_SCROLLING">
          <div className="mb-3 rounded-xl border border-black/10 bg-neutral-50 p-3 text-sm text-neutral-700">
            In `prosekit/react`, suspending node views are rendered through portal infrastructure managed by the
            adapter. To keep this demo stable, the node view uses its own local Suspense boundary inside the portal.
          </div>
          <div className="mb-3 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-950">
            The editor-level Suspense boundary below is intentionally not responsible for the node view. Removing the
            local boundary from the node view can escape this editor boundary and may trigger runtime failure.
          </div>
          <Suspense
            fallback={(
              <Fallback
                description="This boundary wraps editor.mount, but the async node view is handled locally inside its portal subtree instead."
                title="Editor-level fallback"
                tone="amber"
              />
            )}
          >
            <div ref={editor.mount} className="CSS_EDITOR_CONTENT" />
          </Suspense>
        </div>
      </div>
    </ProseKit>
  )
}

export default function Editor(props: EditorProps) {
  return <EditorSurface {...props} />
}

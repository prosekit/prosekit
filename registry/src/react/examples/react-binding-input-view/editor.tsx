'use client'

import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { ProseMirrorDoc } from '@handlewithcare/react-prosemirror'
import { type NodeJSON } from 'prosekit/core'
import { createReactBindingEditor, ProseKit } from '@prosekit/react-binding'
import { useMemo } from 'react'

import { sampleContent } from '../../sample/sample-doc-input-view.ts'

import { defineExtension } from './extension.ts'

interface EditorProps {
  initialContent?: NodeJSON
}

export default function Editor(props: EditorProps) {
  const defaultContent = props.initialContent ?? sampleContent
  const editor = useMemo(() => {
    return createReactBindingEditor({ extension: defineExtension(), defaultContent })
  }, [defaultContent])

  return (
    <ProseKit editor={editor}>
      <div className="CSS_EDITOR_VIEWPORT">
        <div className="CSS_EDITOR_SCROLLING">
          <ProseMirrorDoc className="CSS_EDITOR_CONTENT" />
        </div>
      </div>
    </ProseKit>
  )
}

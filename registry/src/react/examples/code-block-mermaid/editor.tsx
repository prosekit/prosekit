'use client'

import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { sampleContent } from '../../sample/sample-doc-code-block-mermaid'

import { defineExtension } from './extension'

export default function Editor(props: { initialContent?: NodeJSON }) {
  const editor = useMemo(() => {
    return createEditor({ extension: defineExtension(), defaultContent: props.initialContent ?? sampleContent })
  }, [props.initialContent])

  return (
    <ProseKit editor={editor}>
      <div className="CSS_EDITOR_VIEWPORT">
        <div className="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} className="CSS_EDITOR_CONTENT"></div>
        </div>
      </div>
    </ProseKit>
  )
}

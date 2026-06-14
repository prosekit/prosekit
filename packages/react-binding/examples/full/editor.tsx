'use client'

import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { ProseMirrorDoc } from '@handlewithcare/react-prosemirror'
import { type NodeJSON } from 'prosekit/core'
import { createReactBindingEditor, ProseKit } from '@prosekit/react-binding'
import { useMemo } from 'react'

import { defineExtension } from './extension.ts'
import { Toolbar } from './toolbar.tsx'

const sampleContent: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'This example uses ' },
        {
          type: 'text',
          text: '@handlewithcare/react-prosemirror',
          marks: [{
            type: 'link',
            attrs: {
              href: 'https://github.com/handlewithcarecollective/react-prosemirror',
              target: '_blank',
              rel: 'noreferrer',
            },
          }],
        },
        { type: 'text', text: ' under the hood.' },
      ],
    },
    {
      type: 'paragraph',
      content: [{ type: 'text', text: 'Select text and use the toolbar or keyboard shortcuts.' }],
    },
    {
      type: 'image',
      attrs: {
        src: 'https://placehold.co/640x360',
        alt: 'Sample image',
        width: 320,
      },
    },
  ],
}

export default function Editor(props: { initialContent?: NodeJSON }) {
  const defaultContent = props.initialContent ?? sampleContent

  const editor = useMemo(() => {
    return createReactBindingEditor({
      extension: defineExtension(),
      defaultContent,
    })
  }, [defaultContent])

  return (
    <ProseKit editor={editor}>
      <div className="CSS_EDITOR_VIEWPORT">
        <Toolbar />
        <div className="CSS_EDITOR_SCROLLING">
          <ProseMirrorDoc className="CSS_EDITOR_CONTENT" />
        </div>
      </div>
    </ProseKit>
  )
}

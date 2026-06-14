'use client'

import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { defineBasicExtension } from 'prosekit/basic'
import { union, type NodeJSON } from 'prosekit/core'
import {
  createReactBindingEditor,
  defineReactNodeView,
  ProseKit,
  type ReactNodeViewProps,
} from '@prosekit/react-binding'
import { useMemo } from 'react'

interface EditorProps {
  initialContent?: NodeJSON
}

function ParagraphView(props: ReactNodeViewProps) {
  return (
    <p data-testid="minimal-binding-paragraph">
      {props.node.textContent}
    </p>
  )
}

function defineExtension() {
  return union(
    defineBasicExtension(),
    defineReactNodeView({
      name: 'paragraph',
      component: ParagraphView,
    }),
  )
}

const sampleContent: NodeJSON = {
  type: 'doc',
  content: [{
    type: 'paragraph',
    content: [{ type: 'text', text: 'Hello from react-binding' }],
  }],
}

export default function MinimalReactBindingEditor(props: EditorProps) {
  const defaultContent = props.initialContent ?? sampleContent

  const editor = useMemo(() => {
    return createReactBindingEditor({
      extension: defineExtension(),
      defaultContent,
    })
  }, [defaultContent])

  return (
    <ProseKit editor={editor} />
  )
}

'use client'

import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor, type Extension, type NodeJSON } from 'prosekit/core'
import { defineReactNodeView, ProseKit, useExtension } from 'prosekit/react'
import { useMemo, useState } from 'react'

import { sampleContent } from '../../sample/sample-doc-tweet.ts'

import { defineExtension } from './extension.ts'
import { MethodSelect } from './method-select.tsx'
import { TweetView } from './tweet-view.tsx'

interface EditorProps {
  initialContent?: NodeJSON
}

export default function Editor(props: EditorProps) {
  const defaultContent = props.initialContent ?? sampleContent
  const editor = useMemo(() => {
    return createEditor({ extension: defineExtension(), defaultContent })
  }, [defaultContent])

  const [method, setMethod] = useState<'basic' | 'advanced'>('basic')

  const reactTweetView: Extension | null = useMemo(() => {
    if (method === 'basic') {
      return null
    }
    return defineReactNodeView({
      name: 'tweet',
      component: TweetView,
    })
  }, [method])

  useExtension(reactTweetView, { editor })

  return (
    <ProseKit editor={editor}>
      <MethodSelect value={method} onChange={setMethod} />
      <div className="CSS_EDITOR_VIEWPORT">
        <div className="CSS_EDITOR_SCROLLING">
          <div ref={editor.mount} className="CSS_EDITOR_CONTENT"></div>
        </div>
      </div>
    </ProseKit>
  )
}

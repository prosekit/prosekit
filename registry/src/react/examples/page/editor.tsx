'use client'

import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import 'prosekit/extensions/page/style.css'
import './zoom.css'

import { clsx, createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo, useState } from 'react'

import { sampleContent } from '../../sample/sample-doc-page'

import { defineExtension } from './extension'
import PaperController from './paper-controller'

interface EditorProps {
  initialContent?: NodeJSON
}

export default function Editor(props: EditorProps) {
  const defaultContent = props.initialContent ?? sampleContent
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({
      extension,
      defaultContent,
    })
  }, [defaultContent])

  const [zoom, setZoom] = useState(50)

  return (
    <ProseKit editor={editor}>
      <div className="relative w-max min-w-full flex flex-col flex-1 box-border overflow-auto">
        <PaperController zoom={zoom} setZoom={setZoom} />
        <div
          data-editor-zoom="true"
          style={{ '--zoom': zoom / 100 } as React.CSSProperties}
          ref={editor.mount}
          className={clsx('ProseMirror', 'self-center box-border min-h-full m-0 p-10 print:p-0 outline-hidden')}
        />
      </div>
    </ProseKit>
  )
}

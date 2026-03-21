import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import 'prosekit/extensions/page/style.css'

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
      <div className="CSS_EDITOR_SCROLLING">
        <div className="sticky top-0 z-10 print:hidden">
          <PaperController zoom={zoom} setZoom={setZoom} />
        </div>
        <div
          ref={editor.mount}
          className={clsx('CSS_EDITOR_CONTENT', 'print:transform-none! print:min-h-full! print:p-0! print:m-0!')}
          style={{
            transform: `scale(${zoom}%)`,
            transformOrigin: 'top',
            minHeight: `${100 / (zoom / 100)}%`,
          }}
        />
      </div>
    </ProseKit>
  )
}

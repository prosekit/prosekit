import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import 'prosekit/extensions/page/style.css'

import { useMemo } from 'preact/hooks'
import { clsx, createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/preact'

import { sampleContent } from '../../sample/sample-doc-page'

import { defineExtension } from './extension'
import { useZoom } from './use-zoom'

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

  const { zoom, zoomIn, zoomOut, canZoomIn, canZoomOut } = useZoom()

  return (
    <ProseKit editor={editor}>
      <div className="CSS_ZOOM_SLIDER">
        <button className="CSS_ZOOM_BUTTON" onClick={zoomOut} disabled={!canZoomOut}>-</button>
        <span className="CSS_ZOOM_LABEL">{zoom}%</span>
        <button className="CSS_ZOOM_BUTTON" onClick={zoomIn} disabled={!canZoomIn}>+</button>
      </div>
      <div className="CSS_EDITOR_SCROLLING">
        <div
          ref={editor.mount}
          className={clsx('CSS_EDITOR_CONTENT', 'print:transform-none! print:min-h-full! print:p-0! print:m-0!')}
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top',
            minHeight: `${100 / (zoom / 100)}%`,
          }}
        >
        </div>
      </div>
    </ProseKit>
  )
}

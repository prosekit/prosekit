import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import 'prosekit/extensions/page/style.css'

import { useCallback, useMemo, useState } from 'preact/hooks'
import { clsx, createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/preact'

import { sampleContent } from '../../sample/sample-doc-page'

import { defineExtension } from './extension'

interface EditorProps {
  initialContent?: NodeJSON
}

const ZOOM_STEPS = [25, 50, 75, 100, 125, 150, 200]
const DEFAULT_ZOOM = 50

function useZoom() {
  const [zoom, setZoom] = useState(DEFAULT_ZOOM)

  const zoomIn = useCallback(() => {
    setZoom((z) => {
      const next = ZOOM_STEPS.find((s) => s > z)
      return next ?? z
    })
  }, [])

  const zoomOut = useCallback(() => {
    setZoom((z) => {
      const prev = [...ZOOM_STEPS].reverse().find((s) => s < z)
      return prev ?? z
    })
  }, [])

  const canZoomIn = zoom < ZOOM_STEPS[ZOOM_STEPS.length - 1]
  const canZoomOut = zoom > ZOOM_STEPS[0]

  return { zoom, zoomIn, zoomOut, canZoomIn, canZoomOut }
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
    </ProseKit>
  )
}

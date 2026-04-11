'use client'

import { definePageRendering, type PageRenderingOptions } from 'prosekit/extensions/page'
import { useExtension } from 'prosekit/react'
import { useEffect, useId, useMemo, useState } from 'react'

// Paper sizes in pixels at 96 DPI
const PAPER_SIZES = {
  A3: { short: 1123, long: 1587 },
  A4: { short: 794, long: 1123 },
  A5: { short: 559, long: 794 },
  B4: { short: 945, long: 1334 },
  B5: { short: 665, long: 945 },
  letter: { short: 816, long: 1056 },
} as const

type PaperSize = keyof typeof PAPER_SIZES
type Orientation = 'portrait' | 'landscape'

export default function PaperController({
  zoom,
  setZoom,
}: {
  zoom: number
  setZoom: (zoom: number) => void
}) {
  const id = useId()
  const [paperSize, setPaperSize] = useState<PaperSize>('A4')
  const [orientation, setOrientation] = useState<Orientation>('portrait')
  const [margin, setMargin] = useState(70)
  const [enablePageLayout, setEnablePageLayout] = useState(true)

  const pageRenderingOptions: PageRenderingOptions = useMemo(() => {
    const { short, long } = PAPER_SIZES[paperSize]
    const pageWidth = orientation === 'portrait' ? short : long
    const pageHeight = orientation === 'portrait' ? long : short

    return {
      pageWidth,
      pageHeight,
      marginTop: margin,
      marginRight: margin,
      marginBottom: margin,
      marginLeft: margin,
    }
  }, [paperSize, orientation, margin])

  useEffect(() => {
    const styleId = 'print-page-style'
    let style = document.getElementById(styleId) as HTMLStyleElement | null
    if (!style) {
      style = document.createElement('style')
      style.id = styleId
      document.head.appendChild(style)
    }
    style.textContent = `@page { size: ${paperSize} ${orientation}; margin: 0; }`

    return () => {
      style.textContent = ''
    }
  }, [paperSize, orientation])

  const extension = useMemo(() => {
    return enablePageLayout ? definePageRendering(pageRenderingOptions) : null
  }, [pageRenderingOptions, enablePageLayout])

  useExtension(extension)

  return (
    <div
      data-paper-controller={paperSize}
      className="grid grid-cols-[auto_1fr] gap-2 w-min border p-2 bg-[Canvas] sticky top-2 left-2 z-10 print:hidden text-xs"
    >
      <label htmlFor={`${id}-page`}>Page</label>
      <select
        id={`${id}-page`}
        value={enablePageLayout ? 'Enabled' : 'Disabled'}
        onChange={(e) => setEnablePageLayout(e.target.value === 'Enabled')}
        className="rounded border disabled:opacity-50"
      >
        <option value="Enabled">Enabled</option>
        <option value="Disabled">Disabled</option>
      </select>
      <label htmlFor={`${id}-paper`}>Paper Size</label>
      <select
        id={`${id}-paper`}
        value={paperSize}
        onChange={(e) => setPaperSize(e.target.value as PaperSize)}
        disabled={!enablePageLayout}
        className="rounded border disabled:opacity-50"
      >
        <option value="A3">A3</option>
        <option value="A4">A4</option>
        <option value="A5">A5</option>
        <option value="B4">B4</option>
        <option value="B5">B5</option>
        <option value="letter">Letter</option>
      </select>
      <label htmlFor={`${id}-orientation`}>Orientation</label>
      <select
        id={`${id}-orientation`}
        value={orientation}
        onChange={(e) => setOrientation(e.target.value as Orientation)}
        disabled={!enablePageLayout}
        className="rounded border disabled:opacity-50"
      >
        <option value="portrait">Portrait</option>
        <option value="landscape">Landscape</option>
      </select>
      <label htmlFor={`${id}-margin`}>Margin</label>
      <select
        id={`${id}-margin`}
        value={String(margin)}
        onChange={(e) => setMargin(Number.parseInt(e.target.value, 10))}
        disabled={!enablePageLayout}
        className="rounded border disabled:opacity-50"
      >
        <option value="30">Narrow</option>
        <option value="70">Normal</option>
        <option value="120">Wide</option>
      </select>
      <label htmlFor={`${id}-zoom`}>Zoom</label>
      <select
        id={`${id}-zoom`}
        value={String(zoom)}
        onChange={(e) => setZoom(Number.parseInt(e.target.value, 10))}
        className="rounded border disabled:opacity-50"
      >
        <option value="25">25%</option>
        <option value="50">50%</option>
        <option value="75">75%</option>
        <option value="100">100%</option>
        <option value="125">125%</option>
        <option value="150">150%</option>
        <option value="200">200%</option>
      </select>
    </div>
  )
}

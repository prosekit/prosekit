<script lang="ts">
import { definePageRendering, type PageRenderingOptions } from 'prosekit/extensions/page'
import { useExtension } from 'prosekit/svelte'
import { toStore } from 'svelte/store'

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

let {
  zoom = $bindable(50),
}: {
  zoom: number
} = $props()

let id = $props.id()
let paperSize = $state<PaperSize>('A4')
let orientation = $state<Orientation>('portrait')
let margin = $state(70)
let enablePageLayout = $state(true)

const pageRenderingOptions: PageRenderingOptions = $derived.by(() => {
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
})

$effect(() => {
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
})

const extension = $derived(enablePageLayout ? definePageRendering(pageRenderingOptions) : null)
const extensionStore = toStore(() => extension)
useExtension(extensionStore)
</script>

<div
  data-paper-controller={paperSize}
  class="grid grid-cols-[auto_1fr] gap-2 w-min border p-2 bg-[canvas] sticky top-2 left-2 z-10 print:hidden text-xs"
>
  <label for="{id}-page">Page</label>
  <select
    id="{id}-page"
    value={enablePageLayout ? 'Enabled' : 'Disabled'}
    onchange={(e) => {
      enablePageLayout = e.currentTarget.value === 'Enabled'
    }}
    class="rounded border disabled:opacity-50"
  >
    <option value="Enabled">Enabled</option>
    <option value="Disabled">Disabled</option>
  </select>
  <label for="{id}-paper">Paper Size</label>
  <select
    id="{id}-paper"
    value={paperSize}
    onchange={(e) => {
      paperSize = e.currentTarget.value as PaperSize
    }}
    disabled={!enablePageLayout}
    class="rounded border disabled:opacity-50"
  >
    <option value="A3">A3</option>
    <option value="A4">A4</option>
    <option value="A5">A5</option>
    <option value="B4">B4</option>
    <option value="B5">B5</option>
    <option value="letter">Letter</option>
  </select>
  <label for="{id}-orientation">Orientation</label>
  <select
    id="{id}-orientation"
    value={orientation}
    onchange={(e) => {
      orientation = e.currentTarget.value as Orientation
    }}
    disabled={!enablePageLayout}
    class="rounded border disabled:opacity-50"
  >
    <option value="portrait">Portrait</option>
    <option value="landscape">Landscape</option>
  </select>
  <label for="{id}-margin">Margin</label>
  <select
    id="{id}-margin"
    value={String(margin)}
    onchange={(e) => {
      margin = Number.parseInt(e.currentTarget.value, 10)
    }}
    disabled={!enablePageLayout}
    class="rounded border disabled:opacity-50"
  >
    <option value="30">Narrow</option>
    <option value="70">Normal</option>
    <option value="120">Wide</option>
  </select>
  <label for="{id}-zoom">Zoom</label>
  <select
    id="{id}-zoom"
    value={String(zoom)}
    onchange={(e) => {
      zoom = Number.parseInt(e.currentTarget.value, 10)
    }}
    class="rounded border disabled:opacity-50"
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

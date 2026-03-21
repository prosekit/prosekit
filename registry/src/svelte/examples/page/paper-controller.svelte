<script lang="ts">
import { definePageRendering, type PageRenderingOptions } from 'prosekit/extensions/page'
import { useExtension } from 'prosekit/svelte'
import { toStore } from 'svelte/store'

// Paper sizes in pixels at 96 DPI
const A4_SHORT = 794
const A4_LONG = 1123
const A5_SHORT = 559
const A5_LONG = 794

let {
  zoom = $bindable(50),
}: {
  zoom: number
} = $props()

let id = $props.id()
let paper = $state('a4-portrait')
let margin = $state(70)
let enablePageLayout = $state(true)

const paperSize: PageRenderingOptions = $derived.by(() => {
  let pageWidth: number
  let pageHeight: number

  if (paper === 'a4-portrait') {
    pageWidth = A4_SHORT
    pageHeight = A4_LONG
  } else if (paper === 'a4-landscape') {
    pageWidth = A4_LONG
    pageHeight = A4_SHORT
  } else if (paper === 'a5-portrait') {
    pageWidth = A5_SHORT
    pageHeight = A5_LONG
  } else if (paper === 'a5-landscape') {
    pageWidth = A5_LONG
    pageHeight = A5_SHORT
  } else {
    throw new Error('Invalid paper type')
  }

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
  if (paper === 'a4-portrait') {
    style.textContent = `@page { size: A4 portrait; margin: 0; }`
  } else if (paper === 'a4-landscape') {
    style.textContent = `@page { size: A4 landscape; margin: 0; }`
  } else if (paper === 'a5-portrait') {
    style.textContent = `@page { size: A5 portrait; margin: 0; }`
  } else if (paper === 'a5-landscape') {
    style.textContent = `@page { size: A5 landscape; margin: 0; }`
  } else {
    throw new Error('Invalid paper type')
  }

  return () => {
    style.textContent = ''
  }
})

const extension = $derived(enablePageLayout ? definePageRendering(paperSize) : null)
const extensionStore = toStore(() => extension)
useExtension(extensionStore)
</script>

<div data-paper-controller={paper} class="CSS_PAPER_CONTROLLER">
  <label for="{id}-page">Page</label>
  <select
    id="{id}-page"
    value={enablePageLayout ? 'Enabled' : 'Disabled'}
    onchange={(e) => {
      enablePageLayout = e.currentTarget.value === 'Enabled'
    }}
  >
    <option value="Enabled">Enabled</option>
    <option value="Disabled">Disabled</option>
  </select>
  <label for="{id}-paper">Paper</label>
  <select
    id="{id}-paper"
    value={paper}
    onchange={(e) => {
      paper = e.currentTarget.value
    }}
    disabled={!enablePageLayout}
  >
    <option value="a4-portrait">A4 Portrait</option>
    <option value="a4-landscape">A4 Landscape</option>
    <option value="a5-portrait">A5 Portrait</option>
    <option value="a5-landscape">A5 Landscape</option>
  </select>
  <label for="{id}-margin">Margin</label>
  <select
    id="{id}-margin"
    value={String(margin)}
    onchange={(e) => {
      margin = Number.parseInt(e.currentTarget.value, 10)
    }}
    disabled={!enablePageLayout}
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

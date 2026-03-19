<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import 'prosekit/extensions/page/style.css'

import { clsx, createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'

import { sampleContent } from '../../sample/sample-doc-page'

import { defineExtension } from './extension'
import { useZoom } from './use-zoom.svelte'

const props: {
  initialContent?: NodeJSON
} = $props()

const defaultContent = props.initialContent ?? sampleContent
const extension = defineExtension()
const editor = createEditor({ extension, defaultContent })

const { zoom, zoomIn, zoomOut, canZoomIn, canZoomOut } = useZoom()
</script>

<ProseKit {editor}>
  <div class="CSS_ZOOM_SLIDER">
    <button class="CSS_ZOOM_BUTTON" onclick={zoomOut} disabled={!canZoomOut}>-</button>
    <span class="CSS_ZOOM_LABEL">{zoom}%</span>
    <button class="CSS_ZOOM_BUTTON" onclick={zoomIn} disabled={!canZoomIn}>+</button>
  </div>
  <div class="CSS_EDITOR_SCROLLING">
    <div
      {@attach editor.mount}
      class={clsx('CSS_EDITOR_CONTENT', 'print:transform-none! print:min-h-full! print:p-0! print:m-0!')}
      style="transform: scale({zoom / 100}); transform-origin: top; min-height: {100 / (zoom / 100)}%;"
    >
    </div>
  </div>
</ProseKit>

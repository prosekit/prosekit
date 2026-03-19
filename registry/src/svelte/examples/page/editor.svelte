<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import 'prosekit/extensions/page/style.css'

import { clsx, createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'

import { sampleContent } from '../../sample/sample-doc-page'

import { defineExtension } from './extension'
import { useZoom } from './use-zoom.svelte.js'

const props: {
  initialContent?: NodeJSON
} = $props()

const defaultContent = props.initialContent ?? sampleContent
const extension = defineExtension()
const editor = createEditor({ extension, defaultContent })

const zoom = useZoom()
</script>

<ProseKit {editor}>
  <div class="CSS_ZOOM_SLIDER">
    <button class="CSS_ZOOM_BUTTON" onclick={zoom.zoomOut} disabled={!zoom.canZoomOut}>-</button>
    <span class="CSS_ZOOM_LABEL">{zoom.zoom}%</span>
    <button class="CSS_ZOOM_BUTTON" onclick={zoom.zoomIn} disabled={!zoom.canZoomIn}>+</button>
  </div>
  <div class="CSS_EDITOR_SCROLLING">
    <div
      {@attach editor.mount}
      class={clsx('CSS_EDITOR_CONTENT', 'print:transform-none! print:min-h-full! print:p-0! print:m-0!')}
      style:transform="scale({zoom.zoom / 100})"
      style:transform-origin="top"
      style:min-height="{100 / (zoom.zoom / 100)}%"
    >
    </div>
  </div>
</ProseKit>

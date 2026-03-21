<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import 'prosekit/extensions/page/style.css'

import { clsx, createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'

import { sampleContent } from '../../sample/sample-doc-page'

import { defineExtension } from './extension'
import PaperController from './paper-controller.svelte'

const props: {
  initialContent?: NodeJSON
} = $props()

const defaultContent = props.initialContent ?? sampleContent
const extension = defineExtension()
const editor = createEditor({ extension, defaultContent })

let zoom = $state(50)
</script>

<ProseKit {editor}>
  <div class="CSS_EDITOR_SCROLLING">
    <div class="sticky top-0 z-10 print:hidden">
      <PaperController bind:zoom />
    </div>
    <div
      {@attach editor.mount}
      class={clsx('CSS_EDITOR_CONTENT', 'print:transform-none! print:min-h-full! print:p-0! print:m-0!')}
      style:transform="scale({zoom}%)"
      style:transform-origin="top"
      style:min-height="{100 / (zoom / 100)}%"
    >
    </div>
  </div>
</ProseKit>

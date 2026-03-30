<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import 'prosekit/extensions/page/style.css'
import './zoom.css'

import { clsx, createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import { untrack } from 'svelte'

import { sampleContent } from '../../sample/sample-doc-page'

import { defineExtension } from './extension'
import PaperController from './paper-controller.svelte'

const props: {
  initialContent?: NodeJSON
} = $props()

const extension = defineExtension()
const defaultContent = untrack(() => props.initialContent ?? sampleContent)
const editor = createEditor({ extension, defaultContent })

let zoom = $state(50)
</script>

<ProseKit {editor}>
  <div class="relative w-max min-w-full flex flex-col flex-1 box-border overflow-auto">
    <PaperController bind:zoom />
    <div
      data-editor-zoom="true"
      style:--zoom={zoom / 100}
      {@attach editor.mount}
      class={clsx('ProseMirror', 'self-center box-border min-h-full m-0 p-10 print:p-0 outline-hidden')}
    >
    </div>
  </div>
</ProseKit>

<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import { untrack } from 'svelte'

import { sampleContent } from '../../sample/sample-doc-block-handle.ts'
import { BlockHandle } from '../../ui/block-handle/index.ts'
import { DropIndicator } from '../../ui/drop-indicator/index.ts'

import { defineExtension } from './extension.ts'

const props: {
  initialContent?: NodeJSON
} = $props()

const extension = defineExtension()
const defaultContent = untrack(() => props.initialContent ?? sampleContent)
const editor = createEditor({ extension, defaultContent })
</script>

<ProseKit {editor}>
  <div class="CSS_EDITOR_VIEWPORT">
    <div class="CSS_EDITOR_SCROLLING">
      <div {@attach editor.mount} class="CSS_EDITOR_CONTENT"></div>
      <BlockHandle />
      <DropIndicator />
    </div>
  </div>
</ProseKit>

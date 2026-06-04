<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import { untrack } from 'svelte'

import { sampleContent } from '../../sample/sample-doc-block-handle.ts'
import { DropIndicator } from '../../ui/drop-indicator/index.ts'

import BlockSideMenu from './block-side-menu.svelte'
import { defineExtension } from '../block-handle/extension.ts'

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
      <BlockSideMenu />
      <DropIndicator />
    </div>
  </div>
</ProseKit>

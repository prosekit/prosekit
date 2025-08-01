<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'

import BlockHandle from './block-handle.svelte'
import { DEFAULT_DRAG_AND_DROP_CONTENT } from './default-content-drag-and-drop'
import DropIndicator from './drop-indicator.svelte'
import { defineExtension } from './extension'

const editor = createEditor({ extension: defineExtension(), defaultContent: DEFAULT_DRAG_AND_DROP_CONTENT })

const mount = (element: HTMLElement) => {
  editor.mount(element)
  return { destroy: () => editor.unmount() }
}
</script>

<ProseKit {editor}>
  <div class="CSS_EDITOR_VIEWPORT">
    <div class="CSS_EDITOR_SCROLLING">
      <div use:mount class="CSS_EDITOR_CONTENT"></div>
      <BlockHandle />
      <DropIndicator />
    </div>
  </div>
</ProseKit>

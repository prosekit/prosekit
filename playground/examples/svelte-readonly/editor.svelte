<script lang="ts">
import { Themes } from '@prosekit/themes'
import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import { defineExtension } from './extension'
import Toolbar from './toolbar.svelte'

const editor = createEditor({
  extension: defineExtension(),
  defaultHTML:
    'The content is readonly. Press the buttons above to toggle the readonly mode.',
})

const mount = (element: HTMLElement) => {
  editor.mount(element)
  return { destroy: () => editor.mount(null) }
}
</script>

<ProseKit {editor}>
  <div class={Themes.EDITOR_VIEWPORT}>
    <Toolbar />
    <div class={Themes.EDITOR_SCROLLING}>
      <div use:mount class={Themes.EDITOR_CONTENT}></div>
    </div>
  </div>
</ProseKit>

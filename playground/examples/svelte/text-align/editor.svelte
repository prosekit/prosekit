<script lang="ts">
import 'prosekit/basic/style.css'

import { Themes } from '@prosekit/themes'

import { defineExtension } from './extension'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import Toolbar from './toolbar.svelte'

const extension = defineExtension()
const editor = createEditor({
  extension,
  defaultContent:
    '<h1 style="text-align:center;">Heading</h1>' +
    '<p style="text-align:left;"">First paragraph</p>' +
    '<p style="text-align:center;">Second paragraph</p>' +
    '<p style="text-align:right;">Third paragraph</p>',
})

const mount = (element: HTMLElement) => {
  editor.mount(element)
  return { destroy: () => editor.unmount() }
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

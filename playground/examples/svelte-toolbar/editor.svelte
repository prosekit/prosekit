<script lang="ts">
import { Themes } from '@prosekit/themes'
import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import { defineExtension } from './extension'
import Toolbar from './toolbar.svelte'

const extension = defineExtension()
const editor = createEditor({ extension })

const mount = (element: HTMLElement) => {
  editor.mount(element)
  return { destroy: () => editor.mount(null) }
}
</script>

<ProseKit {editor}>
  <div class={Themes.EDITOR_VIEWPORT}>
    <div class={Themes.EDITOR_SCROLLING}>
      <Toolbar />
      <div use:mount class={Themes.EDITOR_CONTENT}></div>
    </div>
  </div>
</ProseKit>

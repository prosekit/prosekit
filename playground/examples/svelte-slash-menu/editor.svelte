<script lang="ts">
import { Themes } from '@prosekit/themes'
import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { defineExtension } from './extension'
import { ProseKit } from 'prosekit/svelte'
import SlashMenu from './slash-menu.svelte'

const editor = createEditor({ extension: defineExtension() })

const mount = (element: HTMLElement) => {
  editor.mount(element)
  return { destroy: () => editor.mount(null) }
}
</script>

<ProseKit {editor}>
  <div class={Themes.EDITOR_VIEWPORT}>
    <div class={Themes.EDITOR_SCROLLING}>
      <div use:mount class={Themes.EDITOR_CONTENT}></div>
      <SlashMenu />
    </div>
  </div>
</ProseKit>

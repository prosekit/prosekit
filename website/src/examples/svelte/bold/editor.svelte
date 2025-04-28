<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { Themes } from '@prosekit/themes'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import { defineExtension } from './extension'
import Toolbar from './toolbar.svelte'

const editor = createEditor({ extension: defineExtension() })

const mount = (element: HTMLElement) => {
  editor.mount(element)
  return { destroy: () => editor.unmount() }
}
</script>

<ProseKit {editor}>
  <div class={Themes.CSS_EDITOR_VIEWPORT}>
    <Toolbar />
    <div class={Themes.CSS_EDITOR_SCROLLING}>
      <div use:mount class={Themes.CSS_EDITOR_CONTENT}></div>
    </div>
  </div>
</ProseKit>

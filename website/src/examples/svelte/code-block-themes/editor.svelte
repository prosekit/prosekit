<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { Themes } from '@prosekit/themes'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'

import { defaultContent } from './default-doc'
import { defineExtension } from './extension'
import Toolbar from './toolbar.svelte'

const extension = defineExtension()
const editor = createEditor({ extension, defaultContent })

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

<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import BlockHandle from './block-handle.svelte'
import { defineExtension } from './extension'
import InlineMenu from './inline-menu.svelte'
import SlashMenu from './slash-menu.svelte'
import TagMenu from './tag-menu.svelte'
import Toolbar from './toolbar.svelte'
import UserMenu from './user-menu.svelte'

const editor = createEditor({ extension: defineExtension() })

const mount = (element: HTMLElement) => {
  editor.mount(element)
  return { destroy: () => editor.unmount() }
}
</script>

<ProseKit {editor}>
  <div class="CSS_EDITOR_VIEWPORT">
    <Toolbar />
    <div class="CSS_EDITOR_SCROLLING">
      <div use:mount class="CSS_EDITOR_CONTENT"></div>
      <InlineMenu />
      <SlashMenu />
      <UserMenu />
      <TagMenu />
      <BlockHandle />
    </div>
  </div>
</ProseKit>

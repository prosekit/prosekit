<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import { defineExtension } from './extension'
import Toolbar from './toolbar.svelte'

const defaultContent = `<p>
O'er all the hilltops<br />
Is quiet now,<br />
In all the treetops<br />
Hearest thou<br />
Hardly a breath;<br />
The birds are asleep in the trees:<br />
Wait, soon like these<br />
Thou too shalt rest.<br />
</p>
`

const editor = createEditor({ extension: defineExtension(), defaultContent })

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
    </div>
  </div>
</ProseKit>

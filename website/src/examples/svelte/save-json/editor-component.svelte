<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import type { Editor } from 'prosekit/core'
import {
  ProseKit,
  useDocChange,
} from 'prosekit/svelte'

export let editor: Editor
export let onDocChange: () => void

useDocChange(
  () => {
    onDocChange?.()
  },
  { editor },
)

const mount = (element: HTMLElement) => {
  editor.mount(element)
  return { destroy: () => editor.unmount() }
}
</script>

<ProseKit {editor}>
  <div class="CSS_EDITOR_SCROLLING">
    <div use:mount class="CSS_EDITOR_CONTENT"></div>
  </div>
</ProseKit>

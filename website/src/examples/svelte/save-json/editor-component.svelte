<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { Themes } from '@prosekit/themes'

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
  <div class={Themes.EDITOR_SCROLLING}>
    <div use:mount class={Themes.EDITOR_CONTENT}></div>
  </div>
</ProseKit>

<script lang="ts">
import { Themes } from '@prosekit/themes'
import 'prosekit/basic/style.css'
import { useDocChange } from 'prosekit/svelte'
import type { Editor } from 'prosekit/core'

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

<div class={Themes.EDITOR_SCROLLING}>
  <div use:mount class={Themes.EDITOR_CONTENT}></div>
</div>

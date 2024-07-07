<script lang="ts">
import { Themes } from '@prosekit/themes'
import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import { defineExtension } from './extension'
import WordCounter from './word-counter.svelte'

const editor = createEditor({
  extension: defineExtension(),
  defaultHTML: 'Start typing and observe the word count update below.',
})

const mount = (element: HTMLElement) => {
  editor.mount(element)
  return { destroy: () => editor.mount(null) }
}
</script>

<ProseKit {editor}>
  <div class={Themes.EDITOR_VIEWPORT}>
    <div class={Themes.EDITOR_SCROLLING}>
      <div use:mount class={Themes.EDITOR_CONTENT}></div>
      <WordCounter />
    </div>
  </div>
</ProseKit>

<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { Themes } from '@prosekit/themes'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'
import { defineExtension } from './extension'
import WordCounter from './word-counter.svelte'

const editor = createEditor({
  extension: defineExtension(),
  defaultContent: 'Start typing and observe the word count update below.',
})

const mount = (element: HTMLElement) => {
  editor.mount(element)
  return { destroy: () => editor.unmount() }
}
</script>

<ProseKit {editor}>
  <div class={Themes.CSS_EDITOR_VIEWPORT}>
    <div class={Themes.CSS_EDITOR_SCROLLING}>
      <div use:mount class={Themes.CSS_EDITOR_CONTENT}></div>
      <WordCounter />
    </div>
  </div>
</ProseKit>

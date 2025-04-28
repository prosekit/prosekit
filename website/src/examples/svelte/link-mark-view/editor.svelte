<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { Themes } from '@prosekit/themes'
import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'

import { defineExtension } from './extension'

const defaultContent = `
  <p>Here is a link that changes color every second: <a href="https://www.example.com">example link</a>
`

const extension = defineExtension()
const editor = createEditor({ extension, defaultContent })

const mount = (element: HTMLElement) => {
  editor.mount(element)
  return { destroy: () => editor.unmount() }
}
</script>

<ProseKit {editor}>
  <div class={Themes.CSS_EDITOR_VIEWPORT}>
    <div class={Themes.CSS_EDITOR_SCROLLING}>
      <div use:mount class={Themes.CSS_EDITOR_CONTENT}></div>
    </div>
  </div>
</ProseKit>

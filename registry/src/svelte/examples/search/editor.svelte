<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'
import 'prosekit/extensions/search/style.css'

import {
  createEditor,
  type NodeJSON,
} from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'

import { sampleContent } from '../../sample/sample-doc-search'
import { Search } from '../../ui/search'

import { defineExtension } from './extension'

const props: {
  initialContent?: NodeJSON
} = $props()

const extension = defineExtension()
const defaultContent = props.initialContent ?? sampleContent
const editor = createEditor({
  extension,
  defaultContent,
})

const mount = (element: HTMLElement) => {
  editor.mount(element)
  return { destroy: () => editor.unmount() }
}
</script>

<ProseKit {editor}>
  <div class="CSS_EDITOR_VIEWPORT">
    <div class="CSS_EDITOR_SCROLLING">
      <Search />
      <div use:mount class="CSS_EDITOR_CONTENT"></div>
    </div>
  </div>
</ProseKit>

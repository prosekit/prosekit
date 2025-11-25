<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import {
  createEditor,
  type NodeJSON,
} from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'

import { sampleContent } from '../../sample/sample-doc-inline-menu'
import { InlineMenu } from '../../ui/inline-menu'

import { defineExtension } from './extension'

const props: {
  defaultContent?: NodeJSON
} = $props()

const extension = defineExtension()
const defaultContent = props.defaultContent ?? sampleContent
const editor = createEditor({ extension, defaultContent })

const mount = (element: HTMLElement) => {
  editor.mount(element)
  return { destroy: () => editor.unmount() }
}
</script>

<ProseKit {editor}>
  <div class="CSS_EDITOR_VIEWPORT">
    <div class="CSS_EDITOR_SCROLLING">
      <div use:mount class="CSS_EDITOR_CONTENT"></div>
      <InlineMenu />
    </div>
  </div>
</ProseKit>

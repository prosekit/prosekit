<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import {
  createEditor,
  jsonFromNode,
  type NodeJSON,
} from 'prosekit/core'
import {
  ProseKit,
  useDocChange,
} from 'prosekit/svelte'
import { defineExtension } from './extension'

export let defaultContent: NodeJSON | undefined = undefined
export let onDocUpdate: ((doc: NodeJSON) => void) | undefined = undefined

const extension = defineExtension()
const editor = createEditor({ extension, defaultContent })

useDocChange((doc) => onDocUpdate?.(jsonFromNode(doc)), { editor })

const mount = (element: HTMLElement) => {
  editor.mount(element)
  return { destroy: () => editor.unmount() }
}
</script>

<ProseKit {editor}>
  <div class="CSS_EDITOR_VIEWPORT">
    <div class="CSS_EDITOR_SCROLLING">
      <div use:mount class="CSS_EDITOR_CONTENT"></div>
    </div>
  </div>
</ProseKit>

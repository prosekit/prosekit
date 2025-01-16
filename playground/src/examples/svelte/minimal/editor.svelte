<script lang="ts">
import 'prosekit/basic/style.css'

import { Themes } from '@prosekit/themes'

import { defineBasicExtension } from 'prosekit/basic'
import {
  createEditor,
  jsonFromNode,
  type NodeJSON,
} from 'prosekit/core'
import {
  ProseKit,
  useDocChange,
} from 'prosekit/svelte'

export let defaultContent: NodeJSON | undefined = undefined
export let onDocUpdate: ((doc: NodeJSON) => void) | undefined = undefined

const extension = defineBasicExtension()
const editor = createEditor({ extension, defaultContent })

useDocChange((doc) => onDocUpdate?.(jsonFromNode(doc)), { editor })

const mount = (element: HTMLElement) => {
  editor.mount(element)
  return { destroy: () => editor.unmount() }
}
</script>

<ProseKit {editor}>
  <div class={Themes.EDITOR_VIEWPORT}>
    <div class={Themes.EDITOR_SCROLLING}>
      <div use:mount class={Themes.EDITOR_CONTENT}></div>
    </div>
  </div>
</ProseKit>

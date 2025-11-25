<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import {
  createEditor,
  jsonFromNode,
  type NodeJSON,
} from 'prosekit/core'
import type { ProseMirrorNode } from 'prosekit/pm/model'
import {
  ProseKit,
  useDocChange,
} from 'prosekit/svelte'

import { defineExtension } from './extension'

const props = $props<{
  initialContent?: NodeJSON
  onDocUpdate?: (doc: NodeJSON) => void
}>()

const extension = defineExtension()
const editor = createEditor({ extension, defaultContent: props.defaultContent })

const handleDocChange = (doc: ProseMirrorNode) => props.onDocUpdate?.(jsonFromNode(doc))
useDocChange(handleDocChange, { editor })

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

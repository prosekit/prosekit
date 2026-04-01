<script lang="ts">
import { createEditor, defineNodeSpec, union, type NodeJSON } from '@prosekit/core'
import { defineTestExtension } from '@prosekit/testing'

import { ProseKit } from '../components/prosekit/index.ts'
import { defineSvelteNodeView } from './svelte-node-view.ts'
import ImageRefreshView from './SvelteNodeViewSpecImageRefreshView.svelte'

export let initialContent: NodeJSON | undefined = undefined

const extension = union(
  defineTestExtension(),
  defineNodeSpec({
    name: 'image-refresh',
    attrs: {
      url: { default: '', validate: 'string' },
    },
    group: 'block',
    inline: false,
    atom: true,
    isolating: true,
    selectable: true,
    draggable: true,
    parseDOM: [{ tag: 'node-image-refresh' }],
    toDOM: () => ['node-image-refresh', 0],
  }),
  defineSvelteNodeView({
    name: 'image-refresh',
    component: ImageRefreshView,
  }),
)

const editor = createEditor({
  extension,
  defaultContent: initialContent,
})

function mountEditor(node: HTMLElement) {
  editor.mount(node)
  return {
    destroy() {
      editor.mount(null)
    },
  }
}
</script>

<ProseKit {editor}>
  <div data-testid="editor" use:mountEditor></div>
</ProseKit>

<script lang="ts">
import { createEditor, union, type NodeJSON } from '@prosekit/core'
import { defineTestExtension } from '@prosekit/testing'

import { defineSvelteNodeView, ProseKit } from '../index.ts'
import ImageRefreshView from './image-refresh-view.svelte'

export let initialContent: NodeJSON | undefined = undefined

const extension = union(
  defineTestExtension(),
  defineSvelteNodeView({
    name: 'image',
    component: ImageRefreshView,
  }),
)

const editor = createEditor({
  extension,
  defaultContent: initialContent,
})
</script>

<ProseKit {editor}>
  <div data-testid="editor" {@attach editor.mount}></div>
</ProseKit>

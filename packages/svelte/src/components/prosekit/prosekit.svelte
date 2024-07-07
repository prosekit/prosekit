<script lang="ts">
import type { Editor } from '@prosekit/core'
import { useProsemirrorAdapterProvider } from '@prosemirror-adapter/svelte'
import { setEditorContext } from '../../contexts/editor-context'
import { NodeViewConsumer } from '../node-view-consumer'

export let editor: Editor

setEditorContext(editor)
useProsemirrorAdapterProvider()
</script>

<slot />
<NodeViewConsumer />

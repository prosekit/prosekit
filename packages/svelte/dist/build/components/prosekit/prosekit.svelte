<script lang="ts">
import type { Editor } from '@prosekit/core'
import { useProsemirrorAdapterProvider } from '@prosemirror-adapter/svelte'
import { setEditorContext } from '../../contexts/editor-context.js'
import { MarkViewConsumer } from '../mark-view-consumer/index.js'
import { NodeViewConsumer } from '../node-view-consumer/index.js'

export let editor: Editor

setEditorContext(editor)
useProsemirrorAdapterProvider()
</script>

<slot />
<NodeViewConsumer />
<MarkViewConsumer />

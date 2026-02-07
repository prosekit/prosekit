<script lang="ts">
import type { Editor } from '@prosekit/core'
import { useProsemirrorAdapterProvider } from '@prosemirror-adapter/svelte'
import { setEditorContext } from '../../contexts/editor-context.ts'
import { MarkViewConsumer } from '../mark-view-consumer/index.ts'
import { NodeViewConsumer } from '../node-view-consumer/index.ts'

export let editor: Editor

setEditorContext(editor)
useProsemirrorAdapterProvider()
</script>

<slot />
<NodeViewConsumer />
<MarkViewConsumer />

<script lang="ts">
import { useProsemirrorAdapterProvider } from '@prosemirror-adapter/svelte'
import { setEditorContext } from '../../contexts/editor-context'
import type { ProseKitProps } from './props'
import { MarkViewConsumer } from '../mark-view-consumer'
import { NodeViewConsumer } from '../node-view-consumer'

let props: ProseKitProps = $props()

setEditorContext(props.editor)
useProsemirrorAdapterProvider()
</script>

<NodeViewConsumer />
<MarkViewConsumer />
{@render props.children?.()}

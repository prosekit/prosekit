<script lang="ts">
import { useNodeViewFactory, type NodeViewFactory } from '@prosemirror-adapter/svelte'
import { readable } from 'svelte/store'
import { defineSvelteNodeViewFactory } from '../../extensions/svelte-node-view.ts'
import { useExtension } from '../../hooks/use-extension.ts'

const nodeViewFactory: NodeViewFactory = useNodeViewFactory()
const extension = defineSvelteNodeViewFactory(nodeViewFactory)
useExtension(readable(extension))
</script>

<slot />

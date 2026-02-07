<script lang="ts">
import { useNodeViewFactory, type NodeViewFactory } from '@prosemirror-adapter/svelte'
import { readable } from 'svelte/store'
import { defineSvelteNodeViewFactory } from '../../extensions/svelte-node-view.js'
import { useExtension } from '../../hooks/use-extension.js'

const nodeViewFactory: NodeViewFactory = useNodeViewFactory()
const extension = defineSvelteNodeViewFactory(nodeViewFactory)
useExtension(readable(extension))
</script>

<slot />

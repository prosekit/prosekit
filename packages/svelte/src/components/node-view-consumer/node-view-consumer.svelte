<script lang="ts">
import {
  useNodeViewFactory,
  NodeViewFactory,
} from '@prosemirror-adapter/svelte'
import { readable } from 'svelte/store'
import { useExtension } from '../../hooks/use-extension'
import { defineSvelteNodeViewFactory } from '../../node-view/define-svelte-node-view-factory'

const nodeViewFactory: NodeViewFactory = useNodeViewFactory()
const extension = defineSvelteNodeViewFactory(nodeViewFactory)
useExtension(readable(extension))
</script>

<slot />

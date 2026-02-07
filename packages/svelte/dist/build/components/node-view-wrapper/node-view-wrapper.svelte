<script lang="ts">
import { useNodeViewContext } from '@prosemirror-adapter/svelte'
import type { SvelteNodeViewProps } from '../../extensions/svelte-node-view.js'
import type { NodeViewWrapperProps } from './props.js'

const { component: NodeViewComponent }: NodeViewWrapperProps = $props()

const nodeViewProps: SvelteNodeViewProps = {
  contentRef: useNodeViewContext('contentRef'),
  view: useNodeViewContext('view'),
  getPos: useNodeViewContext('getPos'),
  setAttrs: useNodeViewContext('setAttrs'),
  node: useNodeViewContext('node'),
  selected: useNodeViewContext('selected'),
  decorations: useNodeViewContext('decorations'),
  innerDecorations: useNodeViewContext('innerDecorations'),
}
</script>

{#if NodeViewComponent}
  <NodeViewComponent {...nodeViewProps} />
{/if}

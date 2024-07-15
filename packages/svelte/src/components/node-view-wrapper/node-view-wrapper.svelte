<script lang="ts">
import { useNodeViewContext } from '@prosemirror-adapter/svelte'
import type { SvelteNodeViewProps } from '../../node-view/types'
import type { SvelteComponent } from 'svelte'

export let component: SvelteComponent<SvelteNodeViewProps> | undefined

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

{#if component}
  <svelte:component this={component} {...nodeViewProps} />
{/if}

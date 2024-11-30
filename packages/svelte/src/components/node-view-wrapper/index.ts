import type { SvelteComponent } from 'svelte'

import type { SvelteNodeViewComponent } from '../../node-view/types'

import Comp from './node-view-wrapper.svelte'

export const NodeViewWrapper = Comp as unknown as typeof SvelteComponent as typeof SvelteComponent<{
  component: SvelteNodeViewComponent
}>

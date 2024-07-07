import type { SvelteComponent } from 'svelte'

import type { SvelteNodeViewComponent } from '../../node-view/types'

import Comp from './node-view-wrapper.svelte'

export const NodeViewWrapper = Comp as typeof SvelteComponent<{
  component: SvelteNodeViewComponent
}>

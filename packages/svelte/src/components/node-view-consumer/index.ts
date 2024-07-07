import type { SvelteComponent } from 'svelte'

import Comp from './node-view-consumer.svelte'

/**
 * @internal
 */
export const NodeViewConsumer = Comp as typeof SvelteComponent<
  Record<string, never>
>

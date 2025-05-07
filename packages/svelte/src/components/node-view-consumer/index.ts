import type { Component } from 'svelte'

import Comp from './node-view-consumer.svelte'

/**
 * @internal
 */
export const NodeViewConsumer = Comp as Component<Record<string, never>>

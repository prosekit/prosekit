import type { Component } from 'svelte'

import Comp from './mark-view-consumer.svelte'

/**
 * @internal
 */
export const MarkViewConsumer = Comp as Component<Record<string, never>>

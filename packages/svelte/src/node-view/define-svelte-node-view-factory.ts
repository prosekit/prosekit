import { defineNodeViewFactory } from '@prosekit/core'
import type { NodeViewConstructor } from '@prosekit/pm/view'
import type { SvelteNodeViewUserOptions } from '@prosemirror-adapter/svelte'

export function defineSvelteNodeViewFactory(
  factory: (options: SvelteNodeViewUserOptions) => NodeViewConstructor,
) {
  return defineNodeViewFactory<SvelteNodeViewUserOptions>({
    group: 'svelte',
    factory,
  })
}

/* Copyright 2021, Prosemirror Adapter by Mirone. */

import { ProseKitError } from '@prosekit/core'
import type { NodeViewConstructor } from '@prosekit/pm/view'
import type { InjectionKey } from 'vue'
import { inject } from 'vue'

import type { VueNodeViewUserOptions } from './vue-node-view-options'

export type NodeViewFactory = (
  options: VueNodeViewUserOptions,
) => NodeViewConstructor

export const nodeViewFactoryKey: InjectionKey<NodeViewFactory> = Symbol(
  '[ProseKit]useNodeViewFactory',
)

export function useNodeViewFactory(): NodeViewFactory {
  const nodeViewFactory = inject(nodeViewFactoryKey)

  if (!nodeViewFactory) {
    throw new ProseKitError('Cannot find node view factory context.')
  }

  return nodeViewFactory
}

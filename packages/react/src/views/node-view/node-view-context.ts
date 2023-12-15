/* Copyright 2021, Prosemirror Adapter by Mirone. */

import { ProseKitError } from '@prosekit/core'
import type { NodeViewConstructor } from '@prosekit/pm/view'
import { createContext, useContext } from 'react'

import type { ReactNodeViewUserOptions } from './react-node-view-options'

export type NodeViewFactory = (
  options: ReactNodeViewUserOptions,
) => NodeViewConstructor

export const createNodeViewContext = createContext<NodeViewFactory | null>(null)

export function useNodeViewFactory(): NodeViewFactory {
  const nodeViewFactory = useContext(createNodeViewContext)

  if (!nodeViewFactory) {
    throw new ProseKitError('Cannot find node view factory context.')
  }

  return nodeViewFactory
}

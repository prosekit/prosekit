/* Copyright 2021, Prosemirror Adapter by Mirone. */

import type { FC, ReactNode } from 'react'
import { createElement, useMemo } from 'react'

import { createNodeViewContext } from './node-view/node-view-context'
import { useReactNodeViewCreator } from './node-view/use-react-node-view-creator'
import { useReactRenderer } from './react-renderer'

export type CreateReactNodeView = ReturnType<typeof useReactNodeViewCreator>

export const ReactViewsProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { renderReactRenderer, removeReactRenderer, portals } =
    useReactRenderer()

  const createReactNodeView: CreateReactNodeView = useReactNodeViewCreator(
    renderReactRenderer,
    removeReactRenderer,
  )

  const memoizedPortals = useMemo(() => Object.values(portals), [portals])

  return createElement(
    createNodeViewContext.Provider,
    { value: createReactNodeView },
    children,
    memoizedPortals,
  )
}

/* Copyright 2021, Prosemirror Adapter by Mirone. */

import type { ReactPortal } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

export interface ReactRenderer<Context> {
  key: string

  context: Context

  render: () => ReactPortal

  updateContext: () => void
}

export interface ReactRendererResult {
  readonly portals: Record<string, ReactPortal>
  readonly renderReactRenderer: (
    nodeView: ReactRenderer<unknown>,
    update?: boolean,
  ) => void
  readonly removeReactRenderer: (nodeView: ReactRenderer<unknown>) => void
}

export function useReactRenderer(): ReactRendererResult {
  const [portals, setPortals] = useState<Record<string, ReactPortal>>({})
  const mountedRef = useRef(false)

  useEffect(() => {
    requestAnimationFrame(() => {
      mountedRef.current = true
    })
    return () => {
      mountedRef.current = false
    }
  }, [])

  const maybeFlushSync = useCallback((fn: () => void) => {
    if (mountedRef.current) flushSync(fn)
    else fn()
  }, [])

  const renderReactRenderer = useCallback(
    (nodeView: ReactRenderer<unknown>, update = true) => {
      maybeFlushSync(() => {
        if (update) nodeView.updateContext()

        setPortals((prev) => ({
          ...prev,
          [nodeView.key]: nodeView.render(),
        }))
      })
    },
    [maybeFlushSync],
  )

  const removeReactRenderer = useCallback(
    (nodeView: ReactRenderer<unknown>) => {
      maybeFlushSync(() => {
        setPortals((prev) => {
          const next = { ...prev }
          delete next[nodeView.key]
          return next
        })
      })
    },
    [maybeFlushSync],
  )

  return {
    portals,
    renderReactRenderer,
    removeReactRenderer,
  } as const
}

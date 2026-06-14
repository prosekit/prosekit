import { defineDocChangeHandler } from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import { useMemo } from 'react'

import { useEventCallback } from './use-event-callback.ts'
import { useExtension, type UseExtensionOptions } from './use-extension.ts'

export function useDocChange(
  handler: (doc: ProseMirrorNode) => void,
  options?: UseExtensionOptions,
): void {
  const memoizedHandler = useEventCallback(handler)
  const extension = useMemo(
    () => defineDocChangeHandler((view) => memoizedHandler(view.state.doc)),
    [memoizedHandler],
  )
  useExtension(extension, options)
}

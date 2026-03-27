import { defineDocChangeHandler } from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import { useMemo } from 'preact/hooks'

import { useEventCallback } from './use-event-callback'
import { useExtension, type UseExtensionOptions } from './use-extension'

/**
 * Calls the given handler whenever the editor document changes.
 *
 * @public
 */
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

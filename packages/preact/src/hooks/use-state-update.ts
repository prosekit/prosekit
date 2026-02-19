import { defineUpdateHandler } from '@prosekit/core'
import type { EditorState } from '@prosekit/pm/state'
import { useMemo } from 'preact/hooks'

import { useEventCallback } from './use-event-callback.ts'
import { useExtension, type UseExtensionOptions } from './use-extension.ts'

/**
 * Calls the given handler whenever the editor state changes.
 *
 * @public
 */
export function useStateUpdate(
  handler: (state: EditorState) => void,
  options?: UseExtensionOptions,
): void {
  const memoizedHandler = useEventCallback(handler)
  const extension = useMemo(
    () => defineUpdateHandler((view) => memoizedHandler(view.state)),
    [memoizedHandler],
  )
  useExtension(extension, options)
}

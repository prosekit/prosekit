import { defineUpdateHandler } from '@prosekit/core'
import type { EditorState } from '@prosekit/pm/state'
import { useMemo } from 'preact/hooks'

import {
  useExtension,
  type UseExtensionOptions,
} from './use-extension'

/**
 * Calls the given handler whenever the editor state changes.
 *
 * @public
 */
export function useStateUpdate(
  handler: (state: EditorState) => void,
  options?: UseExtensionOptions,
): void {
  const extension = useMemo(
    () => defineUpdateHandler((view) => handler(view.state)),
    [handler],
  )
  useExtension(extension, options)
}

import { defineDocChangeHandler } from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import { useMemo } from 'preact/hooks'

import {
  useExtension,
  type UseExtensionOptions,
} from './use-extension'

/**
 * Calls the given handler whenever the editor document changes.
 *
 * @public
 */
export function useDocChange(
  handler: (doc: ProseMirrorNode) => void,
  options?: UseExtensionOptions,
): void {
  const extension = useMemo(
    () => defineDocChangeHandler((view) => handler(view.state.doc)),
    [handler],
  )
  useExtension(extension, options)
}

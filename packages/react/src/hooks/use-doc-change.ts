import { defineDocChangeHandler } from '@prosekit/core'
import type { ProseMirrorNode } from '@prosekit/pm/model'
import { useMemo } from 'react'

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
) {
  const extension = useMemo(
    () => defineDocChangeHandler((view) => handler(view.state.doc)),
    [handler],
  )
  return useExtension(extension, options)
}

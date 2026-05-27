import { union } from 'prosekit/core'
import { defineBasicExtension } from 'prosekit/basic'
import { defineDetails, defineDetailsNodeView } from 'prosekit/extensions/details'

/**
 * The example uses the composable details extension plus the minimal optional
 * node view that syncs the native <details> open state back to the document.
 */
export function defineExtension() {
  return union(
    defineBasicExtension(),
    defineDetails(),
    defineDetailsNodeView(),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>

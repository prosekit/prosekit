import type { ProseMirrorNode } from '@prosekit/pm/model'
import type { NodeView } from '@prosekit/pm/view'

// This should be synced with the type `CoreNodeViewUserOptions` from `@prosemirror-adapter/core`

/**
 * Some basic props for custom node views.
 *
 * @deprecated - This is no longer needed. Use `CoreNodeViewUserOptions` from `@prosemirror-adapter/core` instead.
 */
export interface BaseNodeViewOptions {
  /**
   * The wrapping DOM element for the node view. Defaults to `div` for block nodes and `span` for inline nodes.
   */
  as?: string | HTMLElement | ((node: ProseMirrorNode) => HTMLElement)

  /**
   * The wrapping DOM element for the node view's content. Defaults to `div` for block nodes and `span` for inline nodes.
   */
  contentAs?: string | HTMLElement | ((node: ProseMirrorNode) => HTMLElement)

  update?: NodeView['update']
  ignoreMutation?: NodeView['ignoreMutation']
  selectNode?: NodeView['selectNode']
  deselectNode?: NodeView['deselectNode']
  setSelection?: NodeView['setSelection']
  stopEvent?: NodeView['stopEvent']
  destroy?: NodeView['destroy']

  onUpdate?: () => void
}

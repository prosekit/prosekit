import type { Attrs, Node } from '@prosekit/pm/model'
import type {
  Decoration,
  DecorationSource,
  EditorView,
} from '@prosekit/pm/view'

/**
 * @public
 */
export interface ReactNodeViewProps {
  // won't change
  contentRef: (node: HTMLElement | null) => void
  view: EditorView
  getPos: () => number | undefined
  setAttrs: (attrs: Attrs) => void

  // changes between updates
  node: Node
  selected: boolean
  decorations: readonly Decoration[]
  innerDecorations: DecorationSource
}

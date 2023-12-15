import type { Attrs, Node } from '@prosekit/pm/model'
import type {
  Decoration,
  DecorationSource,
  EditorView,
} from '@prosekit/pm/view'
import type { ShallowRef, VNodeRef } from 'vue'

export interface VueNodeViewProps {
  // won't change
  contentRef: VNodeRef
  view: EditorView
  getPos: () => number | undefined
  setAttrs: (attrs: Attrs) => void

  // changes between updates
  node: ShallowRef<Node>
  selected: ShallowRef<boolean>
  decorations: ShallowRef<readonly Decoration[]>
  innerDecorations: ShallowRef<DecorationSource>
}

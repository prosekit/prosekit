import type { BaseNodeViewOptions } from '@prosekit/core'
import type { Attrs, ProseMirrorNode } from '@prosekit/pm/model'
import type {
  Decoration,
  DecorationSource,
  EditorView,
} from '@prosekit/pm/view'
import type { ComponentType, SvelteComponent } from 'svelte'
import type { Writable } from 'svelte/store'

/**
 * @public
 */
export interface SvelteNodeViewProps {
  // won't change
  contentRef: (node: Element | null) => void
  view: EditorView
  getPos: () => number | undefined
  setAttrs: (attrs: Attrs) => void

  // changes between updates
  node: Writable<ProseMirrorNode>
  selected: Writable<boolean>
  decorations: Writable<readonly Decoration[]>
  innerDecorations: Writable<DecorationSource>
}

/**
 * @public
 */
export type SvelteNodeViewComponent = ComponentType<
  SvelteComponent<SvelteNodeViewProps>
>

/**
 * Options for {@link defineSvelteNodeView}.
 *
 * @public
 */
export interface SvelteNodeViewOptions extends BaseNodeViewOptions {
  /**
   * The name of the node type.
   */
  name: string

  /**
   * The Svelte component to render the node.
   */
  component: SvelteNodeViewComponent
}

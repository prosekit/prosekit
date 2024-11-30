import {
  defineNodeViewComponent,
  defineNodeViewFactory,
  type BaseNodeViewOptions,
  type Extension,
} from '@prosekit/core'
import type {
  Attrs,
  ProseMirrorNode,
} from '@prosekit/pm/model'
import type {
  Decoration,
  DecorationSource,
  EditorView,
  NodeViewConstructor,
} from '@prosekit/pm/view'
import {
  useNodeViewContext,
  useNodeViewFactory,
  type SolidNodeViewUserOptions,
} from '@prosemirror-adapter/solid'
import {
  createComponent,
  createMemo,
  type Accessor,
  type Component,
} from 'solid-js'

import { useExtension } from '../hooks/use-extension'

/**
 * @public
 */
export interface SolidNodeViewProps {
  // won't change
  contentRef: (node: HTMLElement | null) => void
  view: EditorView
  getPos: () => number | undefined
  setAttrs: (attrs: Attrs) => void

  // changes between updates
  node: ProseMirrorNode
  selected: boolean
  decorations: readonly Decoration[]
  innerDecorations: DecorationSource
}

/**
 * @public
 */
export type SolidNodeViewComponent = Component<SolidNodeViewProps>

/**
 * Options for {@link defineSolidNodeView}.
 *
 * @public
 */
export interface SolidNodeViewOptions extends BaseNodeViewOptions {
  /**
   * The name of the node type.
   */
  name: string

  /**
   * The Solid component to render the node.
   */
  component: SolidNodeViewComponent
}

function withNodeViewProps(
  component: SolidNodeViewComponent,
): Component<SolidNodeViewProps> {
  return function NodeViewPropsWrapper() {
    const props: Accessor<SolidNodeViewProps> = useNodeViewContext()

    return createComponent(component, props())
  }
}

/**
 * @internal
 */
export function consumeSolidViews() {
  const nodeViewFactory = useNodeViewFactory()
  const extension = createMemo(
    () => defineSolidNodeViewFactory(nodeViewFactory),
    [nodeViewFactory],
  )

  useExtension(extension)
}

/**
 * Defines a node view using a Solid component.
 *
 * @public
 */
export function defineSolidNodeView(options: SolidNodeViewOptions): Extension {
  const { name, component, ...userOptions } = options

  const args: SolidNodeViewUserOptions = {
    ...userOptions,
    component: withNodeViewProps(component),
  }

  return defineNodeViewComponent<SolidNodeViewUserOptions>({
    group: 'solid',
    name,
    args,
  })
}

function defineSolidNodeViewFactory(
  factory: (options: SolidNodeViewOptions) => NodeViewConstructor,
) {
  return defineNodeViewFactory<SolidNodeViewOptions>({
    group: 'solid',
    factory,
  })
}

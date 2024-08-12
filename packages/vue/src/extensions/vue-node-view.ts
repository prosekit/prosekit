import type { BaseNodeViewOptions, Extension } from '@prosekit/core'
import { defineNodeViewComponent, defineNodeViewFactory } from '@prosekit/core'
import type { Attrs, ProseMirrorNode } from '@prosekit/pm/model'
import type {
  Decoration,
  DecorationSource,
  EditorView,
  NodeViewConstructor,
} from '@prosekit/pm/view'
import type {
  NodeViewFactory,
  VueNodeViewUserOptions,
} from '@prosemirror-adapter/vue'
import {
  useNodeViewContext,
  useNodeViewFactory,
} from '@prosemirror-adapter/vue'
import type { DefineComponent, ShallowRef, VNodeRef } from 'vue'
import { computed, defineComponent, h } from 'vue'

import { useExtension } from '../hooks/use-extension'

/**
 * @public
 */
export interface VueNodeViewProps {
  // won't change
  contentRef: VNodeRef
  view: EditorView
  getPos: () => number | undefined
  setAttrs: (attrs: Attrs) => void

  // changes between updates
  node: ShallowRef<ProseMirrorNode>
  selected: ShallowRef<boolean>
  decorations: ShallowRef<readonly Decoration[]>
  innerDecorations: ShallowRef<DecorationSource>
}

/**
 * @public
 */
export type VueNodeViewComponent = DefineComponent<VueNodeViewProps, any, any>

/**
 * Options for {@link defineVueNodeView}.
 *
 * @public
 */
export interface VueNodeViewOptions extends BaseNodeViewOptions {
  /**
   * The name of the node type.
   */
  name: string

  /**
   * The Vue component to render the node.
   */
  component: VueNodeViewComponent
}

function withNodeViewProps(component: VueNodeViewComponent) {
  return defineComponent({
    name: 'NodeViewPropsWrapper',
    setup: () => {
      const props: Readonly<VueNodeViewProps> = useNodeViewContext()
      return () => h(component, props)
    },
  })
}

/**
 * @internal
 */
export const VueViewsConsumer = /* @__PURE__ */ defineComponent({
  name: 'VueViewsConsumer',
  setup: () => {
    const nodeViewFactory: NodeViewFactory = useNodeViewFactory()
    const extension = computed(() => {
      return defineVueNodeViewFactory(nodeViewFactory)
    })
    useExtension(extension)
    return () => null
  },
})

/**
 * Defines a node view using a Vue component.
 *
 * @public
 */
export function defineVueNodeView(options: VueNodeViewOptions): Extension {
  const { name, component, ...userOptions } = options

  const args: VueNodeViewUserOptions = {
    ...userOptions,
    component: withNodeViewProps(component),
  }

  return defineNodeViewComponent<VueNodeViewUserOptions>({
    group: 'vue',
    name,
    args,
  })
}

function defineVueNodeViewFactory(
  factory: (options: VueNodeViewUserOptions) => NodeViewConstructor,
) {
  return defineNodeViewFactory<VueNodeViewUserOptions>({
    group: 'vue',
    factory,
  })
}

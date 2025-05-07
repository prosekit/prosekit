import {
  defineNodeViewComponent,
  defineNodeViewFactory,
  type Extension,
} from '@prosekit/core'
import type { NodeViewConstructor } from '@prosekit/pm/view'
import type { CoreNodeViewUserOptions } from '@prosemirror-adapter/core'
import {
  useNodeViewContext,
  useNodeViewFactory,
  type NodeViewContext,
  type NodeViewFactory,
  type VueNodeViewUserOptions,
} from '@prosemirror-adapter/vue'
import {
  computed,
  defineComponent,
  h,
  type DefineComponent,
} from 'vue'

import { useExtension } from '../hooks/use-extension'

/**
 * @public
 */
export interface VueNodeViewProps extends NodeViewContext {}

/**
 * @public
 */
export type VueNodeViewComponent = DefineComponent<VueNodeViewProps, any, any>

/**
 * Options for {@link defineVueNodeView}.
 *
 * @public
 */
export interface VueNodeViewOptions extends CoreNodeViewUserOptions<VueNodeViewComponent> {
  /**
   * The name of the node type.
   */
  name: string
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
export const VueNodeViewsConsumer: DefineComponent = /* @__PURE__ */ defineComponent({
  name: 'VueNodeViewsConsumer',
  setup: () => {
    const nodeViewFactory: NodeViewFactory = useNodeViewFactory()
    const extension = computed(() => {
      return defineVueNodeViewFactory(nodeViewFactory)
    })
    useExtension(extension)
    return (): null => null
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

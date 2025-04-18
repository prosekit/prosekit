import {
  defineMarkViewComponent,
  defineMarkViewFactory,
  type Extension,
} from '@prosekit/core'
import type { MarkViewConstructor } from '@prosekit/pm/view'
import type { CoreMarkViewUserOptions } from '@prosemirror-adapter/core'
import {
  useMarkViewContext,
  useMarkViewFactory,
  type MarkViewContext,
  type MarkViewFactory,
  type VueMarkViewUserOptions,
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
export interface VueMarkViewProps extends MarkViewContext {}

/**
 * @public
 */
export type VueMarkViewComponent = DefineComponent<VueMarkViewProps, any, any>

/**
 * Options for {@link defineVueMarkView}.
 *
 * @public
 */
export interface VueMarkViewOptions extends CoreMarkViewUserOptions<VueMarkViewComponent> {
  /**
   * The name of the mark type.
   */
  name: string
}

function withMarkViewProps(component: VueMarkViewComponent) {
  return defineComponent({
    name: 'MarkViewPropsWrapper',
    setup: () => {
      const props: Readonly<VueMarkViewProps> = useMarkViewContext()
      return () => h(component, props)
    },
  })
}

/**
 * @internal
 */
export const VueMarkViewsConsumer: DefineComponent = /* @__PURE__ */ defineComponent({
  name: 'VueMarkViewsConsumer',
  setup: () => {
    const markViewFactory: MarkViewFactory = useMarkViewFactory()
    const extension = computed(() => {
      return defineVueMarkViewFactory(markViewFactory)
    })
    useExtension(extension)
    return (): null => null
  },
})

/**
 * Defines a mark view using a Vue component.
 *
 * @public
 */
export function defineVueMarkView(options: VueMarkViewOptions): Extension {
  const { name, component, ...userOptions } = options

  const args: VueMarkViewUserOptions = {
    ...userOptions,
    component: withMarkViewProps(component),
  }

  return defineMarkViewComponent<VueMarkViewUserOptions>({
    group: 'vue',
    name,
    args,
  })
}

function defineVueMarkViewFactory(
  factory: (options: VueMarkViewUserOptions) => MarkViewConstructor,
) {
  return defineMarkViewFactory<VueMarkViewUserOptions>({
    group: 'vue',
    factory,
  })
}

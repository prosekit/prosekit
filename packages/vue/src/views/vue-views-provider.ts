/* Copyright 2021, Prosemirror Adapter by Mirone. */

import { Fragment, defineComponent, h, provide } from 'vue'

import {
  nodeViewFactoryKey,
  type NodeViewFactory,
} from './node-view/node-view-context'
import { useVueNodeViewCreator } from './node-view/use-vue-node-view-creator'
import { useVueRenderer } from './vue-renderer'

export const VueViewsProvider = defineComponent({
  name: 'VueViewsProvider',
  setup: (_, { slots }) => {
    const { portals, renderVueRenderer, removeVueRenderer } = useVueRenderer()

    const createVueNodeView: NodeViewFactory = useVueNodeViewCreator(
      renderVueRenderer,
      removeVueRenderer,
    )

    provide(nodeViewFactoryKey, createVueNodeView)

    return () => {
      return h(Fragment, null, [
        slots.default?.(),
        Object.values(portals.value).map((x) => h(x)),
      ])
    }
  },
})

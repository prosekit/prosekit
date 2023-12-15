/* Copyright 2021, Prosemirror Adapter by Mirone. */

import { computed, defineComponent } from 'vue'

import { defineVueNodeViewRenderer } from '../extensions/vue-node-view'
import { useExtension } from '../hooks/use-extension'

import {
  useNodeViewFactory,
  type NodeViewFactory,
} from './node-view/node-view-context'
import { useVueNodeViewCreator } from './node-view/use-vue-node-view-creator'

export type CreateVueNodeView = ReturnType<typeof useVueNodeViewCreator>

export const VueViewsConsumer = defineComponent({
  name: 'VueViewsConsumer',
  setup: () => {
    const nodeViewFactory: NodeViewFactory = useNodeViewFactory()
    const extension = computed(() => {
      return defineVueNodeViewRenderer(nodeViewFactory)
    })
    useExtension(extension)
    return () => null
  },
})

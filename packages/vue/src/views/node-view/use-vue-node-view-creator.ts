/* Copyright 2021, Prosemirror Adapter by Mirone. */

import type { VueRendererResult } from '../vue-renderer'

import type { NodeViewFactory } from './node-view-context'
import { VueNodeView } from './vue-node-view'

export function useVueNodeViewCreator(
  renderVueRenderer: VueRendererResult['renderVueRenderer'],
  removeVueRenderer: VueRendererResult['removeVueRenderer'],
) {
  const createVueNodeView: NodeViewFactory =
    (options) => (node, view, getPos, decorations, innerDecorations) => {
      const nodeView = new VueNodeView({
        node,
        view,
        getPos,
        decorations,
        innerDecorations,
        options: {
          ...options,
          onUpdate() {
            options.onUpdate?.()
            nodeView.updateContext()
          },
          selectNode() {
            options.selectNode?.()
            nodeView.updateContext()
          },
          deselectNode() {
            options.deselectNode?.()
            nodeView.updateContext()
          },
          destroy() {
            options.destroy?.()
            removeVueRenderer(nodeView)
          },
        },
      })
      renderVueRenderer(nodeView)

      return nodeView
    }

  return createVueNodeView
}

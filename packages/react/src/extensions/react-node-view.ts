import { defineNodeViewEffect, type Extension } from '@prosekit/core'
import {
  useNodeViewContext,
  type useNodeViewFactory,
} from '@prosemirror-adapter/react'
import type { NodeViewContext } from '@prosemirror-adapter/react'
import { createElement } from 'react'

export type ReactNodeViewComponentProps = NodeViewContext

export interface ReactNodeViewOptions {
  name: string
  component: React.ComponentType<ReactNodeViewComponentProps>
  dom?: string | (() => HTMLElement)
  contentDOM?: string | (() => HTMLElement)
}

export function defineReactNodeView(options: ReactNodeViewOptions): Extension {
  return defineNodeViewEffect({
    group: 'react',
    name: options.name,
    args: options,
  })
}

export function defineReactNodeViewRenderer({
  nodeViewFactory,
}: {
  nodeViewFactory: ReturnType<typeof useNodeViewFactory>
}) {
  return defineNodeViewEffect({
    group: 'react',
    factory: (args: unknown) => {
      const nodeViewOptions = args as ReactNodeViewOptions
      return nodeViewFactory({
        component: function ReactNodeViewWrapper() {
          const context = useNodeViewContext()
          return createElement(nodeViewOptions.component, context)
        },
        // Optional: add some options
        as: () => {
          const dom = document.createElement('div')

          dom.style.display = 'contents'

          return dom
        },
        contentAs: 'code',
      })
    },
  })
}

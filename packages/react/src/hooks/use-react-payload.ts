import { defineNodeView } from '@prosekit/core'
import {
  useNodeViewContext,
  useNodeViewFactory,
} from '@prosemirror-adapter/react'
import { createElement, useEffect } from 'react'

import { extractReactNodeViewOptions } from '../extensions/react-extension'

import { useEditor } from './use-editor'

export function useReactPayload(
  maybePayload: Record<string, unknown[]> | null,
) {
  const nodeViewFactory = useNodeViewFactory()

  const editor = useEditor()

  useEffect(() => {
    const disposeCallbacks: VoidFunction[] = []

    const payload = maybePayload ?? editor.payload
    const nodeViewOptions = extractReactNodeViewOptions(payload)

    for (const nodeViewOption of nodeViewOptions) {
      const extension = defineNodeView({
        name: nodeViewOption.name,
        constructor: nodeViewFactory({
          component: function ReactNodeViewWrapper() {
            const context = useNodeViewContext()
            return createElement(nodeViewOption.component, context)
          },
          // Optional: add some options
          as: () => {
            const dom = document.createElement('div')

            dom.style.display = 'contents'

            return dom
          },
          contentAs: 'code',
        }),
      })

      disposeCallbacks.push(editor.use(extension))
    }

    return () => disposeCallbacks.forEach((fn) => fn())
  }, [editor, maybePayload, nodeViewFactory])
}

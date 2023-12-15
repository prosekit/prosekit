import { useMemo, type FC } from 'react'

import { defineReactNodeViewRenderer } from '../extensions/react-node-view'
import { useExtension } from '../hooks/use-extension'

import { useNodeViewFactory } from './node-view/node-view-context'

export const ReactViewsConsumer: FC = () => {
  const nodeViewFactory = useNodeViewFactory()
  const extension = useMemo(
    () => defineReactNodeViewRenderer(nodeViewFactory),
    [nodeViewFactory],
  )
  useExtension(extension)

  return null
}

import { useMemo, type FC } from 'react'

import { defineReactNodeViewFactory } from '../extensions/react-node-view'
import { useExtension } from '../hooks/use-extension'

import { useNodeViewFactory } from './node-view/node-view-context'

export const ReactViewsConsumer: FC = () => {
  const nodeViewFactory = useNodeViewFactory()
  const extension = useMemo(
    () => defineReactNodeViewFactory(nodeViewFactory),
    [nodeViewFactory],
  )
  useExtension(extension)

  return null
}

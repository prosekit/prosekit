import type { ConnectableElement, SignalState } from '@aria-ui/core'
import { createSignal, useEffect } from '@aria-ui/core'

import { isFinitePositiveNumber } from '../../../utils/is-finite-positive-number'
import type { OnResize, OnResizeEnd, OnResizeStart } from '../context'
import {
  onResizeContext,
  onResizeEndContext,
  onResizeStartContext,
} from '../context'

import type { ResizableRootProps } from './props'

export function useResizableRoot(
  host: ConnectableElement,
  state: SignalState<ResizableRootProps>,
): void {
  const onResizeStart: OnResizeStart = () => {
    const { width, height } = host.getBoundingClientRect()

    let aspectRatio: number = state.aspectRatio.peek() ?? width / height

    if (!isFinitePositiveNumber(aspectRatio)) {
      aspectRatio = 0
    }

    state.onSizeChangeStart.peek()?.({ width, height })
    return [width, height, aspectRatio]
  }

  const onResize: OnResize = (width, height) => {
    state.onSizeChange.peek()?.({ width, height })
    state.width.set(width)
    state.height.set(height)
  }

  const onResizeEnd: OnResizeEnd = () => {
    const { width, height } = host.getBoundingClientRect()
    state.onSizeChangeEnd.peek()?.({ width, height })
  }

  onResizeStartContext.provide(host, createSignal(onResizeStart))
  onResizeContext.provide(host, createSignal(onResize))
  onResizeEndContext.provide(host, createSignal(onResizeEnd))

  useEffect(host, () => {
    updateResizableRootStyles(
      host,
      state.width.get(),
      state.height.get(),
      state.aspectRatio.get(),
    )
  })
}

function updateResizableRootStyles(
  host: ConnectableElement,
  width: number | null,
  height: number | null,
  aspectRatio: number | null,
) {
  host.style.width = isFinitePositiveNumber(width) ? `${width}px` : ''

  host.style.height = isFinitePositiveNumber(height) ? `${height}px` : ''

  if (isFinitePositiveNumber(aspectRatio)) {
    host.style.aspectRatio = `${aspectRatio}`

    if (width && width > 0 && aspectRatio >= 1) {
      host.style.height = 'auto'
    } else if (height && height > 0 && aspectRatio <= 1) {
      host.style.width = 'auto'
    }
  }
}

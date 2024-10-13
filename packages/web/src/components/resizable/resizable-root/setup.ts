import {
  createSignal,
  useEffect,
  type ConnectableElement,
  type SetupOptions,
} from '@aria-ui/core'

import { isFinitePositiveNumber } from '../../../utils/is-finite-positive-number'
import {
  onResizeContext,
  onResizeEndContext,
  onResizeStartContext,
  type OnResize,
  type OnResizeEnd,
  type OnResizeStart,
} from '../context'

import type { ResizableRootEvents, ResizableRootProps } from './types'

export function useResizableRoot(
  host: ConnectableElement,
  { state, emit }: SetupOptions<ResizableRootProps, ResizableRootEvents>,
): void {
  const onResizeStart: OnResizeStart = () => {
    const { width, height } = host.getBoundingClientRect()

    let aspectRatio: number = state.aspectRatio.peek() ?? width / height

    if (!isFinitePositiveNumber(aspectRatio)) {
      aspectRatio = 0
    }

    emit('resizeStart', { width, height })
    return [width, height, aspectRatio]
  }

  const onResize: OnResize = (width, height) => {
    state.width.set(width)
    state.height.set(height)
  }

  const onResizeEnd: OnResizeEnd = () => {
    const { width, height } = host.getBoundingClientRect()
    emit('resizeEnd', { width, height })
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

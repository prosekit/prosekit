import { createSignal, useAttribute, useEffect, type ConnectableElement, type SetupOptions } from '@aria-ui/core'

import { isFinitePositiveNumber } from '../../../utils/is-finite-positive-number.ts'
import {
  onResizeContext,
  onResizeEndContext,
  onResizeStartContext,
  type OnResize,
  type OnResizeEnd,
  type OnResizeStart,
} from '../context.ts'

import type { ResizableRootEvents, ResizableRootProps } from './types.ts'

/**
 * @internal
 */
export function useResizableRoot(
  host: ConnectableElement,
  { state, emit }: SetupOptions<ResizableRootProps, ResizableRootEvents>,
): void {
  const resizing = createSignal(false)

  const onResizeStart: OnResizeStart = () => {
    const { width, height } = host.getBoundingClientRect()

    let aspectRatio: number = state.aspectRatio.peek() ?? width / height

    if (!isFinitePositiveNumber(aspectRatio)) {
      aspectRatio = 0
    }

    emit('resizeStart', { width, height })
    resizing.set(true)
    return [width, height, aspectRatio]
  }

  const onResize: OnResize = (width, height) => {
    state.width.set(width)
    state.height.set(height)
  }

  const onResizeEnd: OnResizeEnd = () => {
    const { width, height } = host.getBoundingClientRect()
    emit('resizeEnd', { width, height })
    resizing.set(false)
  }

  onResizeStartContext.provide(host, createSignal(onResizeStart))
  onResizeContext.provide(host, createSignal(onResize))
  onResizeEndContext.provide(host, createSignal(onResizeEnd))

  useEffect(host, () => {
    updateResizableRootStyles(
      host,
      Math.max(state.width.get() || 0, 1),
      Math.max(state.height.get() || 0, 1),
      state.aspectRatio.get(),
    )
  })

  useAttribute(host, 'data-resizing', () => (resizing.get() ? '' : undefined))
}

function updateResizableRootStyles(
  host: ConnectableElement,
  width: number,
  height: number,
  aspectRatio: number | null,
) {
  host.style.width = isFinitePositiveNumber(width) ? `${width}px` : ''

  host.style.height = isFinitePositiveNumber(height) ? `${height}px` : ''

  if (isFinitePositiveNumber(aspectRatio)) {
    host.style.aspectRatio = `${aspectRatio}`

    if (width && width > 0 && aspectRatio >= 1) {
      host.style.height = 'auto'
    } else if (height && height > 0 && aspectRatio <= 1) {
      host.style.width = 'min-content'
    }
  }
}

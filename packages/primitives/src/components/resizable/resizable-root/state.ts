import {
  assignProps,
  createSignal,
  mapSignals,
  useEffect,
  type ConnectableElement,
  type SignalState,
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

import { defaultResizableRootProps, type ResizableRootProps } from './props'

export function useResizableRoot(
  host: ConnectableElement,
  props?: Partial<ResizableRootProps>,
) {
  const state = mapSignals(assignProps(defaultResizableRootProps, props))
  useResizableRootState(host, state)
  return state
}

function useResizableRootState(
  host: ConnectableElement,
  state: SignalState<ResizableRootProps>,
) {
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
    state.width.value = width
    state.height.value = height
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
      state.width.value,
      state.height.value,
      state.aspectRatio.value,
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

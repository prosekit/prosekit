import {
  createSignal,
  useEffect,
  type ConnectableElement,
  type SignalState,
  mapSignals,
  assignProps,
} from '@aria-ui/core'

import {
  onResizeContext,
  onResizeStartContext,
  type OnResize,
  type OnResizeStart,
  type OnResizeEnd,
  onResizeEndContext,
} from './context'
import { defaultResizableProps, type ResizableProps } from './props'

export function useResizable(
  host: ConnectableElement,
  props?: Partial<ResizableProps>,
) {
  const state = mapSignals(assignProps(defaultResizableProps, props))
  useResizableState(host, state)
  return state
}

function useResizableState(
  host: ConnectableElement,
  state: SignalState<ResizableProps>,
) {
  const onResizeStart: OnResizeStart = () => {
    const { width, height } = host.getBoundingClientRect()

    let aspectRatio: number = state.aspectRatio.peek() ?? width / height

    if (!(aspectRatio > 0 && Number.isFinite(aspectRatio))) {
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
    updateResizableStyles(
      host,
      state.width.value,
      state.height.value,
      state.aspectRatio.value,
    )
  })
}

function updateResizableStyles(
  host: ConnectableElement,
  width: number | null,
  height: number | null,
  aspectRatio: number | null,
) {
  host.style.width =
    width && width > 0 && Number.isFinite(width) ? `${width}px` : ''

  host.style.height =
    height && height > 0 && Number.isFinite(height) ? `${height}px` : ''

  if (aspectRatio && aspectRatio > 0 && Number.isFinite(height)) {
    host.style.aspectRatio = `${aspectRatio}`

    if (width && width > 0 && aspectRatio >= 1) {
      host.style.height = 'auto'
    } else if (height && height > 0 && aspectRatio <= 1) {
      host.style.width = 'auto'
    }
  }
}

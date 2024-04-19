import {
  assignProps,
  createSignal,
  mapSignals,
  useEffect,
  type ConnectableElement,
  type ReadonlySignal,
  type SignalState,
} from '@aria-ui/core'
import { getWindow } from '@zag-js/dom-query'

import {
  onResizeContext,
  onResizeStartContext,
  type OnResize,
  type OnResizeStart,
  type OnResizeEnd,
  onResizeEndContext,
} from '../context'

import { calcResize } from './calc-resize'
import { defaultResizableHandleProps, type ResizableHandleProps } from './props'

export function useResizableHandle(
  host: ConnectableElement,
  props?: Partial<ResizableHandleProps>,
) {
  const state = mapSignals(assignProps(defaultResizableHandleProps, props))
  const onResize = onResizeContext.consume(host)
  const onResizeStart = onResizeStartContext.consume(host)
  const onResizeEnd = onResizeEndContext.consume(host)

  useResizableHandleState(host, state, { onResize, onResizeStart, onResizeEnd })
  return state
}

function useResizableHandleState(
  host: ConnectableElement,
  state: SignalState<ResizableHandleProps>,
  context: {
    onResizeStart: ReadonlySignal<OnResizeStart>
    onResize: ReadonlySignal<OnResize>
    onResizeEnd: ReadonlySignal<OnResizeEnd>
  },
) {
  let startX = 0
  let startY = 0
  let width = 0
  let height = 0
  let aspectRatio = 1

  const pointerPressing = createSignal(false)

  const handlePointerDown = (event: PointerEvent) => {
    event.preventDefault()
    pointerPressing.value = true

    startX = event.x
    startY = event.y

    const size = context.onResizeStart.value?.()
    if (size) {
      ;[width, height, aspectRatio] = size
    }
  }

  const handlePointerMove = (event: PointerEvent) => {
    event.preventDefault()

    const dx = event.x - startX
    const dy = event.y - startY

    const [w, h] = calcResize(
      state.position.peek(),
      width,
      height,
      dx,
      dy,
      aspectRatio,
    )

    context.onResize.value?.(w, h)
  }

  const handlePointerUp = (event: PointerEvent) => {
    event.preventDefault()
    pointerPressing.value = false

    context.onResizeEnd.value?.()
  }

  useEffect(host, () => {
    host.addEventListener('pointerdown', handlePointerDown)
    return () => {
      host.removeEventListener('pointerdown', handlePointerDown)
    }
  })

  useEffect(host, () => {
    if (!pointerPressing.value) {
      return
    }

    const win = getWindow(host)

    win.addEventListener('pointermove', handlePointerMove)
    win.addEventListener('pointerup', handlePointerUp)
    return () => {
      win.removeEventListener('pointermove', handlePointerMove)
      win.removeEventListener('pointerup', handlePointerUp)
    }
  })
}

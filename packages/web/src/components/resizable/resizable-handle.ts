import type { HostElement, HostElementConstructor, PropsDeclaration } from '@aria-ui/core'
import { createSignal, defineCustomElement, defineProps, registerCustomElement, useEffect, type State } from '@aria-ui/core'
import { getWindow } from '@ocavue/utils'

import { calcResize } from './calc-resize.ts'
import { onResizeContext, onResizeEndContext, onResizeStartContext } from './context.ts'

/**
 * @public
 */
export interface ResizableHandleProps {
  /**
   * The position of the handle.
   *
   * @default "bottom-right"
   */
  position:
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
}

/**
 * @internal
 */
export const ResizableHandlePropsDeclaration: PropsDeclaration<ResizableHandleProps> = defineProps<ResizableHandleProps>({
  position: { default: 'bottom-right', attribute: 'position', type: 'string' },
})

/**
 * @internal
 */
export function setupResizableHandle(
  host: HostElement,
  props: State<ResizableHandleProps>,
): void {
  const getOnResize = onResizeContext.consume(host)
  const getOnResizeStart = onResizeStartContext.consume(host)
  const getOnResizeEnd = onResizeEndContext.consume(host)

  let startX = 0
  let startY = 0
  let width = 0
  let height = 0
  let aspectRatio = 1

  const pointerPressing = createSignal(false)

  const handlePointerDown = (event: PointerEvent) => {
    event.preventDefault()
    pointerPressing.set(true)

    startX = event.x
    startY = event.y

    const size = getOnResizeStart()?.()
    if (size) {
      ;[width, height, aspectRatio] = size
    }
  }

  const handlePointerMove = (event: PointerEvent) => {
    event.preventDefault()

    const dx = event.x - startX
    const dy = event.y - startY

    const [w, h] = calcResize(
      props.position.get(),
      width,
      height,
      dx,
      dy,
      aspectRatio,
    )

    getOnResize()?.(w, h)
  }

  const handlePointerUp = (event: PointerEvent) => {
    event.preventDefault()
    pointerPressing.set(false)

    getOnResizeEnd()?.()
  }

  useEffect(host, () => {
    host.addEventListener('pointerdown', handlePointerDown)
    return () => {
      host.removeEventListener('pointerdown', handlePointerDown)
    }
  })

  useEffect(host, () => {
    if (!pointerPressing.get()) {
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

const ResizableHandleElementBase: HostElementConstructor<ResizableHandleProps> = defineCustomElement(
  setupResizableHandle,
  ResizableHandlePropsDeclaration,
)

/**
 * `<prosekit-resizable-handle>` custom element.
 *
 * Properties: {@link ResizableHandleProps}
 */
export class ResizableHandleElement extends ResizableHandleElementBase {}

let isResizableHandleRegistered = false

/**
 * @internal
 */
export function registerResizableHandleElement(): void {
  if (isResizableHandleRegistered) return
  isResizableHandleRegistered = true
  registerCustomElement('prosekit-resizable-handle', ResizableHandleElement)
}

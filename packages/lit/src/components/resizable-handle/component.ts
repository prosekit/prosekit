import { ContextConsumer } from '@lit/context'
import type { PropertyDeclarations } from 'lit'

import { defineCustomElement } from '../../utils/define-custom-element'
import { LightElement } from '../block-element'
import { resizableContext } from '../resizable/context'

import { calcResize } from './calc-resize'

/**
 * @internal
 */
export const propNames = [] as const

/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type ResizableHandleProps = {
  position:
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'top-left'
    | 'top-right'
    | 'bottom-right'
    | 'bottom-left'
}

/**
 * @public
 */
export class ResizableHandle
  extends LightElement
  implements Partial<ResizableHandleProps>
{
  private context = new ContextConsumer(this, {
    context: resizableContext,
  })

  /**
   * @hidden
   */
  static properties = {
    position: { attribute: false },
  } satisfies PropertyDeclarations

  position?: ResizableHandleProps['position']

  connectedCallback(): void {
    super.connectedCallback()

    let startX = 0
    let startY = 0
    let width = 0
    let height = 0
    let aspectRatio = 1

    const handlePointerMove = (event: PointerEvent) => {
      event.preventDefault()

      const dx = event.x - startX
      const dy = event.y - startY

      const [w, h] = calcResize(
        this.position || 'bottom-right',
        width,
        height,
        dx,
        dy,
        aspectRatio,
      )
      this.context.value?.onResize(w, h)
    }

    const handlePointerDown = (event: PointerEvent) => {
      event.preventDefault()

      startX = event.x
      startY = event.y

      const size = this.context.value?.onResizeStart()
      if (size) {
        ;[width, height, aspectRatio] = size
      }

      this.ownerDocument.addEventListener('pointermove', handlePointerMove)
      this.ownerDocument.addEventListener('pointerup', handlePointerUp)
    }

    const handlePointerUp = (event: PointerEvent) => {
      event.preventDefault()

      this.context.value?.onResizeEnd()
      this.ownerDocument.removeEventListener('pointermove', handlePointerMove)
      this.ownerDocument.removeEventListener('pointerup', handlePointerUp)
    }

    this.addEventListener('pointerdown', handlePointerDown)
  }
}

defineCustomElement('prosekit-resizable-handle', ResizableHandle)

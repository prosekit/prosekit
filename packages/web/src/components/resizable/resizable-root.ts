import type { HostElement, HostElementConstructor, PropsDeclaration } from '@aria-ui/core'
import { createSignal, defineCustomElement, defineProps, registerCustomElement, useEffect, type State } from '@aria-ui/core'
import { useAttribute } from '@aria-ui/utils'

import { isFinitePositiveNumber } from '../../utils/is-finite-positive-number.ts'

import {
  onResizeContext,
  onResizeEndContext,
  onResizeStartContext,
  type OnResize,
  type OnResizeEnd,
  type OnResizeStart,
} from './context.ts'

/**
 * @public
 */
export interface ResizableRootProps {
  /**
   * The width of the resizable element.
   *
   * @default null
   */
  width: number | null

  /**
   * The height of the resizable element.
   *
   * @default null
   */
  height: number | null

  /**
   * The aspect ratio of the resizable element.
   *
   * @default null
   */
  aspectRatio: number | null
}

/**
 * @internal
 */
export const ResizableRootPropsDeclaration: PropsDeclaration<ResizableRootProps> = defineProps<ResizableRootProps>({
  width: { default: null, attribute: 'data-width', type: 'json' },
  height: { default: null, attribute: 'data-height', type: 'json' },
  aspectRatio: { default: null, attribute: 'data-aspect-ratio', type: 'json' },
})

/**
 * @public
 */
export interface ResizableRootEvents {
  /**
   * Emitted when a resize operation starts.
   */
  resizeStart: ResizeStartEvent

  /**
   * Emitted when a resize operation ends.
   */
  resizeEnd: ResizeEndEvent
}

/**
 * @public
 */
export class ResizeStartEvent extends Event {
  readonly detail: {
    readonly width: number
    readonly height: number
  }
  constructor(width: number, height: number) {
    super('resizeStart')
    this.detail = { width, height }
  }
}

/**
 * @public
 */
export class ResizeEndEvent extends Event {
  readonly detail: {
    readonly width: number
    readonly height: number
  }
  constructor(width: number, height: number) {
    super('resizeEnd')
    this.detail = { width, height }
  }
}

/**
 * @internal
 */
export function setupResizableRoot(
  host: HostElement,
  props: State<ResizableRootProps>,
): void {
  const resizing = createSignal(false)

  const onResizeStart: OnResizeStart = () => {
    const { width, height } = host.getBoundingClientRect()

    let aspectRatio: number = props.aspectRatio.get() ?? width / height

    if (!isFinitePositiveNumber(aspectRatio)) {
      aspectRatio = 0
    }

    resizing.set(true)
    host.dispatchEvent(new ResizeStartEvent(width, height))
    return [width, height, aspectRatio]
  }

  const onResize: OnResize = (width, height) => {
    props.width.set(width)
    props.height.set(height)
  }

  const onResizeEnd: OnResizeEnd = () => {
    const { width, height } = host.getBoundingClientRect()
    resizing.set(false)
    host.dispatchEvent(new ResizeEndEvent(width, height))
  }

  onResizeStartContext.provide(host, onResizeStart)
  onResizeContext.provide(host, onResize)
  onResizeEndContext.provide(host, onResizeEnd)

  useEffect(host, () => {
    updateResizableRootStyles(
      host,
      Math.max(props.width.get() || 0, 1),
      Math.max(props.height.get() || 0, 1),
      props.aspectRatio.get(),
    )
  })

  useAttribute(host, 'data-resizing', () => (resizing.get() ? '' : undefined))
}

function updateResizableRootStyles(
  host: HostElement,
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

const ResizableRootElementBase: HostElementConstructor<ResizableRootProps> = defineCustomElement(
  setupResizableRoot,
  ResizableRootPropsDeclaration,
)

/**
 * `<prosekit-resizable-root>` custom element.
 *
 * Properties: {@link ResizableRootProps}
 *
 * Events: {@link ResizableRootEvents}
 *
 * Data attributes:
 *
 * | Attribute | Description |
 * | --- | --- |
 * | `data-resizing` | Present when the element is being resized |
 */
export class ResizableRootElement extends ResizableRootElementBase {}

let isResizableRootRegistered = false

/**
 * @internal
 */
export function registerResizableRootElement(): void {
  if (isResizableRootRegistered) return
  isResizableRootRegistered = true
  registerCustomElement('prosekit-resizable-root', ResizableRootElement)
}

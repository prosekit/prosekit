import type { HostElement, HostElementConstructor, PropsDeclaration } from '@aria-ui/core'
import { createSignal, defineCustomElement, defineProps, registerCustomElement, useEffect, type State } from '@aria-ui/core'
import { useAttribute } from '@aria-ui/utils'

import { assignStyles } from '../../utils/assign-styles.ts'
import { isFinitePositiveNumber } from '../../utils/is-finite-positive-number.ts'

import {
  onResizeContext,
  onResizeEndContext,
  onResizeStartContext,
  type OnResize,
  type OnResizeEnd,
  type OnResizeStart,
} from './context.ts'

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
      props.width.get(),
      props.height.get(),
      props.aspectRatio.get(),
    )
  })

  useAttribute(host, 'data-resizing', () => (resizing.get() ? '' : undefined))
}

function updateResizableRootStyles(
  host: HostElement,
  width: number | null,
  height: number | null,
  aspectRatio: number | null,
) {
  const hasWidth = isFinitePositiveNumber(width)
  const hasHeight = isFinitePositiveNumber(height)
  const styles: {
    width: string
    height: string
    aspectRatio?: string
  } = {
    width: hasWidth ? `${width}px` : 'auto',
    height: hasHeight ? `${height}px` : 'auto',
  }

  if (isFinitePositiveNumber(aspectRatio)) {
    styles.aspectRatio = String(aspectRatio)

    // A known width drives the box in both orientations: `height: auto` lets the
    // aspect ratio derive the height. Only when no width is known does the box
    // derive its width from the height via `min-content`. Driving a portrait box
    // with `min-content` relied on the aspect-ratio transferred size, which
    // WebKit does not resolve, so the box collapsed to its minimum size.
    // https://bugs.webkit.org/show_bug.cgi?id=318221
    if (hasWidth) {
      styles.height = 'auto'
    } else if (hasHeight) {
      styles.width = 'min-content'
    }
  }

  assignStyles(host, styles)
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

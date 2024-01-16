import type {
  AutoUpdateOptions,
  Boundary,
  ComputePositionReturn,
  Placement,
} from '@floating-ui/dom'

import { defaultBoundary } from '../../utils/popover-api'

/**
 * @public
 */
export interface PositioningOptions {
  /**
   * The strategy to use for positioning
   *
   * @default 'absolute'
   */
  strategy?: 'absolute' | 'fixed'

  /**
   * The initial placement of the floating element
   *
   * @default 'bottom'
   */
  placement?: Placement

  /**
   * Options to activate auto-update listeners
   *
   * @default true
   */
  autoUpdate?: boolean | AutoUpdateOptions

  /**
   * The virtual padding around the viewport edges to check for overflow
   *
   * @default 8
   */
  overflowPadding?: number

  /**
   * Whether to flip the placement
   *
   * @default true
   */
  flip?: boolean | Placement[]

  /**
   * Whether the floating element should shift to keep it in view.
   *
   * @default true
   */
  shift?: boolean

  /**
   * Whether the floating element can overlap the reference element
   *
   * @default false
   */
  overlap?: boolean

  /**
   * Whether to improve positioning for inline reference elements that span over
   * multiple lines.
   *
   * @default false
   */
  inline?: boolean

  /**
   * Whether to hide the floating element when the reference element is fully clipped.
   *
   * @default true
   */
  hide?: boolean

  /**
   * Whether to make the floating element same width as the reference element
   *
   * @default false
   */
  sameWidth?: boolean

  /**
   * Whether the popover should fit the viewport.
   *
   * @default false
   */
  fitViewport?: boolean

  /**
   * The distance between the reference and floating element.
   *
   * @default 8
   */
  offset?:
    | number
    | { mainAxis?: number; crossAxis?: number; alignmentAxis?: number }

  /**
   * The overflow boundary of the reference element
   *
   * @default undefined
   */
  boundary?: Boundary | (() => Boundary)

  /**
   * Function called when the placement is computed
   *
   * @default undefined
   */
  onComplete?(data: ComputePositionReturn): void

  /**
   * Function called on cleanup of all listeners
   *
   * @default undefined
   */
  onCleanup?: VoidFunction

  /**
   * Function called when the escape key is down. By default, the popover is
   * hidden when the escape key is down. It can be prevented by calling
   * `event.preventDefault`.
   */
  onEscapeKeyDown?: (event: KeyboardEvent) => void

  /**
   * Function called when when pointer down event happens outside of the
   * popover. By default, the popover is hidden when the pointer down event
   * happens outside of the popover. It can be prevented by calling
   * `event.preventDefault`.
   */
  onPointerDownOutside?: (event: Event) => void
}

/**
 * @internal
 */
export const defaultOptions: PositioningOptions = {
  strategy: 'absolute',
  placement: 'bottom',
  autoUpdate: true,
  overflowPadding: 10,
  flip: true,
  shift: true,
  overlap: false,
  inline: false,
  hide: true,
  sameWidth: false,
  fitViewport: false,
  offset: 8,
  boundary: defaultBoundary,
}

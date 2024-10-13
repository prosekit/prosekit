import type { EventDeclarations, PropDeclarations } from '@aria-ui/core'
import {
  type OverlayPositionerProps,
  overlayPositionerProps,
} from '@aria-ui/overlay/elements'
import type { Placement } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'

export interface BlockHandlePopoverProps
  extends Omit<OverlayPositionerProps, 'placement' | 'offset'> {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null

  /**
   * The placement of the popover, relative to the hovered block.
   *
   * @default "left-start"
   */
  placement: Placement

  /**
   * The distance between the popover and the hovered block.
   *
   * @default 4
   */
  offset: number
}

/** @internal */
export const blockHandlePopoverProps: PropDeclarations<BlockHandlePopoverProps> =
  {
    ...overlayPositionerProps,
    editor: { default: null },
    placement: { default: 'left-start' },
    offset: { default: 4 },
  }

/** @internal */
export interface BlockHandlePopoverEvents {}

/** @internal */
export const blockHandlePopoverEvents: EventDeclarations<BlockHandlePopoverEvents> =
  {}

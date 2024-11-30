import type {
  EventDeclarations,
  PropDeclarations,
} from '@aria-ui/core'
import {
  overlayPositionerProps,
  type OverlayPositionerProps,
} from '@aria-ui/overlay/elements'
import type { Placement } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'

export interface BlockHandlePopoverProps extends Omit<OverlayPositionerProps, 'placement'> {
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
}

/** @internal */
export const blockHandlePopoverProps: PropDeclarations<BlockHandlePopoverProps> = {
  ...overlayPositionerProps,
  editor: { default: null },
  placement: { default: 'left-start' },
}

/** @internal */
export interface BlockHandlePopoverEvents {}

/** @internal */
export const blockHandlePopoverEvents: EventDeclarations<BlockHandlePopoverEvents> = {}

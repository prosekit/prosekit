import type {
  EventDeclarations,
  PropDeclarations,
} from '@aria-ui/core'
import {
  overlayPositionerProps,
  type OverlayPositionerEvents,
  type OverlayPositionerProps,
} from '@aria-ui/overlay'
import type { Placement } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'

export interface TableHandleRowRootProps extends Omit<OverlayPositionerProps, 'placement'> {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   * @hidden
   */
  editor: Editor | null

  /**
   * The placement of the popover, relative to the hovered table cell.
   *
   * @default "left"
   */
  placement: Placement
}

/** @internal */
export const tableHandleRowRootProps: PropDeclarations<TableHandleRowRootProps> = {
  ...overlayPositionerProps,
  editor: { default: null },
  placement: { default: 'left' },
}

/** @internal */
export interface TableHandleRowRootEvents extends OverlayPositionerEvents {}

/** @internal */
export const tableHandleRowRootEvents: EventDeclarations<TableHandleRowRootEvents> = {}

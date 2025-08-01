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

export interface TableHandleRowRootProps extends Omit<OverlayPositionerProps, 'placement' | 'hoist'> {
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

  /**
   * Whether to use the browser [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
   * to place the floating element on top of other page content.
   *
   * @default false
   */
  hoist: boolean
}

/** @internal */
export const tableHandleRowRootProps: PropDeclarations<TableHandleRowRootProps> = {
  ...overlayPositionerProps,
  editor: { default: null },
  placement: { default: 'left' },

  // Enabling `hoist` will cause the popover to have a small delay when
  // scrolling the page.
  hoist: { default: false },
}

/** @internal */
export interface TableHandleRowRootEvents extends OverlayPositionerEvents {}

/** @internal */
export const tableHandleRowRootEvents: EventDeclarations<TableHandleRowRootEvents> = {}

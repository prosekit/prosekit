import type { EventDeclarations, PropDeclarations } from '@aria-ui/core'
import {
  overlayPositionerEvents,
  overlayPositionerProps,
  type OverlayPositionerEvents,
  type OverlayPositionerProps,
} from '@aria-ui/overlay'
import type { Placement } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'

export interface TableHandleColumnRootProps
  extends Omit<OverlayPositionerProps, 'placement'> {
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
   * @default "top"
   */
  placement: Placement
}

/** @internal */
export const tableHandleColumnRootProps: PropDeclarations<TableHandleColumnRootProps> =
  Object.freeze({
    ...overlayPositionerProps,
    editor: { default: null },
    placement: { default: 'top' },
  })

/** @internal */
export interface TableHandleColumnRootEvents extends OverlayPositionerEvents {}

/** @internal */
export const tableHandleColumnRootEvents: EventDeclarations<TableHandleColumnRootEvents> =
  overlayPositionerEvents

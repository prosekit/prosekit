import {
  defaultOverlayPositionerProps,
  type OverlayPositionerProps,
} from '@aria-ui/overlay'
import type { Placement } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'

export interface TableCellPopoverRootProps
  extends Omit<OverlayPositionerProps, 'placement'> {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   */
  editor: Editor | null

  /**
   * The placement of the popover, relative to the hovered table cell.
   *
   * @default "right"
   */
  placement: Placement
}

export const defaultTableCellPopoverRootProps = Object.freeze({
  ...defaultOverlayPositionerProps,
  editor: null,
  placement: 'right',
}) satisfies TableCellPopoverRootProps

import {
  defaultOverlayPositionerProps,
  type OverlayPositionerProps,
} from '@aria-ui/overlay'
import type { Placement } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'

export interface TableCellPopoverProps
  extends Omit<OverlayPositionerProps, 'placement' | 'offset'> {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   */
  editor: Editor | null

  /**
   * The placement of the popover, relative to the hovered table cell.
   *
   * @default "right-end"
   */
  placement: Placement

  /**
   * The distance between the popover and the hovered table cell.
   *
   * @default 4
   */
  offset: number
}

export const defaultTableCellPopoverProps = Object.freeze({
  ...defaultOverlayPositionerProps,
  editor: null,
  placement: 'right-end',
  offset: 4,
}) satisfies TableCellPopoverProps

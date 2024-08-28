import {
  defaultOverlayPositionerProps,
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
   */
  editor: Editor | null

  /**
   * The placement of the popover, relative to the hovered table cell.
   *
   * @default "top"
   */
  placement: Placement
}

export const defaultTableHandleColumnRootProps = Object.freeze({
  ...defaultOverlayPositionerProps,
  editor: null,
  placement: 'top',
}) satisfies TableHandleColumnRootProps

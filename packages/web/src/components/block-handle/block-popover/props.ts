import {
  type OverlayPositionerProps,
  defaultOverlayPositionerProps,
} from '@aria-ui/overlay'
import type { Placement } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'

export interface BlockPopoverProps
  extends Omit<OverlayPositionerProps, 'placement' | 'offset'> {
  /**
   * The ProseKit editor instance.
   *
   * @default null
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

export const defaultBlockPopoverProps = Object.freeze({
  ...defaultOverlayPositionerProps,
  editor: null,
  placement: 'left-start',
  offset: 4,
}) satisfies BlockPopoverProps

import type { OverlayPositionerProps } from '@aria-ui/overlay'
import { defaultOverlayPositionerProps } from '@aria-ui/overlay'
import type { Placement } from '@floating-ui/dom'
import type { Editor } from '@prosekit/core'

export interface InlinePopoverProps
  extends Omit<OverlayPositionerProps, 'placement' | 'offset'> {
  /**
   * The ProseKit editor instance.
   *
   * @default null
   */
  editor: Editor | null

  /**
   * The placement of the popover, relative to the selected inline content.
   *
   * @default "left-start"
   */
  placement: Placement

  /**
   * The distance between the popover and the selected inline content.
   *
   * @default 4
   */
  offset: number
}

export const defaultInlinePopoverProps = Object.freeze({
  ...defaultOverlayPositionerProps,
  editor: null,
  placement: 'left-start',
  offset: 4,
}) satisfies InlinePopoverProps

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
   * Whether the popover is open.
   *
   * Notice that the popover will be always hidden if the inline selection is empty.
   *
   * @default `true`
   */
  open: boolean

  /**
   * A callback that is called when the popover's open state changes.
   *
   * @default null
   */
  onOpenChange: ((open: boolean) => void) | null

  /**
   * The placement of the popover, relative to the selected inline content.
   *
   * @default "top"
   */
  placement: Placement

  /**
   * The distance between the popover and the selected inline content.
   *
   * @default 12
   */
  offset: number
}

export const defaultInlinePopoverProps = Object.freeze({
  ...defaultOverlayPositionerProps,
  editor: null,
  open: true,
  onOpenChange: null,

  placement: 'top',
  offset: 12,
  flip: false,
  hide: true,
  shift: true,
  overlap: true,
  fitViewport: true,
  inline: true,
}) satisfies InlinePopoverProps

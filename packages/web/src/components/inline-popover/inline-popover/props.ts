import type { OverlayPositionerProps } from '@aria-ui/overlay'
import { defaultOverlayPositionerProps } from '@aria-ui/overlay'
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
  placement: OverlayPositionerProps['placement']

  /**
   * @default 12
   */
  offset: OverlayPositionerProps['offset']

  /**
   * @default true
   */
  flip: OverlayPositionerProps['flip']

  /**
   * @default true
   */
  hide: OverlayPositionerProps['hide']

  /**
   * @default true
   */
  overlap: OverlayPositionerProps['overlap']

  /**
   * @default true
   */
  inline: OverlayPositionerProps['inline']

  /**
   * @default true
   */
  hoist: OverlayPositionerProps['hoist']
}

export const defaultInlinePopoverProps = Object.freeze({
  ...defaultOverlayPositionerProps,
  editor: null,
  open: true,
  onOpenChange: null,

  placement: 'top',
  offset: 12,
  shift: true,
  flip: true,
  hide: true,
  overlap: true,
  inline: true,
  overflowPadding: 8,
  // Don't need boundary when hoist is true.
  hoist: true,
  boundary: [],
}) satisfies InlinePopoverProps

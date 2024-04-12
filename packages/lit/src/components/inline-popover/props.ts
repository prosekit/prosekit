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
  shift: OverlayPositionerProps['shift']

  /**
   * @default true
   */
  overlap: OverlayPositionerProps['overlap']

  /**
   * @default true
   */
  fitViewport: OverlayPositionerProps['fitViewport']

  /**
   * @default true
   */
  inline: OverlayPositionerProps['inline']
}

export const defaultInlinePopoverProps = Object.freeze({
  ...defaultOverlayPositionerProps,
  editor: null,
  open: true,
  onOpenChange: null,

  placement: 'top',
  offset: 12,
  flip: true,
  hide: true,
  shift: true,
  overlap: true,
  fitViewport: true,
  inline: true,
}) satisfies InlinePopoverProps
